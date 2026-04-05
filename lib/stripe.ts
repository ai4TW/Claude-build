import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const PLANS = {
  starter: {
    name: "Starter",
    priceId: "price_1TJ0XK42X4XVjhD9hcuRcsOf",
    displayPrice: "$349",
    monthlyAmount: 349,
    description: "One AI receptionist for your business — 300 calls/month",
  },
  pro: {
    name: "Pro",
    priceId: "price_1TJ0XL42X4XVjhD9Tgxh49JJ",
    displayPrice: "$497",
    monthlyAmount: 497,
    description: "Unlimited calls + automated follow-up + weekly reports",
  },
  elite: {
    name: "Elite",
    priceId: "price_1TJ0XL42X4XVjhD9JFl1eRob",
    displayPrice: "$1,497",
    monthlyAmount: 1497,
    description: "The full system — 5 AI receptionists + calendar booking + CRM + white-glove setup",
  },
} as const;

export type PlanId = keyof typeof PLANS;
