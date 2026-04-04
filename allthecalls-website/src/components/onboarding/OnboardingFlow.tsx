"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

const AI_NAMES = ["Sarah", "Alex", "Jordan", "Morgan", "Taylor", "Casey"];

const VOICE_OPTIONS = [
  { id: "arcana_celeste", label: "Celeste", desc: "Warm & professional" },
  { id: "arcana_nova",    label: "Nova",    desc: "Energetic & friendly" },
  { id: "arcana_sage",   label: "Sage",    desc: "Calm & trustworthy" },
];

type Step = 1 | 2 | 3 | 4 | 5;

export default function OnboardingFlow() {
  const { user, refreshClient } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — About you
  const [name, setName] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 — Your AI
  const [aiName, setAiName] = useState("Sarah");
  const [voiceId, setVoiceId] = useState("arcana_celeste");

  // Step 3 — Hours
  const [hours, setHours] = useState<"always" | "after_hours" | "custom">("always");

  // Step 4 result
  const [agentCreated, setAgentCreated] = useState(false);

  async function createAgent() {
    setSaving(true);
    setError("");

    try {
      const intro = `Hi, you've reached ${name}${brokerage ? ` with ${brokerage}` : ""}. I'm ${aiName}, their AI receptionist. How can I help you today?`;

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user!.id, name, brokerage, phone, aiName, voiceId, intro, hours }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Setup failed");

      await refreshClient();
      setAgentCreated(true);
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <span className="font-bold text-white text-sm">All The Calls</span>
          </div>
          <span className="text-slate-500 text-xs">Step {step} of 5</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-dark-600">
        <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* ── Step 1: About You ── */}
          {step === 1 && (
            <div>
              <div className="text-4xl mb-4">👋</div>
              <h1 className="text-2xl font-bold text-white mb-2">Let's get you set up</h1>
              <p className="text-slate-400 mb-8">This takes about 3 minutes. We'll have your AI live by the end.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Name</label>
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Sarah Johnson"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Brokerage</label>
                  <input
                    type="text" value={brokerage} onChange={e => setBrokerage(e.target.value)}
                    placeholder="Keller Williams, Compass, etc."
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Current Phone Number</label>
                  <input
                    type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                  <p className="text-slate-600 text-xs mt-1.5">We'll show you how to forward this number to your AI</p>
                </div>
              </div>

              <button
                onClick={() => setStep(2)} disabled={!name.trim()}
                className="w-full mt-8 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 2: Your AI ── */}
          {step === 2 && (
            <div>
              <div className="text-4xl mb-4">🤖</div>
              <h1 className="text-2xl font-bold text-white mb-2">Name your AI receptionist</h1>
              <p className="text-slate-400 mb-8">
                When your AI picks up, it says: <span className="text-white italic">"Hi, this is [Name] with {name || "your name"}..."</span>
              </p>

              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-400 mb-3">Pick a name</label>
                <div className="grid grid-cols-3 gap-2">
                  {AI_NAMES.map(n => (
                    <button
                      key={n}
                      onClick={() => setAiName(n)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        aiName === n
                          ? "bg-brand-600 text-white border-2 border-brand-500"
                          : "bg-dark-700 text-slate-400 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text" value={aiName} onChange={e => setAiName(e.target.value)}
                    placeholder="Or type a custom name..."
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-medium text-slate-400 mb-3">Choose a voice</label>
                <div className="space-y-2">
                  {VOICE_OPTIONS.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVoiceId(v.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                        voiceId === v.id
                          ? "border-brand-500 bg-brand-600/10 text-white"
                          : "border-white/10 bg-dark-700 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${voiceId === v.id ? "border-brand-500" : "border-slate-600"}`}>
                          {voiceId === v.id && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                        </div>
                        <span className="font-semibold text-sm">{v.label}</span>
                      </div>
                      <span className="text-xs text-slate-500">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-dark rounded-xl p-4 mb-8 border-l-2 border-brand-500">
                <p className="text-slate-400 text-xs mb-1">Preview intro:</p>
                <p className="text-white text-sm italic">
                  "Hi, you've reached {name || "your name"}{brokerage ? ` with ${brokerage}` : ""}. I'm {aiName}, their AI receptionist. How can I help you today?"
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors font-semibold">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)} disabled={!aiName.trim()}
                  className="flex-[2] bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Sounds good →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Hours ── */}
          {step === 3 && (
            <div>
              <div className="text-4xl mb-4">🕐</div>
              <h1 className="text-2xl font-bold text-white mb-2">When should your AI answer?</h1>
              <p className="text-slate-400 mb-8">You can change this any time from your dashboard.</p>

              <div className="space-y-3 mb-8">
                {[
                  { value: "always", label: "Always on", desc: "24/7 — every call goes to your AI first", icon: "⚡" },
                  { value: "after_hours", label: "After hours only", desc: "AI handles calls evenings (6pm–8am) and weekends", icon: "🌙" },
                  { value: "custom", label: "I'll configure it later", desc: "Go live now and set custom hours in settings", icon: "⚙️" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setHours(opt.value as typeof hours)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      hours === opt.value
                        ? "border-brand-500 bg-brand-600/10"
                        : "border-white/10 bg-dark-700 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{opt.label}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{opt.desc}</div>
                    </div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${hours === opt.value ? "border-brand-500" : "border-slate-600"}`}>
                      {hours === opt.value && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors font-semibold">
                  Back
                </button>
                <button
                  onClick={() => { setStep(4); createAgent(); }}
                  className="flex-[2] bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Create My AI →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Building ── */}
          {step === 4 && (
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-brand-600/20 animate-ping" />
                <div className="w-16 h-16 bg-brand-600/10 border border-brand-500/30 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-brand-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-3">Building your AI...</h1>
              <p className="text-slate-400 mb-8">Setting up {aiName}, training on your info, and getting ready to take calls.</p>

              <div className="card-dark rounded-xl p-4 text-left space-y-3">
                {[
                  { label: "Creating AI agent profile", done: true },
                  { label: `Training ${aiName} on your intro script`, done: saving ? false : true },
                  { label: "Configuring call handling", done: !saving },
                  { label: "Activating 24/7 availability", done: agentCreated },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {item.done ? (
                      <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 border border-slate-600 rounded-full flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" />
                      </div>
                    )}
                    <span className={item.done ? "text-slate-300" : "text-slate-600"}>{item.label}</span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error} —{" "}
                  <button onClick={() => { setStep(3); setError(""); }} className="underline">try again</button>
                </div>
              )}
            </div>
          )}

          {/* ── Step 5: Go Live ── */}
          {step === 5 && (
            <div>
              <div className="text-5xl mb-4 text-center">🎉</div>
              <h1 className="text-2xl font-bold text-white mb-2 text-center">{aiName} is ready!</h1>
              <p className="text-slate-400 mb-8 text-center">Your AI receptionist is live. Here's how to activate it in 60 seconds.</p>

              <div className="space-y-3 mb-8">
                <div className="card-dark rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold flex items-center justify-center">1</div>
                    <span className="text-white font-semibold text-sm">Check your email</span>
                  </div>
                  <p className="text-slate-500 text-xs ml-9">We sent your dedicated phone number to {user?.email}. It's active and ready.</p>
                </div>

                <div className="card-dark rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold flex items-center justify-center">2</div>
                    <span className="text-white font-semibold text-sm">Forward your calls</span>
                  </div>
                  <p className="text-slate-500 text-xs ml-9">On your phone: Settings → Phone → Call Forwarding → enter your new number. Takes 30 seconds.</p>
                </div>

                <div className="card-dark rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-bold flex items-center justify-center">3</div>
                    <span className="text-white font-semibold text-sm">Test it right now</span>
                  </div>
                  <p className="text-slate-500 text-xs ml-9">Call your number from a different phone. {aiName} will answer in your name. If it sounds right, you're live.</p>
                </div>
              </div>

              {/* Install PWA prompt */}
              <div className="bg-brand-600/10 border border-brand-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Add to your home screen</p>
                    <p className="text-slate-400 text-xs">Get instant push notifications for every call. Tap <strong className="text-white">Share → Add to Home Screen</strong> in your browser.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Go to My Dashboard →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
