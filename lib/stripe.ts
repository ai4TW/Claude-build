import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  starter: {
    name: "Solo",
    priceId: "price_1TKOpP42X4XVjhD97B47RoJP",
    displayPrice: "$397",
    monthlyAmount: 397,
    description: "One AI receptionist for your business — never miss a call",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TKOpP42X4XVjhD9P2VH0xgn",
    displayPrice: "$497",
    monthlyAmount: 497,
    description: "Unlimited calls + automated follow-up + weekly reports",
  },
  agency: {
    name: "Agency",
    priceId: "price_1TKOpQ42X4XVjhD9hx0BIvH2",
    displayPrice: "$1,497",
    monthlyAmount: 1497,
    description: "Multi-agent system — up to 5 AI receptionists + white-glove setup",
  },
} as const;

export type PlanId = keyof typeof PLANS;
