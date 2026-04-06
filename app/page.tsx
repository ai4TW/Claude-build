"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Design: Trillet-inspired Pristine B2B SaaS
 */

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import PricingSection from "@/components/PricingSection";

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
];

const steps = [
  { num: "1", title: "5-Minute Setup", desc: "Tell us your business name, industry, and preferred workflow. We handle the rest.", icon: "⚡" },
  { num: "2", title: "AI Answers Every Call", desc: "Your AI answers in your name, asks industry-specific questions, and captures info.", icon: "🎙️" },
  { num: "3", title: "You Get the Summary", desc: "Receive a real-time transcript and caller summary instantly after the call.", icon: "📋" },
];

const features = [
  { icon: "🎙️", title: "Conversational AI", desc: "Callers hear your business name and a natural voice. Never sounds like a robotic PBX." },
  { icon: "🎯", title: "Smart Qualification", desc: "Law firms ask about case types, medical offices about insurance. Custom questions per industry." },
  { icon: "💬", title: "SMS Automation", desc: "Instantly text every caller with booking links or intake forms within seconds of hanging up." },
  { icon: "🌙", title: "24/7 Availability", desc: "Whether it's a 3 AM emergency or Sunday afternoon inquiry, every call is handled perfectly." },
  { icon: "📋", title: "Actionable Transcripts", desc: "Complete conversation history and executive summary sent to your phone or CRM." },
  { icon: "✏️", title: "Custom Logic", desc: "Define objections, FAQs, and business operating rules directly in your dashboard." },
];

const testimonials = [
  { quote: "I was losing clients to missed calls. AllTheCalls handled a lead at 9 PM on a Friday and booked the consult for Monday. Incredible ROI.", name: "Rachel M.", role: "Family Law Attorney", initials: "RM" },
  { quote: "Patients think they talked to my front desk. The transcripts are phenomenally accurate. I know exactly what they need before I call back.", name: "Dr. James K.", role: "Family Practice", initials: "JK" },
  { quote: "For a 6-person HVAC company, it's like having a full-time dispatcher for pennies. Every lead is captured. Highly recommend.", name: "Derek S.", role: "HVAC & Plumbing", initials: "DS" },
];

const faqs = [
  { q: "Does it work for my specific industry?", a: "Yes. From real estate to medical, our AI understands context and asks the appropriate qualification questions for your exact vertical." },
  { q: "Will callers know they are talking to an AI?", a: "Most callers interact normally as it sounds incredibly natural and introduces itself as your assistant. It focuses on efficiency and getting answers, just like human receptionists." },
  { q: "How do I turn it off when I want to answer calls?", a: "You have complete control over forwarding. Activate it after-hours, on weekends, or keep it running 24/7. It's up to you." },
  { q: "Do I need a new phone number?", a: "No. You keep your existing business number and simply forward calls to the dedicated line we provide." },
  { q: "Is there a setup fee?", a: "No. Setup is completely free during your 14-day trial. You can design your call flows and test the AI thoroughly before paying." },
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e4e4e7" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
      >
        <span style={{ fontWeight: 600, color: "#09090b", fontSize: "16px" }}>{q}</span>
        <span style={{ color: "#71717a", fontSize: "1.25rem", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: "24px", color: "#52525b", lineHeight: 1.6, fontSize: "15px" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useScrollFadeIn();
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoNumber, setDemoNumber] = useState("");

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(demoNumber) {
      alert(`Initiating demo call to ${demoNumber}. (This is a frontend demonstration)`);
      setDemoNumber("");
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #e4e4e7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            {/* Replace with pure black/dark gray logo */}
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.5px" }}>AllTheCalls</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>How it works</a>
            <a href="#features" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Features</a>
            <a href="#pricing" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
            <a href="#faq" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>FAQ</a>
            <Link href="/blog" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Call {DEMO_PHONE}</a>
            <Link href="/onboarding" className="btn-primary" style={{ fontSize: "14px", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>Get Started</Link>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span style={{ display: "block", width: "20px", height: "2px", background: "#09090b", transition: "all 0.3s", transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "20px", height: "2px", background: "#09090b", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "20px", height: "2px", background: "#09090b", transition: "all 0.3s", transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "#ffffff", borderTop: "1px solid #e4e4e7", padding: "16px 1.5rem" }} className="md:hidden">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={{ color: "#09090b", textDecoration: "none", fontWeight: 500 }}>How it works</a>
              <a href="#features" onClick={() => setMenuOpen(false)} style={{ color: "#09090b", textDecoration: "none", fontWeight: 500 }}>Features</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: "#09090b", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
              <a href={DEMO_PHONE_HREF} onClick={() => setMenuOpen(false)} style={{ color: "#09090b", textDecoration: "none", fontWeight: 500 }}>Call {DEMO_PHONE}</a>
              <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
              <Link href="/onboarding" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ padding: "12px", borderRadius: "8px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <main>
      {/* HERO */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", paddingLeft: "1.5rem", paddingRight: "1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, marginBottom: "32px", border: "1px solid #e4e4e7", background: "#fafafa", color: "#52525b" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginRight: "8px" }} />
            24/7 AI Phone Receptionist
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 700, color: "#09090b", marginBottom: "24px", letterSpacing: "-0.04em" }}>
            Answer every call.<br/>Secure every booking.
          </h1>
          <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#52525b", marginBottom: "40px", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto 40px" }}>
            Most services just take messages. Our AI answers instantly, asks the right questions, and books appointments straight to your calendar.
          </p>

          {/* Interactive Demo Component */}
          <div style={{ maxWidth: "480px", margin: "0 auto", padding: "8px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e4e4e7", boxShadow: "0 12px 32px -12px rgba(0,0,0,0.08)" }}>
            <form onSubmit={handleDemoSubmit} style={{ display: "flex", gap: "8px" }}>
              <input 
                type="tel" 
                placeholder="Enter your phone number to try" 
                value={demoNumber}
                onChange={(e) => setDemoNumber(e.target.value)}
                style={{ flex: 1, padding: "14px 16px", border: "none", outline: "none", background: "transparent", fontSize: "15px", color: "#09090b", borderRadius: "8px" }}
                required
              />
              <button type="submit" className="btn-primary" style={{ padding: "0 24px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                Call Me
              </button>
            </form>
          </div>
          <p style={{ fontSize: "13px", color: "#a1a1aa", marginTop: "16px" }}>14-day free trial • Instant setup</p>

          {/* Supported Industries tags */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "48px" }}>
            {INDUSTRIES_SERVED.map((ind) => (
              <div key={ind.label} style={{ fontSize: "13px", fontWeight: 500, color: "#71717a", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>{ind.icon}</span> {ind.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: "1px solid #e4e4e7", borderBottom: "1px solid #e4e4e7", background: "#fafafa", padding: "64px 1.5rem" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#09090b", marginBottom: "8px", letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: "14px", color: "#71717a", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "120px 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#09090b", marginBottom: "16px", letterSpacing: "-0.03em" }}>
              Deployed in minutes
            </h2>
            <p style={{ color: "#52525b", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
              We've abstracted the complexity. No code required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="fade-in" style={{ transitionDelay: `${i * 0.1}s`, background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: "16px", padding: "40px 32px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f4f4f5", border: "1px solid #e4e4e7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "24px", fontWeight: 600, color: "#09090b" }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#09090b", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ color: "#52525b", lineHeight: 1.6, fontSize: "15px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES ROW */}
      <section id="features" style={{ padding: "120px 1.5rem", background: "#fafafa", borderTop: "1px solid #e4e4e7", borderBottom: "1px solid #e4e4e7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "80px", maxWidth: "600px", margin: "0 auto 80px" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#09090b", marginBottom: "16px", letterSpacing: "-0.03em" }}>
              Enterprise capabilities, built for any scale
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-white" style={{ border: "1px solid #e4e4e7", borderRadius: "16px", overflow: "hidden" }}>
            {features.map((f, i) => (
              <div key={f.title} className="fade-in" style={{ padding: "48px 40px", borderBottom: (i < 4 || (i===4 && typeof window !== 'undefined' && window.innerWidth < 640)) ? "1px solid #e4e4e7" : "none", borderRight: (i % 2 === 0) ? "1px solid #e4e4e7" : "none" }}>
                <div style={{ fontSize: "24px", marginBottom: "24px" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, color: "#09090b", marginBottom: "12px", fontSize: "16px" }}>{f.title}</h3>
                <p style={{ color: "#52525b", fontSize: "15px", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "120px 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#09090b" }}>
              Trusted by the best
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="glass-card fade-in" style={{ borderRadius: "16px", padding: "40px 32px", transitionDelay: `${i * 0.15}s` }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "24px" }}>
                  {[...Array(5)].map((_, j) => <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#09090b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p style={{ color: "#09090b", lineHeight: 1.6, marginBottom: "32px", fontSize: "15px", fontWeight: 500 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", color: "#09090b", fontSize: "13px", fontWeight: 600 }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#09090b", fontSize: "14px" }}>{t.name}</p>
                    <p style={{ color: "#71717a", fontSize: "13px" }}>{t.role}</p>
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
      <section id="faq" style={{ padding: "120px 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#09090b" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="fade-in" style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "120px 1.5rem", borderTop: "1px solid #e4e4e7", background: "#fafafa", textAlign: "center" }}>
        <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "#09090b", marginBottom: "24px", letterSpacing: "-0.04em" }}>
            Ready to scale?
          </h2>
          <p style={{ color: "#52525b", fontSize: "18px", marginBottom: "40px" }}>
            Create your AI receptionist today and never miss a lead again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding" className="btn-primary" style={{ fontWeight: 600, fontSize: "15px", padding: "14px 32px", borderRadius: "8px", textDecoration: "none" }}>
              Get Started
            </Link>
            <a href={DEMO_PHONE_HREF} className="btn-secondary" style={{ fontWeight: 600, fontSize: "15px", padding: "14px 32px", borderRadius: "8px", textDecoration: "none" }}>
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e4e4e7", padding: "80px 1.5rem 40px", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.5px" }}>AllTheCalls</span>
              </div>
              <p style={{ color: "#52525b", fontSize: "14px", lineHeight: 1.6, maxWidth: "320px", marginBottom: "24px" }}>
                The voice application layer for every modern business. Secure every booking with AI.
              </p>
            </div>
            <div>
              <p style={{ color: "#09090b", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Product</p>
              {[["#features", "Features"], ["#pricing", "Pricing"], ["#how-it-works", "How It Works"]].map(([href, label]) => (
                <a key={label} href={href} style={{ display: "block", color: "#52525b", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ color: "#09090b", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Company</p>
              {[["/contact", "Contact"], ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]].map(([href, label]) => (
                <Link key={label} href={href} style={{ display: "block", color: "#52525b", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</Link>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderTop: "1px solid #e4e4e7", paddingTop: "32px" }}>
            <p style={{ color: "#a1a1aa", fontSize: "13px" }}>© 2026 AllTheCalls. All rights reserved.</p>
            <div style={{ display: "flex", gap: "24px" }}>
              <a href="#" style={{ color: "#a1a1aa", fontSize: "13px", textDecoration: "none" }}>Twitter</a>
              <a href="#" style={{ color: "#a1a1aa", fontSize: "13px", textDecoration: "none" }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
