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
  padding: "14px 16px",
  color: "white",
  fontSize: "16px", // 16px prevents iOS auto-zoom on focus
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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);

  const isValid = name.trim() && email.trim() && phone.trim() && businessName.trim();

  const handleContinue = async () => {
    if (!isValid || saving) return;
    setSaving(true);

    // Save lead immediately — captures info even if Stripe is abandoned
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, brokerage: businessName, plan }),
    }).catch(() => {}); // non-blocking — proceed regardless

    setReady(true);
    setSaving(false);
  };

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, name, email, phone, brokerage: businessName }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return "";
    }
    return data.clientSecret as string;
  }, [plan, name, email, businessName]);

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
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
            Start your free trial
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6 }}>
            Quick info so we can personalize your AI — you&apos;ll configure it fully right after checkout. Your info is saved immediately, even if you don&apos;t complete payment.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>Your Full Name *</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Sarah Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="sarah@kw.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>
              Your login credentials and call summaries will be sent here.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>Your Phone Number *</label>
            <input
              style={inputStyle}
              type="tel"
              inputMode="tel"
              placeholder="(555) 867-5309"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>
              This is the number your clients will forward calls from. We&apos;ll also use it to reach you if we have any questions about your setup.
            </p>
          </div>

          {/* Business Name */}
          <div>
            <label style={labelStyle}>Business Name *</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Your business or practice name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          {["🔒 256-bit SSL", "7-day free trial", "Cancel anytime"].map((item) => (
            <span key={item} style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: "4px" }}>
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!isValid || saving}
          className="btn-glow"
          style={{
            width: "100%",
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            padding: "16px 24px",
            borderRadius: "12px",
            border: "none",
            cursor: (!isValid || saving) ? "not-allowed" : "pointer",
            opacity: (!isValid || saving) ? 0.5 : 1,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {saving ? "Saving..." : "Continue to Payment →"}
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
