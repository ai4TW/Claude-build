"use client";

/**
 * AllTheCalls.ai — Main Landing Page
 * Primary audience: real estate professionals (agents, brokers, investors, lenders,
 *   title, property managers). Copy explicitly welcomes any business that can't
 *   miss a call.
 * Primary hook: "Every missed call is money left on the table" — inbound receptionist.
 * <30s outbound remains a feature, not the hero.
 * Offer: $497/mo — gated behind lead-capture form on /pricing.
 * Design: Midnight Intelligence (dark premium tech)
 */

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/hero_dark_bg-fkt9hQFvTLbJjo3Xfqo2GA.webp";
const FEATURES_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663500027049/hApYubRRcrnE9zFXtM2xoS/features_bg-Du87iwMHbT3Kn67LivhhPN.webp";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";
// All primary CTAs route to /pricing — which is gated behind a lead form.
// Phone CTAs always bypass the gate for highest-intent visitors.
const PRIMARY_CTA = "/pricing";
const BOOK_URL = "/book";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Stat {
  display: string;
  label: string;
}

const stats: Stat[] = [
  { display: "24/7", label: "Every Call Answered" },
  { display: "0", label: "Missed Calls" },
  { display: "100%", label: "Leads Captured" },
  { display: "<30s", label: "Callback on New Leads" },
];

const AUDIENCE_TAGS = [
  { icon: "\u{1F3E0}", label: "Agents & Brokers" },
  { icon: "\u{1F3D7}\uFE0F", label: "Investors" },
  { icon: "\u{1F4B0}", label: "Lenders" },
  { icon: "\u{1F4DC}", label: "Title Companies" },
  { icon: "\u{1F511}", label: "Property Managers" },
  { icon: "\u2795", label: "& More" },
];

const steps = [
  {
    num: "01",
    title: "We Build Your AI",
    desc:
      "We configure your AI receptionist with your business name, your voice, and the exact questions you want asked on every call. Done-for-you.",
    icon: "\u26A1",
  },
  {
    num: "02",
    title: "Forward Your Number",
    desc:
      "Forward your existing business line to your new dedicated AI number. Takes 30 seconds. Your callers dial the same number they always have.",
    icon: "\u{1F4DE}",
  },
  {
    num: "03",
    title: "Never Miss Another Call",
    desc:
      "3 AM, Sunday, holiday, mid-showing, mid-closing — every caller gets answered, qualified, and captured. You get a clean summary on your phone.",
    icon: "\u{1F3C6}",
  },
];

const features = [
  {
    title: "24/7 Inbound Answering",
    desc:
      "Every call — morning, night, weekend, holiday — gets picked up in your name. No voicemail, no missed opportunities, no angry callbacks.",
    iconKey: "moon" as const,
  },
  {
    title: "Answers In Your Business Name",
    desc:
      "Callers hear your business name and your assistant — not a generic bot. Most callers never realize it's AI.",
    iconKey: "mic" as const,
  },
  {
    title: "Qualifies Every Lead",
    desc:
      "The right questions for your business — buyer vs seller, loan type, property condition, service need, timeline, urgency. You get a clean deal sheet.",
    iconKey: "crosshair" as const,
  },
  {
    title: "SMS Follow-Up, Automatically",
    desc:
      "Every caller gets a text with your contact info and next steps within seconds of hanging up. Keeps you top-of-mind before they call the next guy.",
    iconKey: "message" as const,
  },
  {
    title: "Native Calendar Booking",
    desc:
      "Connects to Google and Outlook via OAuth. AI books appointments on your calendar on the fly, sends confirmations, no password sharing.",
    iconKey: "calendar" as const,
  },
  {
    title: "<30s Outbound on New Leads",
    desc:
      "New contact hits your CRM? The AI calls them back in under 30 seconds — before they start calling your competitors.",
    iconKey: "bolt" as const,
  },
];

const testimonials = [
  {
    quote:
      "I was losing deals because I couldn't answer calls during showings. AllTheCalls fixed that overnight. A seller called at 9 PM on a Friday — the AI qualified them and booked me on Monday. I closed it that week.",
    boldPart: "AllTheCalls fixed that overnight.",
    rest: "",
    name: "Rachel M.",
    role: "Real Estate Agent",
    location: "Austin, TX",
    initials: "RM",
  },
  {
    quote:
      "We were losing $20k deals because voicemails took us two days to call back. AllTheCalls hit every new PPL lead in under a minute. Locked up three wholesale contracts our first week.",
    boldPart: "Locked up three wholesale contracts our first week.",
    rest: "",
    name: "Derek M.",
    role: "Real Estate Investor",
    location: "Dallas, TX",
    initials: "DM",
  },
  {
    quote:
      "I run a 6-person HVAC company and it's like having a full-time dispatcher for less than I was spending on missed-call callbacks. Every lead captured, every call answered professionally.",
    boldPart: "like having a full-time dispatcher",
    rest: " for less than I was spending on missed-call callbacks.",
    name: "Derek S.",
    role: "HVAC & Plumbing",
    location: "Phoenix, AZ",
    initials: "DS",
  },
];

const faqs = [
  {
    q: "Who is this built for?",
    a: "Real estate professionals first — agents, brokers, investors, lenders, title companies, property managers. But it works for any business that can't afford to miss a call: home services, trades, legal, medical, any service business that runs on inbound leads.",
  },
  {
    q: "Does it really sound like my business?",
    a: "Yes. You give us your business name and how you want the AI to answer. Callers hear your name — not 'AllTheCalls,' not a generic bot. Most callers never realize they're not talking to your front desk.",
  },
  {
    q: "How much revenue am I actually losing to missed calls?",
    a: "Industry averages: businesses miss 20-30% of inbound calls, and a missed call converts to a booked appointment <1% of the time vs. ~50% when answered live. Do the math on your average deal size times lost leads — most business owners are leaving tens of thousands per year on voicemail.",
  },
  {
    q: "How fast can I go live?",
    a: "Most businesses are answering calls within 24-48 hours. Our team handles the full setup — you just forward your existing number.",
  },
  {
    q: "What if I want to take a call myself?",
    a: "Don't forward during hours you want to handle yourself. You control when AllTheCalls is on — after-hours, weekends, when you're in meetings, or always. Your call, always.",
  },
  {
    q: "What if I'm not happy with it?",
    a: "14-day money-back guarantee. If you don't love it, let us know within 14 days and we'll refund every penny. No questions.",
  },
  {
    q: "Can I hear it before I sign up?",
    a: `Yes — call ${DEMO_PHONE} right now and hear a live AllTheCalls AI handle a call end-to-end. 60 seconds, no signup. Or fill in the form on our pricing page and we'll build a free custom demo in your business name.`,
  },
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
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: `url(#${id})`,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (iconKey) {
    case "bolt":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "mic":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "crosshair":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          {gradientDefs(id)}
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
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
  0%, 100% { box-shadow: 0 0 20px rgba(74,222,128,0.5), 0 0 40px rgba(34,197,94,0.2); }
  50%      { box-shadow: 0 0 30px rgba(74,222,128,0.7), 0 0 60px rgba(34,197,94,0.35); }
}
`;

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useScrollFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
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
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="gradient-text"
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 700,
          marginBottom: "4px",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {stat.display}
      </div>
      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
        {stat.label}
      </div>
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
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "3px",
          background: open ? "linear-gradient(to bottom, #7c3aed, #06b6d4)" : "transparent",
          transition: "background 0.3s ease",
        }}
      />
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 24px 20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          cursor: "pointer",
          background: "none",
          border: "none",
          color: "inherit",
        }}
      >
        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{q}</span>
        <span
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "1.25rem",
            flexShrink: 0,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(135deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "0 24px 20px 28px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              fontSize: "14px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "16px",
            }}
          >
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "2px",
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          transition: "width 0.4s ease",
        }}
      />
      <div
        className="icon-glow"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          animation: hovered ? "icon-bounce 0.5s ease" : "none",
        }}
      >
        <FeatureIcon iconKey={f.iconKey} size={24} />
      </div>
      <h3 style={{ fontWeight: 700, color: "white", marginBottom: "8px", fontSize: "14px" }}>
        {f.title}
      </h3>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>
        {f.desc}
      </p>
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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => setPastHero(!entries[0].isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08090f",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(8,9,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "0 1rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              How It Works
            </a>
            <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Features
            </a>
            <Link href="/pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Pricing
            </Link>
            <Link href={BOOK_URL} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Book a Call
            </Link>
            <a href="#hear-it" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Hear It Live
            </a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={DEMO_PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                color: "#86efac",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(74,222,128,0.3)",
                background: "rgba(34,197,94,0.08)",
                fontWeight: 600,
              }}
            >
              {"\u{1F4DE}"} {DEMO_PHONE}
            </a>
            <Link
              href={PRIMARY_CTA}
              className="btn-glow"
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "12px",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              See Pricing
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  animation: "shimmer 3s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
            </Link>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "2px",
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className="md:hidden"
          style={{
            maxHeight: menuOpen ? "440px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            background: "rgba(8,9,15,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              padding: menuOpen ? "16px 1rem 24px" : "0 1rem",
              transition: "padding 0.3s ease",
              borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                ["#how-it-works", "How It Works"],
                ["#features", "Features"],
                ["/pricing", "Pricing"],
                ["/book", "Book a Call"],
                ["#hear-it", "Hear It Live"],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {label}
                </a>
              ))}
              <a
                href={DEMO_PHONE_HREF}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "16px",
                  display: "block",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                }}
              >
                {"\u{1F4DE}"} Call Our AI Now &mdash; {DEMO_PHONE}
              </a>
              <Link
                href={PRIMARY_CTA}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "8px",
                  display: "block",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                }}
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section
          ref={heroRef}
          aria-label="Hero"
          style={{
            position: "relative",
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            paddingTop: "64px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${HERO_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(8,9,15,0.97) 35%, rgba(8,9,15,0.5) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "128px",
              background: "linear-gradient(to bottom, transparent, #08090f)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "6rem 1rem 5rem",
              width: "100%",
              animation: "hero-entrance 0.8s ease-out both",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "32px",
                  border: "1px solid rgba(124,58,237,0.3)",
                  background: "rgba(124,58,237,0.1)",
                  color: "#c4b5fd",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                24/7 AI Receptionist &mdash; Real Estate Pros &amp; Any Business
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "24px",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                }}
              >
                Every missed call is{" "}
                <span className="gradient-text">money walking out the door.</span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "14px",
                  lineHeight: 1.6,
                  maxWidth: "580px",
                }}
              >
                AllTheCalls is your 24/7 AI receptionist &mdash; it answers every inbound
                in your business name, qualifies the caller, books the meeting, and texts
                you the summary. So you never lose another lead to voicemail.
              </p>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "28px",
                  maxWidth: "580px",
                  lineHeight: 1.55,
                }}
              >
                Built for real estate pros. Works for any business that can&apos;t afford to miss a call.
              </p>

              {/* Audience chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
                {AUDIENCE_TAGS.map((a) => (
                  <div
                    key={a.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <span>{a.icon}</span> {a.label}
                  </div>
                ))}
              </div>

              {/* PRIMARY CTAs — phone first, huge, green */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={DEMO_PHONE_HREF}
                  className="w-full sm:w-auto"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "17px",
                    padding: "18px 28px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    boxShadow: "0 10px 30px rgba(16,185,129,0.35)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{"\u{1F4DE}"}</span>
                  Call Our AI &mdash; {DEMO_PHONE}
                </a>
                <Link
                  href={PRIMARY_CTA}
                  className="w-full sm:w-auto btn-glow"
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                    padding: "18px 28px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  See Pricing &rarr;
                </Link>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                60 seconds, no signup &middot; Or see pricing in one click &middot; 14-day money-back guarantee
              </p>

              {/* Live call demo card */}
              <div style={{ position: "relative", marginTop: "32px", maxWidth: "400px" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "200px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />
                <div className="glass-card" style={{ borderRadius: "16px", padding: "16px", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#4ade80",
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                      Live Now
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                      AI Receptionist
                    </span>
                  </div>
                  <WaveformBars />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "8px",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;Thanks for calling &mdash; I&apos;m their assistant, how can I help you?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.02)",
            padding: "40px 1rem",
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            style={{ maxWidth: "1024px", margin: "0 auto" }}
          >
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <section style={{ padding: "6rem 1rem", position: "relative" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "48px" }}>
              <p
                style={{
                  color: "#a78bfa",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                Who It&apos;s For
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Built for businesses that{" "}
                <span className="gradient-text">can&apos;t afford to miss a call</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "17px",
                  maxWidth: "640px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Real estate pros are our sweet spot &mdash; but any business where a missed
                call is a lost customer wins the same way.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Agents & Brokers",
                  desc:
                    "Every buyer lead, listing inquiry, and showing request answered instantly. Qualified and booked on your calendar while you're closing the last one.",
                },
                {
                  title: "Real Estate Investors",
                  desc:
                    "Every motivated-seller call answered 24/7. Every new CRM lead called back in under 30 seconds. Your pipeline stops leaking.",
                },
                {
                  title: "Lenders & Title",
                  desc:
                    "Every loan inquiry, every closing question, every pre-qual answered in your name. Booked into your calendar, logged in your CRM.",
                },
                {
                  title: "Property Managers",
                  desc:
                    "Tenant calls, inquiry calls, maintenance escalations — triaged and routed. Urgent hits your phone, everything else lives in your CRM.",
                },
                {
                  title: "Home Services & Trades",
                  desc:
                    "HVAC, plumbing, electrical, roofing, contractors. Your AI dispatches by urgency, captures the job details, books the quote.",
                },
                {
                  title: "Any Business Owner",
                  desc:
                    "If you&apos;re losing money to voicemail, we fix that. One plan, done-for-you setup, live in 24-48 hours.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card fade-in" style={{ borderRadius: "16px", padding: "24px" }}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      color: "white",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13.5px", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HEAR IT LIVE */}
        <section id="hear-it" style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "400px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              opacity: 0.08,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div className="fade-in">
              <p
                style={{
                  color: "#4ade80",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "16px",
                }}
              >
                &#9679; Live Demo &mdash; No signup, no form
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "20px",
                  lineHeight: 1.1,
                }}
              >
                Call our AI right now.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "18px",
                  marginBottom: "48px",
                  maxWidth: "540px",
                  margin: "0 auto 48px",
                }}
              >
                Pretend you&apos;re a caller. Hear exactly what your customers would hear &mdash;
                tone, pacing, qualification. Takes 60 seconds.
              </p>

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "2px",
                  borderRadius: "24px",
                  background: "conic-gradient(from var(--border-angle, 0deg), #7c3aed, #06b6d4, #7c3aed)",
                  animation: "border-spin 3s linear infinite",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    background: "rgba(8,9,15,0.95)",
                    borderRadius: "22px",
                    padding: "32px 48px",
                    backdropFilter: "blur(20px)",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "48px",
                        height: "48px",
                        border: "2px solid rgba(124,58,237,0.3)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        animation: "pulse-ring 2s ease-out infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "48px",
                        height: "48px",
                        border: "2px solid rgba(6,182,212,0.3)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        animation: "pulse-ring 2s ease-out infinite 0.6s",
                      }}
                    />
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <FeatureIcon iconKey="phone" size={32} />
                    </div>
                  </div>

                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    Tap to call
                  </div>
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                {["It answers in your name", "Qualifies the caller", "Texts you the summary"].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                    {i < 2 && (
                      <div
                        style={{
                          width: "32px",
                          height: "2px",
                          background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                          margin: "0 12px",
                          opacity: 0.4,
                          flexShrink: 0,
                        }}
                      />
                    )}
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
              <p
                style={{
                  color: "#a78bfa",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                How It Works
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Live in 48 hours. <span className="gradient-text">Done-for-you.</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "18px",
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
              >
                No tech skills needed. Our team handles the full setup &mdash; you just forward your number.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="glass-card fade-in"
                  style={{
                    borderRadius: "20px",
                    padding: "32px",
                    position: "relative",
                    overflow: "hidden",
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "128px",
                      height: "128px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent)",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{step.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "3rem",
                      fontWeight: 700,
                      opacity: 0.08,
                      marginBottom: "8px",
                      lineHeight: 1,
                      color: "white",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "14px" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          style={{
            padding: "7rem 1rem",
            position: "relative",
            overflow: "hidden",
            backgroundImage: `url(${FEATURES_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(8,9,15,0.88)" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "1024px", margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
              <p
                style={{
                  color: "#22d3ee",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                What You Get
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}
              >
                Everything a top-tier receptionist does,{" "}
                <span className="gradient-text">at a fraction of the cost.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>
                One month covers years of service. And your AI never calls in sick.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <FeatureCard key={f.title} f={f} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "7rem 1rem" }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "64px" }}>
              <p
                style={{
                  color: "#a78bfa",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                Businesses Using AllTheCalls
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Leads captured. <span className="gradient-text">Deals closed.</span>
              </h2>
            </div>
            <div className="testimonials-scroll" style={{ display: "grid", gap: "24px" }}>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
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
                  `,
                }}
              />
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="glass-card fade-in"
                  style={{
                    borderRadius: "20px",
                    padding: "32px",
                    position: "relative",
                    overflow: "hidden",
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "20px",
                      fontSize: "120px",
                      fontFamily: "Georgia, serif",
                      color: "white",
                      opacity: 0.04,
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    &ldquo;
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      marginBottom: "16px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#facc15", fontSize: "14px" }}>
                        {"\u2605"}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.7,
                      marginBottom: "24px",
                      fontStyle: "italic",
                      fontSize: "14px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    &ldquo;{t.quote.split(t.boldPart)[0]}
                    <span className="gradient-text" style={{ fontStyle: "normal" }}>
                      {t.boldPart}
                    </span>
                    {t.rest}&rdquo;
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        padding: "2px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: "#12131a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {t.initials}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "white", fontSize: "14px" }}>{t.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                        {t.role} &middot; {t.location}
                      </p>
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
              <p
                style={{
                  color: "#22d3ee",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                FAQ
              </p>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Questions <span className="gradient-text">business owners ask</span>
              </h2>
            </div>
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((faq, i) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: "7rem 1rem", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              opacity: 0.12,
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="fade-in"
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "768px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#a78bfa",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              Stop losing leads to voicemail
            </p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontWeight: 700,
                color: "white",
                marginBottom: "24px",
                lineHeight: 1.1,
              }}
            >
              Every missed call is{" "}
              <span className="gradient-text">a customer going to someone else.</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "18px",
                marginBottom: "40px",
                maxWidth: "520px",
                margin: "0 auto 40px",
              }}
            >
              Live in 24-48 hours. No contracts. 14-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={DEMO_PHONE_HREF}
                className="w-full sm:w-auto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "18px",
                  padding: "18px 36px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  boxShadow: "0 12px 30px rgba(16,185,129,0.4)",
                }}
              >
                {"\u{1F4DE}"} Call Our AI &mdash; {DEMO_PHONE}
              </a>
              <Link
                href={PRIMARY_CTA}
                className="w-full sm:w-auto btn-glow"
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "18px",
                  padding: "18px 40px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                See Pricing &rarr;
              </Link>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
              No contracts &middot; No tech skills needed &middot; 14-day money-back guarantee
            </p>
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
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    maxWidth: "280px",
                  }}
                >
                  The AI voice receptionist for real estate pros and any business that
                  can&apos;t afford to miss a call.
                </p>
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "16px" }}>
                  Secured by Stripe &middot; 256-bit SSL
                </p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>
                  Product
                </p>
                {[
                  ["#features", "Features"],
                  ["/pricing", "Pricing"],
                  ["/book", "Book a Call"],
                  ["#how-it-works", "How It Works"],
                  ["#hear-it", "Hear It Live"],
                ].map(([href, label]) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "14px",
                      textDecoration: "none",
                      marginBottom: "12px",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px", marginBottom: "16px" }}>
                  Company
                </p>
                {[
                  ["/contact", "Contact"],
                  ["/privacy", "Privacy Policy"],
                  ["/terms", "Terms of Service"],
                ].map(([href, label]) => (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "14px",
                      textDecoration: "none",
                      marginBottom: "12px",
                    }}
                  >
                    {label}
                  </Link>
                ))}
                <a
                  href={DEMO_PHONE_HREF}
                  style={{
                    display: "block",
                    color: "#86efac",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    marginBottom: "8px",
                  }}
                >
                  {"\u{1F4DE}"} {DEMO_PHONE}
                </a>
                <Link
                  href={PRIMARY_CTA}
                  className="btn-glow"
                  style={{
                    display: "inline-block",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "10px 20px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    marginTop: "8px",
                  }}
                >
                  See Pricing &rarr;
                </Link>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: "32px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px" }}>
                &copy; 2026 AllTheCalls. Never miss another call.
              </p>
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>
                Results may vary by market and usage.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* FLOATING MOBILE CTA — phone first (higher intent than scroll-to-form) */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: pastHero ? "auto" : "none",
          display: "flex",
          gap: "8px",
        }}
      >
        <a
          href={DEMO_PHONE_HREF}
          style={{
            flex: "2 1 60%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            padding: "14px 16px",
            borderRadius: "999px",
            textDecoration: "none",
            animation: "float-glow 2s ease-in-out infinite",
          }}
        >
          {"\u{1F4DE}"} Call Our AI
        </a>
        <Link
          href={PRIMARY_CTA}
          style={{
            flex: "1 1 40%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            padding: "14px 16px",
            borderRadius: "999px",
            textDecoration: "none",
          }}
        >
          See Pricing
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @property --border-angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
            }
          `,
        }}
      />
    </div>
  );
}
