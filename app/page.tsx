"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Design: Midnight Intelligence — Dark Premium Tech
 * Visual Polish: Waveform glow, count-up stats, animated borders,
 *   SVG feature icons, gradient testimonials, smooth FAQ, scroll nav
 */

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/hero_dark_bg-fkt9hQFvTLbJjo3Xfqo2GA.webp";
const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/features_bg-Du87iwMHbT3Kn67LivhhPN.webp";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Stat {
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
  display: string;
}

const stats: Stat[] = [
  { numericValue: 1200, suffix: "+", prefix: "", label: "Businesses Live", display: "1,200+" },
  { numericValue: 4.8, suffix: "M", prefix: "", label: "Calls Handled", display: "4.8M" },
  { numericValue: 99.9, suffix: "%", prefix: "", label: "Answer Rate", display: "99.9%" },
  { numericValue: 0, suffix: "", prefix: "", label: "Always On", display: "24/7" },
];

const INDUSTRIES_SERVED = [
  { icon: "\u{1F3E0}", label: "Realtors" },
  { icon: "\u{1F3D7}\uFE0F", label: "Real Estate Investors" },
  { icon: "\u{1F527}", label: "HVAC" },
  { icon: "\u{1F50C}", label: "Electricians" },
  { icon: "\u{1F6BF}", label: "Plumbers" },
  { icon: "\u{1F3E1}", label: "Roofers & GCs" },
  { icon: "\u{1F3E2}", label: "Property Managers" },
  { icon: "\u2795", label: "And More" },
];

const steps = [
  { num: "01", title: "We Build Your AI", desc: "Tell us your business name, industry, and how you like to work. Our team configures your AI receptionist and gets it live on your dedicated number.", icon: "\u26A1" },
  { num: "02", title: "AI Answers Every Call", desc: "Your AI picks up in your name, asks the right questions for your industry, and captures every caller\u2019s info \u2014 24/7.", icon: "\u{1F399}\uFE0F" },
  { num: "03", title: "You Focus on the Work", desc: "Get a real-time transcript and caller summary. Walk into every callback already knowing exactly who you\u2019re talking to.", icon: "\u{1F3C6}" },
];

const features = [
  { title: "Answers in Your Name", desc: "Callers hear your business name and your AI assistant \u2014 not a generic bot. Sounds like your team from the first word.", iconKey: "mic" as const },
  { title: "Industry-Specific Qualification", desc: "The right questions for your business: realtors ask about buying or selling, investors ask about the deal, tradespeople ask about urgency and location.", iconKey: "crosshair" as const },
  { title: "SMS Follow-Up", desc: "Automatically texts every caller with your contact info and next steps within seconds of the call ending.", iconKey: "message" as const },
  { title: "After-Hours Coverage", desc: "3 AM emergency call? Saturday inquiry? Weekend booking? Every call handled, every time \u2014 no voicemail, no missed opportunities.", iconKey: "moon" as const },
  { title: "Live Call Transcripts", desc: "Full conversation + AI summary sent to you the moment the call ends. Know everything before you call back.", iconKey: "file" as const },
  { title: "Fully Custom Scripts", desc: "Set your greeting, what to ask, how to handle objections, and what to always mention. Your AI, your rules.", iconKey: "sliders" as const },
];

const testimonials = [
  { quote: "I was losing clients because I couldn't answer calls during consultations. All The Calls fixed that overnight.", boldPart: "All The Calls fixed that overnight.", rest: " A new client called at 9 PM on a Friday \u2014 the AI booked the consult and I signed them the next week.", name: "Rachel M.", role: "Family Law Attorney", location: "Austin, TX", initials: "RM" },
  { quote: "My AI receptionist sounds so natural that patients think they talked to my front desk.", boldPart: "patients think they talked to my front desk.", rest: " The transcripts are incredibly detailed \u2014 I know exactly what the patient needs before I even walk in.", name: "Dr. James K.", role: "Family Practice", location: "Denver, CO", initials: "JK" },
  { quote: "I run a 6-person HVAC company and it's like having a full-time dispatcher for less than I was spending on missed-call callbacks.", boldPart: "like having a full-time dispatcher", rest: " for less than I was spending on missed-call callbacks. Every lead is captured, every call gets handled professionally.", name: "Derek S.", role: "HVAC & Plumbing", location: "Phoenix, AZ", initials: "DS" },
];

const faqs = [
  { q: "Does it work for my type of business?", a: "Yes. We specialize in real estate agents, investors, property managers, and tradespeople \u2014 HVAC, plumbing, electrical, roofing, general contractors, and more. When you set up your AI, you pick your industry and it trains itself with the right scripts and qualification questions for your business." },
  { q: "Does it really sound like my business?", a: "Yes. You provide your name, business name, and preferred greeting style. The AI introduces itself exactly as you specify \u2014 callers hear your business name, not a generic bot. Most callers never realize they didn\u2019t speak to a real person." },
  { q: "What happens when I want to take a call myself?", a: "Simply don\u2019t forward your calls during the hours you want to handle them personally. You control when All The Calls is active \u2014 turn it on for after-hours, weekends, or whenever you\u2019re unavailable." },
  { q: "Will it work with my current phone number?", a: "Yes. We assign you a dedicated number that your existing line forwards to. Your clients always call your same number \u2014 nothing changes on their end." },
  { q: "What if I\u2019m not happy with it?", a: "You\u2019re covered by our 14-day money-back guarantee. If you don\u2019t love it, let us know within 14 days and we\u2019ll refund every penny \u2014 no questions asked. Love it or your money back." },
  { q: "Can I hear it before I sign up?", a: `Absolutely. Call ${DEMO_PHONE} right now and hear a live AllTheCalls AI in action. Takes 60 seconds. That\u2019s exactly what your callers will experience.` },
  { q: "How quickly can I get started?", a: "Most businesses are live within 48 hours. Our team handles the full setup \u2014 you just forward your phone number and tell us about your business." },
];

const whoItsFor = [
  { title: "Realtors & Brokers", desc: "Never lose a buyer lead to voicemail again. Your AI qualifies every inquiry and books showings.", iconKey: "home" as const },
  { title: "Real Estate Investors", desc: "Capture motivated seller details 24/7. Every deal lead documented and sent to you instantly.", iconKey: "trending" as const },
  { title: "Tradespeople", desc: "HVAC, plumbing, electrical, roofing \u2014 your AI dispatches by urgency and captures job details.", iconKey: "wrench" as const },
  { title: "And More", desc: "Law firms, medical practices, property managers \u2014 any business that can\u2019t afford to miss a call.", iconKey: "store" as const },
];

/* ------------------------------------------------------------------ */
/*  SVG ICON COMPONENTS                                                */
/* ------------------------------------------------------------------ */

const gradientDefs = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#a78bfa" />
      <stop offset="100%" stopColor="#22d3ee" />
    </linearGradient>
  </defs>
);

function FeatureIcon({ iconKey, size = 24 }: { iconKey: string; size?: number }) {
  const id = `grad-${iconKey}`;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: `url(#${id})`, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (iconKey) {
    case "mic":
      return <svg {...common}>{gradientDefs(id)}<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>;
    case "crosshair":
      return <svg {...common}>{gradientDefs(id)}<circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>;
    case "message":
      return <svg {...common}>{gradientDefs(id)}<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case "moon":
      return <svg {...common}>{gradientDefs(id)}<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
    case "file":
      return <svg {...common}>{gradientDefs(id)}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
    case "sliders":
      return <svg {...common}>{gradientDefs(id)}<line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>;
    case "home":
      return <svg {...common}>{gradientDefs(id)}<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "trending":
      return <svg {...common}>{gradientDefs(id)}<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "wrench":
      return <svg {...common}>{gradientDefs(id)}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
    case "store":
      return <svg {...common}>{gradientDefs(id)}<path d="M3 3h18v4H3z" /><path d="M3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7" /><path d="M10 21V14h4v7" /></svg>;
    case "phone":
      return <svg {...common}>{gradientDefs(id)}<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  KEYFRAME STYLES (injected once)                                    */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes hero-entrance {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px #4ade80; }
  50%      { opacity: 0.5; box-shadow: 0 0 12px #4ade80, 0 0 24px rgba(74,222,128,0.3); }
}
@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes border-spin {
  0%   { --border-angle: 0deg; }
  100% { --border-angle: 360deg; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes icon-bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
@keyframes accent-expand {
  from { width: 0; }
  to   { width: 100%; }
}
@keyframes float-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(6,182,212,0.2); }
  50%      { box-shadow: 0 0 30px rgba(124,58,237,0.7), 0 0 60px rgba(6,182,212,0.35); }
}
`;

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

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

function useCountUp(ref: React.RefObject<HTMLDivElement | null>, target: number, duration = 2000): string {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setVal(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, target, duration]);

  return val === 0 && !started.current ? "0" : target >= 100 ? Math.round(val).toLocaleString() : val.toFixed(1);
}

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

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

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [labelVisible, setLabelVisible] = useState(false);

  // For "24/7" just display directly
  if (stat.display === "24/7") {
    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) setLabelVisible(true); },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
    return (
      <div ref={ref} style={{ textAlign: "center" }}>
        <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>24/7</div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500, opacity: labelVisible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>{stat.label}</div>
      </div>
    );
  }

  const countVal = useCountUp(ref, stat.numericValue);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>
        {stat.prefix}{countVal}{stat.suffix}
      </div>
      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500, opacity: parseFloat(countVal) > 0 ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>{stat.label}</div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        background: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        transition: "background 0.3s ease",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: "3px",
        background: open ? "linear-gradient(to bottom, #7c3aed, #06b6d4)" : "transparent",
        transition: "background 0.3s ease",
      }} />
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", padding: "20px 24px 20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", cursor: "pointer", background: "none", border: "none", color: "inherit" }}
      >
        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{q}</span>
        <span style={{
          color: "rgba(255,255,255,0.4)", fontSize: "1.25rem", flexShrink: 0,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(135deg)" : "rotate(0deg)",
          display: "inline-block",
        }}>+</span>
      </button>
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s ease",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 24px 20px 28px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "14px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f, index }: { f: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="glass-card fade-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        transitionDelay: `${index * 0.1}s`,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        borderColor: hovered ? "rgba(167,139,250,0.3)" : undefined,
        boxShadow: hovered ? "0 12px 40px rgba(124,58,237,0.15)" : undefined,
      }}
    >
      {/* Top gradient accent line */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        height: "2px",
        width: hovered ? "100%" : "0%",
        background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
        transition: "width 0.4s ease",
      }} />
      <div
        className="icon-glow"
        style={{
          width: "48px", height: "48px", borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "16px",
          animation: hovered ? "icon-bounce 0.5s ease" : "none",
        }}
      >
        <FeatureIcon iconKey={f.iconKey} size={24} />
      </div>
      <h3 style={{ fontWeight: 700, color: "white", marginBottom: "8px", fontSize: "14px" }}>{f.title}</h3>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>{f.desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  useScrollFadeIn();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Smooth scroll + scroll listener for nav
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // IntersectionObserver for hero to control floating CTA
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => { setPastHero(!entries[0].isIntersecting); },
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ============================================================ */}
      {/*  NAV                                                         */}
      {/* ============================================================ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(8,9,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>How It Works</a>
            <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Features</a>
            <Link href="/pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Pricing</Link>
            <a href="#hear-it" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Hear It Live</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 16px" }}>{"\u{1F4DE}"} {DEMO_PHONE}</a>
            <Link
              href="/pricing"
              className="btn-glow"
              style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", position: "relative", overflow: "hidden" }}
            >
              See Pricing
              {/* Shimmer */}
              <span style={{
                position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                animation: "shimmer 3s ease-in-out infinite",
                pointerEvents: "none",
              }} />
            </Link>
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
        {/* Mobile menu — smooth slide */}
        <div
          className="md:hidden"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            background: "rgba(8,9,15,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ padding: menuOpen ? "16px 1rem 24px" : "0 1rem", transition: "padding 0.3s ease", borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[["#how-it-works", "How It Works"], ["#features", "Features"], ["/pricing", "Pricing"], ["#hear-it", "Hear It Live"]].map(([href, label]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "16px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{label}</a>
              ))}
              <a href={DEMO_PHONE_HREF} onClick={() => setMenuOpen(false)} className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "15px", padding: "14px 20px", borderRadius: "12px", textDecoration: "none", textAlign: "center", marginTop: "16px", display: "block" }}>
                {"\u{1F4DE}"} Call Our AI — {DEMO_PHONE}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section ref={heroRef} aria-label="Hero" style={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,9,15,0.97) 35%, rgba(8,9,15,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "128px", background: "linear-gradient(to bottom, transparent, #08090f)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1152px", margin: "0 auto", padding: "6rem 1rem", width: "100%", animation: "hero-entrance 0.8s ease-out both" }}>
          <div style={{ maxWidth: "640px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "32px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              AI Receptionist — Real Estate, Trades & More
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Never Miss a Call{" "}
              <span className="gradient-text">Again.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7, maxWidth: "520px" }}>
              Your AI receptionist answers every call in your name, qualifies every lead, and sends SMS follow-ups — 24/7. Built for realtors, investors, and tradespeople.
            </p>

            {/* Industries row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {INDUSTRIES_SERVED.map((ind) => (
                <div key={ind.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  <span>{ind.icon}</span> {ind.label}
                </div>
              ))}
            </div>

            {/* Live call demo card with glow */}
            <div style={{ position: "relative", marginBottom: "32px", maxWidth: "360px" }}>
              {/* Glow bloom */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px", height: "200px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)",
                filter: "blur(40px)", pointerEvents: "none",
              }} />
              <div className="glass-card" style={{ borderRadius: "16px", padding: "16px", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Live Now</span>
                  <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>AI Receptionist</span>
                </div>
                <WaveformBars />
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "8px", fontStyle: "italic" }}>&ldquo;Thank you for calling — I&apos;m their assistant, how can I help you?&rdquo;</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="/pricing" className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                Get Started — Risk Free
              </Link>
              <a href="#hear-it" className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                Hear It Live &rarr;
              </a>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>14-day money-back guarantee &middot; No contracts</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHO IT'S FOR                                                */}
      {/* ============================================================ */}
      <section style={{ padding: "6rem 1rem", position: "relative" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "white", marginBottom: "12px" }}>
              Built for businesses that <span className="gradient-text">can&apos;t afford to miss a call</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>Your AI receptionist knows your industry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoItsFor.map((item, i) => (
              <div
                key={item.title}
                className="glass-card fade-in"
                style={{
                  borderRadius: "20px", padding: "28px", textAlign: "center",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <FeatureIcon iconKey={item.iconKey} size={28} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                       */}
      {/* ============================================================ */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "40px 1rem" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {stats.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  HEAR IT LIVE — DEMO CALL SECTION                            */}
      {/* ============================================================ */}
      <section id="hear-it" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "400px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.08, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="fade-in">
            <p style={{ color: "#4ade80", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              &#9679; Live Demo
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "white", marginBottom: "20px", lineHeight: 1.1 }}>
              Call our AI right now.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "48px", maxWidth: "520px", margin: "0 auto 48px" }}>
              Experience exactly what your callers will hear — with your name and business. Takes 60 seconds.
            </p>

            {/* Glassmorphism demo card with animated border */}
            <div style={{
              position: "relative",
              display: "inline-block",
              padding: "2px",
              borderRadius: "24px",
              background: "conic-gradient(from var(--border-angle, 0deg), #7c3aed, #06b6d4, #7c3aed)",
              animation: "border-spin 3s linear infinite",
              marginBottom: "40px",
            }}>
              <div style={{
                background: "rgba(8,9,15,0.95)",
                borderRadius: "22px",
                padding: "32px 48px",
                backdropFilter: "blur(20px)",
                position: "relative",
              }}>
                {/* Pulsing rings behind phone icon */}
                <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "48px", height: "48px",
                    border: "2px solid rgba(124,58,237,0.3)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "pulse-ring 2s ease-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "48px", height: "48px",
                    border: "2px solid rgba(6,182,212,0.3)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "pulse-ring 2s ease-out infinite 0.6s",
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "48px", height: "48px",
                    border: "2px solid rgba(124,58,237,0.2)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: "pulse-ring 2s ease-out infinite 1.2s",
                  }} />
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <FeatureIcon iconKey="phone" size={32} />
                  </div>
                </div>

                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Call our AI now</div>
                <a
                  href={DEMO_PHONE_HREF}
                  className="gradient-text"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.02em",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {DEMO_PHONE}
                </a>
              </div>
            </div>

            {/* 3-step horizontal stepper */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap", marginBottom: "16px" }}>
              {["It answers in your name", "Qualifies the lead", "You get a full transcript"].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                    <span style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0,
                    }}>{i + 1}</span>
                    <span>{step}</span>
                  </div>
                  {i < 2 && (
                    <div style={{
                      width: "32px", height: "2px",
                      background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                      margin: "0 12px",
                      opacity: 0.4,
                      flexShrink: 0,
                    }} />
                  )}
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>Takes 60 seconds &middot; No signup required</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section id="how-it-works" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Up and running <span className="gradient-text">for you</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", maxWidth: "480px", margin: "0 auto" }}>
              No tech skills needed. Our team handles the full setup. You just forward your number.
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

      {/* ============================================================ */}
      {/*  FEATURES                                                    */}
      {/* ============================================================ */}
      <section id="features" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden", backgroundImage: `url(${FEATURES_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,9,15,0.88)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Features</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Everything a top-tier receptionist does,{" "}
              <span className="gradient-text">at a fraction of the cost.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>One month&apos;s fee covers years of service. And your AI never calls in sick.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Testimonials</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Real businesses. <span className="gradient-text">Real results.</span>
            </h2>
          </div>
          {/* Desktop: grid, Mobile: horizontal scroll with snap */}
          <div
            className="testimonials-scroll"
            style={{
              display: "grid",
              gap: "24px",
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .testimonials-scroll {
                grid-template-columns: repeat(3, 1fr);
              }
              @media (max-width: 767px) {
                .testimonials-scroll {
                  display: flex !important;
                  overflow-x: auto;
                  scroll-snap-type: x mandatory;
                  -webkit-overflow-scrolling: touch;
                  padding-bottom: 16px;
                  gap: 16px !important;
                }
                .testimonials-scroll > div {
                  min-width: 85vw;
                  scroll-snap-align: center;
                  flex-shrink: 0;
                }
                .testimonials-scroll::-webkit-scrollbar { display: none; }
              }
            `}} />
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="glass-card fade-in"
                style={{
                  borderRadius: "20px", padding: "32px", position: "relative", overflow: "hidden",
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                {/* Background quotation mark */}
                <span style={{
                  position: "absolute", top: "12px", right: "20px",
                  fontSize: "120px", fontFamily: "Georgia, serif",
                  color: "white", opacity: 0.04, lineHeight: 1, pointerEvents: "none",
                  userSelect: "none",
                }}>&ldquo;</span>

                <div style={{ display: "flex", gap: "4px", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#facc15", fontSize: "14px" }}>{"\u2605"}</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic", fontSize: "14px", position: "relative", zIndex: 1 }}>
                  &ldquo;{t.quote.split(t.boldPart)[0]}<span className="gradient-text" style={{ fontStyle: "normal" }}>{t.boldPart}</span>{t.rest}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
                  {/* Gradient ring avatar */}
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    padding: "2px", flexShrink: 0,
                  }}>
                    <div style={{
                      width: "100%", height: "100%", borderRadius: "50%",
                      background: "#12131a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: "12px", fontWeight: 700,
                    }}>{t.initials}</div>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{t.role} &middot; {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                         */}
      {/* ============================================================ */}
      <section id="faq" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>FAQ</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="fade-in" style={{ position: "relative", zIndex: 10, maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Get Started</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.1 }}>
            Every missed call is{" "}<span className="gradient-text">money left behind.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
            Stop sending revenue to voicemail. Call our AI first, then see our plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/pricing" className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              See Pricing &rarr;
            </Link>
            <a href={DEMO_PHONE_HREF} className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              {"\u{1F4DE}"} Call {DEMO_PHONE}
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No contracts. No tech skills needed. 14-day money-back guarantee.</p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 1rem 96px" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div style={{ marginBottom: "16px" }}>
                <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "32px", width: "auto" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>The AI voice receptionist for realtors, investors, and tradespeople who can&apos;t afford to miss a call.</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "16px" }}>Secured by Stripe &middot; 256-bit SSL</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Product</p>
              {[["#features", "Features"], ["/pricing", "Pricing"], ["#how-it-works", "How It Works"], ["#hear-it", "Hear It Live"]].map(([href, label]) => (
                <a key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</a>
              ))}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>Company</p>
              {[["/contact", "Contact"], ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]].map(([href, label]) => (
                <Link key={label} href={href} style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", marginBottom: "12px" }}>{label}</Link>
              ))}
              <a href={DEMO_PHONE_HREF} style={{ display: "block", color: "#a78bfa", fontSize: "14px", fontWeight: 600, textDecoration: "none", marginBottom: "8px" }}>{"\u{1F4DE}"} {DEMO_PHONE}</a>
              <Link href="/pricing" className="btn-glow" style={{ display: "inline-block", color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", marginTop: "8px" }}>See Pricing &rarr;</Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>&copy; 2026 All The Calls. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>All The Calls is an AI-powered voice receptionist service. Results may vary by market and usage.</p>
          </div>
        </div>
      </footer>
      </main>

      {/* ============================================================ */}
      {/*  FLOATING MOBILE CTA                                         */}
      {/* ============================================================ */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: pastHero ? "auto" : "none",
        }}
      >
        <a
          href={DEMO_PHONE_HREF}
          style={{
            display: "block",
            width: "100%",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
            padding: "16px 24px",
            borderRadius: "999px",
            textDecoration: "none",
            textAlign: "center",
            animation: "float-glow 2s ease-in-out infinite",
          }}
        >
          {"\u{1F4DE}"} Call Our AI Now
        </a>
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

      {/* CSS custom property support for conic-gradient animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}} />
    </div>
  );
}
