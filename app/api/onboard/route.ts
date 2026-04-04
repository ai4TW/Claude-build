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
import { supabase } from "@/lib/supabase";

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

async function saveToSupabase(client: OnboardInput, agentId: string, agentName: string) {
  if (!supabase) {
    console.warn("[onboard] Supabase not configured — skipping DB save. Set SUPABASE_URL and SUPABASE_ANON_KEY.");
    return null;
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: client.name,
      email: client.email,
      brokerage: client.brokerage,
      plan: client.plan,
      stripe_customer_id: client.stripeCustomerId || null,
      stripe_subscription_id: client.stripeSubscriptionId || null,
      trillet_agent_id: agentId,
      trillet_agent_name: agentName,
      status: "pending_phone",
    })
    .select()
    .single();

  if (error) {
    console.error("[onboard] Supabase save failed:", error.message);
    return null;
  }

  return data;
}

async function sendWelcomeEmail(client: OnboardInput, agentId: string) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.warn("[onboard] RESEND_API_KEY not set — skipping welcome email.");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.ai";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "AllTheCalls <hello@allthecalls.com>",
      to: client.email,
      subject: `Your AI receptionist is being set up, ${client.name.split(" ")[0]}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #08090f; color: #e2e8f0;">
          <h1 style="color: #a78bfa; font-size: 28px; margin-bottom: 8px;">Welcome to AllTheCalls!</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6;">
            Hi ${client.name.split(" ")[0]}, your AI receptionist is being configured right now.
          </p>
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">What's happening now</p>
            <ul style="color: rgba(255,255,255,0.8); line-height: 2; padding-left: 20px;">
              <li>✅ Your account is active (${client.plan} plan)</li>
              <li>✅ AI agent created: "${client.name} — ${client.brokerage}"</li>
              <li>⏳ Phone number being assigned (1–2 hours)</li>
              <li>⏳ You'll receive a text when your AI is live</li>
            </ul>
          </div>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px;">
            Agent ID (for your records): <code style="color: #22d3ee;">${agentId}</code>
          </p>
          <a href="${appUrl}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; margin-top: 16px;">
            View Your Dashboard →
          </a>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 32px;">
            Questions? Reply to this email or reach us at hello@allthecalls.com
          </p>
        </div>
      `,
    }),
  });
}

function isAuthorized(request: NextRequest): boolean {
  // Allow requests with the internal secret header (from Stripe webhook, admin dashboard)
  const internalSecret = request.headers.get("x-internal-secret");
  if (internalSecret && internalSecret === process.env.INTERNAL_SECRET) {
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
    // Step 1: Create Trillet agent
    const agent = await createTrilletAgent(body);
    console.log(`[onboard] Trillet agent created: ${agent._id} for ${email}`);

    // Step 2: Save to Supabase (non-blocking — don't fail if DB is down)
    await saveToSupabase(body, agent._id, agent.name).catch((err) => {
      console.error("[onboard] Supabase save error (non-fatal):", err);
    });

    // Step 3: Send welcome email (non-blocking)
    await sendWelcomeEmail(body, agent._id).catch((err) => {
      console.error("[onboard] Welcome email error (non-fatal):", err);
    });

    return NextResponse.json({
      success: true,
      agentId: agent._id,
      agentName: agent.name,
      status: agent.status,
      note: `Agent created successfully. Go to app.trillet.ai → Telephony → assign a phone number to agent ID: ${agent._id}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[onboard] Fatal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
