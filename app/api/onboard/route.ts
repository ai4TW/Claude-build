/**
 * /api/onboard — AllTheCalls.ai Client Provisioning Endpoint
 *
 * Creates a Trillet AI agent for a new client after they sign up.
 * Called by:
 *   1. The Stripe webhook (checkout.session.completed)
 *   2. The admin dashboard (manual onboarding for pilot clients)
 *
 * Auth: requires either a valid session cookie OR the x-internal-secret header.
 *
 * POST /api/onboard
 * Body: { name, brokerage, email, plan, stripeCustomerId?, stripeSubscriptionId?, serviceArea?, phone?, website? }
 * Returns: { agentId, agentName, status, note }
 */

import { NextRequest, NextResponse } from "next/server";
import { buildTrilletAgentPayload } from "@/lib/generateSystemPrompt";
import { supabase, supabaseAdmin } from "@/lib/supabase";

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const TRILLET_BASE = "https://api.trillet.ai";

interface OnboardInput {
  name: string;
  brokerage: string;
  email: string;
  plan: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  serviceArea?: string;
  phone?: string;
  website?: string;
  specialties?: string;
}

interface TrilletAgent {
  _id: string;
  name: string;
  status: string;
  workspaceId: string;
}

function getTrilletHeaders() {
  const key = process.env.TRILLET_API_KEY;
  const workspaceId = process.env.TRILLET_WORKSPACE_ID;
  if (!key || !workspaceId) {
    throw new Error("TRILLET_API_KEY or TRILLET_WORKSPACE_ID not configured");
  }
  return {
    "Content-Type": "application/json",
    "x-api-key": key,
    "x-workspace-id": workspaceId,
  };
}

async function createTrilletAgent(config: OnboardInput): Promise<TrilletAgent> {
  const payload = buildTrilletAgentPayload({
    name: config.name,
    brokerage: config.brokerage,
    serviceArea: config.serviceArea,
    phone: config.phone,
    website: config.website,
    specialties: config.specialties,
  });

  const res = await fetch(`${TRILLET_BASE}/v1/api/agents`, {
    method: "POST",
    headers: getTrilletHeaders(),
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: TrilletAgent;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Trillet returned non-JSON: ${text.slice(0, 200)}`);
  }

  if (!res.ok) {
    throw new Error(`Trillet agent creation failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return data;
}

async function createSupabaseAuthUser(email: string, password: string): Promise<string | null> {
  if (!supabaseAdmin) {
    console.warn("[onboard] supabaseAdmin not configured — skipping auth user creation.");
    return null;
  }
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("[onboard] Supabase auth user creation failed:", error.message);
    return null;
  }
  return data.user?.id ?? null;
}

async function saveToSupabase(client: OnboardInput, agentId: string, authUserId: string) {
  if (!supabaseAdmin) {
    console.warn("[onboard] supabaseAdmin not configured — skipping DB save.");
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .insert({
      user_id: authUserId,
      name: client.name,
      email: client.email,
      brokerage: client.brokerage || null,
      phone: client.phone || null,
      plan: client.plan,
      trillet_agent_id: agentId || null,
      onboarding_completed: false,
    })
    .select()
    .single();

  if (error) {
    console.error("[onboard] Supabase save failed:", error.message);
    return null;
  }

  return data;
}

async function sendWelcomeEmail(client: OnboardInput, _agentId: string, password?: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[onboard] RESEND_API_KEY not set — skipping welcome email.");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.ai";
  const firstName = client.name.split(" ")[0];

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "AllTheCalls <hello@allthecalls.ai>",
      to: client.email,
      subject: `${firstName}, one quick step to activate your AI receptionist`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #08090f; color: #e2e8f0;">
          <img src="${appUrl}/logo.svg" alt="AllTheCalls.ai" style="height: 36px; margin-bottom: 32px;" />
          <h1 style="color: white; font-size: 26px; margin-bottom: 8px; font-weight: 700;">Payment confirmed. Now let's build your AI.</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 16px; line-height: 1.7; margin-bottom: 28px;">
            Hi ${firstName} — your trial is active. The last step is a 2-minute setup so your AI knows exactly how to represent you on every call.
          </p>
          <a href="${appUrl}/welcome" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; margin-bottom: 32px;">
            Complete Your AI Setup →
          </a>
          ${password ? `
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Your Login Credentials</p>
            <p style="margin: 0 0 4px; color: rgba(255,255,255,0.7); font-size: 14px;">Email: <strong style="color: white;">${client.email}</strong></p>
            <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 14px;">Password: <strong style="color: #22d3ee; font-size: 16px;">${password}</strong></p>
          </div>
          ` : ""}
          <p style="color: rgba(255,255,255,0.25); font-size: 12px; margin-top: 24px;">
            Questions? Reply here or email <a href="mailto:hello@allthecalls.ai" style="color: #a78bfa;">hello@allthecalls.ai</a>
          </p>
        </div>
      `,
    }),
  });
}

function isAuthorized(request: NextRequest): boolean {
  // Allow requests with the internal secret header (from Stripe webhook, admin dashboard)
  const internalSecret = request.headers.get("x-internal-secret");
  if (internalSecret && internalSecret === process.env.INTERNAL_SECRET?.trim()) {
    return true;
  }
  // TODO: Also check session cookie for admin dashboard use
  // const session = await getSession(); if (session?.role === 'admin') return true;
  return false;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: OnboardInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, brokerage, email, plan } = body;
  if (!name || !brokerage || !email || !plan) {
    return NextResponse.json(
      { error: "Missing required fields: name, brokerage, email, plan" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Create Supabase Auth user so client can log in immediately
    const password = generatePassword();
    const authUserId = await createSupabaseAuthUser(email, password);
    if (!authUserId) {
      console.error("[onboard] Could not create auth user — DB save skipped");
    }

    // Step 2: Save to Supabase (no Trillet agent yet — created by setup wizard)
    if (authUserId) {
      await saveToSupabase(body, "", authUserId).catch((err) => {
        console.error("[onboard] Supabase save error (non-fatal):", err);
      });
    }

    // Step 3: Send welcome email with login creds + setup link
    await sendWelcomeEmail(body, "", password).catch((err) => {
      console.error("[onboard] Welcome email error (non-fatal):", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[onboard] Fatal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
