"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Prefill {
  name: string;
  email: string;
  brokerage: string;
  phone: string;
  plan: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "white",
  fontSize: "14px",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.55)",
  marginBottom: "6px",
};

const SPECIALTIES = [
  "Buyer Representation",
  "Listing Agent",
  "Luxury Homes",
  "First-Time Buyers",
  "Investment Properties",
  "New Construction",
  "Land & Lots",
  "Relocation",
];

const GREETING_STYLES = [
  {
    id: "professional" as const,
    label: "Professional",
    preview: '"Thank you for calling [Name] with [Brokerage] — how can I help you today?"',
  },
  {
    id: "friendly" as const,
    label: "Friendly",
    preview: '"Hey! Thanks for calling [Name] — I\'m their assistant. What can I do for you?"',
  },
  {
    id: "luxury" as const,
    label: "Luxury",
    preview: '"Good afternoon, you\'ve reached the office of [Name] at [Brokerage]. How may I assist you?"',
  },
];

export default function SetupWizard({ prefill, sessionId }: { prefill: Prefill | null; sessionId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 1 fields
  const [name, setName] = useState(prefill?.name || "");
  const [brokerage, setBrokerage] = useState(prefill?.brokerage || "");
  const [phone, setPhone] = useState(prefill?.phone || "");
  const email = prefill?.email || "";

  // Step 2 fields
  const [serviceArea, setServiceArea] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [website, setWebsite] = useState("");

  // Step 3 fields
  const [greetingStyle, setGreetingStyle] = useState<"professional" | "friendly" | "luxury">("professional");
  const [workingHours, setWorkingHours] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  function toggleSpecialty(s: string) {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleFinish() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/create-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          email,
          name,
          brokerage,
          phone,
          serviceArea,
          specialties: selectedSpecialties.join(", ") || "residential real estate",
          website,
          greetingStyle,
          workingHours,
          customInstructions,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setStep(4);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const stepLabel = ["", "Your Info", "Your Market", "Your AI's Voice", ""][step];

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px" }} />
        </div>

        {/* Progress */}
        {step < 4 && (
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: step > s ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : step === s ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)",
                    border: step === s ? "2px solid #7c3aed" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, color: step >= s ? "white" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }}>
                    {step > s ? "✓" : s}
                  </div>
                  {s < 3 && <div style={{ width: "40px", height: "2px", background: step > s ? "linear-gradient(90deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.08)", borderRadius: "2px", transition: "all 0.3s ease" }} />}
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>Step {step} of 3 — {stepLabel}</p>
          </div>
        )}

        {/* Card */}
        <div className="glass-card" style={{ borderRadius: "24px", padding: "36px" }}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: "28px" }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "8px" }}>
                  Let&apos;s build your AI receptionist
                </h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6 }}>
                  Confirm your info below — this is how your AI will identify you on every call.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Your Full Name *</label>
                  <input style={inputStyle} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Johnson" />
                </div>
                <div>
                  <label style={labelStyle}>Brokerage *</label>
                  <input style={inputStyle} type="text" value={brokerage} onChange={(e) => setBrokerage(e.target.value)} placeholder="Compass, KW, RE/MAX..." />
                </div>
                <div>
                  <label style={labelStyle}>Your Phone Number *</label>
                  <input style={inputStyle} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 867-5309" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>Clients forward calls from this number to your AI.</p>
                </div>
                {email && (
                  <div>
                    <label style={labelStyle}>Email</label>
                    <div style={{ ...inputStyle, color: "rgba(255,255,255,0.4)", cursor: "default" }}>{email}</div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!name.trim() || !brokerage.trim() || !phone.trim()}
                className="btn-glow"
                style={{ width: "100%", marginTop: "28px", color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: (!name.trim() || !brokerage.trim() || !phone.trim()) ? "not-allowed" : "pointer", opacity: (!name.trim() || !brokerage.trim() || !phone.trim()) ? 0.5 : 1 }}
              >
                Continue →
              </button>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: "28px" }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "8px" }}>
                  Tell us about your practice
                </h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6 }}>
                  Your AI will use this to answer questions about your market and expertise.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Service Areas *</label>
                  <input style={inputStyle} type="text" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} placeholder="Dallas, Plano, Frisco, McKinney..." />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>Cities, neighborhoods, or zip codes you work in.</p>
                </div>

                <div>
                  <label style={labelStyle}>What do you specialize in?</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {SPECIALTIES.map((s) => {
                      const active = selectedSpecialties.includes(s);
                      return (
                        <button
                          key={s}
                          onClick={() => toggleSpecialty(s)}
                          style={{
                            padding: "7px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s ease",
                            background: active ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.05)",
                            border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
                            color: active ? "white" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Your Website <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                  <input style={inputStyle} type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>Your AI will mention this in follow-up texts.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>← Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!serviceArea.trim()}
                  className="btn-glow"
                  style={{ flex: 2, color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: !serviceArea.trim() ? "not-allowed" : "pointer", opacity: !serviceArea.trim() ? 0.5 : 1 }}
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <div style={{ marginBottom: "28px" }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "8px" }}>
                  How should your AI sound?
                </h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6 }}>
                  Pick the tone that matches how you represent yourself to clients.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Greeting Style *</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {GREETING_STYLES.map((g) => {
                      const active = greetingStyle === g.id;
                      return (
                        <button
                          key={g.id}
                          onClick={() => setGreetingStyle(g.id)}
                          style={{
                            textAlign: "left", padding: "14px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.15s ease",
                            background: active ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
                            border: active ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <p style={{ fontWeight: 600, color: active ? "#a78bfa" : "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 4px" }}>{g.label}</p>
                          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0, fontStyle: "italic" }}>{g.preview}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>When are you available to take calls yourself? <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                  <input style={inputStyle} type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="Mon–Fri 9am–6pm, weekends by appointment" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>Your AI handles calls outside these hours and whenever you're busy.</p>
                </div>

                <div>
                  <label style={labelStyle}>Anything else your AI should know? <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="e.g. I only work with buyers above $500K. Always ask how they heard about me. Don't book showings on Sundays."
                  />
                </div>
              </div>

              {error && (
                <div style={{ marginTop: "16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", padding: "12px 16px", borderRadius: "10px" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>← Back</button>
                <button
                  onClick={handleFinish}
                  disabled={submitting}
                  className="btn-glow"
                  style={{ flex: 2, color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Building your AI…" : "Create My AI Receptionist →"}
                </button>
              </div>
            </>
          )}

          {/* ── STEP 4 — SUCCESS ── */}
          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "32px" }}>
                ✓
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "24px", marginBottom: "12px" }}>
                Your AI is live!
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
                <strong style={{ color: "white" }}>{name}&apos;s</strong> AI receptionist has been created and trained. We&apos;re assigning your dedicated phone number now — you&apos;ll receive an email with forwarding instructions within 2 hours.
              </p>
              <div className="glass-card" style={{ borderRadius: "16px", padding: "20px", marginBottom: "28px", textAlign: "left" }}>
                {[
                  { done: true, label: "Payment confirmed", sub: "Trial active — no charge for 14 days" },
                  { done: true, label: "AI receptionist created", sub: `${name} — ${brokerage}` },
                  { done: false, label: "Phone number assignment", sub: "We'll email you your number within 2 hours" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: item.done ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.07)", border: item.done ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <span style={{ color: item.done ? "white" : "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 700 }}>{item.done ? "✓" : "⏳"}</span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: item.done ? "white" : "rgba(255,255,255,0.5)", fontSize: "13px", margin: "0 0 2px" }}>{item.label}</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-glow"
                style={{ width: "100%", color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: "pointer" }}
              >
                Go to Your Dashboard →
              </button>
              <a href="mailto:hello@allthecalls.ai" style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: "13px", textDecoration: "none", marginTop: "16px" }}>
                Questions? Email hello@allthecalls.ai
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
