"use client";

import { useEffect, useState } from "react";
import PricingSection from "./PricingSection";
import { SITE } from "@/lib/site";

/**
 * Gates the pricing card behind a low-friction 3-field form.
 * FB-ad traffic was viewing the pricing page without converting — forcing
 * a tiny opt-in puts every visitor into GHL so we can retarget + follow up
 * even when they don't buy on the spot.
 *
 * Unlock is persisted in localStorage under `atc_pricing_unlocked` so the
 * visitor doesn't re-fill on refresh.
 *
 * The form does NOT block the phone number — that stays visible everywhere
 * so the highest-intent path is always one tap away.
 */

const LOCAL_KEY = "atc_pricing_unlocked";

const BUSINESS_TYPES = [
  "Home Services / Trades",
  "Personal Care (barber, salon, spa)",
  "Auto Repair",
  "Real Estate (agent, investor, lender, title, PM)",
  "Other",
];

export default function PricingGate() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    businessType: "",
  });

  useEffect(() => {
    try {
      const flag = localStorage.getItem(LOCAL_KEY);
      setUnlocked(flag === "1");
    } catch {
      setUnlocked(false);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.email.includes("@") || !form.email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          phone: form.phone,
          businessType: form.businessType,
          source: "pricing-gate",
        }),
      });
    } catch {
      // Still unlock — we have the data client-side.
    }

    try {
      localStorage.setItem(LOCAL_KEY, "1");
    } catch {
      /* private browsing */
    }

    setSubmitting(false);
    setUnlocked(true);

    setTimeout(() => {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  if (unlocked === null) {
    return (
      <div className="mx-auto min-h-[360px] max-w-md animate-pulse px-4 py-12">
        <div className="h-10 w-3/4 mx-auto rounded-lg bg-line" />
        <div className="mt-4 h-4 w-full rounded bg-line" />
        <div className="mt-2 h-4 w-2/3 mx-auto rounded bg-line" />
      </div>
    );
  }

  if (unlocked) return <PricingSection />;

  return (
    <section className="py-16 lg:py-20" id="unlock">
      <div className="wrap max-w-lg">
        <div className="mb-6 text-center">
          <p className="mb-3 text-[13px] font-bold text-brand">See the price &amp; a free demo built for you</p>
          <h2 className="display heading-2">Want to see exactly what this costs?</h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Drop your info and we&rsquo;ll show you the price — our team will follow up to offer a free
            custom demo so you can hear your AI answer in your business name.
          </p>
        </div>

        <div className="rounded-[16px] border border-line bg-white p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="field"
            />
            <input
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="field"
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone (optional — helps us text you a demo link)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="field"
            />
            <select
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className="field"
            >
              <option value="">What kind of business? (optional)</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {error && (
              <div className="rounded-lg border border-signal/30 bg-signal/5 px-3 py-2 text-sm text-signal">
                {error}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-1 h-14 w-full justify-center py-4 text-[16px]">
              {submitting ? "Unlocking…" : "Show me the price"}
            </button>

            <p className="pt-2 text-center text-[11px] text-muted">
              No spam. We&rsquo;ll only reach out about setting up your system. Unsubscribe anytime.
            </p>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="mb-2 text-[12px] text-muted">Rather just hear it?</p>
          <a href={SITE.phone.href} className="btn-secondary inline-flex h-12 px-5 text-[15px]">
            Call our AI now — {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
