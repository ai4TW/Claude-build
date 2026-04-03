import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$149",
    period: "/mo",
    desc: "Solo agents getting started",
    popular: false,
    features: [
      "Up to 200 calls/mo",
      "AI receptionist in your name",
      "Lead qualification",
      "SMS follow-up",
      "Call transcripts",
      "Email summaries",
      "14-day free trial",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$249",
    period: "/mo",
    desc: "Active agents with high call volume",
    popular: true,
    features: [
      "Unlimited calls",
      "AI receptionist in your name",
      "Lead qualification + scoring",
      "Calendar integration",
      "SMS + CRM sync",
      "Call transcripts",
      "Priority support",
      "14-day free trial",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "$399",
    period: "/mo",
    desc: "Small teams of 2–5 agents",
    popular: false,
    features: [
      "Everything in Pro",
      "Up to 5 agent profiles",
      "Team call routing",
      "Shared CRM sync",
      "Team analytics",
      "Dedicated onboarding",
      "14-day free trial",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 px-4 bg-dark-800/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Simple pricing. <span className="text-gradient">Serious ROI.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            One commission pays for years of All The Calls.
          </p>
          <p className="text-brand-400 font-semibold mt-2">14-day free trial · No credit card required upfront.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? "border-2 border-brand-500 bg-brand-600/5 shadow-2xl shadow-brand-600/10"
                  : "card-dark"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(`/checkout?plan=${plan.id}`)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20"
                    : "border border-white/10 hover:border-white/20 hover:bg-white/5 text-white"
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          All plans include 14-day free trial. Cancel anytime. No hidden fees.
        </p>
      </div>
    </section>
  );
}
