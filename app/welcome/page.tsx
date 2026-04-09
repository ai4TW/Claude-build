import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — AllTheCalls.ai",
  robots: { index: false },
};

// ─── Replace this with your YouTube video ID once uploaded ───────────────────
// How to get it: youtube.com/watch?v=VIDEO_ID_HERE
// Set the video to "Unlisted" (not Private) so the embed works
const YOUTUBE_VIDEO_ID = ""; // e.g. "dQw4w9WgXcQ"
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Payment confirmed",
    description: "Your 7-day trial has started. No action needed on your end.",
    status: "done",
  },
  {
    number: "02",
    title: "We're building your AI receptionist",
    description: "Our team is configuring your AI with your business name, hours, and services. This takes us a few hours.",
    status: "active",
  },
  {
    number: "03",
    title: "You'll receive your phone number",
    description: "We'll email you a dedicated number. Forward your existing business line to it — takes 30 seconds.",
    status: "upcoming",
  },
  {
    number: "04",
    title: "Your AI goes live",
    description: "Every call gets answered 24/7. You receive a text summary after each one.",
    status: "upcoming",
  },
  {
    number: "05",
    title: "Weekly performance reports",
    description: "Every Monday morning you'll receive a full report — calls answered, summaries, trends.",
    status: "upcoming",
  },
];

const STATUS_STYLES: Record<string, { dot: string; border: string; bg: string; numberColor: string }> = {
  done: {
    dot: "linear-gradient(135deg,#22d3ee,#4ade80)",
    border: "rgba(34,211,238,0.25)",
    bg: "rgba(34,211,238,0.04)",
    numberColor: "#22d3ee",
  },
  active: {
    dot: "linear-gradient(135deg,#7c3aed,#06b6d4)",
    border: "rgba(124,58,237,0.35)",
    bg: "rgba(124,58,237,0.06)",
    numberColor: "#a78bfa",
  },
  upcoming: {
    dot: "rgba(255,255,255,0.12)",
    border: "rgba(255,255,255,0.06)",
    bg: "transparent",
    numberColor: "rgba(255,255,255,0.2)",
  },
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
      fontFamily: "DM Sans, sans-serif",
      color: "#e2e8f0",
    }}>

      {/* Nav */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{
          fontSize: 20,
          fontWeight: 700,
          background: "linear-gradient(90deg,#4cd7f6,#d2bbff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          allthecalls.ai
        </span>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(34,211,238,0.08)",
            border: "1px solid rgba(34,211,238,0.2)",
            borderRadius: 100,
            padding: "6px 14px",
            marginBottom: 20,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d3ee" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#22d3ee", letterSpacing: "0.05em" }}>
              PAYMENT CONFIRMED
            </span>
          </div>

          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: "white",
            margin: "0 0 12px",
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: 1.2,
          }}>
            Welcome to AllTheCalls.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
            Here&apos;s exactly what happens next — and what we&apos;re doing for you right now.
          </p>
        </div>

        {/* Video from Brayden */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 48,
        }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}>
              B
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>A message from Brayden Myers</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Founder, AllTheCalls.ai</div>
            </div>
          </div>

          {YOUTUBE_VIDEO_ID ? (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Welcome from Brayden — AllTheCalls.ai"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          ) : (
            /* Placeholder shown until video is uploaded */
            <div style={{
              aspectRatio: "16/9",
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: 40,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}>
                ▶
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0, textAlign: "center" }}>
                Welcome video coming soon from Brayden
              </p>
            </div>
          )}
        </div>

        {/* Step-by-step timeline */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            Your setup timeline
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STEPS.map((step, i) => {
              const style = STATUS_STYLES[step.status];
              const isLast = i === STEPS.length - 1;

              return (
                <div key={step.number} style={{ display: "flex", gap: 0 }}>
                  {/* Left: dot + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20, flexShrink: 0 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: style.dot,
                      border: `1px solid ${style.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: step.status === "done" ? 16 : 11,
                      fontWeight: 700,
                      color: step.status === "done" ? "white" : style.numberColor,
                      position: "relative",
                      zIndex: 1,
                    }}>
                      {step.status === "done" ? "✓" : step.number}
                    </div>
                    {!isLast && (
                      <div style={{
                        width: 1,
                        flex: 1,
                        minHeight: 24,
                        background: step.status === "done"
                          ? "rgba(34,211,238,0.2)"
                          : step.status === "active"
                          ? "rgba(124,58,237,0.2)"
                          : "rgba(255,255,255,0.05)",
                        margin: "4px 0",
                      }} />
                    )}
                  </div>

                  {/* Right: content */}
                  <div style={{
                    flex: 1,
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    marginBottom: isLast ? 0 : 8,
                    marginTop: 0,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: step.status === "upcoming" ? "rgba(255,255,255,0.4)" : "white" }}>
                        {step.title}
                      </span>
                      {step.status === "active" && (
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#a78bfa",
                          background: "rgba(124,58,237,0.15)",
                          border: "1px solid rgba(124,58,237,0.3)",
                          borderRadius: 100,
                          padding: "2px 8px",
                          letterSpacing: "0.05em",
                        }}>
                          IN PROGRESS
                        </span>
                      )}
                      {step.status === "done" && (
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#22d3ee",
                          background: "rgba(34,211,238,0.08)",
                          border: "1px solid rgba(34,211,238,0.2)",
                          borderRadius: 100,
                          padding: "2px 8px",
                          letterSpacing: "0.05em",
                        }}>
                          COMPLETE
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What to expect */}
        <div style={{
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 16,
          padding: "24px",
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", marginBottom: 14, letterSpacing: "0.04em" }}>
            WHAT YOU&apos;LL RECEIVE IN YOUR EMAIL
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Your dedicated phone number to forward calls to",
              "Step-by-step forwarding instructions (takes 30 seconds)",
              "A test call script so you can hear your AI in action",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#a78bfa", flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, textAlign: "center" }}>
          Questions before we go live?{" "}
          <a href="mailto:hello@allthecalls.ai" style={{ color: "#a78bfa", textDecoration: "none" }}>
            hello@allthecalls.ai
          </a>
        </p>

      </div>
    </div>
  );
}
