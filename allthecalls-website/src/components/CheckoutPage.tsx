import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const PLANS = {
  starter: { name: "Starter", displayPrice: "$149" },
  pro:     { name: "Pro",     displayPrice: "$249" },
  team:    { name: "Team",    displayPrice: "$399" },
} as const;
type PlanId = keyof typeof PLANS;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

function EmbeddedForm({ plan }: { plan: PlanId }) {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return "";
    }
    return data.clientSecret as string;
  }, [plan]);

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 font-semibold mb-4">{error}</p>
        <Link to="/#pricing" className="text-brand-400 hover:underline text-sm">← Back to pricing</Link>
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const plan = params.get("plan");
  const validPlan = plan && plan in PLANS ? (plan as PlanId) : null;

  if (!validPlan) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Plan</h1>
          <p className="text-slate-400 mb-6">Please select a plan from our pricing page.</p>
          <Link to="/#pricing" className="bg-brand-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-500 transition-colors">
            View Plans →
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS[validPlan];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-white text-lg">All The Calls</Link>
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-white">{selectedPlan.name}</span>
            {" · "}{selectedPlan.displayPrice}/mo
            <span className="ml-2 bg-brand-600/10 text-brand-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-brand-500/20">
              14-day free trial
            </span>
          </div>
        </div>
      </div>

      {/* Checkout */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Start Your Free Trial</h1>
          <p className="text-slate-400 text-sm">
            14 days free — no charge until your trial ends. Cancel anytime.
          </p>
        </div>

        <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
          <EmbeddedForm plan={validPlan} />
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          Secured by Stripe · 256-bit SSL · Cancel anytime from your dashboard
        </p>
      </div>
    </div>
  );
}
