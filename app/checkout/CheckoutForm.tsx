"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutForm({ plan }: { plan: string }) {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return "";
    }
    return data.clientSecret as string;
  }, [plan]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "64px 24px" }}>
        <p style={{ color: "#f87171", fontWeight: 600, marginBottom: "16px" }}>{error}</p>
        <a href="/pricing" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "14px" }}>&larr; Back to pricing</a>
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
