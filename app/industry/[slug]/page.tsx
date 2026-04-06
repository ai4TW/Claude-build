"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import PricingSection from "@/components/PricingSection";

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(888) 555-0100";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+18885550100";

// Basic mapping of slugs to industry metadata
const INDUSTRY_DATA: Record<string, { title: string, keyword: string, description: string, emoji: string }> = {
  "real-estate": {
    title: "Real Estate Agents",
    keyword: "Real Estate",
    description: "Never miss a lead while you're out taking a showing. Our AI answers instantly, qualifies the buyer/seller, and books appointments.",
    emoji: "🏠"
  },
  "legal": {
    title: "Law Firms",
    keyword: "Legal",
    description: "Ensure every potential client reaches a professional voice. Our AI handles initial intake and routes urgent case details securely.",
    emoji: "⚖️"
  },
  "medical": {
    title: "Medical Practices",
    keyword: "Medical",
    description: "Reduce front-desk overwhelming. Your AI receptionist handles basic scheduling, FAQs, and securely triages messages.",
    emoji: "🏥"
  },
  "home-services": {
    title: "Home Service Pros",
    keyword: "Home Services",
    description: "You're under a sink or on a roof. We answer the phone, capture the lead, and dispatch it directly to you via SMS.",
    emoji: "🔧"
  }
};

export default function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const data = INDUSTRY_DATA[resolvedParams.slug] || {
    title: "Your Business",
    keyword: "Any Industry",
    description: "No matter your vertical, we answer every call, ask the right questions, and secure your bookings.",
    emoji: "🎯"
  };

  useEffect(() => {
    // Scroll fade in logic can go here if needed
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #e4e4e7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.5px" }}>AllTheCalls</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/blog" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
            <a href="/#how-it-works" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>How it works</a>
            <a href="/#pricing" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Call {DEMO_PHONE}</a>
            <Link href="/onboarding" className="btn-primary" style={{ fontSize: "14px", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section style={{ paddingTop: "140px", paddingBottom: "80px", paddingLeft: "1.5rem", paddingRight: "1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, marginBottom: "32px", border: "1px solid #e4e4e7", background: "#fafafa", color: "#52525b" }}>
              <span style={{ marginRight: "8px" }}>{data.emoji}</span>
              AI Phone Receptionist for {data.title}
            </div>
            <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 700, color: "#09090b", marginBottom: "24px", letterSpacing: "-0.04em" }}>
              Answer every {data.keyword} call.<br/>Secure every booking.
            </h1>
            <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", color: "#52525b", marginBottom: "40px", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto" }}>
              {data.description}
            </p>

            <Link 
              href={`/onboarding?industry=${data.keyword}`}
              className="btn-primary" 
              style={{ display: "inline-block", padding: "16px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", whiteSpace: "nowrap", textDecoration: "none" }}
            >
              Get Started for {data.keyword}
            </Link>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />
      </main>

      <footer style={{ borderTop: "1px solid #e4e4e7", padding: "80px 1.5rem 40px", background: "#ffffff", textAlign: "center" }}>
        <p style={{ color: "#a1a1aa", fontSize: "13px" }}>© 2026 AllTheCalls. All rights reserved.</p>
      </footer>
    </div>
  );
}
