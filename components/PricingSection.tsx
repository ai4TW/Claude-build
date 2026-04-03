"use client";

import { useState } from "react";

const plans = [
  { id: "starter", name: "Starter", price: "$149", period: "/mo", desc: "Solo agents getting started", popular: false },
  { id: "pro", name: "Pro", price: "$249", period: "/mo", desc: "Active agents with high call volume", popular: true },
  { id: "team", name: "Team", price: "$399", period: "/mo", desc: "Small teams of 2–5 agents", popular: false },
];

const planFeatures = [
  "24/7 AI receptionist in your name",
  "Lead qualification on every call",
  "Calendar integration",
  "SMS follow-up automation",
  "CRM sync",
  "5-minute setup",
  "Cancel anytime",
];

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    setLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="bg-white py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Simple Pricing. Serious ROI.</h2>
        <p className="text-gray-500 text-lg mb-2">One commission pays for years of All The Calls.</p>
        <p className="text-brand-600 font-semibold mb-12">14-day free trial. No credit card required.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 relative ${
                plan.popular ? "border-brand-500 shadow-xl shadow-brand-100" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
              <div className="flex items-baseline justify-center mb-8">
                <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 ml-1">{plan.period}</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-brand-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading !== null}
                className={`block w-full text-center py-3 rounded-xl font-bold transition-colors cursor-pointer disabled:opacity-50 ${
                  plan.popular
                    ? "bg-brand-600 hover:bg-brand-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {loading === plan.id ? "Loading..." : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
