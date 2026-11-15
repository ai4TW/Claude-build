"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      window.location.href = data.url as string;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "64px 24px" }}>
        <p style={{ color: "#f87171", fontWeight: 600, marginBottom: "16px" }}>{error}</p>
        <a href="/pricing" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "14px" }}>&larr; Back to pricing</a>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <button
        onClick={startCheckout}
        disabled={loading}
        className="btn-glow"
        style={{ fontWeight: 700, padding: "16px 32px", borderRadius: "12px", fontSize: "16px", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Redirecting to secure checkout…" : "Continue to secure checkout →"}
      </button>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12.5px", marginTop: "16px" }}>
        You&apos;ll complete payment on Stripe&apos;s secure page, then come straight back here to tell us about your business.
      </p>
    </div>
  );
}
