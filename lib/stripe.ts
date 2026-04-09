import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  starter: {
    name: "Solo",
    priceId: "price_1TIiDH42X4XVjhD9PWXt8WgM",
    displayPrice: "$397",
    monthlyAmount: 397,
    description: "One AI receptionist for your business — never miss a call",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TIiDH42X4XVjhD91fGNwpWH",
    displayPrice: "$497",
    monthlyAmount: 497,
    description: "Unlimited calls + automated follow-up + weekly reports",
  },
  agency: {
    name: "Agency",
    priceId: "price_1TIiDH42X4XVjhD94HvjsprJ",
    displayPrice: "$1,497",
    monthlyAmount: 1497,
    description: "Multi-agent system — up to 5 AI receptionists + white-glove setup",
  },
} as const;

export type PlanId = keyof typeof PLANS;
