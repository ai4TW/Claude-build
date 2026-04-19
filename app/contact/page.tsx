import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AllTheCalls team. We respond within 1 business hour — or call our AI 24/7.",
  alternates: { canonical: "https://allthecalls.ai/contact" },
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";
const CALENDLY_URL = "https://calendly.com/brayden-allthecalls/new-meeting";

export default function ContactPage() {
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
          position: "sticky",
          top: 0,
          zIndex: 30,
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
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            <Link
              href="/pricing"
              className="btn-glow"
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "5rem 1rem 2rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center top, rgba(124,58,237,0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
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
            We respond within 1 business hour
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#fff",
            }}
          >
            Get in{" "}
            <span className="gradient-text">touch</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Want to talk to our team? Want to hear the AI first? Every option below is
            one tap.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section style={{ padding: "2rem 1rem 4rem" }}>
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <ContactCard
            label="Call Our AI Now"
            value={DEMO_PHONE}
            caption="24/7 &middot; Hear exactly what your callers would hear"
            href={DEMO_PHONE_HREF}
            accent="emerald"
            icon="\u{1F4DE}"
          />
          <ContactCard
            label="Email"
            value="hello@allthecalls.ai"
            caption="1-hour response during business hours"
            href="mailto:hello@allthecalls.ai"
            accent="violet"
            icon="\u2709\uFE0F"
          />
          <ContactCard
            label="Book a Call"
            value="15 minutes with our team"
            caption="We&rsquo;ll build a demo in your business name live on the call"
            href={CALENDLY_URL}
            accent="cyan"
            icon="\u{1F4C5}"
            external
          />
          <ContactCard
            label="See Pricing"
            value="$497/mo &mdash; one plan"
            caption="14-day money-back guarantee"
            href="/pricing"
            accent="violet"
            icon="\u{1F4B3}"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 1rem",
          textAlign: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          &larr; Back to home
        </Link>
        <p
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "13px",
            marginTop: "16px",
          }}
        >
          &copy; 2026 AllTheCalls. Never miss another call.
        </p>
      </footer>
    </div>
  );
}

type Accent = "emerald" | "violet" | "cyan";

function ContactCard({
  label,
  value,
  caption,
  href,
  accent,
  icon,
  external,
}: {
  label: string;
  value: string;
  caption: string;
  href: string;
  accent: Accent;
  icon: string;
  external?: boolean;
}) {
  const accentColor =
    accent === "emerald" ? "#86efac" : accent === "cyan" ? "#22d3ee" : "#a78bfa";
  const accentBorder =
    accent === "emerald"
      ? "rgba(74,222,128,0.25)"
      : accent === "cyan"
        ? "rgba(34,211,238,0.25)"
        : "rgba(124,58,237,0.25)";
  const accentBg =
    accent === "emerald"
      ? "rgba(34,197,94,0.06)"
      : accent === "cyan"
        ? "rgba(34,211,238,0.06)"
        : "rgba(124,58,237,0.06)";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px 22px",
        borderRadius: "16px",
        border: `1px solid ${accentBorder}`,
        background: accentBg,
        textDecoration: "none",
        transition: "transform 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div
        style={{
          fontSize: "26px",
          flexShrink: 0,
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: "4px",
          }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: caption }}
          style={{
            fontSize: "12.5px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
          }}
        />
      </div>
      <span
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        &rarr;
      </span>
    </a>
  );
}
