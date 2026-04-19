import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

/**
 * Single-plan catalog.
 * The `pro` key is kept so existing `/checkout?plan=pro` links continue to work.
 * Price is $497/mo — Stripe priceId unchanged from previous config.
 * Custom buildouts for larger teams are handled via Calendly / sales call, not self-serve.
 */
export const PLANS = {
  pro: {
    name: "AllTheCalls — All-In-One",
    priceId: "price_1TKOpP42X4XVjhD9P2VH0xgn",
    displayPrice: "$497",
    monthlyAmount: 497,
    description:
      "Your 24/7 AI receptionist — answers every call in your business name, calls every new lead back in under 30 seconds, and syncs with your CRM.",
  },
} as const;

export type PlanId = keyof typeof PLANS;
