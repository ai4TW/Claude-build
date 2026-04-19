"use client";

import { useRouter } from "next/navigation";

const BOOK_URL = "/book";

const FEATURES: { text: string; highlight: boolean }[] = [
  { text: "Your AI receptionist — answers every call in your business name", highlight: true },
  { text: "24/7 inbound answering — every call picked up, morning, night, weekend", highlight: true },
  { text: "<30-second outbound callback on every new CRM lead", highlight: true },
  { text: "Lead qualification tuned to your business — the right questions, every time", highlight: true },
  { text: "Native calendar booking — Google & Outlook OAuth, no password sharing", highlight: true },
  { text: "CRM auto-sync — GoHighLevel, HubSpot, Close, and more via webhook", highlight: true },
  { text: "SMS follow-up automatically sent after every call", highlight: false },
  { text: "Full call transcripts + AI summary on your phone", highlight: false },
  { text: "DFY marketing website — built and hosted for you", highlight: false },
  { text: "Business phone number + texting included", highlight: false },
  { text: "Live client app — call history, recordings & transcripts on iOS/Android", highlight: false },
  { text: "Done-for-you setup by our team", highlight: false },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="8" cy="8" r="8" fill="#a78bfa" fillOpacity="0.15" />
      <path d="M5 8l2 2 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingSection() {
  const router = useRouter();

  return (
    <section id="pricing" style={{ padding: "96px 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "400px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", opacity: 0.08, filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Pricing</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, color: "white", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            One plan. <span style={{ background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Everything included.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            Everything you need to stop losing leads to voicemail &mdash; done-for-you, loaded into your account on day one.
          </p>
        </div>

        {/* The one plan */}
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            padding: "40px 36px",
            background: "rgba(124,58,237,0.10)",
            border: "1px solid rgba(124,58,237,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(124,58,237,0.2), 0 0 120px rgba(6,182,212,0.06)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-14px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              padding: "6px 18px",
              borderRadius: "999px",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            ALLTHECALLS &mdash; ALL-IN-ONE PLAN
          </div>

          <div style={{ textAlign: "center", marginTop: "8px", marginBottom: "28px" }}>
            <div style={{ display: "inline-flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "4rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                $497
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>/mo</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
              No contracts &middot; 14-day money-back guarantee
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px 24px" }}>
            {FEATURES.map((f) => (
              <li
                key={f.text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "13.5px",
                  color: f.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                  fontWeight: f.highlight ? 500 : 400,
                  lineHeight: 1.5,
                }}
              >
                <CheckIcon />
                {f.text}
              </li>
            ))}
          </ul>

          <button
            onClick={() => router.push("/checkout?plan=pro")}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "16px",
              color: "white",
              cursor: "pointer",
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
            }}
          >
            Get Started — $497/mo &rarr;
          </button>
        </div>

        {/* Custom tier */}
        <div
          style={{
            marginTop: "24px",
            padding: "24px 28px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ maxWidth: "440px" }}>
            <p style={{ color: "white", fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>
              Running serious volume? Go Custom.
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: 1.55 }}>
              Multi-line teams, high-volume operations, agencies, franchises, and enterprises &mdash; we&apos;ll build a custom AI stack matched to your call flow, CRM, and playbook.
            </p>
          </div>
          <a
            href={BOOK_URL}
            style={{
              padding: "12px 22px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "14px",
              color: "white",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              whiteSpace: "nowrap",
            }}
          >
            Book a Custom Call &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
