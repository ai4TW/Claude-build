"use client";

import Link from "next/link";
import { useState } from "react";

export default function DemoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px", width: "auto" }} />
          </Link>
          <Link href="/login" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Log in</Link>
        </div>
      </nav>

      <div style={{ paddingTop: "96px", paddingBottom: "96px", padding: "96px 1rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Live Demo</p>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.1 }}>
              Book a Free <span className="gradient-text">15-Min Demo</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "18px", lineHeight: 1.6 }}>
              Watch your AI receptionist answer a live call in your name. No commitment. No credit card.
            </p>
          </div>

          <div className="glass-card" style={{ borderRadius: "20px", padding: "32px", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px", marginBottom: "20px" }}>What happens on the demo call:</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "We configure a live AI receptionist with your name and brokerage",
                "We call your number and you hear it answer exactly as your clients would",
                "You see how lead qualification and SMS follow-up works in real time",
                "We set up your account on the spot — you leave the call fully live",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <DemoForm />
          </div>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>
            Prefer to start now?{" "}
            <Link href="/#pricing" style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
              Start your free trial →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

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

function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", brokerage: "", email: "", phone: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("mailto:hello@allthecalls.com", { method: "GET" }).catch(() => {});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>Request received!</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>We&apos;ll reach out within 1 business hour to schedule your demo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Your Name</label>
          <input style={inputStyle} type="text" required placeholder="Sarah Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Brokerage</label>
          <input style={inputStyle} type="text" placeholder="Compass, KW, RE/MAX..." value={form.brokerage} onChange={(e) => setForm({ ...form, brokerage: e.target.value })} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Email Address</label>
        <input style={inputStyle} type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label style={labelStyle}>Phone Number</label>
        <input style={inputStyle} type="tel" placeholder="(512) 555-0100" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <button type="submit" className="btn-glow" style={{ width: "100%", color: "white", fontWeight: 700, fontSize: "16px", padding: "14px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
        Request My Demo →
      </button>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
        We&apos;ll reach out within 1 business hour to schedule.
      </p>
    </form>
  );
}
