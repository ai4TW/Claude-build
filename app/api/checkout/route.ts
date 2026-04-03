import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, PlanId } from "@/lib/stripe";

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
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded",
      customer_email: email || undefined,
      line_items: [{ price: selectedPlan.priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { plan },
      },
      return_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { plan },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Stripe checkout error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
