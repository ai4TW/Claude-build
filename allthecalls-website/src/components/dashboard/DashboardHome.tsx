import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type CallLog = {
  id: string;
  caller_number: string;
  duration_seconds: number;
  summary: string | null;
  lead_score: number | null;
  appointment_booked: boolean;
  called_at: string;
};

type Stats = {
  today: number;
  week: number;
  leads: number;
  appointments: number;
  answer_rate: number;
};

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`card-dark rounded-2xl p-5 ${accent ? "border border-brand-500/20 bg-brand-600/5" : ""}`}>
      <div className="text-slate-500 text-xs mb-2">{label}</div>
      <div className={`text-3xl font-extrabold mb-1 ${accent ? "text-gradient" : "text-white"}`}>{value}</div>
      {sub && <div className="text-slate-600 text-xs">{sub}</div>}
    </div>
  );
}

function LeadScore({ score }: { score: number | null }) {
  if (!score) return <span className="text-slate-600 text-xs">—</span>;
  const color = score >= 8 ? "text-green-400" : score >= 5 ? "text-amber-400" : "text-slate-500";
  return <span className={`text-sm font-bold ${color}`}>{score}/10</span>;
}

function formatDuration(s: number) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function DashboardHome() {
  const { client } = useAuth();
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [stats, setStats] = useState<Stats>({ today: 0, week: 0, leads: 0, appointments: 0, answer_rate: 100 });
  const [agentActive, setAgentActive] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client?.trillet_agent_id) { setLoading(false); return; }
    fetch(`/api/calls?agentId=${client.trillet_agent_id}`)
      .then(r => r.json())
      .then(data => {
        const list: CallLog[] = data.calls || [];
        setCalls(list.slice(0, 6));
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekStart = new Date(todayStart.getTime() - 7 * 86400000);
        const todayCalls = list.filter(c => new Date(c.called_at) >= todayStart);
        const weekCalls  = list.filter(c => new Date(c.called_at) >= weekStart);
        setStats({
          today: todayCalls.length,
          week: weekCalls.length,
          leads: weekCalls.filter(c => (c.lead_score ?? 0) >= 6).length,
          appointments: weekCalls.filter(c => c.appointment_booked).length,
          answer_rate: 100,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [client]);

  async function toggleAgent() {
    if (!client?.trillet_agent_id || toggling) return;
    setToggling(true);
    const res = await fetch("/api/agent", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId: client.trillet_agent_id, active: !agentActive }),
    });
    if (res.ok) setAgentActive(a => !a);
    setToggling(false);
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto w-full">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {client?.name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what your AI is doing</p>
        </div>

        {/* Agent status toggle */}
        <button
          onClick={toggleAgent}
          disabled={toggling || !client?.trillet_agent_id}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
            agentActive
              ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
              : "bg-dark-700 border-white/10 text-slate-500 hover:border-white/20"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${agentActive ? "bg-green-400 animate-pulse" : "bg-slate-600"}`} />
          {agentActive ? "AI Live" : "AI Paused"}
        </button>
      </div>

      {/* Onboarding CTA if not set up */}
      {!client?.trillet_agent_id && (
        <div className="card-dark rounded-2xl p-6 border border-brand-500/20 bg-brand-600/5 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚀</div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">Finish setting up your AI</h3>
              <p className="text-slate-400 text-sm mb-4">Complete onboarding to activate your AI receptionist and start getting call summaries here.</p>
              <Link to="/onboarding" className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
                Complete Setup →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Calls Today" value={stats.today} sub="answered by AI" accent />
        <StatCard label="Calls This Week" value={stats.week} />
        <StatCard label="Hot Leads" value={stats.leads} sub="score 6+" />
        <StatCard label="Appts Booked" value={stats.appointments} sub="this week" />
      </div>

      {/* Phone number card */}
      {client?.trillet_phone_number && (
        <div className="card-dark rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Your AI's number</div>
            <div className="text-white font-mono font-bold text-lg">{client.trillet_phone_number}</div>
          </div>
          <div className="text-xs text-slate-500 text-right">
            <div>Forward your calls to this number</div>
            <div className="text-brand-400 mt-0.5">Active 24/7</div>
          </div>
        </div>
      )}

      {/* Recent calls */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Recent Calls</h2>
          <Link to="/dashboard/calls" className="text-brand-400 text-sm hover:underline">View all →</Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="card-dark rounded-2xl p-4 animate-pulse">
                <div className="h-3 bg-dark-600 rounded w-1/3 mb-2" />
                <div className="h-2 bg-dark-600 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : calls.length === 0 ? (
          <div className="card-dark rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">📞</div>
            <p className="text-slate-400 text-sm">No calls yet — your AI is standing by</p>
            <p className="text-slate-600 text-xs mt-1">Calls will appear here in real time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {calls.map(call => (
              <Link key={call.id} to={`/dashboard/calls/${call.id}`} className="card-dark rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors group block">
                <div className="w-9 h-9 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">{call.caller_number || "Unknown"}</span>
                    {call.appointment_booked && (
                      <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">Appt booked</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs truncate mt-0.5">{call.summary || "Handled by AI"}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <LeadScore score={call.lead_score} />
                  <div className="text-slate-600 text-xs mt-0.5">{timeAgo(call.called_at)}</div>
                  <div className="text-slate-700 text-xs">{formatDuration(call.duration_seconds)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
