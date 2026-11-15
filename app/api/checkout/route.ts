import { NextRequest, NextResponse } from "next/server";
import { GROWTH_OFFER } from "@/lib/stripe";

async function createCheckoutSession(email: string | undefined, appUrl: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!GROWTH_OFFER.setupPriceId) throw new Error("STRIPE_PRICE_SETUP_ID is not set");
  if (!GROWTH_OFFER.monthlyPriceId) throw new Error("STRIPE_PRICE_MONTHLY_ID is not set");

  const params = new URLSearchParams({
    mode: "subscription",
    ui_mode: "hosted",
    "line_items[0][price]": GROWTH_OFFER.setupPriceId,
    "line_items[0][quantity]": "1",
    "line_items[1][price]": GROWTH_OFFER.monthlyPriceId,
    "line_items[1][quantity]": "1",
    success_url: `${appUrl}/setup/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    "metadata[tier]": GROWTH_OFFER.tier,
  });
  if (email) params.set("customer_email", email);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Stripe error");
  return data;
}

/**
 * POST /api/checkout
 * Body: { email? }
 * Creates a Checkout Session for the one offer AllTheCalls sells ($1,997
 * setup + $497/mo, no trial) and returns its hosted URL. The customer pays,
 * Stripe redirects them to /setup/{session_id} — the real post-payment
 * intake wizard (lib/provisioning.ts verifies the session actually paid
 * before accepting any business details).
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email } = body as { email?: string };
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.ai";

  try {
    const session = await createCheckoutSession(email, appUrl);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Stripe checkout error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
