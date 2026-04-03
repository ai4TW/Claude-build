import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, PlanId } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description: "Start your 14-day free trial of All The Calls. No credit card required upfront.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const validPlan = plan && plan in PLANS ? (plan as PlanId) : null;

  if (!validPlan) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Plan</h1>
          <p className="text-gray-600 mb-6">Please select a plan from our pricing page.</p>
          <Link href="/#pricing" className="bg-brand-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors">
            View Plans →
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS[validPlan];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-900">All The Calls</Link>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
            {" · "}{selectedPlan.displayPrice}/mo
            <span className="ml-2 bg-brand-50 text-brand-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              14-day free trial
            </span>
          </div>
        </div>
      </div>

      {/* Embedded Checkout */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Start Your Free Trial</h1>
          <p className="text-gray-500 text-sm">
            14 days free — no charge until your trial ends. Cancel anytime.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <CheckoutForm plan={validPlan} />
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Secured by Stripe · 256-bit SSL · Cancel anytime from your dashboard
        </p>
      </div>
    </div>
  );
}
