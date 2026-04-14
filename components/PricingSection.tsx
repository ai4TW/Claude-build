"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Solo",
    price: 397,
    desc: "Never miss another call. Ever.",
    popular: false,
    badge: null,
    cta: "Get Started",
    features: [
      { text: "1 AI receptionist in your name", highlight: false },
      { text: "300 calls / month", highlight: false },
      { text: "24/7 availability — every call answered", highlight: true },
      { text: "Industry-specific lead qualification", highlight: false },
      { text: "SMS follow-up after every call", highlight: false },
      { text: "Full call transcripts & AI summaries", highlight: false },
      { text: "5 AI voice options", highlight: false },
      { text: "Live client app — call history, recordings & transcripts on your phone", highlight: true },
      { text: "Done-for-you setup by our team", highlight: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 497,
    desc: "Unlimited calls. Booked appointments. Your own website.",
    popular: true,
    badge: "MOST POPULAR",
    cta: "Get Started",
    features: [
      { text: "1 AI receptionist in your name", highlight: false },
      { text: "Unlimited calls — no cap, ever", highlight: true },
      { text: "24/7 availability", highlight: false },
      { text: "Advanced industry-specific qualification", highlight: false },
      { text: "Automated SMS follow-up after every call", highlight: true },
      { text: "Automated calendar booking — AI books appointments directly into Calendly or Acuity", highlight: true },
      { text: "Full call transcripts & AI summaries", highlight: false },
      { text: "Full premium voice library", highlight: false },
      { text: "Custom knowledge base — your services, pricing & FAQs", highlight: true },
      { text: "Live client app — call history, recordings & transcripts on your phone", highlight: true },
      { text: "FREE high-converting marketing website — we design & build it for you", highlight: true },
      { text: "Priority support", highlight: false },
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 1497,
    desc: "The full operation. Zero leads lost.",
    popular: false,
    badge: "FULL SYSTEM",
    cta: "Get Started",
    features: [
      { text: "5 AI receptionists — unique names, voices & scripts", highlight: true },
      { text: "Unlimited calls across all 5 lines", highlight: true },
      { text: "24/7 availability on every line", highlight: false },
      { text: "Automated calendar booking on every line — directly into Calendly or Acuity", highlight: true },
      { text: "CRM integration — every call auto-logged with full notes", highlight: true },
      { text: "Custom knowledge base built by our team", highlight: true },
      { text: "Live client app — call history, recordings & transcripts on your phone", highlight: true },
      { text: "FREE high-converting marketing website — designed & built by us", highlight: true },
      { text: "White-glove setup — our team configures everything live", highlight: true },
      { text: "Monthly 30-min strategy & optimization call", highlight: true },
      { text: "Dedicated priority support channel", highlight: false },
    ],
  },
];

const comparisonRows = [
  { label: "AI receptionists",             starter: "1",           pro: "1",           agency: "5" },
  { label: "Monthly calls",                starter: "300",         pro: "Unlimited",   agency: "Unlimited" },
  { label: "24/7 availability",            starter: true,          pro: true,          agency: true },
  { label: "SMS follow-up after calls",    starter: true,          pro: true,          agency: true },
  { label: "Live client app (iOS/Android)", starter: true,         pro: true,          agency: true },
  { label: "Call transcripts & recordings", starter: true,         pro: true,          agency: true },
  { label: "Automated calendar booking",   starter: false,         pro: true,          agency: true },
  { label: "Custom knowledge base",        starter: false,         pro: true,          agency: true },
  { label: "Premium voice library",        starter: false,         pro: true,          agency: true },
  { label: "FREE marketing website",       starter: false,         pro: true,          agency: true },
  { label: "Priority support",             starter: false,         pro: true,          agency: true },
  { label: "CRM auto-logging",             starter: false,         pro: false,         agency: true },
  { label: "White-glove setup",            starter: false,         pro: false,         agency: true },
  { label: "Monthly strategy call",        starter: false,         pro: false,         agency: true },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.05)" />
      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlanCard({
  plan,
  compact = false,
}: {
  plan: (typeof plans)[number];
  compact?: boolean;
}) {
  const router = useRouter();
  const pad = compact ? "28px 24px" : "36px 32px";
  const priceSize = compact ? "2.5rem" : "3.25rem";
  const isAgency = plan.id === "agency";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: pad,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: plan.popular
          ? "rgba(124,58,237,0.12)"
          : isAgency
          ? "rgba(6,182,212,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          plan.popular
            ? "rgba(124,58,237,0.6)"
            : isAgency
            ? "rgba(6,182,212,0.3)"
            : "rgba(255,255,255,0.08)"
        }`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: plan.popular
          ? "0 0 60px rgba(124,58,237,0.18), 0 0 120px rgba(6,182,212,0.05)"
          : isAgency
          ? "0 0 40px rgba(6,182,212,0.08)"
          : "none",
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: plan.popular
              ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
              : "linear-gradient(135deg, #06b6d4, #0891b2)",
            color: "white",
            fontSize: "11px",
            fontWeight: 700,
            padding: "6px 18px",
            borderRadius: "999px",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Name + desc */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "white",
          marginBottom: "4px",
        }}
      >
        {plan.name}
      </h3>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "24px", lineHeight: 1.4 }}>
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: priceSize,
            fontWeight: 700,
            color: plan.popular ? "transparent" : "white",
            background: plan.popular ? "linear-gradient(135deg, #a78bfa, #22d3ee)" : "none",
            WebkitBackgroundClip: plan.popular ? "text" : "unset",
            backgroundClip: plan.popular ? "text" : "unset",
            lineHeight: 1,
          }}
        >
          ${plan.price.toLocaleString()}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>/mo</span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", marginBottom: "28px" }}>
        14-day money-back guarantee
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {plan.features.map((f) => (
          <li
            key={f.text}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "13px",
              color: f.highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
              fontWeight: f.highlight ? 500 : 400,
            }}
          >
            <CheckIcon color={plan.popular ? "#a78bfa" : "#22d3ee"} />
            {f.text}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => router.push(`/checkout?plan=${plan.id}`)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "15px",
          color: "white",
          cursor: "pointer",
          border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
          background: plan.popular
            ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
            : isAgency
            ? "rgba(6,182,212,0.12)"
            : "rgba(255,255,255,0.05)",
          boxShadow: plan.popular ? "0 0 30px rgba(124,58,237,0.4)" : "none",
          fontFamily: "'DM Sans', sans-serif",
          marginTop: "auto",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          if (plan.popular) e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          if (plan.popular) e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
        }}
      >
        {plan.cta} →
      </button>
    </div>
  );
}

export default function PricingSection() {
  const [tab, setTab] = useState<"starter" | "pro" | "agency">("pro");

  return (
    <section
      id="pricing"
      style={{
        padding: "7rem 0",
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px", padding: "0 1rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(167,139,250,0.3)",
            background: "rgba(124,58,237,0.08)",
            marginBottom: "24px",
          }}>
            <span style={{ fontSize: "14px" }}>⭐</span>
            <span style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>
              Trusted by 1,200+ businesses
            </span>
          </div>

          <p style={{
            color: "#a78bfa",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "12px",
          }}>
            Pricing
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "16px",
            }}
          >
            Less than one{" "}
            <span className="gradient-text">missed opportunity.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 2.5vw, 18px)", marginBottom: "8px" }}>
            A human answering service costs $400–$1,200/mo with sick days and turnover.
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>
            Your AI works 24/7. No scheduling. No mistakes. One missed client covers months of service.
          </p>
        </div>

        {/* Mobile: tab switcher + single card */}
        <div className="flex md:hidden flex-col items-center" style={{ padding: "0 1rem", marginBottom: "32px" }}>
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "999px",
            padding: "4px",
            marginBottom: "24px",
            gap: "4px",
          }}>
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setTab(p.id as typeof tab)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  background: tab === p.id
                    ? p.popular ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.12)"
                    : "transparent",
                  color: tab === p.id ? "white" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: "400px", paddingTop: "16px" }}>
            <PlanCard plan={plans.find((p) => p.id === tab)!} compact />
          </div>
        </div>

        {/* Desktop: 3-column */}
        <div
          className="hidden md:grid md:grid-cols-3 gap-6 mb-8"
          style={{ padding: "24px 1rem 0" }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Custom nudge */}
        <p
          className="hidden md:block"
          style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "48px", marginTop: "32px" }}
        >
          Need more than 5 lines?{" "}
          <a href="mailto:hello@allthecalls.ai" style={{ color: "#a78bfa", textDecoration: "none" }}>
            Contact us
          </a>{" "}
          — custom setups available for larger teams.
        </p>

        {/* Guarantee bar */}
        <div
          className="fade-in"
          style={{
            margin: "0 1rem 48px",
            padding: "24px 32px",
            borderRadius: "16px",
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
            }}>
              ✓
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}>
                14-Day Money-Back Guarantee
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                Love it or your money back. Try it risk-free for 14 days — if it&apos;s not for you, we refund every penny.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison table — desktop only */}
        <div className="hidden md:block fade-in" style={{ margin: "0 1rem 48px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <th style={{ padding: "20px 24px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, width: "40%" }}>
                  Feature
                </th>
                <th style={{ padding: "20px 16px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 700 }}>
                  Solo<br /><span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>$397/mo</span>
                </th>
                <th style={{ padding: "20px 16px", textAlign: "center", fontSize: "13px", fontWeight: 700, background: "rgba(124,58,237,0.08)" }}>
                  <span style={{ color: "transparent", background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Pro ⭐</span>
                  <br /><span style={{ color: "rgba(167,139,250,0.6)", fontWeight: 400 }}>$497/mo</span>
                </th>
                <th style={{ padding: "20px 16px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 700 }}>
                  Agency<br /><span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>$1,497/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: i < comparisonRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                  }}
                >
                  <td style={{ padding: "16px 24px", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{row.label}</td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    {typeof row.starter === "boolean" ? (
                      row.starter ? <CheckIcon color="#22d3ee" /> : <XIcon />
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>{row.starter}</span>
                    )}
                  </td>
                  <td style={{ padding: "16px", textAlign: "center", background: "rgba(124,58,237,0.05)" }}>
                    {typeof row.pro === "boolean" ? (
                      row.pro ? <CheckIcon color="#a78bfa" /> : <XIcon />
                    ) : (
                      <span style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 700 }}>{row.pro}</span>
                    )}
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    {typeof row.agency === "boolean" ? (
                      row.agency ? <CheckIcon color="#22d3ee" /> : <XIcon />
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>{row.agency}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BONUSES — Sign up before your sales call */}
        <div
          className="fade-in"
          style={{
            margin: "0 1rem 48px",
            padding: "40px 32px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.06))",
            border: "1px solid rgba(124,58,237,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent)", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", marginBottom: "32px", position: "relative" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(250,204,21,0.3)",
              background: "rgba(250,204,21,0.08)",
              marginBottom: "16px",
            }}>
              <span style={{ fontSize: "14px" }}>🎁</span>
              <span style={{ color: "#fde047", fontSize: "13px", fontWeight: 600 }}>
                FREE BONUSES — Included With Every Plan
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
            }}>
              Sign up now and get these <span style={{ color: "transparent", background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>free</span> — no sales call needed
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
              Everything you need to maximize every call your AI handles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ position: "relative" }}>
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
                title: "Industry Call Scripts",
                desc: "Pre-built AI scripts for real estate, HVAC, plumbing, electrical, roofing, and more. Plug-and-play — tested on thousands of real calls.",
                value: "$297 value",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad2" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
                title: "Missed Call ROI Calculator",
                desc: "Custom spreadsheet that shows exactly how much revenue you lose per missed call based on your industry, close rate, and average deal size.",
                value: "$97 value",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad3" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
                title: "SMS Follow-Up Templates",
                desc: "12 proven follow-up text message templates that turn missed calls into booked appointments. Copy, paste, close.",
                value: "$197 value",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad4" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
                title: "AI Receptionist Playbook",
                desc: "Step-by-step guide to getting the most out of your AI: call forwarding setup, script optimization, lead handling best practices.",
                value: "$197 value",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad5" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                title: "Weekly Call Analytics Guide",
                desc: "Learn to read your call data like a pro: which calls convert, peak hours, caller intent patterns, and how to optimize your script over time.",
                value: "$147 value",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#bonus-grad6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="bonus-grad6" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "30-Day Quick Start Plan",
                desc: "Day-by-day action plan for your first month: when to test, what to tweak, how to train your team, and when to scale up.",
                value: "$97 value",
              },
            ].map((bonus) => (
              <div
                key={bonus.title}
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(124,58,237,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {bonus.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "white", fontSize: "14px", marginBottom: "2px" }}>{bonus.title}</h4>
                    <span style={{ fontSize: "11px", color: "#fde047", fontWeight: 600 }}>{bonus.value}</span>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", lineHeight: 1.6 }}>{bonus.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "28px", position: "relative" }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
              Total bonus value: <span style={{ color: "#fde047", fontWeight: 700, fontSize: "18px" }}>$1,032</span>
              <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: "8px" }}>— yours free with any plan</span>
            </p>
          </div>
        </div>

        {/* ROI note */}
        <div
          className="fade-in"
          style={{
            margin: "0 1rem",
            textAlign: "center",
            padding: "20px 24px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6 }}>
            One closed deal, one retained client, or one booked appointment covers{" "}
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>months of AllTheCalls.</span>{" "}
            The question isn&apos;t whether you can afford it —{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>it&apos;s whether you can afford to miss another call.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
