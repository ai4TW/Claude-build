"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Audience: real estate investors (wholesalers, flippers, buy-and-hold, creative finance)
 * Offer: $497/mo — one plan, done-for-you. Custom buildouts via Calendly.
 * Design: Midnight Intelligence (dark premium tech)
 */

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/hero_dark_bg-fkt9hQFvTLbJjo3Xfqo2GA.webp";
const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/features_bg-Du87iwMHbT3Kn67LivhhPN.webp";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";
const CHECKOUT_URL = "/checkout?plan=pro";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";
const PRICE_DISPLAY = "$497/mo";

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
  { numericValue: 30, suffix: "s", prefix: "<", label: "Outbound Lead Response", display: "<30s" },
  { numericValue: 0, suffix: "", prefix: "", label: "Every Call Answered", display: "24/7" },
  { numericValue: 100, suffix: "%", prefix: "", label: "Leads Captured", display: "100%" },
  { numericValue: 1, suffix: "", prefix: "$", label: "Per Qualified Call", display: "<$1" },
];

const AUDIENCE_TAGS = [
  { icon: "\u{1F3D7}\uFE0F", label: "Wholesalers" },
  { icon: "\u{1F6E0}\uFE0F", label: "Flippers" },
  { icon: "\u{1F3E0}", label: "Buy & Hold" },
  { icon: "\u{1F4DD}", label: "Creative Finance" },
  { icon: "\u{1F4C8}", label: "PPL Buyers" },
  { icon: "\u{1F4EC}", label: "Direct Mail" },
];

const steps = [
  { num: "01", title: "We Build Your AI", desc: "Your AI acquisitions manager is configured with your name, market, buy box, and the exact qualification questions you want on every call.", icon: "\u26A1" },
  { num: "02", title: "We Plug Into Your CRM", desc: "Podio, REISift, GoHighLevel, Close — whatever you run. Every new lead fires a webhook and your AI is dialing in under 30 seconds.", icon: "\u{1F517}" },
  { num: "03", title: "Deals Land on Your Calendar", desc: "Qualified acquisitions calls get booked straight into your Google or Outlook calendar. You show up knowing the deal before you dial.", icon: "\u{1F3C6}" },
];

const features = [
  { title: "<30-Second Outbound Lead Response", desc: "New lead hits your CRM — from PPL, PPC, direct mail, SEO, bandit signs — and your AI is already dialing. Before your competitor even sees the notification.", iconKey: "bolt" as const },
  { title: "24/7 Inbound Answering", desc: "Motivated sellers don't call 9-to-5. Every inbound — 3 AM, Sunday, holiday, mid-closing — gets picked up in your name and qualified.", iconKey: "moon" as const },
  { title: "Motivated Seller Qualification", desc: "Condition, timeline, motivation, asking price, mortgage status, liens. The AI asks the right questions and sends you a clean deal sheet.", iconKey: "crosshair" as const },
  { title: "Native Calendar Booking", desc: "Connects directly to Google and Outlook via OAuth. No password sharing. AI books acquisitions calls on the fly and sends confirmations.", iconKey: "calendar" as const },
  { title: "CRM Auto-Sync", desc: "Every call — transcript, summary, deal notes — logged straight into your CRM. Podio, REISift, InvestorFuse, GHL, HubSpot, Close, or anything with a webhook.", iconKey: "crm" as const },
  { title: "Everything Included", desc: "Your dedicated phone number, SMS capability, DFY marketing website, client portal, and full white-glove setup. One price, no upsells.", iconKey: "package" as const },
];

const testimonials = [
  { quote: "We were losing $20k deals because voicemails took us two days to call back. AllTheCalls hit every new PPL lead in under a minute. Locked up three wholesale contracts our first week.", boldPart: "Locked up three wholesale contracts our first week.", rest: "", name: "Derek M.", role: "Wholesaler", location: "Dallas, TX", initials: "DM" },
  { quote: "I buy 8-12 houses a month. Before this I had two VAs chasing leads and still missing seller calls on Sundays. Now my AI catches everything and the VAs just close deals.", boldPart: "Now my AI catches everything and the VAs just close deals.", rest: "", name: "Ashley R.", role: "Fix & Flip Investor", location: "Tampa, FL", initials: "AR" },
  { quote: "Speed-to-lead is everything in this business. I stopped buying Zillow leads because I could never call fast enough. With AllTheCalls I'm hitting them in 20 seconds and my conversion has doubled.", boldPart: "my conversion has doubled.", rest: "", name: "Marcus T.", role: "Buy-and-Hold Investor", location: "Phoenix, AZ", initials: "MT" },
];

const faqs = [
  { q: "Will the AI actually sound like me answering?", a: "Yes. It uses your name, your market language, and your qualification script. Most motivated sellers don't realize they're talking to AI. Call (316) 232-4777 right now and decide for yourself — that's a live AllTheCalls AI." },
  { q: "Does the <30-second outbound actually work?", a: "When a new contact hits your CRM, we fire a webhook the moment it's created. The AI picks up the phone and starts dialing the seller inside 30 seconds — while their form submission is still warm. No other investor is calling that fast." },
  { q: "What CRMs do you connect to?", a: "Podio, REISift, InvestorFuse, GoHighLevel, Close, HubSpot, and anything that can send/receive webhooks. Zillow, PropStream, BatchLeads, DealMachine — if your lead source can fire a webhook, we can wire it." },
  { q: "What's actually included at $497/mo?", a: "Everything. Your AI, a dedicated phone number, SMS follow-up, DFY marketing website, client portal (iOS/Android), calendar integration, CRM integration, and full done-for-you setup by our team. No upsells, no add-ons." },
  { q: "When does Custom make sense?", a: "If you're running multiple acquisitions managers, multi-state, a fund, or need white-label / reseller access — go Custom. We build around your playbook. Book a call and we'll scope it." },
  { q: "How fast can I be live?", a: "Most investors are live within 24-48 hours. Once you sign up, our team handles the AI build, CRM integration, and phone forwarding setup. You just tell us your buy box." },
  { q: "What if it doesn't work out?", a: "14-day money-back guarantee. No questions. Email hello@allthecalls.ai and we refund you." },
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
    case "bolt":
      return <svg {...common}>{gradientDefs(id)}<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "moon":
      return <svg {...common}>{gradientDefs(id)}<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
    case "crosshair":
      return <svg {...common}>{gradientDefs(id)}<circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>;
    case "calendar":
      return <svg {...common}>{gradientDefs(id)}<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case "crm":
      return <svg {...common}>{gradientDefs(id)}<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
    case "package":
      return <svg {...common}>{gradientDefs(id)}<line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>;
    case "phone":
      return <svg {...common}>{gradientDefs(id)}<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  KEYFRAMES                                                          */
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
@keyframes icon-bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
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
            const eased = 1 - Math.pow(1 - progress, 3);
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

  // Static displays ("24/7", "<30s", "<$1")
  if (stat.display === "24/7" || stat.display === "<30s" || stat.display === "<$1") {
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
        <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "4px", fontFamily: "'Space Grotesk', sans-serif" }}>{stat.display}</div>
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

      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* NAV */}
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
            <img src="/logo.svg" alt="AllTheCalls" style={{ height: "40px", width: "auto" }} />
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
              href={CHECKOUT_URL}
              className="btn-glow"
              style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", position: "relative", overflow: "hidden" }}
            >
              Get Started — {PRICE_DISPLAY}
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
        {/* Mobile menu */}
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
              <Link href={CHECKOUT_URL} onClick={() => setMenuOpen(false)} className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "15px", padding: "14px 20px", borderRadius: "12px", textDecoration: "none", textAlign: "center", marginTop: "16px", display: "block" }}>
                Get Started &mdash; {PRICE_DISPLAY}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
      {/* HERO */}
      <section ref={heroRef} aria-label="Hero" style={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,9,15,0.97) 35%, rgba(8,9,15,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "128px", background: "linear-gradient(to bottom, transparent, #08090f)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1152px", margin: "0 auto", padding: "6rem 1rem", width: "100%", animation: "hero-entrance 0.8s ease-out both" }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "32px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              The AI Acquisitions Manager for Real Estate Investors
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Never lose another{" "}
              <span className="gradient-text">motivated seller.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7, maxWidth: "560px" }}>
              Your AI answers every inbound in your name &mdash; 24/7 &mdash; and calls every new CRM lead back in{" "}
              <span style={{ color: "white", fontWeight: 600 }}>under 30 seconds</span>. Qualified. Booked. Synced. Before your competitor even sees the notification.
            </p>

            {/* Audience chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {AUDIENCE_TAGS.map((a) => (
                <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                  <span>{a.icon}</span> {a.label}
                </div>
              ))}
            </div>

            {/* Live call demo card */}
            <div style={{ position: "relative", marginBottom: "32px", maxWidth: "400px" }}>
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
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Outbound in progress</span>
                  <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>New lead &middot; 00:12</span>
                </div>
                <WaveformBars />
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "8px", fontStyle: "italic" }}>&ldquo;Hi, I&apos;m calling about the property you just inquired about &mdash; is this a good time?&rdquo;</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href={CHECKOUT_URL} className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                Get Started &mdash; {PRICE_DISPLAY}
              </Link>
              <a href={DEMO_PHONE_HREF} className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
                {"\u{1F4DE}"} Hear It Live &rarr;
              </a>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>One plan &middot; No contracts &middot; 14-day money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "40px 1rem" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {stats.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>
      </div>

      {/* WHO IT'S FOR (REI segments) */}
      <section style={{ padding: "6rem 1rem", position: "relative" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Who It&apos;s For</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "white", marginBottom: "12px" }}>
              Built for investors where <span className="gradient-text">speed wins deals</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>
              If you&apos;re buying PPL leads, running direct mail, cold calling, or spending money on Google ads, a missed call or slow callback is a deal walking to your competitor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Wholesalers", desc: "Every motivated seller call gets picked up. Every Zillow/PropStream lead called back in 30 seconds. Your pipeline stops leaking." },
              { title: "Fix & Flip Investors", desc: "You&apos;re on a walkthrough, at the contractor meeting, or on vacation. The AI captures every inbound and qualifies for condition, timeline, and price." },
              { title: "Buy-and-Hold", desc: "Tenant calls, inquiry calls, pocket listings &mdash; all filtered and routed. Maintenance escalations hit your phone, the rest lives in your CRM." },
              { title: "PPL Lead Buyers", desc: "Stop letting $50 leads die in voicemail. AllTheCalls gets to them first &mdash; under 30 seconds from form submit &mdash; before your competition dials." },
              { title: "Creative Finance", desc: "Subject-to, seller finance, novations &mdash; deals take explaining. Your AI is trained on your exact pitch and qualifies complex structures." },
              { title: "Acquisitions Teams", desc: "Don&apos;t hire another VA you have to manage. Run the AI as your front-line qualifier, let your closers close the deals worth closing." },
            ].map((item) => (
              <div key={item.title} className="glass-card fade-in" style={{ borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13.5px", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEAR IT LIVE */}
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
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "48px", maxWidth: "540px", margin: "0 auto 48px" }}>
              Pretend you&apos;re a motivated seller. See what your callers actually hear &mdash; qualification, tone, pacing, the whole thing. 60 seconds.
            </p>

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
                <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: "48px", height: "48px", border: "2px solid rgba(124,58,237,0.3)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse-ring 2s ease-out infinite" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: "48px", height: "48px", border: "2px solid rgba(6,182,212,0.3)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse-ring 2s ease-out infinite 0.6s" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", width: "48px", height: "48px", border: "2px solid rgba(124,58,237,0.2)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse-ring 2s ease-out infinite 1.2s" }} />
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

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap", marginBottom: "16px" }}>
              {["It answers in your name", "Qualifies the seller", "Texts you the summary"].map((step, i) => (
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              We build it. <span className="gradient-text">You lock up deals.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", maxWidth: "520px", margin: "0 auto" }}>
              Live in 24-48 hours. Our team handles every piece &mdash; AI, phone, CRM, calendar, website.
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
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>What You Get</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
              Everything a 24/7 acquisitions team does,{" "}
              <span className="gradient-text">for a fraction of one VA.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>Your first month covers years of service. And your AI never takes a weekend off.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Investors Using AllTheCalls</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Deals locked up. <span className="gradient-text">Leads captured.</span>
            </h2>
          </div>
          <div className="testimonials-scroll" style={{ display: "grid", gap: "24px" }}>
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

      {/* FAQ */}
      <section id="faq" style={{ padding: "7rem 1rem" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#22d3ee", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>FAQ</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "white" }}>
              Questions <span className="gradient-text">investors ask</span>
            </h2>
          </div>
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="fade-in" style={{ position: "relative", zIndex: 10, maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Lock Up More Deals</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "white", marginBottom: "24px", lineHeight: 1.1 }}>
            Every missed call is{" "}<span className="gradient-text">a deal going to someone else.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px" }}>
            $497/mo. One plan. No contracts. Live in 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href={CHECKOUT_URL} className="btn-glow w-full sm:w-auto" style={{ color: "white", fontWeight: 700, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              Get Started &mdash; {PRICE_DISPLAY} &rarr;
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto" style={{ fontWeight: 600, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
              {"\u{1F4C5}"} Book a Call First
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>14-day money-back guarantee &middot; Custom available for larger operations</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 1rem 96px" }}>
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div style={{ marginBottom: "16px" }}>
                <img src="/logo.svg" alt="AllTheCalls" style={{ height: "32px", width: "auto" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>The AI acquisitions manager for real estate investors. 24/7 inbound. &lt;30s outbound on every new lead. Synced to your CRM.</p>
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
              <Link href={CHECKOUT_URL} className="btn-glow" style={{ display: "inline-block", color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none", marginTop: "8px" }}>Get Started &rarr;</Link>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>&copy; 2026 AllTheCalls. Built for real estate investors.</p>
            <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>AllTheCalls is an AI-powered voice agent service. Results may vary by market and usage.</p>
          </div>
        </div>
      </footer>
      </main>

      {/* FLOATING MOBILE CTA */}
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
        <Link
          href={CHECKOUT_URL}
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
          Get Started &mdash; {PRICE_DISPLAY}
        </Link>
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
