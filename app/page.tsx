"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Design: Midnight Intelligence — Dark Premium Tech
 * Colors: Near-black (#08090f) + Violet (#7c3aed) + Cyan (#06b6d4)
 * Fonts: Space Grotesk (headings) + DM Sans (body)
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import PricingSection from "@/components/PricingSection";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/hero_dark_bg-fkt9hQFvTLbJjo3Xfqo2GA.webp";
const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/features_bg-Du87iwMHbT3Kn67LivhhPN.webp";

const stats = [
  { value: "500+", label: "Active Agents" },
  { value: "2.4M", label: "Calls Handled" },
  { value: "99.9%", label: "Answer Rate" },
  { value: "$47K", label: "Avg Annual Value" },
];

const steps = [
  { num: "01", title: "5-Minute Setup", desc: "Connect your phone number. Tell us your name, brokerage, and how you work. We handle everything else.", icon: "⚡" },
  { num: "02", title: "AI Answers Every Call", desc: "Your AI receptionist picks up in your name, handles objections, qualifies buyers and sellers, and books appointments directly to your calendar.", icon: "🎙️" },
  { num: "03", title: "You Close the Deal", desc: "Get a real-time transcript, lead score, and next steps. Walk into every conversation already knowing exactly who you're talking to.", icon: "🏆" },
];

const features = [
  { icon: "🎙️", title: "Answers in Your Name", desc: '"Hi, this is Sarah with Keller Williams" — callers think they reached you directly.' },
  { icon: "🎯", title: "Lead Qualification", desc: "Asks the right questions: timeline, budget, pre-approved, motivation. Delivers a full lead profile to you." },
  { icon: "📅", title: "Calendar Booking", desc: "Syncs with your Google or Outlook calendar to book showings and consultations in real time." },
  { icon: "💬", title: "SMS Follow-Up", desc: "Automatically texts leads after the call with your contact info and next steps. Keeps them warm." },
  { icon: "🔄", title: "CRM Sync", desc: "Pushes call summaries and lead data straight to your CRM. No manual entry." },
  { icon: "🌙", title: "After-Hours Coverage", desc: "3 AM call about a listing? Handled. Saturday open house inquiry? Handled. Every call, every time." },
  { icon: "📋", title: "Live Call Transcripts", desc: "Get the full conversation transcript and AI summary via text or email within seconds of the call ending." },
  { icon: "✏️", title: "Custom Scripts", desc: "Set exactly how you want to be introduced, what to say for different inquiry types, and your specific service areas." },
];

const testimonials = [
  { quote: "I was losing deals because I couldn't answer calls during showings. All The Calls fixed that overnight. I closed an extra $380K deal last month from a lead that called at 11 PM.", name: "Marcus T.", role: "RE/MAX Agent", location: "Dallas, TX", initials: "MT" },
  { quote: "My AI receptionist sounds so natural that clients think they talked to me directly. The transcripts are incredibly detailed — I know exactly what the client wants before I ever call back.", name: "Jennifer L.", role: "Coldwell Banker", location: "Miami, FL", initials: "JL" },
  { quote: "I run a team of 4 agents and we use the Team plan. It's like having a full-time receptionist for less than I spend on coffee. The calendar sync alone saves us 3 hours a week.", name: "David R.", role: "Century 21", location: "Phoenix, AZ", initials: "DR" },
];

const faqs = [
  { q: "Does it really sound like me?", a: "Yes. You provide your name, brokerage, and preferred greeting. The AI introduces itself exactly as you specify — callers hear your name and brokerage, not a generic bot. Most clients never realize they didn't speak to you directly." },
  { q: "What happens when I want to take a call myself?", a: "Simply don't forward your calls during the hours you want to handle them personally. You control when All The Calls is active — turn it on for after-hours, weekends, or whenever you're unavailable." },
  { q: "Will it work with my current phone number?", a: "Yes. We provision a new number that forwards from your existing line, or you can forward directly. Your clients always call your same number — nothing changes on their end." },
  { q: "What CRMs does it sync with?", a: "We currently support Follow Up Boss, KVCore, Salesforce, HubSpot, and Zapier (which connects to 5,000+ apps). More integrations are added monthly." },
  { q: "What happens after the 14-day trial?", a: "You'll be charged for the plan you selected. No surprises — you can cancel anytime before the trial ends with no charge. We'll remind you 3 days before billing starts." },
  { q: "Can my AI book showings directly?", a: "Yes. Connect your Google or Outlook calendar and the AI checks your real-time availability, offers open slots, and books the appointment — sending confirmation to both you and the caller." },
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
        <div
          key={i}
          className="wave-bar"
          style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
        />
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

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: "bold" }}>A</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px" }}>AllTheCalls<span style={{ color: "#a78bfa" }}>.ai</span></span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px" }}>
            <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>How It Works</a>
            <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Features</a>
            <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Pricing</a>
            <Link href="/demo" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Demo</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/demo" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 16px" }}>See Demo</Link>
            <Link href="#pricing" className="btn-glow" style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none" }}>Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,9,15,0.97) 35%, rgba(8,9,15,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "128px", background: "linear-gradient(to bottom, transparent, #08090f)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1152px", margin: "0 auto", padding: "6rem 1rem", width: "100%" }}>
          <div style={{ maxWidth: "640px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "32px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              AI Receptionist — Built for Real Estate
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Never Miss a Lead{" "}
              <span className="gradient-text">Again.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "40px", lineHeight: 1.7, maxWidth: "520px" }}>
              Your AI receptionist answers every call in your name, qualifies leads, books appointments, and sends SMS follow-ups — 24/7, even when you&apos;re showing homes.
            </p>
            <div className="glass-card" style={{ borderRadius: "16px", padding: "16px", marginBottom: "32px", maxWidth: "340px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Live Call</span>
                <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>AI Receptionist</span>
              </div>
              <WaveformBars />
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "8px", fontStyle: "italic" }}>&ldquo;Hi, this is Sarah with Keller Williams...&rdquo;</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <Link href="#pricing" className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none" }}>
                Start 14-Day Free Trial
              </Link>
              <Link href="/demo" className="btn-ghost" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none" }}>
                See Live Demo →
              </Link>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>No credit card required · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "40px 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Up and running in <span className="gradient-text">5 minutes</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", maxWidth: "480px", margin: "0 auto" }}>
              No complex integrations. No training required. Just flip the switch and your AI receptionist goes live.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
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
      <section id="demo" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="fade-in" style={{ position: "relative", zIndex: 10, maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Get Started</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.1 }}>
            One missed call could cost you <span className="gradient-text">$20,000.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
            Stop sending leads to voicemail. Start with All The Calls today — free for 14 days.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "24px" }}>
            <Link href="#pricing" className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
              Start Free Trial — No Card Needed
            </Link>
            <Link href="/demo" className="btn-ghost" style={{ fontWeight: 600, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
              Hear a demo call first →
            </Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No contracts. No tech skills needed. Cancel anytime.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", fontWeight: "bold" }}>A</div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "18px" }}>AllTheCalls<span style={{ color: "#a78bfa" }}>.ai</span></span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>The AI receptionist built for real estate agents who refuse to miss a lead.</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "16px" }}>Secured by Stripe · 256-bit SSL</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Product</p>
              {[["#features", "Features"], ["#pricing", "Pricing"], ["#how-it-works", "How It Works"], ["/demo", "Demo"]].map(([href, label]) => (
                <a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Company</p>
              {[["/contact", "Contact"], ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]].map(([href, label]) => (
                <Link key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</Link>
              ))}
              <Link href="#pricing" className="btn-glow" style={{ display: "inline-block", color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", marginTop: "8px" }}>Start Free Trial →</Link>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "8px" }}>14 days free. No card required.</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>© 2026 All The Calls. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>All The Calls is an AI-powered receptionist service. Results may vary by market and usage.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
