"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Design: Midnight Intelligence — Dark Premium Tech
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import PricingSection from "@/components/PricingSection";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/hero_dark_bg-fkt9hQFvTLbJjo3Xfqo2GA.webp";
const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/features_bg-Du87iwMHbT3Kn67LivhhPN.webp";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(888) 555-0100";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+18885550100";

const stats = [
  { value: "1,200+", label: "Businesses Live" },
  { value: "4.8M", label: "Calls Handled" },
  { value: "99.9%", label: "Answer Rate" },
  { value: "24/7", label: "Always On" },
];

const INDUSTRIES_SERVED = [
  { icon: "🏠", label: "Real Estate" },
  { icon: "⚖️", label: "Legal" },
  { icon: "🏥", label: "Medical" },
  { icon: "🔧", label: "Home Services" },
  { icon: "📈", label: "Financial" },
  { icon: "✂️", label: "Salon & Spa" },
  { icon: "🚗", label: "Auto" },
  { icon: "🍽️", label: "Restaurant" },
];

const steps = [
  { num: "01", title: "5-Minute Setup", desc: "Tell us your business name, industry, and how you like to work. We configure your AI and get it live on your number.", icon: "⚡" },
  { num: "02", title: "AI Answers Every Call", desc: "Your AI picks up in your name, asks the right questions for your industry, and captures every caller's info — 24/7.", icon: "🎙️" },
  { num: "03", title: "You Focus on the Work", desc: "Get a real-time transcript and caller summary. Walk into every callback already knowing exactly who you're talking to.", icon: "🏆" },
];

const features = [
  { icon: "🎙️", title: "Answers in Your Name", desc: "Callers hear your business name and your AI assistant — not a generic bot. Sounds like your team from the first word." },
  { icon: "🎯", title: "Industry-Specific Qualification", desc: "The right questions for your business: law firms ask about case type, medical offices ask about insurance, realtors ask about timeline." },
  { icon: "💬", title: "SMS Follow-Up", desc: "Automatically texts every caller with your contact info and next steps within seconds of the call ending." },
  { icon: "🌙", title: "After-Hours Coverage", desc: "3 AM emergency call? Saturday inquiry? Weekend booking? Every call handled, every time — no voicemail, no missed opportunities." },
  { icon: "📋", title: "Live Call Transcripts", desc: "Full conversation + AI summary sent to you the moment the call ends. Know everything before you call back." },
  { icon: "✏️", title: "Fully Custom Scripts", desc: "Set your greeting, what to ask, how to handle objections, and what to always mention. Your AI, your rules." },
];

const testimonials = [
  { quote: "I was losing clients because I couldn't answer calls during consultations. All The Calls fixed that overnight. A new client called at 9 PM on a Friday — the AI booked the consult and I signed them the next week.", name: "Rachel M.", role: "Family Law Attorney", location: "Austin, TX", initials: "RM" },
  { quote: "My AI receptionist sounds so natural that patients think they talked to my front desk. The transcripts are incredibly detailed — I know exactly what the patient needs before I even walk in.", name: "Dr. James K.", role: "Family Practice", location: "Denver, CO", initials: "JK" },
  { quote: "I run a 6-person HVAC company and it's like having a full-time dispatcher for less than I was spending on missed-call callbacks. Every lead is captured, every call gets handled professionally.", name: "Derek S.", role: "HVAC & Plumbing", location: "Phoenix, AZ", initials: "DS" },
];

const faqs = [
  { q: "Does it work for any type of business?", a: "Yes. We support real estate, legal, medical, dental, home services, financial advisory, salons, auto dealerships, restaurants, and more. When you set up your AI, you pick your industry and it trains itself with the right scripts and qualification questions for your business." },
  { q: "Does it really sound like my business?", a: "Yes. You provide your name, business name, and preferred greeting style. The AI introduces itself exactly as you specify — callers hear your business name, not a generic bot. Most callers never realize they didn't speak to a real person." },
  { q: "What happens when I want to take a call myself?", a: "Simply don't forward your calls during the hours you want to handle them personally. You control when All The Calls is active — turn it on for after-hours, weekends, or whenever you're unavailable." },
  { q: "Will it work with my current phone number?", a: "Yes. We assign you a dedicated number that your existing line forwards to. Your clients always call your same number — nothing changes on their end." },
  { q: "What happens after the 14-day trial?", a: "You'll be charged for the plan you selected. No surprises — cancel anytime before the trial ends with no charge. We'll remind you 3 days before billing starts." },
  { q: "Can I hear it before I sign up?", a: `Absolutely. Call ${DEMO_PHONE} right now and hear a live AllTheCalls AI in action. Takes 60 seconds. That's exactly what your callers will experience.` },
];

function useScrollFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function WaveformBars() {
  const heights = [20, 35, 55, 40, 60, 45, 70, 50, 65, 35, 55, 40, 30, 50, 45];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "40px" }}>
      {heights.map((h, i) => (
        <div key={i} className="wave-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card" style={{ borderRadius: "16px", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
      >
        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{q}</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "14px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useScrollFadeIn();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px", width: "auto" }} />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>How It Works</a>
            <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Features</a>
            <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Pricing</a>
            <a href="#hear-it" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Hear It Live</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 16px" }}>📞 {DEMO_PHONE}</a>
            <Link href="/login" style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Sign In</Link>
            <Link href="#pricing" className="btn-glow" style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none" }}>Start Free Trial</Link>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span style={{ display: "block", width: "22px", height: "2px", background: "rgba(255,255,255,0.7)", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "rgba(255,255,255,0.7)", borderRadius: "2px", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "rgba(255,255,255,0.7)", borderRadius: "2px", transition: "all 0.3s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(8,9,15,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 1rem 24px" }} className="md:hidden">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[["#how-it-works", "How It Works"], ["#features", "Features"], ["#pricing", "Pricing"], ["#hear-it", "Hear It Live"]].map(([href, label]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "16px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{label}</a>
              ))}
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "15px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>Sign In →</Link>
              <a href={DEMO_PHONE_HREF} onClick={() => setMenuOpen(false)} className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "15px", padding: "14px 20px", borderRadius: "12px", textDecoration: "none", textAlign: "center", marginTop: "16px", display: "block" }}>
                📞 Call Our AI — {DEMO_PHONE}
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
      {/* HERO */}
      <section aria-label="Hero" style={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,9,15,0.97) 35%, rgba(8,9,15,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "128px", background: "linear-gradient(to bottom, transparent, #08090f)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1152px", margin: "0 auto", padding: "6rem 1rem", width: "100%" }}>
          <div style={{ maxWidth: "640px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "32px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              AI Receptionist — For Any Business
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Never Miss a Call{" "}
              <span className="gradient-text">Again.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7, maxWidth: "520px" }}>
              Your AI receptionist answers every call in your name, qualifies every caller, and sends SMS follow-ups — 24/7. Works for any business. Live in 5 minutes.
            </p>

            {/* Industries row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {INDUSTRIES_SERVED.map((ind) => (
                <div key={ind.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  <span>{ind.icon}</span> {ind.label}
                </div>
              ))}
            </div>

            {/* Live call demo card */}
            <div className="glass-card" style={{ borderRadius: "16px", padding: "16px", marginBottom: "32px", maxWidth: "360px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Live Now</span>
                <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>AI Receptionist</span>
              </div>
              <WaveformBars />
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "8px", fontStyle: "italic" }}>&ldquo;Thank you for calling — I&apos;m their assistant, how can I help you?&rdquo;</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="#pricing" className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                Start 14-Day Free Trial
              </Link>
              <a href="#hear-it" className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                Hear It Live →
              </a>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>No credit card required · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "40px 1rem" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HEAR IT LIVE — DEMO CALL SECTION */}
      <section id="hear-it" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "400px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.08, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="fade-in">
            <p style={{ color: "#4ade80", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              ● Live Demo
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "white", marginBottom: "20px", lineHeight: 1.1 }}>
              Call our AI right now.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "48px", maxWidth: "520px", margin: "0 auto 48px" }}>
              Experience exactly what your leads will hear — with your name and brokerage. Takes 60 seconds.
            </p>

            {/* Big phone number CTA */}
            <a
              href={DEMO_PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                padding: "24px 48px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                boxShadow: "0 0 60px rgba(124,58,237,0.4), 0 0 120px rgba(6,182,212,0.15)",
                textDecoration: "none",
                marginBottom: "32px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 80px rgba(124,58,237,0.5), 0 0 160px rgba(6,182,212,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(124,58,237,0.4), 0 0 120px rgba(6,182,212,0.15)";
              }}
            >
              <span style={{ fontSize: "32px" }}>📞</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>CALL OUR AI NOW</div>
                <div style={{ color: "white", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>{DEMO_PHONE}</div>
              </div>
            </a>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
              {["It answers in your name", "Qualifies the lead", "You get a full transcript"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#a78bfa", flexShrink: 0 }}>{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Up and running in <span className="gradient-text">5 minutes</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", maxWidth: "480px", margin: "0 auto" }}>
              No tech skills needed. No complex setup. Just your name, brokerage, and phone number.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="glass-card fade-in" style={{ borderRadius: "20px", padding: "32px", position: "relative", overflow: "hidden", transitionDelay: `${i * 0.15}s` }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "128px", height: "128px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent)", transform: "translate(-50%, -50%)" }} />
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{step.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", fontWeight: 700, opacity: 0.08, marginBottom: "8px", lineHeight: 1, color: "white" }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "14px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden", backgroundImage: `url(${FEATURES_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,9,15,0.88)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Features</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Everything a top-tier receptionist does,{" "}
              <span className="gradient-text">at a fraction of the cost.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>One commission covers years of service. And your AI never calls in sick.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.title} className="glass-card fade-in" style={{ borderRadius: "16px", padding: "24px", transitionDelay: `${i * 0.07}s` }}>
                <div className="icon-glow" style={{ width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "16px" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, color: "white", marginBottom: "8px", fontSize: "14px" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Testimonials</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Real agents. <span className="gradient-text">Real results.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="glass-card fade-in" style={{ borderRadius: "20px", padding: "32px", transitionDelay: `${i * 0.15}s` }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#facc15", fontSize: "14px" }}>★</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic", fontSize: "14px" }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <section id="faq" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>FAQ</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="fade-in" style={{ position: "relative", zIndex: 10, maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Get Started</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.1 }}>
            Every missed call is{" "}<span className="gradient-text">money left behind.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
            Stop sending revenue to voicemail. Call our AI first, then start your free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="#pricing" className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              Start Free Trial →
            </Link>
            <a href={DEMO_PHONE_HREF} className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              📞 Call {DEMO_PHONE}
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No contracts. No tech skills needed. Cancel anytime.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 1rem 96px" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div style={{ marginBottom: "16px" }}>
                <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "32px", width: "auto" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>The AI voice receptionist for any business that can&apos;t afford to miss a call.</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "16px" }}>Secured by Stripe · 256-bit SSL</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Product</p>
              {[["#features", "Features"], ["#pricing", "Pricing"], ["#how-it-works", "How It Works"], ["#hear-it", "Hear It Live"]].map(([href, label]) => (
                <a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Company</p>
              {[["/contact", "Contact"], ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]].map(([href, label]) => (
                <Link key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</Link>
              ))}
              <Link href="/login" style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>Client Login</Link>
              <a href={DEMO_PHONE_HREF} style={{ display: "block", color: "#a78bfa", fontSize: "14px", fontWeight: 600, textDecoration: "none", marginBottom: "8px" }}>📞 {DEMO_PHONE}</a>
              <Link href="#pricing" className="btn-glow" style={{ display: "inline-block", color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", marginTop: "8px" }}>Start Free Trial →</Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>© 2026 All The Calls. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>All The Calls is an AI-powered voice receptionist service. Results may vary by market and usage.</p>
          </div>
        </div>
      </footer>
      </main>

      {/* MOBILE STICKY CTA BAR — shown only on mobile */}
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,9,15,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="#pricing" className="btn-glow" style={{ flex: 1, color: "white", fontWeight: 700, fontSize: "14px", padding: "13px 16px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
            Start Free Trial
          </Link>
          <a href={DEMO_PHONE_HREF} className="btn-ghost" style={{ flex: 1, fontWeight: 600, fontSize: "14px", padding: "13px 16px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
            📞 Call AI Now
          </a>
        </div>
      </div>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </div>
  );
}
