import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  starter: {
    name: "Solo",
    priceId: "price_1TIiDH42X4XVjhD9PWXt8WgM", // $199/mo — prod_UHGkw4yWSkErKd
    displayPrice: "$199",
    description: "One AI receptionist — 300 calls/month, 24/7",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TIiDH42X4XVjhD91fGNwpWH", // $349/mo — prod_UHGkpDyZ0w5q0T
    displayPrice: "$349",
    description: "Unlimited calls + knowledge base + all voices",
  },
  team: {
    name: "Agency",
    priceId: "price_1TIiDH42X4XVjhD94HvjsprJ", // $599/mo — prod_UHGk2ZLXjvrydp
    displayPrice: "$599",
    description: "3 AI receptionists — unique persona per team member",
  },
} as const;

export type PlanId = keyof typeof PLANS;
