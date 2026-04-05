"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CallRecord {
  _id: string;
  createdAt: string;
  duration?: number;
  from?: string;
  to?: string;
  summary?: string;
  transcript?: string;
  recordingUrl?: string;
  status?: string;
}

interface AgentData {
  name?: string;
  prompt?: string;
  ttsModel?: { voiceId?: string };
  settings?: { model?: string };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const VOICES = [
  { id: "mistv3_astra",  label: "Astra",  gender: "F", tone: "Professional" },
  { id: "mistv3_luna",   label: "Luna",   gender: "F", tone: "Warm" },
  { id: "mistv3_ember",  label: "Ember",  gender: "F", tone: "Energetic" },
  { id: "mistv3_river",  label: "River",  gender: "M", tone: "Trustworthy" },
  { id: "mistv3_cove",   label: "Cove",   gender: "M", tone: "Calm" },
  { id: "mistv3_grove",  label: "Grove",  gender: "M", tone: "Steady" },
  { id: "mistv3_marsh",  label: "Marsh",  gender: "M", tone: "Deep" },
];

const GREETINGS = [
  { id: "professional", label: "Professional", desc: "Polished & efficient" },
  { id: "friendly",     label: "Friendly",     desc: "Warm & conversational" },
  { id: "luxury",       label: "Luxury",       desc: "Premium & refined" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  bg: "#08090f",
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" },
  cardActive: { background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.5)", borderRadius: "16px" },
  input: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 14px", color: "white", fontSize: "14px", outline: "none", fontFamily: "inherit" },
  label: { fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "8px", display: "block" },
  btn: { width: "100%", padding: "15px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "white", fontWeight: 700, fontSize: "15px", cursor: "pointer", fontFamily: "inherit" },
  btnGhost: { padding: "10px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "13px", fontFamily: "inherit" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(sec: number) {
  if (!sec) return "—";
  const m = Math.floor(sec / 60), ss = sec % 60;
  return `${m}m ${ss}s`;
}
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function callerLabel(call: CallRecord) {
  const num = call.from || call.to || "";
  if (!num) return "Unknown caller";
  const digits = num.replace(/\D/g, "");
  if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  if (digits.length === 11) return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  return num;
}
function extractAiName(prompt: string) {
  const m = prompt?.match(/Your name is ([^\.]+)\./);
  return m ? m[1].replace(/['"]/g, "").trim() : "";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PulseIndicator() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22d3ee", opacity: 0.4, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
      <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22d3ee" }} />
      <style>{`@keyframes ping{75%,100%{transform:scale(2);opacity:0}}`}</style>
    </span>
  );
}

function StatCard({ value, label, sub }: { value: string | number; label: string; sub?: string }) {
  return (
    <div style={{ ...s.card, padding: "16px", flex: 1 }}>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "white", fontFamily: "var(--font-space-grotesk), sans-serif" }}>{value}</div>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function CallCard({ call, onPlay }: { call: CallRecord; onPlay: (url: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ ...s.card, padding: "14px 16px", marginBottom: 8, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
          📞
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: "white", fontSize: 14 }}>{callerLabel(call)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
            {timeAgo(call.createdAt)} · {fmt(call.duration || 0)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {call.recordingUrl && (
            <button
              onClick={(e) => { e.stopPropagation(); onPlay(call.recordingUrl!); }}
              style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
            >▶</button>
          )}
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, transform: expanded ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
        </div>
      </div>
      {expanded && (call.summary || call.transcript) && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {call.summary && (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: call.transcript ? 10 : 0 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Summary · </span>
              {call.summary}
            </div>
          )}
          {call.transcript && (
            <details>
              <summary style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer", marginTop: 4 }}>View transcript</summary>
              <pre style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", whiteSpace: "pre-wrap", marginTop: 8, lineHeight: 1.6 }}>{call.transcript}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Home ────────────────────────────────────────────────────────────────
function HomeTab({ clientName, calls, onTabChange }: { clientName: string; calls: CallRecord[]; onTabChange: (t: string) => void }) {
  const firstName = clientName.split(" ")[0];
  const today = new Date().toDateString();
  const todayCalls = calls.filter(c => new Date(c.createdAt).toDateString() === today);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playRecording(url: string) {
    audioRef.current?.pause();
    const a = new Audio(url);
    audioRef.current = a;
    a.play().catch(() => {});
  }

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {/* Header */}
      <div style={{ padding: "24px 0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <PulseIndicator />
          <span style={{ fontSize: 12, color: "#22d3ee", fontWeight: 600, letterSpacing: "0.05em" }}>AI LIVE</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk), sans-serif" }}>
          Hey {firstName} 👋
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
          Your AI is handling calls right now.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <StatCard value={todayCalls.length} label="Calls today" />
        <StatCard value={calls.length} label="Total calls" />
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        <button
          onClick={() => onTabChange("ai")}
          style={{ ...s.card, padding: "16px", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ fontSize: 22, marginBottom: 6 }}>🎙️</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Edit My AI</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Voice, name, tone</div>
        </button>
        <button
          onClick={() => onTabChange("teach")}
          style={{ ...s.card, padding: "16px", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ fontSize: 22, marginBottom: 6 }}>📚</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Teach My AI</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Add FAQs & info</div>
        </button>
        <button
          onClick={() => onTabChange("calls")}
          style={{ ...s.card, padding: "16px", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ fontSize: 22, marginBottom: 6 }}>📋</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Call History</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Listen & review</div>
        </button>
        <button
          onClick={() => onTabChange("settings")}
          style={{ ...s.card, padding: "16px", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div style={{ fontSize: 22, marginBottom: 6 }}>⚙️</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Settings</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Account & billing</div>
        </button>
      </div>

      {/* Recent calls */}
      {calls.length > 0 && (
        <>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>Recent Calls</div>
          {calls.slice(0, 5).map(c => <CallCard key={c._id} call={c} onPlay={playRecording} />)}
          {calls.length > 5 && (
            <button onClick={() => onTabChange("calls")} style={{ ...s.btnGhost, width: "100%", marginTop: 4 }}>
              View all {calls.length} calls →
            </button>
          )}
        </>
      )}

      {calls.length === 0 && (
        <div style={{ ...s.card, padding: "28px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📵</div>
          <div style={{ fontWeight: 600, color: "white", marginBottom: 4 }}>No calls yet</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Once your phone number is assigned, calls will appear here.</div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: My AI ───────────────────────────────────────────────────────────────
function MyAiTab({ agent }: { agent: AgentData | null }) {
  const [aiName, setAiName] = useState(extractAiName(agent?.prompt || ""));
  const [voiceId, setVoiceId] = useState(agent?.ttsModel?.voiceId || "mistv3_astra");
  const [greeting, setGreeting] = useState<"professional" | "friendly" | "luxury">("professional");
  const [hours, setHours] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function playPreview(vId: string) {
    if (playingVoice === vId) { audioRef.current?.pause(); setPlayingVoice(null); return; }
    audioRef.current?.pause();
    setPlayingVoice(vId);
    try {
      const a = new Audio(`/api/voice-preview?voice=${encodeURIComponent(vId)}`);
      audioRef.current = a;
      a.onended = () => setPlayingVoice(null);
      a.onerror = () => setPlayingVoice(null);
      await a.play();
    } catch { setPlayingVoice(null); }
  }

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/client/agent", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aiName, voiceId, greetingStyle: greeting, workingHours: hours, customInstructions: instructions }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div style={{ padding: "24px 0 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk), sans-serif" }}>My AI Receptionist</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Changes go live on your next call.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* AI Name */}
        <div>
          <label style={s.label}>AI Name <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>— optional</span></label>
          <input style={s.input} value={aiName} onChange={e => setAiName(e.target.value)} placeholder="e.g. Alex, Jordan, Riley…" />
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 5 }}>Callers will hear this name when your AI answers.</p>
        </div>

        {/* Voice */}
        <div>
          <label style={s.label}>Voice</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {VOICES.map(v => {
              const active = voiceId === v.id;
              const playing = playingVoice === v.id;
              return (
                <div key={v.id} onClick={() => setVoiceId(v.id)}
                  style={{ ...(active ? s.cardActive : s.card), padding: "12px 14px", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontWeight: 700, color: active ? "#a78bfa" : "white", fontSize: 14 }}>{v.label}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>{v.gender}</span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); playPreview(v.id); }}
                      style={{ width: 24, height: 24, borderRadius: "50%", border: "none", background: playing ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.08)", color: playing ? "#06b6d4" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    >{playing ? "■" : "▶"}</button>
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "3px 0 0" }}>{v.tone}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Greeting */}
        <div>
          <label style={s.label}>Greeting Style</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {GREETINGS.map(g => {
              const active = greeting === g.id;
              return (
                <div key={g.id} onClick={() => setGreeting(g.id as "professional" | "friendly" | "luxury")}
                  style={{ ...(active ? s.cardActive : s.card), padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${active ? "#a78bfa" : "rgba(255,255,255,0.2)"}`, background: active ? "#a78bfa" : "transparent", flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: active ? "#a78bfa" : "white", fontSize: 14 }}>{g.label}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginLeft: 8 }}>{g.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hours */}
        <div>
          <label style={s.label}>Your Available Hours <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>— optional</span></label>
          <input style={s.input} value={hours} onChange={e => setHours(e.target.value)} placeholder="Mon–Fri 9am–6pm, weekends by appt" />
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 5 }}>Your AI tells callers when to expect you back.</p>
        </div>

        {/* Custom instructions */}
        <div>
          <label style={s.label}>Special Instructions <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>— optional</span></label>
          <textarea
            style={{ ...s.input, minHeight: 90, resize: "vertical" }}
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="e.g. Always ask how they heard about us. Don't book Sundays. Mention free consultations are available."
          />
        </div>

        <button onClick={save} disabled={saving} style={s.btn}>
          {saved ? "✓ Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Tab: Teach ───────────────────────────────────────────────────────────────
function TeachTab() {
  const [sections, setSections] = useState({ about: "", services: "", faqs: "", custom: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/client/knowledge")
      .then(r => r.json())
      .then(d => { if (d.sections) setSections(s => ({ ...s, ...d.sections })); })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/client/knowledge", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Loading…</div>
    </div>
  );

  const blocks = [
    { key: "about",    label: "About Your Business",   icon: "🏢", placeholder: "Describe what you do, your mission, and what makes you different from competitors.\n\nExample: We're a family-owned HVAC company serving Dallas since 2005. We specialize in same-day service and offer a 100% satisfaction guarantee on every job." },
    { key: "services", label: "Services & Pricing",     icon: "💼", placeholder: "List your services and any pricing info your AI should know.\n\nExample:\n• AC Installation: $3,500–$7,000 depending on size\n• Emergency repair: $150 diagnostic fee\n• Maintenance plans starting at $12/month" },
    { key: "faqs",     label: "FAQs",                   icon: "❓", placeholder: "Write questions and answers your AI should know.\n\nQ: Do you offer financing?\nA: Yes, we offer 0% financing for 12 months on installs over $2,000.\n\nQ: How fast can you come out?\nA: Same day for emergencies, next business day for standard service." },
    { key: "custom",   label: "Special Instructions",   icon: "⚡", placeholder: "Anything specific your AI should always do or say.\n\nExamples:\n• Always ask how the caller heard about us\n• Mention we're running a summer tune-up special — $79 instead of $129\n• Never give prices over the phone without a diagnostic first" },
  ] as const;

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk), sans-serif" }}>Teach Your AI</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>The more you add, the smarter your AI gets on every call.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {blocks.map(b => (
          <div key={b.key} style={{ ...s.card, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <label style={{ ...s.label, margin: 0 }}>{b.label}</label>
            </div>
            <textarea
              style={{ ...s.input, minHeight: 100, resize: "vertical", fontSize: 13, lineHeight: 1.6 }}
              value={sections[b.key]}
              onChange={e => setSections(prev => ({ ...prev, [b.key]: e.target.value }))}
              placeholder={b.placeholder}
            />
          </div>
        ))}

        <button onClick={save} disabled={saving} style={s.btn}>
          {saved ? "✓ Saved to AI!" : saving ? "Saving…" : "Save to My AI"}
        </button>

        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
          Changes are live on your next incoming call.
        </p>
      </div>
    </div>
  );
}

// ─── Tab: Calls ───────────────────────────────────────────────────────────────
function CallsTab({ calls }: { calls: CallRecord[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playRecording(url: string) {
    audioRef.current?.pause();
    const a = new Audio(url);
    audioRef.current = a;
    a.play().catch(() => {});
  }

  const grouped: Record<string, CallRecord[]> = {};
  for (const c of calls) {
    const day = new Date(c.createdAt).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    (grouped[day] ||= []).push(c);
  }

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div style={{ padding: "24px 0 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk), sans-serif" }}>Call History</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{calls.length} total calls handled by your AI</p>
      </div>

      {calls.length === 0 && (
        <div style={{ ...s.card, padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📵</div>
          <div style={{ fontWeight: 600, color: "white", marginBottom: 6 }}>No calls yet</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Your call history will appear here once your AI starts answering.</div>
        </div>
      )}

      {Object.entries(grouped).map(([day, dayCalls]) => (
        <div key={day} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{day}</div>
          {dayCalls.map(c => <CallCard key={c._id} call={c} onPlay={playRecording} />)}
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────
function SettingsTab({ clientName, email }: { clientName: string; email: string }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail]           = useState("");
  const [emailStatus, setEmailStatus]     = useState<"idle" | "saving" | "success" | "error">("idle");
  const [emailError, setEmailError]       = useState("");

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  async function handleEmailChange() {
    if (!newEmail.includes("@")) { setEmailError("Enter a valid email."); return; }
    setEmailStatus("saving");
    setEmailError("");
    const res = await fetch("/api/client/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setEmailStatus("success");
      setShowEmailForm(false);
      setNewEmail("");
      // Force re-login so session email refreshes
      setTimeout(() => { window.location.href = "/login?msg=email-updated"; }, 1200);
    } else {
      setEmailStatus("error");
      setEmailError(data.error || "Something went wrong.");
    }
  }

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div style={{ padding: "24px 0 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0, fontFamily: "var(--font-space-grotesk), sans-serif" }}>Settings</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Account */}
        <div style={{ ...s.card, padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Account</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: showEmailForm ? 16 : 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "white", fontWeight: 700, flexShrink: 0 }}>
              {clientName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: "white", fontSize: 15 }}>{clientName}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email || "—"}</div>
            </div>
            <button
              onClick={() => { setShowEmailForm(v => !v); setEmailError(""); setEmailStatus("idle"); }}
              style={{ fontSize: 12, color: "#a78bfa", background: "none", border: "none", cursor: "pointer", padding: "4px 0", flexShrink: 0 }}
            >
              {showEmailForm ? "Cancel" : "Change"}
            </button>
          </div>

          {showEmailForm && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="email"
                placeholder="New email address"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 14px", color: "white", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" }}
              />
              {emailError && <div style={{ fontSize: 12, color: "#f87171" }}>{emailError}</div>}
              {emailStatus === "success" && <div style={{ fontSize: 12, color: "#4ade80" }}>Email updated — redirecting to login…</div>}
              <button
                onClick={handleEmailChange}
                disabled={emailStatus === "saving"}
                style={{ ...s.btnGlow, padding: "12px", opacity: emailStatus === "saving" ? 0.6 : 1 }}
              >
                {emailStatus === "saving" ? "Saving…" : "Save New Email"}
              </button>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div style={{ ...s.card, padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Calendar Integration</div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12, lineHeight: 1.5 }}>
            Connect your calendar so your AI can check availability and book appointments in real time.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={{ ...s.card, padding: "13px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
              <span style={{ fontSize: 20 }}>📅</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Google Calendar</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Connect to enable AI booking</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>→</span>
            </button>
            <button style={{ ...s.card, padding: "13px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
              <span style={{ fontSize: 20 }}>🗓️</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Cal.com</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Connect to enable AI booking</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>→</span>
            </button>
          </div>
        </div>

        {/* Support */}
        <div style={{ ...s.card, padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Support</div>
          <a href="mailto:hello@allthecalls.ai" style={{ display: "flex", alignItems: "center", gap: 10, color: "white", textDecoration: "none", fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>✉️</span>
            hello@allthecalls.ai
          </a>
        </div>

        {/* Install PWA hint */}
        <div style={{ ...s.card, padding: "16px", background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ fontSize: 20 }}>📱</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 4 }}>Add to Home Screen</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                Tap the share icon in your browser and choose &quot;Add to Home Screen&quot; for a full app experience.
              </div>
            </div>
          </div>
        </div>

        <button onClick={logout} style={{ ...s.btnGhost, width: "100%", padding: "14px", color: "rgba(239,68,68,0.7)", borderColor: "rgba(239,68,68,0.2)" }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ tab, onChange }: { tab: string; onChange: (t: string) => void }) {
  const items = [
    { id: "home",     icon: "⊞", label: "Home" },
    { id: "ai",       icon: "🎙", label: "My AI" },
    { id: "teach",    icon: "📚", label: "Teach" },
    { id: "calls",    icon: "📋", label: "Calls" },
    { id: "settings", icon: "⚙",  label: "More" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 480,
      background: "rgba(8,9,15,0.95)", borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex", paddingBottom: "env(safe-area-inset-bottom)",
      backdropFilter: "blur(20px)", zIndex: 100,
    }}>
      {items.map(item => {
        const active = tab === item.id;
        return (
          <button key={item.id} onClick={() => onChange(item.id)} style={{
            flex: 1, padding: "10px 4px 8px", border: "none", background: "transparent",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          }}>
            <span style={{ fontSize: 20, filter: active ? "none" : "grayscale(1) opacity(0.4)", transition: "0.15s" }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#a78bfa" : "rgba(255,255,255,0.3)", transition: "0.15s" }}>{item.label}</span>
            {active && <span style={{ width: 16, height: 2, borderRadius: 1, background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }} />}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ClientDashboard({ clientName, email }: { clientName: string; email: string }) {
  const [tab, setTab] = useState("home");
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [agent, setAgent] = useState<AgentData | null>(null);

  useEffect(() => {
    fetch("/api/client/calls").then(r => r.json()).then(d => setCalls(Array.isArray(d) ? d : []));
    fetch("/api/client/agent").then(r => r.json()).then(d => setAgent(d));
  }, []);

  return (
    <div style={{ background: s.bg, minHeight: "100dvh", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,9,15,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)", padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "calc(12px + env(safe-area-inset-top))",
      }}>
        <img src="/logo.svg" alt="AllTheCalls.ai" style={{ height: 28 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <PulseIndicator />
          <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 600 }}>AI Live</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>
        {tab === "home"     && <HomeTab clientName={clientName} calls={calls} onTabChange={setTab} />}
        {tab === "ai"       && <MyAiTab agent={agent} />}
        {tab === "teach"    && <TeachTab />}
        {tab === "calls"    && <CallsTab calls={calls} />}
        {tab === "settings" && <SettingsTab clientName={clientName} email={email} />}
      </div>

      <BottomNav tab={tab} onChange={setTab} />
    </div>
  );
}
