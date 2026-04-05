"use client";

/**
 * PricingSection — Dark Premium Design
 * Matches Midnight Intelligence theme: #08090f + violet/cyan gradients
 * Mobile: horizontal snap-scroll carousel (Pro shown first)
 * Desktop: 3-column grid
 *
 * Pricing rationale:
 *   Solo  $199 — 300 calls/mo, 1 persona → entry point, still 50%+ below human answering services
 *   Pro   $349 — unlimited calls, knowledge base, all voices → workhorse tier, most revenue
 *   Agency $599 — 3 personas × unlimited → real estate teams, law firms, multi-provider practices
 */

import { useRouter } from "next/navigation";

// Mobile order: Pro first so users see the recommended plan immediately
const plans = [
  {
    id: "pro",
    name: "Pro",
    price: "$349",
    period: "/mo",
    badge: null,
    desc: "One AI that handles everything, unlimited",
    popular: true,
  },
  {
    id: "starter",
    name: "Solo",
    price: "$199",
    period: "/mo",
    badge: null,
    desc: "One AI receptionist for your business",
    popular: false,
  },
  {
    id: "team",
    name: "Agency",
    price: "$599",
    period: "/mo",
    badge: "BEST VALUE",
    desc: "Three AI receptionists — one per team member",
    popular: false,
  },
];

const planFeatures: Record<string, { text: string; highlight?: boolean }[]> = {
  starter: [
    { text: "1 AI receptionist in your name" },
    { text: "300 calls / month" },
    { text: "24/7 availability — never miss a call", highlight: true },
    { text: "Industry-specific lead qualification" },
    { text: "SMS follow-up after every call" },
    { text: "Full call transcripts & summaries" },
    { text: "5 AI voice options" },
    { text: "5-minute setup" },
    { text: "Cancel anytime" },
  ],
  pro: [
    { text: "1 AI receptionist in your name" },
    { text: "Unlimited calls — no overage fees", highlight: true },
    { text: "24/7 availability" },
    { text: "Advanced lead qualification scripts" },
    { text: "SMS follow-up after every call" },
    { text: "Full call transcripts & summaries" },
    { text: "Full premium voice library", highlight: true },
    { text: "Custom knowledge base (FAQs, services, pricing)", highlight: true },
    { text: "Priority support" },
    { text: "Cancel anytime" },
  ],
  team: [
    { text: "3 AI receptionists — unique name, voice & script each", highlight: true },
    { text: "Unlimited calls across all 3 lines", highlight: true },
    { text: "24/7 availability on every line" },
    { text: "Advanced lead qualification per persona" },
    { text: "SMS follow-up per line" },
    { text: "Full call transcripts & summaries" },
    { text: "Full premium voice library" },
    { text: "Custom knowledge base per persona" },
    { text: "Dedicated onboarding call" },
    { text: "Quarterly script review" },
    { text: "Priority support" },
    { text: "Cancel anytime" },
  ],
};

// Internal plan ID → display name mapping
const DISPLAY_NAMES: Record<string, string> = {
  starter: "Solo",
  pro: "Pro",
  team: "Agency",
};

function PlanCard({
  plan,
  compact = false,
}: {
  plan: (typeof plans)[number];
  compact?: boolean;
}) {
  const router = useRouter();
  const features = planFeatures[plan.id];
  const pad = compact ? "28px 24px" : "32px";
  const priceSize = compact ? "2.75rem" : "3.5rem";

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
          : plan.badge
          ? "rgba(6,182,212,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          plan.popular
            ? "rgba(124,58,237,0.5)"
            : plan.badge
            ? "rgba(6,182,212,0.3)"
            : "rgba(255,255,255,0.08)"
        }`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: plan.popular
          ? "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(6,182,212,0.05)"
          : "none",
      }}
    >
      {/* Badge */}
      {(plan.popular || plan.badge) && (
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
            padding: "6px 16px",
            borderRadius: "999px",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          {plan.popular ? "MOST POPULAR" : plan.badge}
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
        {DISPLAY_NAMES[plan.id]}
      </h3>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "20px", lineHeight: 1.4 }}>
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
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
          {plan.price}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>{plan.period}</span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", marginBottom: "24px" }}>
        14-day free trial · no credit card required
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "9px", flex: 1 }}>
        {features.map((f) => (
          <li
            key={f.text}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "13px",
              color: f.highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
              fontWeight: f.highlight ? 500 : 400,
            }}
          >
            <span
              style={{
                color: plan.popular ? "#a78bfa" : plan.badge ? "#22d3ee" : "#22d3ee",
                fontWeight: 700,
                fontSize: "14px",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              ✓
            </span>
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
            : plan.badge
            ? "rgba(6,182,212,0.12)"
            : "rgba(255,255,255,0.05)",
          boxShadow: plan.popular ? "0 0 30px rgba(124,58,237,0.4)" : "none",
          fontFamily: "'DM Sans', sans-serif",
          marginTop: "auto",
        }}
      >
        Start Free Trial →
      </button>
    </div>
  );
}

export default function PricingSection() {
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
            Less than one{" "}
            <span className="gradient-text">missed opportunity.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 2.5vw, 18px)", marginBottom: "8px" }}>
            A human answering service costs $400–$1,200/mo. Your AI works 24/7 for a fraction of that.
          </p>
          <p style={{ color: "#a78bfa", fontWeight: 600, fontSize: "15px" }}>
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>

        {/* ── Mobile: snap-scroll carousel ── */}
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
          {plans.map((plan) => (
            <div
              key={`mob-${plan.id}`}
              style={{
                flexShrink: 0,
                width: "calc(100vw - 2.5rem)",
                maxWidth: "360px",
                scrollSnapAlign: "center",
              }}
            >
              <PlanCard plan={plan} compact />
            </div>
          ))}
          <div style={{ flexShrink: 0, width: "1px" }} />
        </div>

        <p className="md:hidden" style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "12px" }}>
          ← Swipe to compare plans →
        </p>

        {/* ── Desktop: 3-column grid (Starter | Pro | Agency order) ── */}
        <div
          className="hidden md:grid md:grid-cols-3 gap-6 mb-12"
          style={{ padding: "24px 1rem 0" }}
        >
          {/* Desktop order: Solo | Pro | Agency */}
          {[plans[1], plans[0], plans[2]].map((plan) => (
            <PlanCard key={`desk-${plan.id}`} plan={plan} />
          ))}
        </div>

        {/* Agency upsell nudge */}
        <p
          className="hidden md:block"
          style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}
        >
          Need more than 3 lines?{" "}
          <a href="mailto:hello@allthecalls.ai" style={{ color: "#a78bfa", textDecoration: "none" }}>
            Contact us
          </a>{" "}
          — we build custom setups for larger teams.
        </p>

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
            💡 One closed deal, one retained client, or one booked patient covers{" "}
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>months of All The Calls.</span>{" "}
            The question isn&apos;t whether you can afford it —{" "}
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>it&apos;s whether you can afford to miss another call.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
