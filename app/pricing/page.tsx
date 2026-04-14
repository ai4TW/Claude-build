import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls.ai",
  description:
    "AI receptionist plans for real estate investors, agents, and tradespeople. Every call answered 24/7. 14-day money-back guarantee.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

type Plan = {
  id: "starter" | "pro" | "agency";
  name: string;
  price: number;
  tagline: string;
  features: string[];
  popular?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Solo",
    price: 397,
    tagline: "Never miss another call. Ever.",
    features: [
      "1 AI receptionist in your name",
      "300 calls / month",
      "24/7 availability — every call answered",
      "Industry-specific lead qualification",
      "SMS follow-up after every call",
      "Full call transcripts & AI summaries",
      "5 AI voice options",
      "Live client app — call history, recordings & transcripts on your phone",
      "Done-for-you setup by our team",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 497,
    tagline: "Unlimited calls. Booked appointments. Your own website.",
    popular: true,
    badge: "MOST POPULAR",
    features: [
      "Unlimited calls — no cap, ever",
      "Advanced industry-specific qualification",
      "Automated calendar booking — directly into Calendly or Acuity",
      "Automated SMS follow-up after every call",
      "Custom knowledge base — your services, pricing & FAQs",
      "Full premium voice library",
      "Full call transcripts & AI summaries",
      "Live client app — call history, recordings & transcripts on your phone",
      "FREE high-converting marketing website — we design & build it",
      "Priority support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 1497,
    tagline: "The full operation. Zero leads lost.",
    badge: "FULL SYSTEM",
    features: [
      "5 AI receptionists — unique names, voices & scripts",
      "Unlimited calls across all 5 lines",
      "Automated calendar booking on every line",
      "CRM integration — every call auto-logged with full notes",
      "Custom knowledge base built by our team",
      "Live client app for every line",
      "FREE high-converting marketing website",
      "White-glove setup — our team configures everything live",
      "Monthly 30-min strategy & optimization call",
      "Dedicated priority support channel",
    ],
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Do I really need unlimited calls?",
    a: "If you run ads, have a website, or answer inbound leads, yes. Pro pays for itself the moment you stop worrying about call volume.",
  },
  {
    q: "How fast can I go live?",
    a: "Most clients are answering calls within 24 hours of checkout. We do the setup — you forward your number.",
  },
  {
    q: "What if I don't like it?",
    a: "14-day money-back guarantee, no questions. Cancel inside the portal or email hello@allthecalls.ai.",
  },
  {
    q: "Do my clients see the call history?",
    a: "Yes — every plan includes the Live Client App at app.allthecalls.ai. Installable on iPhone and Android in under a minute.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#08090f] text-slate-200 font-sans antialiased">
      {/* NAV */}
      <nav className="sticky top-0 z-30 border-b border-white/5 bg-[#08090f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="AllTheCalls.ai" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={DEMO_PHONE_HREF}
              className="hidden text-sm text-white/60 hover:text-white sm:inline"
            >
              📞 {DEMO_PHONE}
            </a>
            <Link
              href="/checkout?plan=pro"
              className="rounded-full bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:opacity-90"
            >
              Start Free Trial
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
              14-Day Money-Back Guarantee
            </span>
          </div>
          <h1
            className="mb-4 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Less than one{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              missed opportunity.
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-[clamp(15px,2vw,18px)] leading-relaxed text-white/60">
            A human answering service runs $400–$1,200/mo with sick days and
            turnover. Your AI answers every call, 24/7, for less — and plugs
            straight into your phone.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-4 pb-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs text-white/35">
          Need more than 5 lines?{" "}
          <a
            href="mailto:hello@allthecalls.ai"
            className="font-medium text-violet-300 hover:text-violet-200"
          >
            Contact us
          </a>{" "}
          — custom setups available for larger teams.
        </p>
      </section>

      {/* COMPARISON TABLE — desktop only, compact */}
      <section className="hidden px-4 pb-10 md:block">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="w-[40%] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Feature
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-white/70">
                  Solo
                  <div className="text-[11px] font-normal text-white/40">$397</div>
                </th>
                <th className="bg-violet-500/[0.08] px-4 py-4 text-center text-xs font-bold">
                  <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                    Pro ⭐
                  </span>
                  <div className="text-[11px] font-normal text-violet-300/60">$497</div>
                </th>
                <th className="px-4 py-4 text-center text-xs font-bold text-white/70">
                  Agency
                  <div className="text-[11px] font-normal text-white/40">$1,497</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/[0.04] ${
                    i % 2 === 0 ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="px-6 py-3.5 text-[13px] text-white/65">
                    {row.label}
                  </td>
                  <Cell value={row.solo} />
                  <Cell value={row.pro} highlighted />
                  <Cell value={row.agency} />
                </tr>
              ))}
            </tbody>
          </table>
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
            Ready to stop missing calls?
          </div>
          <h2
            className="mb-4 text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every missed call is{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              money walking away.
            </span>
          </h2>
          <p className="mb-7 text-[15px] leading-relaxed text-white/65 md:text-base">
            Get started in under 5 minutes — your AI is answering the same day.
            Or book a 15-min call and we&apos;ll walk you through it live.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/checkout?plan=pro"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-7 py-4 text-base font-bold text-white shadow-xl shadow-violet-500/40 transition hover:opacity-90"
            >
              Start now — 14-day guarantee →
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm hover:border-white/25"
            >
              📅 Book a 15-min call
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/40">
            Or call{" "}
            <a
              href={DEMO_PHONE_HREF}
              className="font-semibold text-violet-300 hover:text-violet-200"
            >
              {DEMO_PHONE}
            </a>{" "}
            — our live AI picks up 24/7.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-white/25">
        &copy; 2026 All The Calls. All rights reserved.
      </footer>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isPopular = plan.popular === true;
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-7 backdrop-blur-xl transition ${
        isPopular
          ? "border-2 border-violet-500/60 bg-violet-500/[0.08] shadow-2xl shadow-violet-500/20"
          : "border border-white/8 bg-white/[0.03]"
      }`}
    >
      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
          style={{
            background: isPopular
              ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
              : "linear-gradient(135deg, #06b6d4, #0891b2)",
          }}
        >
          {plan.badge}
        </div>
      )}

      <h3
        className="mb-1 text-xl font-bold text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {plan.name}
      </h3>
      <p className="mb-5 text-[13px] leading-snug text-white/45">{plan.tagline}</p>

      <div className="mb-1 flex items-baseline gap-1">
        <span
          className={`text-4xl font-bold leading-none ${
            isPopular
              ? "bg-gradient-to-br from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent"
              : "text-white"
          }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ${plan.price.toLocaleString()}
        </span>
        <span className="text-sm text-white/40">/mo</span>
      </div>
      <p className="mb-5 text-[11px] text-white/30">14-day money-back guarantee</p>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75">
            <CheckIcon color={isPopular ? "#a78bfa" : "#22d3ee"} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/checkout?plan=${plan.id}`}
        className={`mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold transition ${
          isPopular
            ? "bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] text-white shadow-lg shadow-violet-500/30 hover:opacity-90"
            : "border border-white/15 bg-white/[0.04] text-white hover:border-white/30"
        }`}
      >
        Get Started →
      </Link>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[3px] flex-shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
      <path
        d="M5 8l2 2 4-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CellValue = boolean | string;
function Cell({ value, highlighted }: { value: CellValue; highlighted?: boolean }) {
  const bg = highlighted ? "bg-violet-500/[0.05]" : "";
  if (typeof value === "boolean") {
    return (
      <td className={`px-4 py-3 text-center ${bg}`}>
        {value ? (
          <CheckIcon color={highlighted ? "#a78bfa" : "#22d3ee"} />
        ) : (
          <span className="text-white/15">—</span>
        )}
      </td>
    );
  }
  return (
    <td className={`px-4 py-3 text-center ${bg}`}>
      <span
        className={`text-[13px] font-semibold ${
          highlighted ? "text-violet-300" : "text-white/70"
        }`}
      >
        {value}
      </span>
    </td>
  );
}

const COMPARISON: Array<{
  label: string;
  solo: CellValue;
  pro: CellValue;
  agency: CellValue;
}> = [
  { label: "AI receptionists", solo: "1", pro: "1", agency: "5" },
  { label: "Monthly calls", solo: "300", pro: "Unlimited", agency: "Unlimited" },
  { label: "24/7 availability", solo: true, pro: true, agency: true },
  { label: "Live client app (iOS/Android)", solo: true, pro: true, agency: true },
  { label: "Call transcripts & recordings", solo: true, pro: true, agency: true },
  { label: "SMS follow-up after calls", solo: true, pro: true, agency: true },
  { label: "Automated calendar booking", solo: false, pro: true, agency: true },
  { label: "Custom knowledge base", solo: false, pro: true, agency: true },
  { label: "Premium voice library", solo: false, pro: true, agency: true },
  { label: "FREE marketing website", solo: false, pro: true, agency: true },
  { label: "Priority support", solo: false, pro: true, agency: true },
  { label: "CRM auto-logging", solo: false, pro: false, agency: true },
  { label: "White-glove setup", solo: false, pro: false, agency: true },
  { label: "Monthly strategy call", solo: false, pro: false, agency: true },
];
