import type { VercelRequest, VercelResponse } from "@vercel/node";

const PLANS = {
  starter: { name: "Starter", priceId: "price_1TIH7FIgJN5lMiutLRBnBWY1" },
  pro:     { name: "Pro",     priceId: "price_1TIH7GIgJN5lMiutGURvH9pe" },
  team:    { name: "Team",    priceId: "price_1TIH7HIgJN5lMiutrnXZiiLA" },
} as const;

type PlanId = keyof typeof PLANS;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { plan, email } = req.body as { plan?: string; email?: string };

  if (!plan || !(plan in PLANS)) {
    return res.status(400).json({ error: "Invalid plan. Choose starter, pro, or team." });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const selectedPlan = PLANS[plan as PlanId];
  const appUrl = process.env.VITE_APP_URL || "https://allthecalls.ai";

  const params = new URLSearchParams({
    mode: "subscription",
    ui_mode: "embedded_page",
    "line_items[0][price]": selectedPlan.priceId,
    "line_items[0][quantity]": "1",
    "subscription_data[trial_period_days]": "14",
    return_url: `${appUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
  });
  if (email) params.set("customer_email", email);

  try {
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error("Stripe error:", data.error?.message);
      return res.status(500).json({ error: data.error?.message || "Stripe error" });
    }

    return res.status(200).json({ clientSecret: data.client_secret });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", msg);
    return res.status(500).json({ error: msg });
  }
}
