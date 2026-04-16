"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const DEMO_PHONE = "(316) 232-4777";
const DEMO_PHONE_HREF = "tel:+13162324777";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";

/* ------------------------------------------------------------------ */
/*  MULTI-STEP FORM — the star of this page                           */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
  { label: "Real Estate", icon: "\u{1F3E0}" },
  { label: "Legal", icon: "\u2696\uFE0F" },
  { label: "Medical / Dental", icon: "\u{1FA7A}" },
  { label: "Home Services", icon: "\u{1F527}" },
  { label: "Financial", icon: "\u{1F4B0}" },
  { label: "Salon / Spa", icon: "\u2728" },
  { label: "Auto", icon: "\u{1F697}" },
  { label: "Restaurant", icon: "\u{1F37D}\uFE0F" },
  { label: "Other", icon: "\u{1F4BC}" },
];

const CALL_VOLUMES = [
  "Under 20 calls/week",
  "20-50 calls/week",
  "50-100 calls/week",
  "100+ calls/week",
  "Not sure",
];

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    industry: "",
    callVolume: "",
    name: "",
    email: "",
    phone: "",
    business: "",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  async function handleFinalSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.name,
          email: form.email,
          phone: form.phone,
          businessType: form.industry,
          source: "fb-ad-demo",
        }),
      });
    } catch {
      // still show success
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        {/* Animated check */}
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: "32px", color: "white",
          boxShadow: "0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(6,182,212,0.2)",
        }}>
          {"\u2713"}
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "24px", marginBottom: "12px" }}>
          You&apos;re All Set, {form.name.split(" ")[0]}!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", marginBottom: "28px", lineHeight: 1.6 }}>
          Now let&apos;s get you on a quick call so we can build your AI receptionist live.
        </p>

        {/* PRIMARY: Book the call */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow"
          style={{
            display: "block", width: "100%", color: "white", fontWeight: 700,
            fontSize: "18px", padding: "18px 24px", borderRadius: "14px",
            textDecoration: "none", textAlign: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "12px",
          }}
        >
          Book Your Free Demo Call Now
        </a>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "24px" }}>
          15 minutes. We&apos;ll set up your AI on the call.
        </p>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "12px" }}>
            Want to hear it first?
          </p>
          <a
            href={DEMO_PHONE_HREF}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#c4b5fd", fontWeight: 600, fontSize: "16px",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {"\u{1F4DE}"} Call Gia: {DEMO_PHONE}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#c4b5fd" }}>Step {step} of {totalSteps}</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "999px",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            width: `${progress}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* STEP 1: Industry */}
      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
            What industry are you in?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "20px" }}>
            We&apos;ll customize your AI receptionist for your exact business.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.label}
                onClick={() => { setForm({ ...form, industry: ind.label }); setStep(2); }}
                style={{
                  background: form.industry === ind.label ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                  border: form.industry === ind.label ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "16px 8px",
                  cursor: "pointer", color: "white",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ fontSize: "24px" }}>{ind.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{ind.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Call volume + pain */}
      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
            How many calls does your business get?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "20px" }}>
            This helps us size your plan and show you exactly how much revenue you&apos;re leaving on the table.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {CALL_VOLUMES.map((vol) => (
              <button
                key={vol}
                onClick={() => { setForm({ ...form, callVolume: vol }); setStep(3); }}
                style={{
                  background: form.callVolume === vol ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                  border: form.callVolume === vol ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "14px 20px",
                  cursor: "pointer", color: "white", textAlign: "left",
                  fontSize: "15px", fontWeight: 500,
                  transition: "all 0.2s ease",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {vol}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            &larr; Back
          </button>
        </div>
      )}

      {/* STEP 3: Contact info */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "20px", marginBottom: "8px" }}>
            Almost done! Where should we send your demo?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "20px" }}>
            We&apos;ll build a custom AI receptionist for your {form.industry.toLowerCase()} business.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleFinalSubmit(); }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              style={inputStyle}
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Business name"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
            />
            <input
              style={inputStyle}
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              style={inputStyle}
              type="tel"
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-glow"
              style={{
                width: "100%", color: "white", fontWeight: 700, fontSize: "16px",
                padding: "16px 24px", borderRadius: "14px", border: "none",
                cursor: submitting ? "wait" : "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                opacity: submitting ? 0.7 : 1,
                marginTop: "4px",
              }}
            >
              {submitting ? "Setting up..." : "Get My Custom AI Demo"}
            </button>
            <button onClick={() => setStep(2)} type="button" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: "4px" }}>
              &larr; Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  padding: "14px 18px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s ease",
};

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function DemoPage() {
  const [missedRevenue, setMissedRevenue] = useState(0);

  // Animate the revenue counter on load
  useEffect(() => {
    const target = 75000;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setMissedRevenue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* NAV — minimal */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "32px", width: "auto" }} />
          </Link>
          <a href={DEMO_PHONE_HREF} style={{ fontSize: "13px", color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>
            {"\u{1F4DE}"} Try Gia Live
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: "56px" }}>
        {/* ============================================================ */}
        {/*  HERO: Two columns — Left: copy + proof, Right: form         */}
        {/* ============================================================ */}
        <section style={{ minHeight: "calc(100dvh - 56px)", display: "flex", alignItems: "center", padding: "2rem 1rem", position: "relative", overflow: "hidden" }}>
          {/* Background glow */}
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" style={{ maxWidth: "1060px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            {/* LEFT — Copy */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {/* Urgency badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "24px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", width: "fit-content" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", animation: "pulse-dot 2s ease-in-out infinite" }} />
                Your competitors are answering their calls. Are you?
              </div>

              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, color: "white", marginBottom: "20px", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                Stop Missing Calls.{" "}
                <span className="gradient-text">Start Closing Deals.</span>
              </h1>

              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "17px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "480px" }}>
                Get a custom AI receptionist that answers every call in your name, qualifies leads, and books appointments &mdash; while you focus on running your business.
              </p>

              {/* Revenue loss callout */}
              <div style={{
                background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "14px", padding: "16px 20px", marginBottom: "28px",
                display: "flex", alignItems: "center", gap: "16px",
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700,
                  color: "#fca5a5", whiteSpace: "nowrap",
                }}>
                  ${missedRevenue.toLocaleString()}+
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                  Average revenue lost per year from missed calls.{" "}
                  <span style={{ color: "#fca5a5", fontWeight: 600 }}>How much are you losing?</span>
                </div>
              </div>

              {/* Trust row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
                {[
                  { icon: "\u2713", text: "14-day money-back guarantee" },
                  { icon: "\u2713", text: "Live in 48 hours" },
                  { icon: "\u2713", text: "No contracts" },
                ].map((t) => (
                  <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                    <span style={{ color: "#4ade80", fontWeight: 700 }}>{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>

              {/* Social proof avatars */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex" }}>
                  {["RM", "JK", "DS", "TW"].map((initials, i) => (
                    <div key={initials} style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", fontWeight: 700, color: "white",
                      border: "2px solid #08090f",
                      marginLeft: i > 0 ? "-8px" : "0",
                      zIndex: 4 - i,
                    }}>{initials}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#facc15", fontSize: "10px" }}>{"\u2605"}</span>)}
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Trusted by 200+ businesses</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Form Card */}
            <div>
              <div style={{
                position: "relative", padding: "2px", borderRadius: "22px",
                background: "conic-gradient(from var(--border-angle, 0deg), #7c3aed, #06b6d4, #7c3aed)",
                animation: "border-spin 4s linear infinite",
              }}>
                <div style={{
                  background: "rgba(8,9,15,0.97)", borderRadius: "20px",
                  padding: "clamp(24px, 4vw, 36px)",
                  backdropFilter: "blur(20px)",
                }}>
                  {/* Offer header */}
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: 700,
                      background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
                      color: "#4ade80", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      {"\u26A1"} Free Custom Demo
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "6px" }}>
                      See Your AI Receptionist Live
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
                      Takes 2 minutes. We&apos;ll build one for your business.
                    </p>
                  </div>

                  <MultiStepForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  WHAT YOU GET — 3 cards                                      */}
        {/* ============================================================ */}
        <section style={{ padding: "4rem 1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "white", textAlign: "center", marginBottom: "40px" }}>
              What happens on the <span className="gradient-text">demo call</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  num: "1",
                  title: "We Build Your AI",
                  desc: "Tell us your business name and industry. We configure a custom AI receptionist right on the call.",
                  icon: "\u26A1",
                },
                {
                  num: "2",
                  title: "You Hear It Live",
                  desc: "We call your number and you hear your AI answer exactly as your clients would. Real call, real time.",
                  icon: "\u{1F399}\uFE0F",
                },
                {
                  num: "3",
                  title: "You Go Live",
                  desc: "Love it? You leave the call with a working AI receptionist. Don't love it? No charge, no commitment.",
                  icon: "\u{1F680}",
                },
              ].map((s) => (
                <div key={s.num} className="glass-card" style={{ borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "12px", right: "16px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", fontWeight: 700, opacity: 0.04, color: "white" }}>{s.num}</div>
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TESTIMONIALS                                                 */}
        {/* ============================================================ */}
        <section style={{ padding: "3rem 1rem 4rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {[
              { quote: "All The Calls fixed my missed-call problem overnight. A new client called at 9 PM on a Friday \u2014 the AI booked the consult and I signed them the next week.", name: "Rachel M.", role: "Attorney, Austin TX" },
              { quote: "My AI receptionist sounds so natural that patients think they talked to my front desk. The transcripts are incredibly detailed.", name: "Dr. James K.", role: "Family Practice, Denver CO" },
              { quote: "It\u2019s like having a full-time dispatcher for less than I was spending on missed-call callbacks. Every lead gets captured.", name: "Derek S.", role: "HVAC Owner, Phoenix AZ" },
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

        {/* ============================================================ */}
        {/*  FINAL CTA — drive to Calendly                               */}
        {/* ============================================================ */}
        <section style={{ padding: "4rem 1rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.1, filter: "blur(80px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "white", marginBottom: "16px", lineHeight: 1.1 }}>
              Ready to Never Miss a Call Again?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", marginBottom: "32px" }}>
              15 minutes. Free. We build your AI on the call.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow"
              style={{
                display: "inline-block", color: "white", fontWeight: 700,
                fontSize: "18px", padding: "18px 48px", borderRadius: "14px",
                textDecoration: "none", textAlign: "center",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Book My Free Demo
            </a>
            <div style={{ marginTop: "20px", display: "flex", gap: "6px", alignItems: "center", justifyContent: "center" }}>
              <a href={DEMO_PHONE_HREF} style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>
                or call Gia right now: <span style={{ color: "#c4b5fd", fontWeight: 600 }}>{DEMO_PHONE}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING MOBILE CTA — book the call */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          background: "linear-gradient(to top, rgba(8,9,15,0.98), rgba(8,9,15,0.9))",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", width: "100%",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "white", fontWeight: 700, fontSize: "15px",
            padding: "15px 16px", borderRadius: "12px",
            textDecoration: "none", textAlign: "center",
          }}
        >
          Book Your Free Demo Call
        </a>
      </div>

      {/* CSS for border animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-spin {
          0% { --border-angle: 0deg; }
          100% { --border-angle: 360deg; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input:focus, select:focus {
          border-color: rgba(124,58,237,0.5) !important;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
      `}} />
    </div>
  );
}
