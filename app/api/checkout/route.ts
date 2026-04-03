import { NextRequest, NextResponse } from "next/server";
import { PLANS, PlanId } from "@/lib/stripe";

async function createCheckoutSession(priceId: string, trialDays: number, returnUrl: string, email?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");

  const params = new URLSearchParams({
    mode: "subscription",
    ui_mode: "embedded",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    "subscription_data[trial_period_days]": String(trialDays),
    return_url: returnUrl,
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

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { plan, email } = body as { plan?: string; email?: string };

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json(
      { error: "Invalid plan. Choose starter, pro, or team." },
      { status: 400 }
    );
  }

  const selectedPlan = PLANS[plan as PlanId];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://realty-receptionist.vercel.app";

  try {
    const session = await createCheckoutSession(
      selectedPlan.priceId,
      14,
      `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      email
    );
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Stripe checkout error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
