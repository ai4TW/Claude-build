"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.7)",
  marginBottom: "8px",
} as const;

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    phone: "",
    primaryGoal: "",
    aiCustomPrompt: "",
  });

  const industries = [
    "Real Estate", "Legal", "Medical", "Home Services", "Financial", "Salon & Spa", "Other"
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/#pricing");
  };

  const canContinueStep1 = formData.businessName && formData.industry;
  const canContinueStep2 = formData.primaryGoal;
  const canContinueStep3 = formData.phone;

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#e2e8f0" }}>
      {/* NAV */}
      <nav style={{ padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,9,15,0.85)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {[1,2,3].map(n => (
              <div key={n} style={{
                width: n === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: n <= step ? "linear-gradient(135deg,#7c3aed,#06b6d4)" : "rgba(255,255,255,0.1)",
                transition: "all 0.3s",
              }} />
            ))}
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginLeft: "8px" }}>Step {step} of 3</span>
          </div>
        </div>
      </nav>

      {/* BODY */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 1.5rem" }}>
        <div style={{ maxWidth: "480px", width: "100%", background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "40px", border: "1px solid rgba(255,255,255,0.08)" }}>

          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Tell us about your business</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", marginBottom: "32px" }}>We&apos;ll customize your AI receptionist based on your industry.</p>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Smith Realty Group"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  <option value="" disabled style={{ background: "#1a1a2e" }}>Select an industry...</option>
                  {industries.map(ind => <option key={ind} value={ind} style={{ background: "#1a1a2e" }}>{ind}</option>)}
                </select>
              </div>

              <button
                onClick={handleNext}
                disabled={!canContinueStep1}
                className={canContinueStep1 ? "btn-glow" : ""}
                style={{ width: "100%", padding: "14px 24px", background: !canContinueStep1 ? "rgba(255,255,255,0.06)" : undefined, color: !canContinueStep1 ? "rgba(255,255,255,0.25)" : "white", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: !canContinueStep1 ? "not-allowed" : "pointer", border: "none" }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Customize your AI</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", marginBottom: "32px" }}>What should your AI prioritize when talking to callers?</p>

              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Primary Goal</label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  <option value="" disabled style={{ background: "#1a1a2e" }}>Select goal...</option>
                  <option value="book" style={{ background: "#1a1a2e" }}>Book appointments / Showings</option>
                  <option value="qualify" style={{ background: "#1a1a2e" }}>Qualify leads & gather info</option>
                  <option value="support" style={{ background: "#1a1a2e" }}>Customer support & FAQs</option>
                  <option value="triage" style={{ background: "#1a1a2e" }}>Urgent triage & dispatch</option>
                </select>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Custom Instructions <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.3)" }}>(Optional)</span></label>
                <textarea
                  placeholder="E.g. If the caller asks about pricing, let them know consultations are free."
                  value={formData.aiCustomPrompt}
                  onChange={(e) => setFormData({ ...formData, aiCustomPrompt: e.target.value })}
                  style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={handleBack} style={{ flex: 1, padding: "14px 24px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", borderRadius: "12px", fontWeight: 600, fontSize: "15px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canContinueStep2}
                  className={canContinueStep2 ? "btn-glow" : ""}
                  style={{ flex: 2, padding: "14px 24px", background: !canContinueStep2 ? "rgba(255,255,255,0.06)" : undefined, color: !canContinueStep2 ? "rgba(255,255,255,0.25)" : "white", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: !canContinueStep2 ? "not-allowed" : "pointer", border: "none" }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Final details</h1>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", marginBottom: "32px" }}>Where should we send your call transcripts?</p>

              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Mobile Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}>We&apos;ll text you a summary after every call.</p>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={handleBack} style={{ flex: 1, padding: "14px 24px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", borderRadius: "12px", fontWeight: 600, fontSize: "15px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canContinueStep3}
                  className={canContinueStep3 ? "btn-glow" : ""}
                  style={{ flex: 2, padding: "14px 24px", background: !canContinueStep3 ? "rgba(255,255,255,0.06)" : undefined, color: !canContinueStep3 ? "rgba(255,255,255,0.25)" : "white", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: !canContinueStep3 ? "not-allowed" : "pointer", border: "none" }}
                >
                  View Pricing →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
