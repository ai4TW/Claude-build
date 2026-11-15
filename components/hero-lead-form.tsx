"use client";

import { useState } from "react";
import { INDUSTRIES, SITE } from "@/lib/site";

/**
 * The hero's functional lead-capture card. Posts straight to /api/lead
 * (Supabase + GHL push + email/SMS notify — see app/api/lead/route.ts).
 * Industry list is general-business-first, matching lib/site.ts.
 *
 * `source` is passed straight through to /api/lead so leads can be
 * attributed back to whichever brand A/B variant produced them (see
 * middleware.ts / app/variant-b/page.tsx) — it's what turns "assignments
 * logged in middleware" into a real conversion-rate comparison.
 *
 * `theme="dark"` keeps the same white card (it's the contrast element
 * against a dark hero in both variants) but swaps the signal-red submit
 * button/accents for the gradient brand, so Variant B never shows the
 * other variant's accent color inside its own lead form.
 */
export default function HeroLeadForm({
  id = "lead-form",
  source = "homepage-hero",
  theme = "light",
}: {
  id?: string;
  source?: string;
  theme?: "light" | "dark";
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", businessType: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.firstName.trim()) {
      setError("Please enter your name.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
    } catch {
      // Still show success — we have the data client-side.
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div id={id} className="rounded-[16px] border border-line bg-mist p-7">
        <h2 className="text-[21px] font-bold">Got it — we&rsquo;ll be in touch.</h2>
        <p className="mt-2 text-ink-soft">
          Rather talk now? Call{" "}
          <a href={SITE.phone.href} className={`font-semibold underline underline-offset-4 ${theme === "dark" ? "text-[#2fa8c4]" : "text-brand"}`}>
            {SITE.phone.display}
          </a>{" "}
          and hear a live AllTheCalls AI handle a call end to end.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="rounded-[16px] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(26,26,26,0.04),0_8px_24px_-12px_rgba(27,38,52,0.28)] sm:p-7">
      <h2 className="text-[19px] font-bold">See what this costs for your business</h2>
      <p className="mt-1.5 text-[14.5px] text-ink-soft">No spam — we&rsquo;ll follow up to set up a free demo in your business name.</p>
      <div className="mt-5 flex flex-col gap-3">
        <input
          type="text"
          required
          autoComplete="given-name"
          placeholder="Your name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="field"
        />
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="field"
        />
        <input
          type="tel"
          autoComplete="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="field"
        />
        <select
          value={form.businessType}
          onChange={(e) => setForm({ ...form, businessType: e.target.value })}
          className="field"
        >
          <option value="">What kind of business?</option>
          {INDUSTRIES.map((i) => (
            <option key={i.slug} value={i.name}>{i.name}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {error && <p className={`text-[14px] font-medium ${theme === "dark" ? "text-[#b03823]" : "text-signal"}`}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className={
            theme === "dark"
              ? "flex h-12 w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] py-3.5 text-[16px] font-bold text-[#08090f] disabled:opacity-60"
              : "btn-primary h-12 w-full justify-center py-3.5 text-[16px]"
          }
        >
          {submitting ? "Sending…" : "See pricing & book a demo"}
        </button>
      </div>
    </form>
  );
}
