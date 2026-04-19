import type { Metadata } from "next";
import Link from "next/link";
import PricingGate from "@/components/PricingGate";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls",
  description:
    "See what AllTheCalls costs — the AI receptionist built for real estate pros and any business that can't afford to miss a call. 14-day money-back guarantee.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Who is this actually built for?",
    a: "Real estate professionals first — agents, brokers, investors, lenders, title companies, property managers. But it works for any business owner who can't afford a missed call: home services, legal, medical, trades, you name it. If a missed call costs you money, this is for you.",
  },
  {
    q: "How does it actually work?",
    a: "Your AI answers every inbound call in your business name, 24/7. It qualifies the caller, captures the info you need, books them on your calendar, and texts you a summary before they hang up. No missed calls, no voicemail, no lost leads.",
  },
  {
    q: "Does the AI sound real?",
    a: "Most callers don't realize they're talking to AI. It answers in your name, uses your exact qualification questions, and handles objections naturally. Call (316) 232-4777 right now and decide for yourself — that's a live AllTheCalls AI.",
  },
  {
    q: "How fast can I go live?",
    a: "Most clients are answering calls within 24-48 hours. Our team builds your AI, sets up the phone number, and walks you through forwarding your existing line. You just tell us about your business.",
  },
  {
    q: "What if it doesn't work out?",
    a: "14-day money-back guarantee. No questions, no friction. Email hello@allthecalls.ai and we refund you.",
  },
  {
    q: "Can I try it first?",
    a: `Yes. Call ${DEMO_PHONE} right now and hear a live AllTheCalls AI handle a call end-to-end. Takes 60 seconds. Or fill in the form above and we'll build a free custom demo in your business name so you can hear exactly what your callers would hear.`,
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
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={DEMO_PHONE_HREF}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-[13px] font-semibold text-emerald-300 hover:border-emerald-400/50 sm:px-4 sm:text-sm"
            >
              <span>{"\u{1F4DE}"}</span>
              <span className="hidden sm:inline">Call </span>
              {DEMO_PHONE}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:border-white/25 sm:inline-flex items-center gap-2"
            >
              {"\u{1F4C5}"} Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-14 pb-8 text-center md:pt-20 md:pb-10">
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
              Built for real estate pros &middot; Works for any business
            </span>
          </div>
          <h1
            className="mb-4 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              money walking out the door.
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-[clamp(15px,2vw,18px)] leading-relaxed text-white/60">
            AllTheCalls is your 24/7 AI receptionist. It answers every call in your
            business name, qualifies the caller, books the meeting, and texts you
            the summary &mdash; so you never lose another lead to voicemail.
          </p>
        </div>
      </section>

      {/* GATED PRICING */}
      <PricingGate />

      {/* SECONDARY CTA — book a call */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <div className="mb-4 md:mb-0">
            <h3
              className="mb-1 text-lg font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Want to see it on YOUR actual call flow first?
            </h3>
            <p className="text-sm text-white/50">
              15-minute call. We&apos;ll run the AI against a sample caller from your business.
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
            Stop losing leads to voicemail
          </div>
          <h2
            className="mb-4 text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              a lead going to someone else.
            </span>
          </h2>
          <p className="mb-7 text-[15px] leading-relaxed text-white/65 md:text-base">
            Live in 24-48 hours. No contracts. 14-day money-back guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={DEMO_PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/40 transition hover:opacity-90"
            >
              {"\u{1F4DE}"} Call Our AI: {DEMO_PHONE}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm hover:border-white/25"
            >
              {"\u{1F4C5}"} Book a 15-min Call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-white/25">
        &copy; 2026 AllTheCalls. Built for real estate pros &mdash; and any business that can&apos;t miss a call.
      </footer>
    </div>
  );
}
