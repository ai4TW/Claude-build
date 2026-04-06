import Link from "next/link";
import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(888) 555-0100";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+18885550100";

const INDUSTRY_DATA: Record<string, {
  title: string;
  keyword: string;
  description: string;
  emoji: string;
  headline: string;
  bullets: string[];
  metaTitle: string;
  metaDesc: string;
}> = {
  "real-estate": {
    title: "Real Estate Agents",
    keyword: "Real Estate",
    emoji: "🏠",
    headline: "Never miss a lead while you're out on a showing.",
    description: "Your AI receptionist answers instantly, qualifies buyers and sellers, and books appointments — 24/7. Every missed call was a lost commission. Not anymore.",
    bullets: [
      "Answers in your name — sounds like your own assistant",
      "Qualifies buyer/seller: timeline, budget, pre-approval status",
      "Books showings and callbacks directly into your calendar",
      "SMS follow-up sent immediately after every call",
      "After-hours coverage every night and weekend",
    ],
    metaTitle: "AI Receptionist for Real Estate Agents | AllTheCalls.ai",
    metaDesc: "Never miss a real estate lead. Your AI receptionist answers every call in your name, qualifies buyers and sellers, and books showings 24/7.",
  },
  "legal": {
    title: "Law Firms",
    keyword: "Legal",
    emoji: "⚖️",
    headline: "Every potential client deserves a professional first impression.",
    description: "Your AI handles initial intake, captures case details, and routes urgent calls — so no prospective client hits voicemail.",
    bullets: [
      "Answers in your firm's name — professional, calm, precise",
      "Initial intake: practice area, case type, urgency",
      "Captures contact info and case details before you call back",
      "SMS follow-up with your contact info after every call",
      "After-hours and weekend coverage for urgent matters",
    ],
    metaTitle: "AI Receptionist for Law Firms | AllTheCalls.ai",
    metaDesc: "Never miss a client intake call. Your AI receptionist answers in your firm's name, captures case details, and handles after-hours calls 24/7.",
  },
  "medical": {
    title: "Medical Practices",
    keyword: "Medical",
    emoji: "🏥",
    headline: "Reduce front-desk overwhelm without hiring more staff.",
    description: "Your AI handles appointment inquiries, FAQs, and basic triage — so your front desk can focus on patients in the office.",
    bullets: [
      "Answers in your practice name — warm, professional tone",
      "Handles scheduling inquiries, insurance questions, and FAQs",
      "Captures caller info and reason for call before you follow up",
      "After-hours coverage for urgent symptom questions",
      "SMS confirmation sent after every call",
    ],
    metaTitle: "AI Receptionist for Medical Practices | AllTheCalls.ai",
    metaDesc: "Reduce front-desk calls. Your AI receptionist answers in your practice name, handles FAQs, and covers after-hours inquiries 24/7.",
  },
  "home-services": {
    title: "Home Service Pros",
    keyword: "Home Services",
    emoji: "🔧",
    headline: "You're under a sink or on a roof. We answer the phone.",
    description: "Your AI captures every lead while you're on a job — so you never lose a booking to a competitor who picked up.",
    bullets: [
      "Answers in your business name while you're on the job",
      "Captures service type, address, urgency, and contact info",
      "Dispatches lead details to you instantly via SMS",
      "Books callbacks and estimates around your schedule",
      "After-hours and weekend coverage — never send to voicemail",
    ],
    metaTitle: "AI Receptionist for Home Service Businesses | AllTheCalls.ai",
    metaDesc: "Never lose a job lead. Your AI receptionist answers every call in your business name while you're on the job — 24/7.",
  },
  "dental": {
    title: "Dental Practices",
    keyword: "Dental",
    emoji: "🦷",
    headline: "Every missed call is a patient going to another dentist.",
    description: "Your AI handles appointment requests, insurance questions, and new patient inquiries around the clock — so your front desk isn't the bottleneck.",
    bullets: [
      "Answers in your practice name — friendly and professional",
      "Handles new patient inquiries, appointment requests, insurance FAQs",
      "Captures patient name, insurance, and reason for visit",
      "After-hours emergency routing for urgent dental pain",
      "SMS follow-up with your contact info after every call",
    ],
    metaTitle: "AI Receptionist for Dental Practices | AllTheCalls.ai",
    metaDesc: "Stop losing new patients to voicemail. Your AI receptionist answers every call in your practice name, handles FAQs, and books appointments 24/7.",
  },
  "financial": {
    title: "Financial Advisors",
    keyword: "Financial",
    emoji: "📈",
    headline: "High-value clients don't leave voicemails.",
    description: "Your AI answers professionally, qualifies prospects by assets and goals, and books consultations — so your pipeline never stalls.",
    bullets: [
      "Answers in your name — conveys trust and professionalism",
      "Qualifies prospects: assets under management, retirement goals, urgency",
      "Books discovery calls and consultations around your calendar",
      "After-hours coverage when markets move and clients have questions",
      "SMS confirmation and follow-up after every call",
    ],
    metaTitle: "AI Receptionist for Financial Advisors | AllTheCalls.ai",
    metaDesc: "Never miss a high-value prospect. Your AI receptionist answers in your name, qualifies leads by assets and goals, and books consultations 24/7.",
  },
  "hvac": {
    title: "HVAC & Plumbing",
    keyword: "HVAC & Plumbing",
    emoji: "🌡️",
    headline: "A/C out at 10 PM? Your AI answers. You get the job.",
    description: "Emergency service calls don't wait for business hours. Your AI captures every lead — day, night, and weekends — and dispatches them to you immediately.",
    bullets: [
      "Answers in your company name — even at midnight",
      "Captures service type, address, urgency level, and contact info",
      "Immediately texts you lead details for rapid dispatch",
      "Differentiates emergency vs. non-urgent calls",
      "Books estimates and callbacks around your schedule",
    ],
    metaTitle: "AI Receptionist for HVAC & Plumbing | AllTheCalls.ai",
    metaDesc: "Never miss an emergency service call. Your AI receptionist answers 24/7 in your name, captures the job details, and dispatches leads to you instantly.",
  },
  "salon": {
    title: "Salons & Spas",
    keyword: "Salon & Spa",
    emoji: "✂️",
    headline: "Fully booked means every call gets answered — even mid-cut.",
    description: "Your AI handles appointment requests, service questions, and pricing inquiries while you're with a client — so you never miss a booking.",
    bullets: [
      "Answers in your salon name — warm, friendly, on-brand",
      "Handles booking requests, service inquiries, and pricing questions",
      "Captures client name, service type, and preferred appointment time",
      "After-hours booking inquiries — captured and ready when you open",
      "SMS confirmation and follow-up after every call",
    ],
    metaTitle: "AI Receptionist for Salons & Spas | AllTheCalls.ai",
    metaDesc: "Never miss a booking while you're with a client. Your AI receptionist answers in your salon name, handles inquiries, and captures appointments 24/7.",
  },
  "auto": {
    title: "Auto Dealerships",
    keyword: "Auto",
    emoji: "🚗",
    headline: "Every call is a buyer. Make sure someone answers.",
    description: "Your AI handles sales inquiries, service scheduling, and inventory questions — so floor staff can close deals instead of answering phones.",
    bullets: [
      "Answers in your dealership name — professional and direct",
      "Handles new/used car inquiries, trade-in questions, service scheduling",
      "Captures buyer's name, vehicle interest, and purchase timeline",
      "Routes sales calls vs. service calls to the right team",
      "After-hours coverage for evening and weekend shoppers",
    ],
    metaTitle: "AI Receptionist for Auto Dealerships | AllTheCalls.ai",
    metaDesc: "Every call is a potential buyer. Your AI receptionist answers in your dealership name, handles inquiries, and routes calls to the right team 24/7.",
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug];
  if (!data) {
    return {
      title: "AI Voice Receptionist | AllTheCalls.ai",
      description: "24/7 AI receptionist for any business. Never miss a call.",
    };
  }
  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: { canonical: `https://allthecalls.ai/industry/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = INDUSTRY_DATA[slug] || {
    title: "Your Business",
    keyword: "Any Industry",
    emoji: "🎯",
    headline: "Every missed call is a missed opportunity.",
    description: "No matter your vertical, your AI receptionist answers every call, asks the right questions, and captures every lead — 24/7.",
    bullets: [
      "Answers in your business name 24/7",
      "Industry-specific lead qualification",
      "SMS follow-up after every call",
      "Full call transcripts delivered instantly",
      "After-hours and weekend coverage",
    ],
    metaTitle: "AI Voice Receptionist | AllTheCalls.ai",
    metaDesc: "24/7 AI receptionist for any business.",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>📞 {DEMO_PHONE}</a>
            <Link href="/#pricing" className="btn-glow" style={{ color: "white", fontSize: "14px", fontWeight: 600, padding: "10px 20px", borderRadius: "12px", textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "64px" }}>
        {/* HERO */}
        <section style={{ padding: "100px 1.5rem 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "400px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.07, filter: "blur(100px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, marginBottom: "28px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd" }}>
              <span style={{ marginRight: "8px" }}>{data.emoji}</span>
              AI Voice Receptionist for {data.title}
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "white", marginBottom: "20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              {data.headline}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", marginBottom: "40px", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 40px" }}>
              {data.description}
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
              <Link href={`/#pricing`} className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none" }}>
                Start Free Trial →
              </Link>
              <a href={DEMO_PHONE_HREF} className="btn-ghost" style={{ fontWeight: 600, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none" }}>
                📞 Call Our AI Now
              </a>
            </div>

            {/* Bullet points */}
            <div style={{ display: "inline-flex", flexDirection: "column", gap: "12px", textAlign: "left", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px 32px" }}>
              {data.bullets.map((bullet) => (
                <div key={bullet} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS for this niche */}
        <section style={{ padding: "80px 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "white" }}>
                We build it. You just forward your number.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {[
                { icon: "⚡", step: "01", title: "We Configure Your AI", desc: "Our team sets up your AI receptionist with your business name, scripts, and industry-specific qualification questions." },
                { icon: "📲", step: "02", title: "Forward Your Number", desc: "You forward your existing number to your new dedicated AI line. Takes 30 seconds. Your number stays the same." },
                { icon: "📋", step: "03", title: "Get Transcripts & Leads", desc: "Every call gets answered. You receive a full transcript and lead summary the moment it ends." },
              ].map((item) => (
                <div key={item.step} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px", position: "relative" }}>
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 700, opacity: 0.06, color: "white", marginBottom: "4px", lineHeight: 1 }}>{item.step}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 700, color: "white", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 1.5rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "20px" }}>
          <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "32px", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
          {[
            ["/industry/real-estate", "Real Estate"],
            ["/industry/legal", "Legal"],
            ["/industry/medical", "Medical"],
            ["/industry/dental", "Dental"],
            ["/industry/hvac", "HVAC & Plumbing"],
            ["/industry/financial", "Financial"],
            ["/industry/salon", "Salon & Spa"],
            ["/industry/auto", "Auto"],
            ["/industry/home-services", "Home Services"],
          ].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{label}</Link>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2026 All The Calls. All rights reserved.</p>
      </footer>
    </div>
  );
}
