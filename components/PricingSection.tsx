"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 349,
    desc: "One AI receptionist. Never miss a call.",
    popular: false,
    badge: null,
    cta: "Start Free Trial",
    features: [
      { text: "1 AI receptionist in your name", highlight: false },
      { text: "300 calls / month", highlight: false },
      { text: "24/7 availability — every call answered", highlight: true },
      { text: "Industry-specific lead qualification", highlight: false },
      { text: "SMS follow-up after every call", highlight: false },
      { text: "Full call transcripts & summaries", highlight: false },
      { text: "5 AI voice options", highlight: false },
      { text: "5-minute setup", highlight: false },
      { text: "14-day free trial · cancel anytime", highlight: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 497,
    desc: "The complete system. Built to convert.",
    popular: true,
    badge: "MOST POPULAR",
    cta: "Start Free Trial",
    features: [
      { text: "1 AI receptionist in your name", highlight: false },
      { text: "Unlimited calls — no cap, ever", highlight: true },
      { text: "24/7 availability", highlight: false },
      { text: "Advanced industry-specific qualification", highlight: false },
      { text: "Automated SMS follow-up after every call", highlight: true },
      { text: "3-touch follow-up sequence over 48 hours", highlight: true },
      { text: "Full call transcripts & AI summaries", highlight: false },
      { text: "Full premium voice library", highlight: false },
      { text: "Custom knowledge base — your services, pricing & FAQs", highlight: true },
      { text: "Weekly performance report every Monday", highlight: true },
      { text: "Priority support", highlight: false },
      { text: "14-day free trial · cancel anytime", highlight: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 1497,
    desc: "The full operation. Zero leads lost.",
    popular: false,
    badge: "FULL SYSTEM",
    cta: "Get Started",
    features: [
      { text: "5 AI receptionists — unique names, voices & scripts", highlight: true },
      { text: "Unlimited calls across all 5 lines", highlight: true },
      { text: "24/7 availability on every line", highlight: false },
      { text: "Automated 3-touch SMS follow-up per line", highlight: true },
      { text: "Calendar booking integration — AI books directly into Calendly or Acuity", highlight: true },
      { text: "CRM integration — every call auto-logged with full notes", highlight: true },
      { text: "Custom knowledge base built by our team", highlight: true },
      { text: "Weekly performance reports across all lines", highlight: false },
      { text: "White-glove setup — our team configures everything live", highlight: true },
      { text: "Monthly 30-min strategy & optimization call", highlight: true },
      { text: "Dedicated priority support channel", highlight: false },
      { text: "14-day free trial · cancel anytime", highlight: false },
    ],
  },
];

const comparisonRows = [
  { label: "AI receptionists",            starter: "1",           pro: "1",           elite: "5" },
  { label: "Monthly calls",               starter: "300",         pro: "Unlimited",   elite: "Unlimited" },
  { label: "24/7 availability",           starter: true,          pro: true,          elite: true },
  { label: "SMS follow-up after calls",   starter: true,          pro: true,          elite: true },
  { label: "3-touch follow-up sequence",  starter: false,         pro: true,          elite: true },
  { label: "Call transcripts",            starter: true,          pro: true,          elite: true },
  { label: "Custom knowledge base",       starter: false,         pro: true,          elite: true },
  { label: "Premium voice library",       starter: false,         pro: true,          elite: true },
  { label: "Weekly performance report",   starter: false,         pro: true,          elite: true },
  { label: "Calendar booking (Calendly)", starter: false,         pro: false,         elite: true },
  { label: "CRM auto-logging",            starter: false,         pro: false,         elite: true },
  { label: "White-glove setup",           starter: false,         pro: false,         elite: true },
  { label: "Monthly strategy call",       starter: false,         pro: false,         elite: true },
  { label: "Priority support",            starter: false,         pro: true,          elite: true },
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
  const isElite = plan.id === "elite";

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
          : isElite
          ? "rgba(6,182,212,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          plan.popular
            ? "rgba(124,58,237,0.6)"
            : isElite
            ? "rgba(6,182,212,0.3)"
            : "rgba(255,255,255,0.08)"
        }`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: plan.popular
          ? "0 0 60px rgba(124,58,237,0.18), 0 0 120px rgba(6,182,212,0.05)"
          : isElite
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
        14-day free trial · no credit card required
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
            : isElite
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
  const [tab, setTab] = useState<"starter" | "pro" | "elite">("pro");

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
                  fontSize: "13px",
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
          style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "48px" }}
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
                14-day free trial · No credit card required
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                Set up your AI, test it live, and only pay when you&apos;re confident it works for your business.
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
                  Starter<br /><span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>$349/mo</span>
                </th>
                <th style={{ padding: "20px 16px", textAlign: "center", fontSize: "13px", fontWeight: 700, background: "rgba(124,58,237,0.08)" }}>
                  <span style={{ color: "transparent", background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Pro ⭐</span>
                  <br /><span style={{ color: "rgba(167,139,250,0.6)", fontWeight: 400 }}>$497/mo</span>
                </th>
                <th style={{ padding: "20px 16px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 700 }}>
                  Elite<br /><span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>$1,497/mo</span>
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
                    {typeof row.elite === "boolean" ? (
                      row.elite ? <CheckIcon color="#22d3ee" /> : <XIcon />
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>{row.elite}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            💡 One closed deal, one retained client, or one booked appointment covers{" "}
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>months of AllTheCalls.</span>{" "}
            The question isn&apos;t whether you can afford it —{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>it&apos;s whether you can afford to miss another call.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
