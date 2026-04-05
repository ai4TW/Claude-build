"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Prefill {
  name: string;
  email: string;
  businessName: string;
  phone: string;
  plan: string;
  industry?: string;
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

const INDUSTRIES = [
  { id: "Real Estate", icon: "🏠", label: "Real Estate" },
  { id: "Legal", icon: "⚖️", label: "Legal" },
  { id: "Medical / Dental", icon: "🏥", label: "Medical / Dental" },
  { id: "Home Services", icon: "🔧", label: "Home Services" },
  { id: "Financial Services", icon: "📈", label: "Financial Services" },
  { id: "Salon / Spa", icon: "✂️", label: "Salon / Spa" },
  { id: "Auto", icon: "🚗", label: "Auto" },
  { id: "Restaurant", icon: "🍽️", label: "Restaurant" },
  { id: "Other", icon: "💼", label: "Other" },
];

const SPECIALTIES_BY_INDUSTRY: Record<string, string[]> = {
  "Real Estate": ["Buyer Representation", "Listing Agent", "Luxury Homes", "First-Time Buyers", "Investment Properties", "New Construction", "Land & Lots", "Relocation"],
  "Legal": ["Personal Injury", "Family Law", "Criminal Defense", "Estate Planning", "Business Law", "Real Estate Law", "Bankruptcy", "Immigration"],
  "Medical / Dental": ["General Practice", "Family Medicine", "Pediatrics", "Cosmetic Dentistry", "Orthodontics", "Sports Medicine", "Mental Health", "Specialty Care"],
  "Home Services": ["Plumbing", "HVAC", "Electrical", "General Contracting", "Landscaping", "Cleaning", "Roofing", "Painting"],
  "Financial Services": ["Financial Planning", "Insurance", "Mortgage", "Tax Planning", "Investment Management", "Retirement Planning", "Wealth Management", "Business Finance"],
  "Salon / Spa": ["Hair Styling", "Color & Highlights", "Nails", "Massage", "Facial & Skincare", "Waxing", "Makeup", "Full-Service Spa"],
  "Auto": ["New Car Sales", "Used Car Sales", "Service & Repair", "Auto Detailing", "Collision Repair", "Fleet Sales", "EV Specialist", "Financing"],
  "Restaurant": ["Fine Dining", "Casual Dining", "Private Events", "Catering", "Takeout & Delivery", "Bar & Cocktails", "Brunch", "Tasting Menu"],
  "Other": [],
};

const SERVICE_AREA_LABEL: Record<string, string> = {
  "Real Estate": "Markets & Neighborhoods",
  "Legal": "Jurisdictions / Counties Served",
  "Medical / Dental": "Locations / Clinics",
  "Home Services": "Service Area (Cities or Zip Codes)",
  "Financial Services": "States Licensed / Regions Served",
  "Salon / Spa": "Location(s)",
  "Auto": "Dealership Location(s)",
  "Restaurant": "Location(s)",
  "Other": "Service Area or Location",
};

const SERVICE_AREA_PLACEHOLDER: Record<string, string> = {
  "Real Estate": "Dallas, Plano, Frisco, McKinney...",
  "Legal": "Dallas County, Collin County, Denton County...",
  "Medical / Dental": "North Dallas, Uptown, Main Street location...",
  "Home Services": "Dallas, Irving, Garland — within 30 miles of 75201",
  "Financial Services": "Texas, Oklahoma — licensed in 12 states",
  "Salon / Spa": "Uptown Dallas — 2 locations",
  "Auto": "Dallas, Fort Worth metro",
  "Restaurant": "Deep Ellum, Dallas",
  "Other": "City, region, or nationwide...",
};

const GREETING_STYLES = [
  { id: "professional" as const, label: "Professional", preview: (biz: string, aiName: string) => `"Thank you for calling ${biz || "[Business]"}! ${aiName ? `This is ${aiName}` : "I'm their assistant"} — how can I help you today?"` },
  { id: "friendly" as const, label: "Friendly", preview: (biz: string, aiName: string) => `"Hey! Thanks for calling ${biz || "[Business]"} — ${aiName ? `this is ${aiName}` : "I'm their assistant"}, what can I do for you?"` },
  { id: "luxury" as const, label: "Luxury", preview: (biz: string, aiName: string) => `"Good afternoon, thank you for calling ${biz || "[Business]"}. ${aiName ? `This is ${aiName}` : "I'm their assistant"} — how may I assist you?"` },
];

// ElevenLabs voices — eleven_turbo_v2_5 model (low latency, natural sounding)
const VOICES = [
  { id: "EXAVITQu4vr4xnSDxMaL", label: "Sarah", gender: "Female", tone: "Mature, reassuring & confident", default: true },
  { id: "cgSgspJ2msm6clMCkdW9", label: "Jessica", gender: "Female", tone: "Warm, bright & friendly" },
  { id: "hpp4J3VqNfWAUOO0d1Us", label: "Bella", gender: "Female", tone: "Professional & upbeat" },
  { id: "XrExE9yKIg1WjnnlVkGX", label: "Matilda", gender: "Female", tone: "Knowledgeable & professional" },
  { id: "cjVigY5qzO86Huf0OWal", label: "Eric", gender: "Male", tone: "Smooth & trustworthy" },
  { id: "iP95p4xoKVk53GoZ742B", label: "Chris", gender: "Male", tone: "Charming & down-to-earth" },
  { id: "nPczCjzI2devNBz1zQrb", label: "Brian", gender: "Male", tone: "Deep, resonant & comforting" },
];

export default function SetupWizard({ prefill, sessionId }: { prefill: Prefill | null; sessionId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 4 — password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdError, setPwdError] = useState("");
  const step4Valid = password.length >= 8 && password === confirmPassword;

  // Step 1
  const [industry, setIndustry] = useState(prefill?.industry || "");
  const [name, setName] = useState(prefill?.name || "");
  const [businessName, setBusinessName] = useState(prefill?.businessName || "");
  const [phone, setPhone] = useState(prefill?.phone || "");
  const [email, setEmail] = useState(prefill?.email || "");

  // Voice preview
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Step 2
  const [serviceArea, setServiceArea] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [otherSpecialty, setOtherSpecialty] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [website, setWebsite] = useState("");

  // Step 3
  const [greetingStyle, setGreetingStyle] = useState<"professional" | "friendly" | "luxury">("professional");
  const [aiName, setAiName] = useState("");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [workingHours, setWorkingHours] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  function toggleSpecialty(s: string) {
    setSelectedSpecialties((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  const specialties = SPECIALTIES_BY_INDUSTRY[industry] || [];
  const step1Valid = industry && name.trim() && businessName.trim() && phone.trim() && email.trim();

  async function handleVoicePreview(vId: string) {
    if (playingVoice === vId) {
      audioRef.current?.pause();
      setPlayingVoice(null);
      return;
    }
    audioRef.current?.pause();
    setPlayingVoice(vId);
    try {
      const audio = new Audio(`/api/voice-preview?voice=${encodeURIComponent(vId)}`);
      audioRef.current = audio;
      audio.onended = () => setPlayingVoice(null);
      audio.onerror = () => setPlayingVoice(null);
      await audio.play();
    } catch {
      setPlayingVoice(null);
    }
  }
  const step2Valid = serviceArea.trim();

  async function handleFinish() {
    setPwdError("");
    if (password.length < 8) { setPwdError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setPwdError("Passwords don't match."); return; }
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
          businessName,
          industry,
          phone,
          serviceArea,
          specialties: [...selectedSpecialties, ...(otherSpecialty.trim() ? [otherSpecialty.trim()] : [])].join(", "),
          website,
          greetingStyle,
          aiName,
          voiceId,
          workingHours,
          customInstructions,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      // Mark password as self-chosen so the dashboard prompt doesn't show
      if (typeof window !== "undefined") localStorage.setItem("atc_pwd_set", "1");
      router.push("/myagent");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const STEP_LABELS = ["", "Your Business", "Your Services", "Your AI", "Set Password"];

  return (
    <div style={{ minHeight: "100vh", background: "#08090f", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "580px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: "36px" }} />
        </div>

        {/* Progress bar */}
        {step <= 4 && (
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: step > s ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : step === s ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.07)",
                    border: step === s ? "2px solid #7c3aed" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, color: step >= s ? "white" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s",
                  }}>
                    {step > s ? "✓" : s}
                  </div>
                  {s < 4 && <div style={{ width: "36px", height: "2px", borderRadius: "2px", background: step > s ? "linear-gradient(90deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.08)", transition: "all 0.3s" }} />}
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              Step {step} of 4 — {STEP_LABELS[step]}
            </p>
          </div>
        )}

        <div className="glass-card" style={{ borderRadius: "24px", padding: "36px" }}>

          {/* ── STEP 1 — Your Business ── */}
          {step === 1 && (
            <>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "6px" }}>
                Let&apos;s build your AI receptionist
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6, marginBottom: "28px" }}>
                Your AI will be fully trained for your specific industry and business in minutes.
              </p>

              {/* Industry picker */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>What type of business are you? *</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {INDUSTRIES.map((ind) => {
                    const active = industry === ind.id;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => { setIndustry(ind.id); setSelectedSpecialties([]); }}
                        style={{
                          padding: "12px 8px", borderRadius: "12px", cursor: "pointer", transition: "all 0.15s",
                          background: active ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                          border: active ? "1px solid rgba(124,58,237,0.6)" : "1px solid rgba(255,255,255,0.08)",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                        }}
                      >
                        <span style={{ fontSize: "22px" }}>{ind.icon}</span>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: active ? "#a78bfa" : "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.3 }}>{ind.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Business Name *</label>
                  <input style={inputStyle} type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your business name" />
                </div>
                <div>
                  <label style={labelStyle}>Your Full Name *</label>
                  <input style={inputStyle} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" />
                </div>
                <div>
                  <label style={labelStyle}>Business Phone Number *</label>
                  <input style={inputStyle} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 867-5309" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "5px" }}>This is the number your AI will cover when you&apos;re unavailable.</p>
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  {prefill?.email ? (
                    <div style={{ ...inputStyle, color: "rgba(255,255,255,0.35)", cursor: "default" }}>{email}</div>
                  ) : (
                    <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="btn-glow"
                style={{ width: "100%", marginTop: "28px", color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: step1Valid ? "pointer" : "not-allowed", opacity: step1Valid ? 1 : 0.45 }}
              >
                Continue →
              </button>
            </>
          )}

          {/* ── STEP 2 — Your Services ── */}
          {step === 2 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px" }}>
                  Your {industry === "Other" ? "Business" : industry} Services
                </h1>
                <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }}>
                  {INDUSTRIES.find(i => i.id === industry)?.icon} {industry}
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6, marginBottom: "28px" }}>
                The more detail you give, the better your AI qualifies callers and answers questions about your business.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>{SERVICE_AREA_LABEL[industry] || "Service Area"} *</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    placeholder={SERVICE_AREA_PLACEHOLDER[industry] || "Cities, regions, or locations you serve..."}
                  />
                </div>

                {specialties.length > 0 && (
                  <div>
                    <label style={labelStyle}>What do you specialize in? <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(select all that apply)</span></label>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>
                      Your AI uses this to qualify callers with the right questions and tell them upfront whether you&apos;re the right fit — saving you time on the wrong calls.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {specialties.map((s) => {
                        const active = selectedSpecialties.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => toggleSpecialty(s)}
                            style={{
                              padding: "7px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                              background: active ? "linear-gradient(135deg, #7c3aed, #06b6d4)" : "rgba(255,255,255,0.05)",
                              border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
                              color: active ? "white" : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {s}
                          </button>
                        );
                      })}
                      {/* Other pill — always shown at end */}
                      <button
                        onClick={() => setShowOtherInput(!showOtherInput)}
                        style={{
                          padding: "7px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                          background: showOtherInput ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                          border: showOtherInput ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.12)",
                          color: showOtherInput ? "white" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        + Other
                      </button>
                    </div>
                    {showOtherInput && (
                      <div style={{ marginTop: "10px" }}>
                        <input
                          style={inputStyle}
                          type="text"
                          value={otherSpecialty}
                          onChange={(e) => setOtherSpecialty(e.target.value)}
                          placeholder="Describe what you do that isn't listed above..."
                          autoFocus
                        />
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                          Your AI will use this to answer questions and qualify callers around your specific service.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {industry === "Other" && (
                  <div>
                    <label style={labelStyle}>What services do you offer?</label>
                    <input
                      style={inputStyle}
                      type="text"
                      value={selectedSpecialties.join(", ")}
                      onChange={(e) => setSelectedSpecialties(e.target.value ? [e.target.value] : [])}
                      placeholder="Brief description of your services..."
                    />
                  </div>
                )}

                <div>
                  <label style={labelStyle}>Your Website <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional — but helps)</span></label>
                  <input style={inputStyle} type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                    Your AI mentions this in SMS follow-ups and can reference it when answering questions about your business.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>← Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!step2Valid}
                  className="btn-glow"
                  style={{ flex: 2, color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: step2Valid ? "pointer" : "not-allowed", opacity: step2Valid ? 1 : 0.45 }}
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3 — AI Voice ── */}
          {step === 3 && (
            <>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "6px" }}>
                How should your AI sound?
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6, marginBottom: "28px" }}>
                Pick the tone that matches how you represent your business.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

                {/* AI Name */}
                <div>
                  <label style={labelStyle}>AI Assistant Name <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional)</span></label>
                  <input style={inputStyle} type="text" value={aiName} onChange={(e) => setAiName(e.target.value)} placeholder="e.g. Alex, Jordan, Morgan..." />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                    Give your AI a name and callers will hear it on every call — e.g. &ldquo;Hi, this is Alex with [Your Business]!&rdquo; Leaving this blank keeps it as &ldquo;[Your Name]&rsquo;s assistant.&rdquo;
                  </p>
                </div>

                {/* Voice selection */}
                <div>
                  <label style={labelStyle}>AI Voice *</label>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>
                    Choose the voice your AI uses on every call. Picking the right tone for your industry makes callers feel at ease immediately.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {VOICES.map((v) => {
                      const active = voiceId === v.id;
                      const isPlaying = playingVoice === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => setVoiceId(v.id)}
                          style={{
                            textAlign: "left", padding: "12px 14px", borderRadius: "12px", cursor: "pointer", transition: "all 0.15s",
                            background: active ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)",
                            border: active ? "1px solid rgba(124,58,237,0.55)" : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
                            <span style={{ fontWeight: 700, color: active ? "#a78bfa" : "rgba(255,255,255,0.8)", fontSize: "14px" }}>{v.label}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ fontSize: "10px", color: active ? "#a78bfa" : "rgba(255,255,255,0.3)", fontWeight: 600 }}>{v.gender}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleVoicePreview(v.id); }}
                                title={isPlaying ? "Stop" : "Preview voice"}
                                style={{
                                  width: "22px", height: "22px", borderRadius: "50%", border: "none", cursor: "pointer",
                                  background: isPlaying ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.1)",
                                  color: isPlaying ? "#06b6d4" : "rgba(255,255,255,0.5)",
                                  fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                                  flexShrink: 0, transition: "all 0.15s",
                                }}
                              >
                                {isPlaying ? "■" : "▶"}
                              </button>
                            </div>
                          </div>
                          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", margin: 0 }}>{v.tone}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "8px" }}>
                    Click ▶ on any voice to hear a sample before choosing.
                  </p>
                </div>

                {/* Greeting style */}
                <div>
                  <label style={labelStyle}>Greeting Style *</label>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>
                    The tone your AI uses on every call. Match this to how your business presents itself — it sets the caller&apos;s first impression.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {GREETING_STYLES.map((g) => {
                      const active = greetingStyle === g.id;
                      return (
                        <button
                          key={g.id}
                          onClick={() => setGreetingStyle(g.id)}
                          style={{
                            textAlign: "left", padding: "13px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.15s",
                            background: active ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
                            border: active ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <p style={{ fontWeight: 600, color: active ? "#a78bfa" : "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 3px" }}>{g.label}</p>
                          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0, fontStyle: "italic" }}>{g.preview(businessName, aiName)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Working hours */}
                <div>
                  <label style={labelStyle}>When are you available to take calls yourself? <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional — but helps)</span></label>
                  <input style={inputStyle} type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="Mon–Fri 9am–6pm, weekends by appointment" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                    Your AI tells callers when to expect you and covers all other hours automatically — so no caller ever feels ignored.
                  </p>
                </div>

                {/* Custom instructions */}
                <div>
                  <label style={labelStyle}>Anything specific your AI should always know or say? <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>(optional — but helps)</span></label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="e.g. Always ask how they heard about us. Don't book Sundays. Mention we offer free consultations. We serve clients in 3 languages."
                  />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "5px" }}>
                    This goes directly into your AI&apos;s instructions — the more specific you are, the more it sounds like you trained it yourself.
                  </p>
                </div>
              </div>

              {error && (
                <div style={{ marginTop: "16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", padding: "12px 16px", borderRadius: "10px" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>← Back</button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-glow"
                  style={{ flex: 2, color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: "pointer" }}
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 4 — Set Password ── */}
          {step === 4 && (
            <>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "22px", marginBottom: "6px" }}>
                Set your password
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6, marginBottom: "28px" }}>
                You&apos;ll use this to log into your dashboard at allthecalls.ai.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Password *</label>
                  <input
                    style={inputStyle}
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPwdError(""); }}
                    placeholder="At least 8 characters"
                    autoFocus
                  />
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password *</label>
                  <input
                    style={inputStyle}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setPwdError(""); }}
                    placeholder="Re-enter your password"
                  />
                </div>

                {pwdError && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", padding: "12px 16px", borderRadius: "10px" }}>
                    {pwdError}
                  </div>
                )}
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", padding: "12px 16px", borderRadius: "10px" }}>
                    {error}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>← Back</button>
                <button
                  onClick={handleFinish}
                  disabled={submitting || !step4Valid}
                  className="btn-glow"
                  style={{ flex: 2, color: "white", fontWeight: 700, fontSize: "15px", padding: "15px", borderRadius: "12px", border: "none", cursor: (submitting || !step4Valid) ? "not-allowed" : "pointer", opacity: (submitting || !step4Valid) ? 0.55 : 1 }}
                >
                  {submitting ? "Creating your AI…" : "Finish & Open Dashboard →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
