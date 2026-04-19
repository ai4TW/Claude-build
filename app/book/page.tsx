import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Book a Call — AllTheCalls",
  description:
    "Book a 15-minute call with the AllTheCalls team. We&rsquo;ll build a live AI demo in your business name so you can hear exactly what your callers would hear.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

export default function BookPage() {
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
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.svg"
              alt="AllTheCalls.ai"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link
              href="/pricing"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                padding: "8px 12px",
              }}
            >
              Pricing
            </Link>
            <a
              href={DEMO_PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#86efac",
                fontWeight: 600,
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(74,222,128,0.3)",
                background: "rgba(34,197,94,0.08)",
              }}
            >
              {"\u{1F4DE}"} {DEMO_PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "4rem 1rem 2rem",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center top, rgba(124,58,237,0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}
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
            15-minute call · Free
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            Pick a time to{" "}
            <span className="gradient-text">talk to our team</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            15 minutes. We&rsquo;ll build a live AI demo in your business name
            so you can hear exactly what your callers would hear &mdash; then
            answer any questions before you sign up.
          </p>
        </div>
      </section>

      {/* CALENDLY WIDGET */}
      <section style={{ padding: "0 1rem 4rem" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/brayden-allthecalls/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=8300ff&background_color=0f1119&text_color=e2e8f0"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </section>

      {/* FALLBACK */}
      <section
        style={{
          padding: "0 1rem 5rem",
          textAlign: "center",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Calendar not loading? Call{" "}
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
          — our live AI picks up 24/7 — or email{" "}
          <a
            href="mailto:hello@allthecalls.ai"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            hello@allthecalls.ai
          </a>
          .
        </p>
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

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
