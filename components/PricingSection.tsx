"use client";

/**
 * PricingSection — Dark Premium Design
 * Matches Midnight Intelligence theme: #08090f + violet/cyan gradients
 * Mobile: horizontal snap-scroll carousel (Pro shown first)
 * Desktop: 3-column grid
 */

import { useRouter } from "next/navigation";

// Pro first on mobile so users see the recommended plan without scrolling
const plans = [
  {
    id: "pro",
    name: "Pro",
    price: "$249",
    period: "/mo",
    desc: "Growing businesses with high call volume",
    popular: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$149",
    period: "/mo",
    desc: "Solo operators & small businesses",
    popular: false,
  },
  {
    id: "team",
    name: "Team",
    price: "$399",
    period: "/mo",
    desc: "Teams of 2–5 people",
    popular: false,
  },
];

const planFeatures: Record<string, string[]> = {
  starter: [
    "Up to 200 calls/month",
    "24/7 AI receptionist in your name",
    "Industry-specific lead qualification",
    "SMS follow-up after every call",
    "Full call transcripts & summaries",
    "Custom greeting & scripts",
    "5-minute setup",
    "Cancel anytime",
  ],
  pro: [
    "Unlimited calls",
    "24/7 AI receptionist in your name",
    "Advanced caller qualification",
    "SMS follow-up after every call",
    "Full call transcripts & summaries",
    "Custom call scripts",
    "Priority support",
    "Cancel anytime",
  ],
  team: [
    "Up to 5 team members",
    "Unlimited calls across team",
    "Individual AI personas per member",
    "Team dashboard & analytics",
    "SMS follow-up per team member",
    "Custom scripts per member",
    "Dedicated onboarding call",
    "Priority support",
    "Cancel anytime",
  ],
};

export default function PricingSection() {
  const router = useRouter();

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
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px", padding: "0 1rem" }}>
          <p
            style={{
              color: "#a78bfa",
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
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
            Simple pricing.{" "}
            <span className="gradient-text">Serious ROI.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 2.5vw, 18px)", marginBottom: "8px" }}>
            One missed call could cost more than a year of All The Calls.
          </p>
          <p style={{ color: "#a78bfa", fontWeight: 600, fontSize: "15px" }}>
            14-day free trial · No credit card required
          </p>
        </div>

        {/*
          Mobile: horizontal snap-scroll carousel — one card visible at a time, swipe to compare.
          Desktop (md+): standard 3-column grid.
        */}

        {/* Mobile carousel */}
        <div
          className="md:hidden"
          style={{
            display: "flex",
            overflowX: "auto",
            overflowY: "visible",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            gap: "16px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingBottom: "8px",
            paddingTop: "24px",
            scrollbarWidth: "none",
          }}
        >
          <style>{`.pricing-scroll::-webkit-scrollbar{display:none}`}</style>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                flexShrink: 0,
                width: "calc(100vw - 2.5rem)",
                maxWidth: "360px",
                scrollSnapAlign: "center",
                position: "relative",
                borderRadius: "20px",
                padding: "28px 24px",
                background: plan.popular ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.popular ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: plan.popular
                  ? "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(6,182,212,0.05)"
                  : "none",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: "999px",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  MOST POPULAR
                </div>
              )}

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
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "20px" }}>
                {plan.desc}
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: plan.popular ? "transparent" : "white",
                    background: plan.popular ? "linear-gradient(135deg, #a78bfa, #22d3ee)" : "none",
                    WebkitBackgroundClip: plan.popular ? "text" : "unset",
                    backgroundClip: plan.popular ? "text" : "unset",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>{plan.period}</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "9px" }}>
                {planFeatures[plan.id].map((feature) => (
                  <li
                    key={feature}
                    style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}
                  >
                    <span
                      style={{
                        color: plan.popular ? "#a78bfa" : "#22d3ee",
                        fontWeight: 700,
                        fontSize: "14px",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push(`/checkout?plan=${plan.id}`)}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "white",
                  cursor: "pointer",
                  border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  background: plan.popular
                    ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: plan.popular ? "0 0 30px rgba(124,58,237,0.4)" : "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Start Free Trial
              </button>
            </div>
          ))}
          {/* Trailing spacer so last card scrolls fully into view */}
          <div style={{ flexShrink: 0, width: "1px" }} />
        </div>

        {/* Swipe hint — mobile only */}
        <p className="md:hidden" style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "12px", marginBottom: "0" }}>
          ← Swipe to compare plans →
        </p>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12 px-4" style={{ paddingTop: "8px" }}>
          {/* Desktop order: Starter, Pro, Team */}
          {[plans[1], plans[0], plans[2]].map((plan) => (
            <div
              key={`desk-${plan.id}`}
              style={{
                position: "relative",
                borderRadius: "20px",
                padding: "32px",
                background: plan.popular ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.popular ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: plan.popular
                  ? "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(6,182,212,0.05)"
                  : "none",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: "999px",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  MOST POPULAR
                </div>
              )}

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
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "24px" }}>
                {plan.desc}
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    color: plan.popular ? "transparent" : "white",
                    background: plan.popular ? "linear-gradient(135deg, #a78bfa, #22d3ee)" : "none",
                    WebkitBackgroundClip: plan.popular ? "text" : "unset",
                    backgroundClip: plan.popular ? "text" : "unset",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>{plan.period}</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {planFeatures[plan.id].map((feature) => (
                  <li
                    key={feature}
                    style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}
                  >
                    <span
                      style={{
                        color: plan.popular ? "#a78bfa" : "#22d3ee",
                        fontWeight: 700,
                        fontSize: "14px",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push(`/checkout?plan=${plan.id}`)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "white",
                  cursor: "pointer",
                  border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  background: plan.popular
                    ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: plan.popular ? "0 0 30px rgba(124,58,237,0.4)" : "none",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        {/* Value note */}
        <div
          className="fade-in"
          style={{
            margin: "24px 1rem 0",
            textAlign: "center",
            padding: "20px 24px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
            💡 The average business loses{" "}
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>$75,000+/year</span> from missed calls and slow follow-up. Your AI pays for itself{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>the first week.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
