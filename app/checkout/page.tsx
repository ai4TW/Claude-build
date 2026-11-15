import type { Metadata } from "next";
import Link from "next/link";
import { PRICE } from "@/lib/site";
import CheckoutForm from "./CheckoutForm";
import TrackInitiateCheckout from "@/components/TrackInitiateCheckout";

export const metadata: Metadata = {
  title: "Complete Your Order",
  description: "Get started with AllTheCalls. 14-day money-back guarantee.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090f", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", padding: "16px 1rem" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>AllTheCalls — Growth</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{PRICE.setup} setup + {PRICE.monthly}</span>
            <span style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#86efac", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px" }}>
              14-day money-back guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Plan summary + checkout */}
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "40px 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, color: "white", marginBottom: "8px" }}>
            Complete Your <span className="gradient-text">Order</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
            14-day money-back guarantee — love it or your money back.
          </p>
        </div>

        <div className="glass-card" style={{ borderRadius: "20px", overflow: "hidden" }}>
          <CheckoutForm />
          <TrackInitiateCheckout plan="growth" />
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "12.5px", marginTop: "16px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
          {PRICE.setup} setup + {PRICE.monthly} — charged together today, no separate invoice, no free trial.
        </p>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "8px" }}>
          Secured by Stripe · 256-bit SSL · 14-day money-back guarantee
        </p>
      </div>
    </div>
  );
}
