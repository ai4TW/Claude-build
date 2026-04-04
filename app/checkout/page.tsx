import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, PlanId } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description: "Start your 14-day free trial of All The Calls. No credit card required upfront.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ plan?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const validPlan = plan && plan in PLANS ? (plan as PlanId) : null;

  if (!validPlan) {
    return (
      <div style={{ minHeight: "100vh", background: "#08090f", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "12px" }}>Invalid Plan</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>Please select a plan from our pricing page.</p>
          <Link href="/#pricing" className="btn-glow" style={{ color: "white", fontWeight: 700, padding: "12px 24px", borderRadius: "12px", textDecoration: "none", fontSize: "15px" }}>
            View Plans →
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS[validPlan];

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", padding: "16px 1rem" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: "bold" }}>A</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px" }}>AllTheCalls<span style={{ color: "#a78bfa" }}>.ai</span></span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>{selectedPlan.name}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{selectedPlan.displayPrice}</span>
            <span style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.35)", color: "#c4b5fd", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px" }}>
              14-day free trial
            </span>
          </div>
        </div>
      </div>

      {/* Plan summary + checkout */}
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "40px 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, color: "white", marginBottom: "8px" }}>
            Start Your <span className="gradient-text">Free Trial</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
            14 days free — no charge until your trial ends. Cancel anytime.
          </p>
        </div>

        <div className="glass-card" style={{ borderRadius: "20px", overflow: "hidden" }}>
          <CheckoutForm plan={validPlan} />
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "16px" }}>
          Secured by Stripe · 256-bit SSL · Cancel anytime from your dashboard
        </p>
      </div>
    </div>
  );
}
