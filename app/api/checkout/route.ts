import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanId } from "@/lib/stripe";

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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://allthecalls.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: `All The Calls — ${selectedPlan.name}`,
              description: selectedPlan.description,
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: { plan },
      },
      success_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/#pricing`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
