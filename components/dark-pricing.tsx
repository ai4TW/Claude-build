"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PRICE, SITE } from "@/lib/site";

/**
 * Dark-theme equivalents of PricingSection / PricingGate (deleted — the
 * site is single-theme now, see app/page.tsx). Same gating logic, same
 * FEATURES list, same facts (PRICE from lib/site.ts) — only the visual
 * language changed.
 */

const BOOK_URL = "/book";

const FEATURES = [
  "24/7 instant AI missed-call text-back, in your business name",
  "Done-for-you website, built and hosted for you, structured for local SEO",
  "Your own branded CRM app — every call, text, and lead in one pipeline",
  "Lead qualification tuned to your business — the right questions, every time",
  "Native calendar booking — Google & Outlook, no password sharing",
  "Ongoing local SEO — we keep tuning the site and your local listings",
  "Full call transcripts + AI summary on your phone",
  "Business phone number + texting included",
  "Done-for-you setup — our team builds and configures all of it",
];

export function DarkPricingSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="wrap max-w-[680px]">
        <div className="mb-10 text-center">
          <h2 style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[clamp(1.9rem,1.4rem+2vw,2.7rem)] font-bold leading-[1.07] text-white">
            One plan. Everything included.
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-white/60">
            Everything you need to stop losing leads to voicemail — done-for-you, loaded into your
            account on day one.
          </p>
        </div>

        <div className="relative rounded-[20px] border-2 border-[#4cd7f6]/40 bg-white/[0.03] p-8 sm:p-9">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap text-[#08090f]">
            ALLTHECALLS — ALL-IN-ONE PLAN
          </div>

          <div className="mb-7 mt-2 text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[2.5rem] text-white">{PRICE.setup}</span>
              <span className="text-[14px] text-white/50">setup</span>
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-1.5">
              <span className="text-[15px] text-white/50">+</span>
              <span style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[3.4rem] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] bg-clip-text text-transparent">$497</span>
              <span className="text-[16px] text-white/50">/mo</span>
            </div>
            <p className="mt-2 text-[14px] text-white/60">No contracts · 14-day money-back guarantee</p>
          </div>

          <ul className="mb-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-white/85">
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#4cd7f6]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href={BOOK_URL}
            className="flex h-14 w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] text-[16px] font-bold text-[#08090f] transition-opacity hover:opacity-90"
          >
            Book your setup call
          </Link>
          <p className="mt-3 text-center text-[12.5px] text-white/50">
            15 minutes · We confirm your business details and get you on the build calendar
          </p>
          <p className="mt-2 text-center text-[13px]">
            <Link href="/checkout" className="text-[#4cd7f6] underline underline-offset-2">
              Already know you want in? Skip the call and check out now →
            </Link>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-white/10 bg-white/[0.02] p-6">
          <div className="max-w-[440px]">
            <p className="text-[15px] font-bold text-white">Running serious volume? Go custom.</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">
              Multi-line teams, high-volume operations, agencies, franchises, and enterprises — we&rsquo;ll build a
              custom AI stack matched to your call flow, CRM, and playbook.
            </p>
          </div>
          <Link
            href={BOOK_URL}
            className="flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] border border-white/20 px-5 text-[14px] font-semibold text-white hover:border-white/40"
          >
            Book a custom call
          </Link>
        </div>
      </div>
    </section>
  );
}

const LOCAL_KEY = "atc_pricing_unlocked";

const BUSINESS_TYPES = [
  "Home Services / Trades",
  "Personal Care (barber, salon, spa)",
  "Auto Repair",
  "Real Estate (agent, investor, lender, title, PM)",
  "Other",
];

export function DarkPricingGate() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", businessType: "" });

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
  }

  if (unlocked === null) {
    return (
      <div className="mx-auto min-h-[360px] max-w-md animate-pulse px-4 py-12">
        <div className="mx-auto h-10 w-3/4 rounded-lg bg-white/10" />
        <div className="mt-4 h-4 w-full rounded bg-white/10" />
        <div className="mx-auto mt-2 h-4 w-2/3 rounded bg-white/10" />
      </div>
    );
  }

  if (unlocked) return <DarkPricingSection />;

  return (
    <section className="py-16 lg:py-20">
      <div className="wrap max-w-lg">
        <div className="mb-6 text-center">
          <p className="mb-3 text-[13px] font-bold text-[#4cd7f6]">See the price &amp; a free demo built for you</p>
          <h2 style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[clamp(1.6rem,1.2rem+1.6vw,2.2rem)] font-bold text-white">
            Want to see exactly what this costs?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
            Drop your info and we&rsquo;ll show you the price — our team will follow up to offer a free
            custom demo so you can see exactly what your AI would text back in your business name.
          </p>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="h-12 rounded-[10px] border border-white/15 bg-white/5 px-4 text-[15px] text-white placeholder:text-white/40 focus:border-[#4cd7f6]/60 focus:outline-none"
            />
            <input
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-12 rounded-[10px] border border-white/15 bg-white/5 px-4 text-[15px] text-white placeholder:text-white/40 focus:border-[#4cd7f6]/60 focus:outline-none"
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone (optional — helps us text you a demo link)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-12 rounded-[10px] border border-white/15 bg-white/5 px-4 text-[15px] text-white placeholder:text-white/40 focus:border-[#4cd7f6]/60 focus:outline-none"
            />
            <select
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className="h-12 rounded-[10px] border border-white/15 bg-white/5 px-4 text-[15px] text-white focus:border-[#4cd7f6]/60 focus:outline-none"
            >
              <option value="" className="bg-[#08090f]">What kind of business? (optional)</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#08090f]">{t}</option>
              ))}
            </select>

            {error && (
              <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 h-14 w-full rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] text-[16px] font-bold text-[#08090f] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Unlocking…" : "Show me the price"}
            </button>

            <p className="pt-2 text-center text-[11px] text-white/40">
              No spam. We&rsquo;ll only reach out about setting up your system. Unsubscribe anytime.
            </p>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="mb-2 text-[12px] text-white/40">Rather just talk to a person?</p>
          <a
            href={SITE.phone.href}
            className="inline-flex h-12 items-center rounded-[10px] border border-white/20 px-5 text-[15px] font-semibold text-white hover:border-white/40"
          >
            Call us — {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
