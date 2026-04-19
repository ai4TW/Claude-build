import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PricingGate from "@/components/PricingGate";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

// One supported industry slug — real estate. Covers agents, brokers, investors,
// lenders, title, property managers. Non-RE businesses land on the homepage.
const INDUSTRY_DATA = {
  "real-estate": {
    title: "Real Estate Professionals",
    keyword: "Real Estate",
    emoji: "\u{1F3E0}",
    headline: "Never miss another lead while you're out on a showing.",
    description:
      "Your AI answers every call in your name — 24/7 — qualifies the caller, books the appointment, and texts you the details. Built for agents, brokers, investors, lenders, title, and property managers. Live in 24-48 hours.",
    bullets: [
      "Answers every inbound call in your name — 24/7",
      "Qualifies buyer vs seller, loan type, property condition, timeline",
      "Books appointments on your Google / Outlook calendar, no password sharing",
      "Calls every new CRM lead back in under 30 seconds",
      "SMS follow-up and full transcript sent the moment each call ends",
      "Works with Podio, REISift, GoHighLevel, HubSpot, Close, and any CRM via webhook",
    ],
    metaTitle: "AI Receptionist for Real Estate Pros | AllTheCalls",
    metaDesc:
      "Never miss a real estate lead again. AllTheCalls answers every inbound in your name 24/7, qualifies the caller, books the appointment, and texts you the summary. Built for agents, brokers, investors, lenders, and title.",
  },
} as const;

type IndustrySlug = keyof typeof INDUSTRY_DATA;

export async function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug as IndustrySlug];
  if (!data) {
    return {
      title: "Not Found | AllTheCalls",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `https://allthecalls.ai/industry/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug as IndustrySlug];
  if (!data) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href={DEMO_PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#86efac", fontWeight: 600, textDecoration: "none", padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(74,222,128,0.3)", background: "rgba(34,197,94,0.08)" }}>{"\u{1F4DE}"} {DEMO_PHONE}</a>
            <Link href="/pricing" className="btn-glow" style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none" }}>See Pricing</Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "64px" }}>
        {/* HERO */}
        <section style={{ padding: "100px 1.5rem 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "400px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.07, filter: "blur(100px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "28px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ marginRight: "8px" }}>{data.emoji}</span>
              Built for {data.title}
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "white", marginBottom: "20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              {data.headline}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "40px", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 40px" }}>
              {data.description}
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href={DEMO_PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", fontWeight: 800, fontSize: "17px", padding: "18px 30px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 10px 30px rgba(16,185,129,0.35)" }}>
                <span style={{ fontSize: "20px" }}>{"\u{1F4DE}"}</span>
                Call Our AI &mdash; {DEMO_PHONE}
              </a>
              <Link href="/pricing" className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "18px 30px", borderRadius: "14px", textDecoration: "none" }}>
                See Pricing &rarr;
              </Link>
            </div>

            <div style={{ display: "inline-flex", flexDirection: "column", gap: "12px", textAlign: "left", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px 32px" }}>
              {data.bullets.map((bullet) => (
                <div key={bullet} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 700, flexShrink: 0 }}>{"\u2713"}</span>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: "80px 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "white" }}>
                We build it. You start closing more.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {[
                { icon: "\u26A1", step: "01", title: "We Build Your AI", desc: "We configure your AI receptionist with your business name and the exact qualification questions you want asked — then connect it to your CRM and calendar." },
                { icon: "\u{1F4DE}", step: "02", title: "Forward + Connect", desc: "Forward your existing business line to your new AI number. Connect your CRM so every new lead also gets a <30-second outbound callback." },
                { icon: "\u{1F3C6}", step: "03", title: "Appointments Hit Your Calendar", desc: "Qualified callers get booked straight onto your Google or Outlook calendar. You walk into every meeting already knowing what they want." },
              ].map((item) => (
                <div key={item.step} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px", position: "relative" }}>
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 700, opacity: 0.06, color: "white", marginBottom: "4px", lineHeight: 1 }}>{item.step}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 700, color: "white", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — gated behind lead form */}
        <PricingGate />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 1.5rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "20px" }}>
          <img src="/logo.svg" alt="AllTheCalls" style={{ height: "32px", width: "auto" }} />
        </Link>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>&copy; 2026 AllTheCalls. Built for real estate investors.</p>
      </footer>
    </div>
  );
}
