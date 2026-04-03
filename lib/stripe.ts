import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PLANS = {
  starter: {
    name: "Starter",
    price: 14900, // $149.00 in cents
    description: "Solo agents getting started — 24/7 AI receptionist",
  },
  pro: {
    name: "Pro",
    price: 24900, // $249.00 in cents
    description: "Active agents with high call volume",
  },
  team: {
    name: "Team",
    price: 39900, // $399.00 in cents
    description: "Small teams of 2–5 agents",
  },
} as const;

export type PlanId = keyof typeof PLANS;
