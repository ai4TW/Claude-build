/**
 * /api/onboard — AllTheCalls.ai Client Provisioning Endpoint
 *
 * Creates a Supabase auth account for a new client after they pay via Stripe.
 * Called by the Stripe webhook (checkout.session.completed).
 *
 * Auth: requires the x-internal-secret header.
 *
 * POST /api/onboard
 * Body: { name, brokerage, email, plan, stripeCustomerId?, stripeSubscriptionId?, phone? }
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { queueSequence } from "@/lib/email-sequences";

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

interface OnboardInput {
  name: string;
  brokerage: string;
  email: string;
  plan: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  phone?: string;
}

async function sendWelcomeEmail(client: OnboardInput, password: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) throw new Error("RESEND_API_KEY is not set");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.ai";
  const firstName = client.name.split(" ")[0];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "AllTheCalls <hello@allthecalls.ai>",
      to: client.email,
      subject: `${firstName}, one quick step to activate your AI receptionist`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #08090f; color: #e2e8f0;">
          <div style="margin-bottom: 32px;">
            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; background: linear-gradient(90deg, #4cd7f6, #d2bbff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">allthecalls.ai</span>
          </div>
          <h1 style="color: white; font-size: 26px; margin-bottom: 8px; font-weight: 700;">Payment confirmed. Now let's build your AI.</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 16px; line-height: 1.7; margin-bottom: 28px;">
            Hi ${firstName} — your trial is active. The last step is a 2-minute setup so your AI knows exactly how to represent you on every call.
          </p>
          <a href="${appUrl}/welcome" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; margin-bottom: 32px;">
            Complete Your AI Setup →
          </a>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Your Login Credentials</p>
            <p style="margin: 0 0 4px; color: rgba(255,255,255,0.7); font-size: 14px;">Email: <strong style="color: white;">${client.email}</strong></p>
            <p style="margin: 0 0 16px; color: rgba(255,255,255,0.7); font-size: 14px;">Temporary Password: <strong style="color: #22d3ee; font-size: 16px; letter-spacing: 0.05em;">${password}</strong></p>
            <p style="margin: 0; color: rgba(255,255,255,0.35); font-size: 12px; line-height: 1.5;">
              You'll be prompted to set a permanent password when you first log in. Save this email until then.
            </p>
          </div>
          <p style="color: rgba(255,255,255,0.25); font-size: 12px; margin-top: 24px;">
            Questions? Reply here or email <a href="mailto:hello@allthecalls.ai" style="color: #a78bfa;">hello@allthecalls.ai</a>
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body.slice(0, 200)}`);
  }
}

function isAuthorized(request: NextRequest): boolean {
  const internalSecret = request.headers.get("x-internal-secret");
  return !!(internalSecret && internalSecret === process.env.INTERNAL_SECRET?.trim());
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

  const { name, brokerage, email, plan, stripeCustomerId, stripeSubscriptionId, phone } = body;
  if (!name || !brokerage || !email || !plan) {
    return NextResponse.json(
      { error: "Missing required fields: name, brokerage, email, plan" },
      { status: 400 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const password = generatePassword();
  let authUserId: string | null = null;

  // Step 1: Create Supabase auth user (or look up existing if already registered)
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: email.toLowerCase().trim(),
    password,
    email_confirm: true,
  });

  if (createError) {
    if (createError.message.toLowerCase().includes("already been registered") ||
        createError.message.toLowerCase().includes("already exists")) {
      // User already exists — look up their ID so we can still resend the email
      const { data: list } = await supabaseAdmin.auth.admin.listUsers();
      const existing = list?.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
      if (existing) {
        authUserId = existing.id;
        // Update the password so the credentials in the new email are valid
        await supabaseAdmin.auth.admin.updateUserById(existing.id, { password });
        console.log(`[onboard] Existing user found for ${email} — password reset, resending email`);
      } else {
        console.error(`[onboard] createUser failed for ${email}:`, createError.message);
        return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
      }
    } else {
      console.error(`[onboard] createUser failed for ${email}:`, createError.message);
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }
  } else {
    authUserId = created.user?.id ?? null;
  }

  // Step 2: Upsert client record in Supabase
  if (authUserId) {
    const { error: dbError } = await supabaseAdmin
      .from("clients")
      .upsert(
        {
          user_id: authUserId,
          name,
          email: email.toLowerCase().trim(),
          brokerage: brokerage || null,
          phone: phone || null,
          plan,
          stripe_customer_id: stripeCustomerId || null,
          stripe_subscription_id: stripeSubscriptionId || null,
          onboarding_completed: false,
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error(`[onboard] DB upsert failed for ${email}:`, dbError.message);
      // Non-fatal — email is more important than the DB record for immediate UX
    }
  }

  // Step 3a: Email alert for Agency sign-ups
  if (plan === "agency") {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "AllTheCalls <hello@allthecalls.ai>",
          to: "hello@allthecalls.ai",
          subject: `New Agency client: ${name}`,
          text: `New Agency signup!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "not provided"}\n\nWhite-glove setup required. Reach out within 24 hours.`,
        }),
      }).catch(err => console.error("[onboard] Agency alert email failed:", err));
    }
  }

  // Step 3b: Queue trial onboarding email sequence
  if (supabaseAdmin) {
    queueSequence(supabaseAdmin, "trial_onboarding", email, name, undefined, { plan })
      .catch(err => console.error("[onboard] Trial onboarding sequence queue failed:", err));
  }

  // Step 3c: Send welcome email — this MUST succeed
  try {
    await sendWelcomeEmail(body, password);
    console.log(`[onboard] Welcome email sent to ${email}`);
  } catch (emailErr) {
    const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
    console.error(`[onboard] CRITICAL — welcome email failed for ${email}:`, msg);
    // Return 500 so the Stripe webhook logs this as an error (won't retry, but surfaces in logs)
    return NextResponse.json(
      { error: `Account created but welcome email failed: ${msg}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
