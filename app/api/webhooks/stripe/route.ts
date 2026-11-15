/**
 * /api/webhooks/stripe — Stripe Webhook Handler
 * AllTheCalls.ai
 *
 * Listens for Stripe events and triggers client provisioning automatically.
 *
 * Events handled:
 *   checkout.session.completed  → create Trillet agent, save to DB, send welcome email
 *   customer.subscription.deleted → mark client as cancelled in DB
 *   invoice.payment_failed → send payment failure notification
 *
 * Setup:
 *   1. In Stripe Dashboard → Webhooks → Add endpoint
 *   2. URL: https://allthecalls.ai/api/webhooks/stripe
 *   3. Events: checkout.session.completed, customer.subscription.deleted, invoice.payment_failed
 *   4. Copy the signing secret → add as STRIPE_WEBHOOK_SECRET in Vercel env vars
 *
 * CRITICAL: Stripe requires the raw request body for signature verification.
 * Next.js App Router provides the raw body via request.text() — do NOT use request.json().
 */

import { NextRequest, NextResponse } from "next/server";
import { queueSequence } from "@/lib/email-sequences";
import { createClient } from "@supabase/supabase-js";

const STRIPE_API = "https://api.stripe.com/v1";

// Stripe webhook signature verification (without the stripe npm package)
async function verifyStripeSignature(
  payload: string,
  sigHeader: string,
  secret: string
): Promise<boolean> {
  const parts = sigHeader.split(",").reduce<Record<string, string>>((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts["t"];
  const signature = parts["v1"];

  if (!timestamp || !signature) return false;

  // Reject webhooks older than 5 minutes
  const tolerance = 300;
  if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > tolerance) {
    console.warn("[webhook] Stripe signature timestamp too old");
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expectedSig = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSig === signature;
}

async function handleCheckoutCompleted(session: Record<string, unknown>) {
  // The real provisioning kickoff happens when the customer lands on
  // /setup/{session_id} — lib/provisioning.ts's verifySession() checks this
  // exact session directly against Stripe's API before accepting any
  // business details, and submitIntake() is what actually writes the
  // provisioning_jobs row. That path doesn't depend on this webhook firing
  // at all, so there is nothing left for this handler to kick off.
  //
  // This replaces the old call to the retired /api/onboard route (plaintext
  // temp password, pre-dates the provisioning_jobs pipeline).
  //
  // Known gap, not fixed here: if a customer pays and never returns to
  // /setup/{session_id}, there's no record of that until they do — no
  // "paid but didn't finish onboarding" visibility yet. A fast-follow could
  // have this handler write a `pending_intake` row (the schema already
  // supports that status) so submitIntake() upserts instead of inserting,
  // but that changes provisioning.ts's insert path and wasn't done as part
  // of today's MVP checkout wiring.
  const customerEmail = (session.customer_email as string) || "";
  const sessionId = (session.id as string) || "";
  console.log(`[webhook] Checkout completed for ${customerEmail || "unknown email"} (session ${sessionId}) — awaiting intake at /setup/${sessionId}`);
}

async function handleSubscriptionDeleted(subscription: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[webhook] Supabase not configured — cannot update cancelled subscription");
    return;
  }

  const subscriptionId = subscription.id as string;

  await fetch(
    `${supabaseUrl}/rest/v1/clients?stripe_subscription_id=eq.${subscriptionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ status: "cancelled" }),
    }
  );

  console.log(`[webhook] Marked subscription ${subscriptionId} as cancelled`);
}

async function handlePaymentFailed(invoice: Record<string, unknown>) {
  const customerId = invoice.customer as string;
  const customerEmail = invoice.customer_email as string;
  const customerName = (invoice.customer_name as string) || "";

  console.warn(`[webhook] Payment failed for customer: ${customerId}`);

  // Queue payment recovery email sequence
  if (customerEmail) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      await queueSequence(supabase, "payment_failed", customerEmail, customerName || "there")
        .catch(err => console.error("[webhook] Payment failed sequence queue error:", err));
    }
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  // Get raw body for signature verification
  const payload = await request.text();
  const sigHeader = request.headers.get("stripe-signature") || "";

  // Verify signature
  const isValid = await verifyStripeSignature(payload, sigHeader, webhookSecret);
  if (!isValid) {
    console.error("[webhook] Invalid Stripe signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log(`[webhook] Received Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[webhook] Error handling ${event.type}:`, message);
    // Return 200 anyway — Stripe will retry on non-200, which could cause duplicate provisioning
    // Log the error and handle manually instead
  }

  // Always return 200 to Stripe
  return NextResponse.json({ received: true });
}
