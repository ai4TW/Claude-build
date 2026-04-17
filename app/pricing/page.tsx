import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls for Investors",
  description:
    "$497/mo. One plan built for real estate investors — 24/7 inbound answering, <30s outbound on every new lead, CRM auto-sync, and a full DFY setup. 14-day money-back guarantee.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Why real estate investors specifically?",
    a: "Because speed-to-lead is the whole game. If a motivated seller fills out your form or leaves a voicemail and you don't call back inside a minute, they've already called three of your competitors. We built AllTheCalls to make sure you're always the first — and only — call back.",
  },
  {
    q: "How does the <30-second outbound work?",
    a: "When a new lead hits your CRM — from PPL, PPC, direct mail, bandit signs, SEO, or any form — we fire a webhook to your AI the moment it's created. The AI is dialing the seller in under 30 seconds with a qualification script built around your buy box.",
  },
  {
    q: "What CRMs do you connect to?",
    a: "Podio, REISift, InvestorFuse, GoHighLevel, Close, HubSpot, and anything that can send or receive a webhook. If your lead source can fire a webhook (Zillow, PropStream, BatchLeads, etc.), we can wire it up.",
  },
  {
    q: "Does the AI sound real?",
    a: "Most callers don't know it's AI. It answers in your name, uses the exact qualification questions you want asked, and handles objections like a trained cold caller. Call (316) 232-4777 right now and decide for yourself.",
  },
  {
    q: "What exactly is included at $497?",
    a: "Everything. The AI itself, your dedicated phone number, SMS capability, the client portal, a DFY marketing website, CRM integration, calendar integration, and full done-for-you setup by our team. No upsells.",
  },
  {
    q: "When does Custom make sense?",
    a: "If you're running multi-state with 5+ acquisitions managers, funding funds, or a high-volume wholesaling operation — or you need white-label / reseller access — go Custom. We'll build around your playbook, not the other way around.",
  },
  {
    q: "What if I don't like it?",
    a: "14-day money-back guarantee. No questions, no friction. Email hello@allthecalls.ai and we refund you.",
  },
  {
    q: "How fast can I go live?",
    a: "Most investors are live inside 24-48 hours. We handle every piece of the setup — you just forward your marketing number and tell us your buy box.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#08090f] text-slate-200 font-sans antialiased">
      {/* NAV */}
      <nav className="sticky top-0 z-30 border-b border-white/5 bg-[#08090f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="AllTheCalls" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={DEMO_PHONE_HREF}
              className="hidden text-sm text-white/60 hover:text-white sm:inline"
            >
              {"\u{1F4DE}"} {DEMO_PHONE}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:border-white/25 sm:inline-flex items-center gap-2"
            >
              {"\u{1F4C5}"} Book a Call
            </a>
            <Link
              href="/checkout?plan=pro"
              className="rounded-xl bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:opacity-90"
            >
              Get Started — $497/mo
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 text-center md:pt-20 md:pb-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(124,58,237,0.25) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-300">
              For Real Estate Investors &middot; 14-Day Money-Back Guarantee
            </span>
          </div>
          <h1
            className="mb-4 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Never lose another{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              motivated seller.
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-[clamp(15px,2vw,18px)] leading-relaxed text-white/60">
            One plan. $497/mo. Everything a serious investor needs to answer every
            inbound call 24/7 — and call every new CRM lead back in under 30 seconds.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* BOOK A CALL BANNER */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <div className="mb-4 md:mb-0">
            <h3
              className="mb-1 text-lg font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Want to see it on your actual lead flow first?
            </h3>
            <p className="text-sm text-white/50">
              15-minute call. We&apos;ll run the AI against a live sample lead from your CRM.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white hover:border-white/25 hover:bg-white/[0.1] transition"
          >
            {"\u{1F4C5}"} Book a 15-min Call
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-6 text-center text-2xl font-bold text-white md:text-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Quick answers
          </h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/8 bg-white/[0.02] p-5 open:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
                  {f.q}
                  <span className="ml-4 text-violet-300 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden px-4 py-14 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <div className="mb-5 inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-300">
            Lock up more deals
          </div>
          <h2
            className="mb-4 text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              a deal going to someone else.
            </span>
          </h2>
          <p className="mb-7 text-[15px] leading-relaxed text-white/65 md:text-base">
            Live in 24-48 hours. No contracts. 14-day money-back guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/checkout?plan=pro"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-7 py-4 text-base font-bold text-white shadow-xl shadow-violet-500/40 transition hover:opacity-90"
            >
              Get Started — $497/mo {"\u2192"}
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm hover:border-white/25"
            >
              {"\u{1F4C5}"} Book a Call First
            </a>
          </div>
          <p className="mt-5 text-xs text-white/40">
            Or call{" "}
            <a
              href={DEMO_PHONE_HREF}
              className="font-semibold text-violet-300 hover:text-violet-200"
            >
              {DEMO_PHONE}
            </a>{" "}
            — our AI picks up 24/7.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-white/25">
        &copy; 2026 AllTheCalls. Built for real estate investors.
      </footer>
    </div>
  );
}
