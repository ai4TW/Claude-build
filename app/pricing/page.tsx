import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — AllTheCalls.ai",
  description:
    "AI receptionist plans for realtors, real estate investors, and tradespeople. 14-day money-back guarantee.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

export default function PricingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08090f",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          background: "rgba(8,9,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
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
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img
              src="/logo.svg"
              alt="AllTheCalls.ai"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
          <a
            href={DEMO_PHONE_HREF}
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              padding: "8px 16px",
            }}
          >
            📞 {DEMO_PHONE}
          </a>
        </div>
      </nav>

      {/* VSL — VIDEO SALES LETTER SECTION */}
      <section
        style={{
          padding: "5rem 1rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow behind video */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            opacity: 0.1,
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(34,197,94,0.3)",
              background: "rgba(34,197,94,0.08)",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "14px" }}>🛡️</span>
            <span
              style={{ color: "#86efac", fontSize: "13px", fontWeight: 600 }}
            >
              14-Day Money-Back Guarantee
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            See How It Works in{" "}
            <span className="gradient-text">3 Minutes</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(15px, 2.5vw, 18px)",
              marginBottom: "40px",
              maxWidth: "560px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Watch how realtors, investors, and tradespeople are using
            AllTheCalls to capture every lead — even at 2 AM.
          </p>

          {/* VIDEO SALES LETTER — replace src with your recorded VSL */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "720px",
              margin: "0 auto 32px",
              aspectRatio: "16 / 9",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*
              TO ADD YOUR VSL:
              Replace this placeholder with an iframe or video element:

              YouTube:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              Or a hosted MP4:
              <video src="/vsl.mp4" controls style={{ width: "100%", height: "100%" }} />
            */}
            <div style={{ textAlign: "center", padding: "32px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow:
                    "0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(6,182,212,0.15)",
                  cursor: "pointer",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                Video coming soon
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                3-minute walkthrough
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CALL CTA — one more nudge to call before buying */}
      <section style={{ padding: "0 1rem 4rem" }}>
        <div
          className="glass-card"
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            borderRadius: "20px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#4ade80",
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            ● Try Before You Buy
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "12px",
            }}
          >
            Haven&apos;t called yet? Hear it live.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "15px",
              marginBottom: "28px",
              maxWidth: "480px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Call our demo AI right now — it picks up instantly, qualifies the
            caller, and sends a transcript. That&apos;s exactly what your
            callers will experience.
          </p>
          <a
            href={DEMO_PHONE_HREF}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 36px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow:
                "0 0 40px rgba(124,58,237,0.35), 0 0 80px rgba(6,182,212,0.1)",
              textDecoration: "none",
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            📞 {DEMO_PHONE}
          </a>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              marginTop: "12px",
            }}
          >
            Takes 60 seconds. No signup required.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <PricingSection />

      {/* FINAL CTA — dual action */}
      <section style={{ padding: "5rem 1rem 6rem", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a78bfa",
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "999px",
              marginBottom: "20px",
            }}
          >
            Ready to stop missing calls?
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            Every missed call is{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#4cd7f6,#a78bfa,#d2bbff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              money walking away.
            </span>
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "620px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Get started in under 5 minutes — your AI is answering calls the same day.
            Or book a quick call and we&rsquo;ll walk you through it live.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <Link
              href="/checkout?plan=pro"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "18px 36px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#ffffff",
                textDecoration: "none",
                background:
                  "linear-gradient(135deg,#4cd7f6 0%,#7c3aed 55%,#c4b5fd 100%)",
                borderRadius: "14px",
                boxShadow: "0 20px 50px -12px rgba(124,58,237,0.55)",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
            >
              Start now — 14-day guarantee →
            </Link>
            <Link
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "18px 32px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#e2e8f0",
                textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "14px",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.15s ease, background 0.15s ease",
              }}
            >
              📅 Book a live call
            </Link>
          </div>

          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 0,
            }}
          >
            Prefer to hear it first? Call{" "}
            <a
              href={DEMO_PHONE_HREF}
              style={{
                color: "#a78bfa",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {DEMO_PHONE}
            </a>{" "}
            — our live AI picks up 24/7. Love it or your money back, 14 days, no questions.
          </p>
        </div>
      </section>

      {/* FOOTER — minimal */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
          &copy; 2026 All The Calls. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
