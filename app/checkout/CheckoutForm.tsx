"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "white",
  fontSize: "14px",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.6)",
  marginBottom: "6px",
};

export default function CheckoutForm({ plan }: { plan: string }) {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [ready, setReady] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, name, brokerage }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return "";
    }
    return data.clientSecret as string;
  }, [plan, name, brokerage]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "64px 24px" }}>
        <p style={{ color: "#f87171", fontWeight: 600, marginBottom: "16px" }}>{error}</p>
        <a href="/#pricing" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "14px" }}>← Back to pricing</a>
      </div>
    );
  }

  if (!ready) {
    return (
      <div style={{ padding: "32px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px", marginBottom: "6px" }}>
          Tell us about yourself
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px" }}>
          We&apos;ll use this to set up your AI receptionist right away.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={labelStyle}>Your Full Name *</label>
            <input
              style={inputStyle}
              type="text"
              required
              placeholder="Sarah Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Brokerage *</label>
            <input
              style={inputStyle}
              type="text"
              required
              placeholder="Compass, Keller Williams, RE/MAX..."
              value={brokerage}
              onChange={(e) => setBrokerage(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => { if (name && brokerage) setReady(true); }}
          disabled={!name || !brokerage}
          className="btn-glow"
          style={{ width: "100%", color: "white", fontWeight: 700, fontSize: "15px", padding: "14px 24px", borderRadius: "12px", border: "none", cursor: (!name || !brokerage) ? "not-allowed" : "pointer", opacity: (!name || !brokerage) ? 0.5 : 1, fontFamily: "'DM Sans', sans-serif" }}
        >
          Continue to Payment →
        </button>
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
