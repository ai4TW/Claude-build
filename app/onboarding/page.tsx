"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    // In a real app, we'd fire off an API call to Supabase/Trillet here
    alert(`Registration started for ${formData.businessName}! Redirecting to checkout...`);
    router.push("/#pricing");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", display: "flex", flexDirection: "column" }}>
      {/* NAV */}
      <nav style={{ padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", borderBottom: "1px solid #e4e4e7", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            AllTheCalls
          </Link>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#71717a" }}>Step {step} of 3</span>
        </div>
      </nav>

      {/* BODY */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 1.5rem" }}>
        <div style={{ maxWidth: "480px", width: "100%", background: "#ffffff", borderRadius: "16px", padding: "40px", border: "1px solid #e4e4e7", boxShadow: "0 12px 32px -12px rgba(0,0,0,0.08)" }}>
          
          {step === 1 && (
            <div className="fade-in">
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#09090b", marginBottom: "8px", letterSpacing: "-0.03em" }}>Tell us about your business</h1>
              <p style={{ color: "#52525b", fontSize: "15px", marginBottom: "32px" }}>We'll customize your AI receptionist based on your industry.</p>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#09090b", marginBottom: "8px" }}>Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Smith Realty Group"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #d4d4d8", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border 0.2s" }}
                  onFocus={(e) => e.target.style.borderColor = "#09090b"}
                  onBlur={(e) => e.target.style.borderColor = "#d4d4d8"}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#09090b", marginBottom: "8px" }}>Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #d4d4d8", borderRadius: "8px", fontSize: "15px", outline: "none", backgroundColor: "white", cursor: "pointer", transition: "border 0.2s" }}
                  onFocus={(e) => e.target.style.borderColor = "#09090b"}
                  onBlur={(e) => e.target.style.borderColor = "#d4d4d8"}
                >
                  <option value="" disabled>Select an industry...</option>
                  {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.businessName || !formData.industry}
                style={{ width: "100%", padding: "14px 24px", background: (!formData.businessName || !formData.industry) ? "#d4d4d8" : "#09090b", color: "#ffffff", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: (!formData.businessName || !formData.industry) ? "not-allowed" : "pointer", border: "none", transition: "background 0.2s" }}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#09090b", marginBottom: "8px", letterSpacing: "-0.03em" }}>Customize your AI</h1>
              <p style={{ color: "#52525b", fontSize: "15px", marginBottom: "32px" }}>What should your AI prioritize when talking to callers?</p>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#09090b", marginBottom: "8px" }}>Primary Goal</label>
                <select
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #d4d4d8", borderRadius: "8px", fontSize: "15px", outline: "none", backgroundColor: "white", cursor: "pointer", transition: "border 0.2s" }}
                >
                  <option value="" disabled>Select goal...</option>
                  <option value="book">Book appointments / Showings</option>
                  <option value="qualify">Qualify leads & gather info</option>
                  <option value="support">Customer support & FAQs</option>
                  <option value="triage">Urgent triage & dispatch</option>
                </select>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#09090b", marginBottom: "8px" }}>Custom Instructions (Optional)</label>
                <textarea
                  placeholder="E.g. If the caller asks about pricing, let them know consultations are free."
                  value={formData.aiCustomPrompt}
                  onChange={(e) => setFormData({ ...formData, aiCustomPrompt: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #d4d4d8", borderRadius: "8px", fontSize: "15px", outline: "none", minHeight: "100px", resize: "vertical", transition: "border 0.2s" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={handleBack} style={{ flex: 1, padding: "14px 24px", background: "white", color: "#09090b", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer", border: "1px solid #e4e4e7" }}>
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!formData.primaryGoal}
                  style={{ flex: 2, padding: "14px 24px", background: !formData.primaryGoal ? "#d4d4d8" : "#09090b", color: "#ffffff", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: !formData.primaryGoal ? "not-allowed" : "pointer", border: "none" }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#09090b", marginBottom: "8px", letterSpacing: "-0.03em" }}>Final details</h1>
              <p style={{ color: "#52525b", fontSize: "15px", marginBottom: "32px" }}>Where should we send your call transcripts?</p>
              
              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#09090b", marginBottom: "8px" }}>Mobile Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #d4d4d8", borderRadius: "8px", fontSize: "15px", outline: "none", transition: "border 0.2s" }}
                />
                <p style={{ fontSize: "13px", color: "#71717a", marginTop: "8px" }}>We'll text you VIP access inside.</p>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={handleBack} style={{ flex: 1, padding: "14px 24px", background: "white", color: "#09090b", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer", border: "1px solid #e4e4e7" }}>
                  Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.phone}
                  style={{ flex: 2, padding: "14px 24px", background: !formData.phone ? "#d4d4d8" : "#10b981", color: "#ffffff", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: !formData.phone ? "not-allowed" : "pointer", border: "none" }}
                >
                  Save & Secure Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
