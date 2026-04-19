"use client";

import { useEffect, useState } from "react";
import PricingSection from "./PricingSection";

/**
 * Gates the $497 pricing card behind a low-friction 3-field form.
 * FB-ad traffic was viewing the pricing page without converting — forcing
 * a tiny opt-in puts every visitor into GHL so we can retarget + follow up
 * even when they don't buy on the spot.
 *
 * Unlock is persisted in localStorage under `atc_pricing_unlocked` so the
 * visitor doesn't re-fill on refresh. Unlock survives ad-blockers that
 * strip third-party storage because localStorage is first-party.
 *
 * The form does NOT block the phone number or `/demo` CTA — those stay
 * visible everywhere so the highest-intent path is always one tap away.
 */

const LOCAL_KEY = "atc_pricing_unlocked";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

const BUSINESS_TYPES = [
  "Real Estate Investor",
  "Real Estate Agent / Broker",
  "Mortgage Lender",
  "Title Company",
  "Property Manager",
  "Home Services",
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

  // Rehydrate unlock state after mount to avoid SSR/CSR mismatch.
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
      // Still unlock — we have the data client-side and don't want to
      // punish the user for a transient API blip. GHL will pick them up
      // via Meta pixel retargeting anyway.
    }

    try {
      localStorage.setItem(LOCAL_KEY, "1");
    } catch {
      /* private browsing */
    }

    setSubmitting(false);
    setUnlocked(true);

    // Scroll down so they see the revealed price, not the header.
    setTimeout(() => {
      const el = document.getElementById("pricing");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Skeleton on first paint so we don't flash the form to unlocked users.
  if (unlocked === null) {
    return (
      <div className="min-h-[360px] mx-auto max-w-md animate-pulse px-4 py-12">
        <div className="h-10 w-3/4 mx-auto rounded-lg bg-white/5" />
        <div className="mt-4 h-4 w-full rounded bg-white/5" />
        <div className="mt-2 h-4 w-2/3 mx-auto rounded bg-white/5" />
      </div>
    );
  }

  if (unlocked) {
    return <PricingSection />;
  }

  return (
    <section className="relative px-4 py-14 md:py-20" id="unlock">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(124,58,237,0.28) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-300">
              See the price &amp; a free demo built for you
            </span>
          </div>
          <h2
            className="mb-3 text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Want to see exactly{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              what this costs?
            </span>
          </h2>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/60">
            Drop your info and we&apos;ll show you the price — plus queue up a free
            custom demo call so you can hear your AI answer in your business name.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05]"
            />
            <input
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05]"
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone (optional — helps us text you a demo link)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05]"
            />
            <select
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white outline-none transition focus:border-violet-400/60 focus:bg-white/[0.05]"
              style={{ colorScheme: "dark" }}
            >
              <option value="">What kind of business? (optional)</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {error && (
              <div className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full rounded-xl bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-6 py-4 text-[16px] font-bold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Unlocking..." : "Show Me the Price \u2192"}
            </button>

            <p className="pt-2 text-center text-[11px] text-white/35">
              No spam. We&apos;ll only reach out about setting up your AI. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Secondary — call now bypass */}
        <div className="mt-6 text-center">
          <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-white/40">
            Rather just hear it?
          </p>
          <a
            href={DEMO_PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-[15px] font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            <span>{"\u{1F4DE}"}</span>
            Call our AI now &mdash; {DEMO_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
