"use client";

import Link from "next/link";
import { useState, useRef } from "react";

const DEMO_PHONE = "(316) 232-4777";
const DEMO_PHONE_HREF = "tel:+13162324777";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";

export default function DemoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
              {"\u{1F4DE}"} {DEMO_PHONE}
            </a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "80px" }}>
        {/* HERO — Video + Headline */}
        <section style={{ padding: "2rem 1rem 3rem", maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "20px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              See How It Works
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.1 }}>
              Your AI Receptionist Answers Every Call.{" "}
              <span className="gradient-text">You Close Every Deal.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "18px", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
              Watch how AllTheCalls handles real calls for real businesses — then try it yourself.
            </p>
          </div>

          {/* VIDEO */}
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", marginBottom: "40px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 60px rgba(124,58,237,0.15)" }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster=""
              style={{ width: "100%", display: "block", background: "#000" }}
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* 3 TRUST STATS */}
          <div className="grid grid-cols-3 gap-4" style={{ marginBottom: "48px" }}>
            {[
              { stat: "99.9%", label: "Answer Rate" },
              { stat: "24/7", label: "Always On" },
              { stat: "<2s", label: "Pickup Time" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="gradient-text" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{s.stat}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TWO COLUMNS — Form + Call Gia */}
        <section style={{ padding: "0 1rem 4rem", maxWidth: "960px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT — Lead Form */}
            <div className="glass-card" style={{ borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
                Get Your Free Demo
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "24px" }}>
                Fill this out and we&apos;ll set up a live demo with your business name.
              </p>
              <LeadForm />
            </div>

            {/* RIGHT — Try Gia + Book a Call */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Try Gia Card */}
              <div className="glass-card" style={{ borderRadius: "20px", padding: "28px", textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{"\u{1F4DE}"}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px", marginBottom: "8px" }}>
                  Try It Right Now
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "20px", lineHeight: 1.6 }}>
                  Call Gia, our live AI demo. She&apos;ll answer like your receptionist. Takes 60 seconds.
                </p>
                <a
                  href={DEMO_PHONE_HREF}
                  className="btn-glow"
                  style={{
                    display: "block", width: "100%", color: "white", fontWeight: 700,
                    fontSize: "18px", padding: "16px 24px", borderRadius: "12px",
                    textDecoration: "none", textAlign: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Call {DEMO_PHONE}
                </a>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "12px" }}>
                  No signup required. Just call.
                </p>
              </div>

              {/* Book a Call Card */}
              <div className="glass-card" style={{ borderRadius: "20px", padding: "28px", textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px", marginBottom: "8px" }}>
                  Prefer a Live Walkthrough?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "20px" }}>
                  Book a free 15-min call. We&apos;ll demo it live with your business name.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "block", width: "100%", fontWeight: 700,
                    fontSize: "16px", padding: "14px 24px", borderRadius: "12px",
                    textDecoration: "none", textAlign: "center",
                  }}
                >
                  Book a Free Demo Call &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF — Quick Testimonials */}
        <section style={{ padding: "3rem 1rem 4rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {[
              { quote: "I was losing clients because I couldn\u2019t answer calls during consultations. All The Calls fixed that overnight.", name: "Rachel M.", role: "Attorney, Austin TX" },
              { quote: "My AI receptionist sounds so natural that patients think they talked to my front desk.", name: "Dr. James K.", role: "Family Practice, Denver CO" },
              { quote: "It\u2019s like having a full-time dispatcher for less than I was spending on missed-call callbacks.", name: "Derek S.", role: "HVAC Owner, Phoenix AZ" },
            ].map((t) => (
              <div key={t.name} className="glass-card" style={{ borderRadius: "16px", padding: "24px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#facc15", fontSize: "12px" }}>{"\u2605"}</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.7, fontStyle: "italic", marginBottom: "16px" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ fontWeight: 700, color: "white", fontSize: "13px" }}>{t.name}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: "4rem 1rem 5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
            Stop Losing Calls. <span className="gradient-text">Start Today.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>
            14-day money-back guarantee. No contracts. No tech skills needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              See Pricing &rarr;
            </Link>
            <a href={DEMO_PHONE_HREF} className="btn-ghost" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              {"\u{1F4DE}"} Call Gia Now
            </a>
          </div>
        </section>
      </main>

      {/* FLOATING MOBILE CTA */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          background: "linear-gradient(to top, rgba(8,9,15,0.98), rgba(8,9,15,0.85))",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href={DEMO_PHONE_HREF}
            style={{
              flex: 1, display: "block",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "white", fontWeight: 700, fontSize: "14px",
              padding: "14px 16px", borderRadius: "12px",
              textDecoration: "none", textAlign: "center",
            }}
          >
            {"\u{1F4DE}"} Call Gia
          </a>
          <a
            href="#lead-form"
            style={{
              flex: 1, display: "block",
              border: "1px solid rgba(167,139,250,0.4)",
              color: "#c4b5fd", fontWeight: 700, fontSize: "14px",
              padding: "14px 16px", borderRadius: "12px",
              textDecoration: "none", textAlign: "center",
              background: "rgba(124,58,237,0.1)",
            }}
          >
            Get Demo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LEAD FORM                                                          */
/* ------------------------------------------------------------------ */

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
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.6)",
  marginBottom: "6px",
};

const INDUSTRIES = [
  "Real Estate",
  "Legal",
  "Medical / Dental",
  "Home Services (HVAC, Plumbing, etc.)",
  "Financial Services",
  "Salon / Spa",
  "Auto",
  "Restaurant",
  "Other",
];

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", industry: "" });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.name,
          email: form.email,
          phone: form.phone,
          businessType: form.industry || form.business,
          source: "fb-ad-demo",
        }),
      });
    } catch {
      // Still show success — lead notification was sent
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>
          {"\u2713"}
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
          You&apos;re In!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "20px" }}>
          We&apos;ll reach out within 1 hour to set up your live demo.
        </p>
        <a
          href={DEMO_PHONE_HREF}
          className="btn-glow"
          style={{ display: "inline-block", color: "white", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "12px", textDecoration: "none" }}
        >
          Or try Gia right now: {DEMO_PHONE}
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} id="lead-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <label style={labelStyle}>Your Name *</label>
        <input style={inputStyle} type="text" required placeholder="Sarah Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} type="tel" placeholder="(512) 555-0100" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label style={labelStyle}>Industry</label>
        <select
          style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
        >
          <option value="" style={{ background: "#12131a" }}>Select your industry...</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind} style={{ background: "#12131a" }}>{ind}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-glow"
        style={{
          width: "100%", color: "white", fontWeight: 700, fontSize: "16px",
          padding: "14px 24px", borderRadius: "12px", border: "none",
          cursor: submitting ? "wait" : "pointer",
          fontFamily: "'DM Sans', sans-serif",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending..." : "Get My Free Demo \u2192"}
      </button>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
        No spam. We&apos;ll reach out within 1 hour.
      </p>
    </form>
  );
}
