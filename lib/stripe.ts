import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  starter: {
    name: "Starter",
    priceId: "price_1TILzT42X4XVjhD9dPQHdrQo",
    displayPrice: "$149",
    description: "Solo agents getting started — 24/7 AI receptionist",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TILzT42X4XVjhD9hEKXGf4U",
    displayPrice: "$249",
    description: "Active agents with high call volume",
  },
  team: {
    name: "Team",
    priceId: "price_1TILzU42X4XVjhD9gf9k06do",
    displayPrice: "$399",
    description: "Small teams of 2–5 agents",
  },
} as const;

export type PlanId = keyof typeof PLANS;
