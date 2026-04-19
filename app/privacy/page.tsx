import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AllTheCalls privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "https://allthecalls.ai/privacy" },
  robots: { index: false },
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(316) 232-4777";
const DEMO_PHONE_HREF =
  process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+13162324777";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "40px" }}>
            Last updated: April 17, 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <Section title="What We Collect">
              When you sign up for AllTheCalls, we collect your name, email address, business name, and
              phone number. We also collect call data processed through your AI receptionist &mdash; call
              recordings, transcripts, and contact information captured from callers.
            </Section>

            <Section title="How We Use Your Data">
              We use your information to configure and operate your AI receptionist, deliver call logs and
              caller summaries to your dashboard, send transactional emails about your account, and improve
              our service. We do not sell your data to third parties.
            </Section>

            <Section title="Call Recording & Transcription">
              Calls handled by your AI receptionist may be recorded and transcribed so we can deliver
              summaries to you. You are responsible for complying with applicable call-recording disclosure
              laws in your state.
            </Section>

            <Section title="Data Retention">
              We retain account data for the duration of your subscription. Call recordings and transcripts
              are retained for 90 days. Upon cancellation, your data is deleted within 30 days.
            </Section>

            <Section title="Third-Party Services">
              We use Stripe for payment processing, Trillet AI for voice AI infrastructure, GoHighLevel for
              CRM, Supabase for data storage, and Resend for email delivery. Each provider has its own
              privacy policy governing their handling of data.
            </Section>

            <Section title="Contact">
              Questions about this policy? Email us at{" "}
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
