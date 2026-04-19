import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "AllTheCalls terms of service — the agreement governing your use of our AI receptionist service.",
  alternates: { canonical: "https://allthecalls.ai/terms" },
  robots: { index: false },
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

export default function TermsPage() {
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
      </nav>

      <main style={{ padding: "4rem 1rem 6rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Terms of Service
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "40px" }}>
            Last updated: April 17, 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <Section title="Service">
              AllTheCalls provides an AI-powered phone answering service &mdash; built for real estate
              professionals and available to any business. By signing up, you agree to these terms. We
              reserve the right to update these terms with 30 days notice.
            </Section>

            <Section title="Subscription & Billing">
              Subscriptions are billed monthly at $497. Your 14-day money-back guarantee begins at signup
              &mdash; if you&rsquo;re not satisfied, email us within 14 days for a full refund. You may
              cancel anytime from your dashboard; cancellation takes effect at the end of your current
              billing period.
            </Section>

            <Section title="Your Responsibilities">
              You are responsible for configuring call forwarding correctly, complying with call-recording
              laws in your jurisdiction, ensuring your AI receptionist is not used for illegal purposes,
              and maintaining the security of your account credentials.
            </Section>

            <Section title="Acceptable Use">
              AllTheCalls is for legitimate business use only. You may not use the service to harass
              callers, violate TCPA or other telecom regulations, or impersonate anyone other than
              yourself or your authorized business.
            </Section>

            <Section title="Limitation of Liability">
              AllTheCalls is not liable for missed calls, lost leads, or revenue loss due to service
              interruptions. Our AI receptionist performs best-effort call handling. We do not guarantee
              100% uptime or 100% accuracy in call transcription or qualification.
            </Section>

            <Section title="Termination">
              We may suspend or terminate accounts that violate these terms. You may cancel at any time.
              Upon termination, your AI receptionist is deactivated and call forwarding should be removed
              from your phone.
            </Section>

            <Section title="Contact">
              Questions? Email{" "}
              <a
                href="mailto:hello@allthecalls.ai"
                style={{ color: "#a78bfa", textDecoration: "none" }}
              >
                hello@allthecalls.ai
              </a>
              .
            </Section>
          </div>

          <div
            style={{
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none" }}
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.75,
          fontSize: "15px",
        }}
      >
        {children}
      </p>
    </section>
  );
}
