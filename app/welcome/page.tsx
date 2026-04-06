import { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're In — AllTheCalls.ai",
  robots: { index: false },
};

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08090f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "DM Sans, sans-serif",
    }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>

        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <span style={{
            fontSize: 22,
            fontWeight: 700,
            background: "linear-gradient(90deg,#4cd7f6,#d2bbff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            allthecalls.ai
          </span>
        </div>

        {/* Checkmark */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 28px",
          fontSize: 32,
        }}>
          ✓
        </div>

        <h1 style={{
          color: "white",
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 12,
          fontFamily: "Space Grotesk, sans-serif",
        }}>
          Payment confirmed — you&apos;re in.
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Our team is setting up your AI receptionist. You&apos;ll receive an email within 24 hours with your dedicated phone number and everything you need to go live.
        </p>

        {/* What happens next */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "28px 24px",
          textAlign: "left",
          marginBottom: 32,
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            What happens next
          </div>

          {[
            { step: "1", text: "We configure your AI with your business name and details" },
            { step: "2", text: "You get a dedicated phone number to forward your calls to" },
            { step: "3", text: "Your AI answers every call 24/7 — you get summaries by text" },
            { step: "4", text: "Every Monday you receive a weekly performance report" },
          ].map(({ step, text }) => (
            <div key={step} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
                marginTop: 1,
              }}>
                {step}
              </div>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
        </div>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
          Questions? Email us at{" "}
          <a href="mailto:hello@allthecalls.ai" style={{ color: "#a78bfa" }}>
            hello@allthecalls.ai
          </a>
        </p>

      </div>
    </div>
  );
}
