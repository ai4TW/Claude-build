import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type CallLog = {
  id: string;
  caller_number: string;
  duration_seconds: number;
  transcript: string | null;
  summary: string | null;
  lead_score: number | null;
  appointment_booked: boolean;
  called_at: string;
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmt(s: number) {
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function ScoreBadge({ score }: { score: number | null }) {
  if (!score) return null;
  const [bg, text] = score >= 8 ? ["bg-green-500/10 text-green-400 border-green-500/20", ""] : score >= 5 ? ["bg-amber-500/10 text-amber-400 border-amber-500/20", ""] : ["bg-slate-800 text-slate-500 border-white/10", ""];
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${bg}`}>Score {score}/10</span>;
}

// Single call transcript view
function TranscriptView({ callId, calls }: { callId: string; calls: CallLog[] }) {
  const navigate = useNavigate();
  const call = calls.find(c => c.id === callId);

  if (!call) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-400 mb-4">Call not found</p>
        <button onClick={() => navigate("/dashboard/calls")} className="text-brand-400 hover:underline text-sm">← Back to calls</button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full">
      <button onClick={() => navigate("/dashboard/calls")} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
        Back to calls
      </button>

      <div className="card-dark rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-white font-bold text-lg">{call.caller_number || "Unknown caller"}</div>
            <div className="text-slate-500 text-sm mt-0.5">
              {new Date(call.called_at).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              {" · "}{fmt(call.duration_seconds)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <ScoreBadge score={call.lead_score} />
            {call.appointment_booked && (
              <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">✓ Appointment booked</span>
            )}
          </div>
        </div>

        {call.summary && (
          <div className="bg-dark-700 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">AI Summary</div>
            <p className="text-slate-300 text-sm leading-relaxed">{call.summary}</p>
          </div>
        )}
      </div>

      {call.transcript ? (
        <div className="card-dark rounded-2xl p-6">
          <div className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wide">Full Transcript</div>
          <div className="space-y-3 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-mono text-xs">
            {call.transcript}
          </div>
        </div>
      ) : (
        <div className="card-dark rounded-2xl p-6 text-center">
          <p className="text-slate-500 text-sm">Transcript processing...</p>
        </div>
      )}
    </div>
  );
}

export default function CallHistory() {
  const { client } = useAuth();
  const { callId } = useParams();
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "hot" | "booked">("all");

  useEffect(() => {
    if (!client?.trillet_agent_id) { setLoading(false); return; }
    fetch(`/api/calls?agentId=${client.trillet_agent_id}&limit=50`)
      .then(r => r.json())
      .then(d => setCalls(d.calls || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [client]);

  if (callId) return <TranscriptView callId={callId} calls={calls} />;

  const filtered = calls.filter(c => {
    if (filter === "hot") return (c.lead_score ?? 0) >= 7;
    if (filter === "booked") return c.appointment_booked;
    return true;
  });

  return (
    <div className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Call History</h1>
          <p className="text-slate-500 text-sm mt-1">{calls.length} calls total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "hot", "booked"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              filter === f
                ? "bg-brand-600/15 border-brand-500/20 text-brand-400"
                : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400"
            }`}
          >
            {f === "all" ? "All Calls" : f === "hot" ? "🔥 Hot Leads" : "📅 Appts Booked"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="card-dark rounded-2xl p-4 animate-pulse">
              <div className="h-3 bg-dark-600 rounded w-1/3 mb-2" />
              <div className="h-2 bg-dark-600 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-dark rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">📞</div>
          <p className="text-slate-400 text-sm">{calls.length === 0 ? "No calls yet — your AI is standing by" : "No calls match this filter"}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(call => (
            <Link
              key={call.id}
              to={`/dashboard/calls/${call.id}`}
              className="card-dark rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors group block"
            >
              <div className="w-9 h-9 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-semibold">{call.caller_number || "Unknown"}</span>
                  {call.appointment_booked && <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">Appt</span>}
                </div>
                <p className="text-slate-500 text-xs truncate mt-0.5">{call.summary || "Handled by AI"}</p>
              </div>
              <div className="text-right flex-shrink-0 space-y-1">
                <ScoreBadge score={call.lead_score} />
                <div className="text-slate-600 text-xs">{timeAgo(call.called_at)}</div>
                <div className="text-slate-700 text-xs">{fmt(call.duration_seconds)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
