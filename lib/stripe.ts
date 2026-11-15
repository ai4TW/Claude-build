import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

/**
 * The one offer AllTheCalls sells today: a one-time setup fee plus a
 * recurring monthly fee, billed together on the same Stripe subscription
 * Checkout Session (Stripe supports mixing a one-time Price into a
 * `mode: "subscription"` session — it's invoiced once, upfront, alongside
 * the first recurring invoice).
 *
 * Both price IDs must exist in Stripe before this can run:
 *   1. Stripe Dashboard → Product catalog → Add product → "AllTheCalls — Growth"
 *   2. Add a one-time Price: $1,997 USD → copy its id into STRIPE_PRICE_SETUP_ID
 *   3. Add a recurring Price on the same product: $497 USD / month → copy its id into STRIPE_PRICE_MONTHLY_ID
 *   4. Set STRIPE_SECRET_KEY (Stripe Dashboard → Developers → API keys)
 *   5. Set STRIPE_WEBHOOK_SECRET (Stripe Dashboard → Developers → Webhooks → add endpoint
 *      at https://allthecalls.ai/api/webhooks/stripe, event: checkout.session.completed
 *      at minimum) — paste these directly into Vercel env vars yourself; never hand a
 *      live secret key to anyone else to type in for you.
 *
 * No free trial — the real offer is a flat setup fee + monthly fee, not a trial period.
 */
export const GROWTH_OFFER = {
  name: "AllTheCalls — Growth",
  setupPriceId: process.env.STRIPE_PRICE_SETUP_ID,
  monthlyPriceId: process.env.STRIPE_PRICE_MONTHLY_ID,
  tier: "growth" as const,
};
