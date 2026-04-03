import { getSession } from "@/lib/session";

async function fetchStats() {
  const key = process.env.TRILLET_API_KEY;
  const workspaceId = process.env.TRILLET_WORKSPACE_ID;
  if (!key || !workspaceId) return null;

  try {
    const res = await fetch(`https://api.trillet.ai/v2/api/call-history`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "x-workspace-id": workspaceId,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.calls ?? data) as Array<{ lead_captured?: boolean; duration?: number }>;
  } catch {
    return null;
  }
}

// Fallback demo stats
const DEMO_STATS = { total: 5, leads: 4, avgDuration: 105, active: true };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const calls = await fetchStats();

  let stats = DEMO_STATS;
  if (calls) {
    const total = calls.length;
    const leads = calls.filter((c) => c.lead_captured).length;
    const avgDuration =
      total > 0
        ? Math.round(calls.reduce((sum, c) => sum + (c.duration ?? 0), 0) / total)
        : 0;
    stats = { total, leads, avgDuration, active: true };
  }

  const leadRate = stats.total > 0 ? Math.round((stats.leads / stats.total) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.clientName}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s how your AI receptionist is performing.
        </p>
      </div>

      {/* Status Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex items-center gap-4">
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 ${
            stats.active ? "bg-green-400 animate-pulse" : "bg-gray-300"
          }`}
        />
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            AI Receptionist is{" "}
            <span className={stats.active ? "text-green-600" : "text-gray-500"}>
              {stats.active ? "active" : "inactive"}
            </span>
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            Answering calls 24/7 — never misses a lead
          </p>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full border border-green-200">
            Online
          </span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Calls Handled"
          value={String(stats.total)}
          sub="all time"
          color="brand"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
        <StatCard
          label="Leads Captured"
          value={`${stats.leads}`}
          sub={`${leadRate}% capture rate`}
          color="green"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          label="Avg. Call Duration"
          value={`${Math.floor(stats.avgDuration / 60)}m ${stats.avgDuration % 60}s`}
          sub="per handled call"
          color="purple"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickLink
          href="/dashboard/calls"
          title="View Call Logs"
          desc="See every call your AI handled with summaries and lead flags."
          icon={
            <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <QuickLink
          href="/dashboard/settings"
          title="Update Greeting & Persona"
          desc="Customize how your AI receptionist introduces itself to callers."
          icon={
            <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  color: "brand" | "green" | "purple";
  icon: React.ReactNode;
}) {
  const colors = {
    brand: "bg-brand-50 text-brand-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`inline-flex p-2 rounded-lg mb-3 ${colors[color]}`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-0.5">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 items-start hover:border-brand-300 hover:shadow-sm transition-all group"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800 text-sm group-hover:text-brand-600 transition-colors">
          {title}
        </p>
        <p className="text-gray-500 text-xs mt-1">{desc}</p>
      </div>
      <svg
        className="w-4 h-4 text-gray-300 group-hover:text-brand-400 ml-auto flex-shrink-0 mt-0.5 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
