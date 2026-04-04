import Link from "next/link";

export default function WelcomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08090f", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "24px" }}>🎉</div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, marginBottom: "16px", lineHeight: 1.1 }}>
          Welcome to <span className="gradient-text">All The Calls!</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "17px", lineHeight: 1.7, marginBottom: "36px" }}>
          Your 14-day free trial has started. Here&apos;s what&apos;s happening now:
        </p>

        {/* Status checklist */}
        <div className="glass-card" style={{ borderRadius: "20px", padding: "28px", marginBottom: "28px", textAlign: "left" }}>
          {[
            { done: true, label: "Payment confirmed", sub: "Your trial is active — no charge for 14 days" },
            { done: true, label: "AI agent being configured", sub: "Your personal AI receptionist is being set up" },
            { done: false, label: "Phone number assignment", sub: "We'll assign your number within 1–2 hours" },
            { done: false, label: "Welcome call from our team", sub: "We'll walk you through everything" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: item.done ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.07)", border: item.done ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                {item.done ? (
                  <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>✓</span>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>⏳</span>
                )}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: item.done ? "white" : "rgba(255,255,255,0.55)", fontSize: "14px", marginBottom: "2px" }}>{item.label}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link href="/dashboard" className="btn-glow" style={{ color: "white", fontWeight: 700, fontSize: "16px", padding: "14px 32px", borderRadius: "12px", textDecoration: "none", textAlign: "center" }}>
            Go to Dashboard →
          </Link>
          <a href="mailto:hello@allthecalls.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", textDecoration: "none", padding: "12px" }}>
            Questions? Email hello@allthecalls.com
          </a>
        </div>
      </div>
    </div>
  );
}
