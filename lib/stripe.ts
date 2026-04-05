import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  // NOTE: priceIds below are placeholders — replace with new Stripe product IDs
  // after creating products at $199, $349, $599/mo in the Stripe dashboard.
  // Stripe Dashboard → Products → Add product → Recurring → set price → copy price ID
  starter: {
    name: "Solo",
    priceId: "price_1TILzT42X4XVjhD9dPQHdrQo", // TODO: replace with $199/mo price ID
    displayPrice: "$199",
    description: "One AI receptionist — 300 calls/month, 24/7",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TILzT42X4XVjhD9hEKXGf4U", // TODO: replace with $349/mo price ID
    displayPrice: "$349",
    description: "Unlimited calls + knowledge base + all voices",
  },
  team: {
    name: "Agency",
    priceId: "price_1TILzU42X4XVjhD9gf9k06do", // TODO: replace with $599/mo price ID
    displayPrice: "$599",
    description: "3 AI receptionists — unique persona per team member",
  },
} as const;

export type PlanId = keyof typeof PLANS;
