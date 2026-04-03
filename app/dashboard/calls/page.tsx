"use client";

import { useEffect, useState } from "react";

interface Call {
  id: string;
  from: string;
  duration: number;
  status: string;
  summary?: string;
  lead_captured?: boolean;
  created_at: string;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function maskPhone(phone: string) {
  // Show last 4 digits, mask the rest: +1-XXX-XXX-1234
  if (phone.length >= 4) return `•••• ${phone.slice(-4)}`;
  return phone;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/calls")
      .then((r) => r.json())
      .then((data) => {
        setCalls(data.calls ?? []);
        setDemo(data.demo ?? false);
      })
      .catch(() => setError("Failed to load call logs."))
      .finally(() => setLoading(false));
  }, []);

  const leads = calls.filter((c) => c.lead_captured).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Call Logs</h1>
        <p className="text-gray-500 text-sm mt-1">
          Every call your AI receptionist has handled.
        </p>
      </div>

      {demo && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-lg mb-5">
          Showing demo data — connect your Trillet API key to see live call logs.
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Summary row */}
      {!loading && calls.length > 0 && (
        <div className="flex gap-4 mb-5 text-sm text-gray-500">
          <span>
            <strong className="text-gray-800">{calls.length}</strong> total calls
          </span>
          <span>·</span>
          <span>
            <strong className="text-green-700">{leads}</strong> leads captured
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm py-12 text-center">Loading…</div>
      ) : calls.length === 0 ? (
        <div className="text-gray-400 text-sm py-12 text-center">No calls yet.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">Time</th>
                <th className="px-5 py-3 font-medium text-gray-500">From</th>
                <th className="px-5 py-3 font-medium text-gray-500">Duration</th>
                <th className="px-5 py-3 font-medium text-gray-500">Lead</th>
                <th className="px-5 py-3 font-medium text-gray-500">Summary</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call, i) => (
                <tr
                  key={call.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    i === calls.length - 1 ? "border-none" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                    {formatTime(call.created_at)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-gray-700">
                    {maskPhone(call.from)}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {formatDuration(call.duration ?? 0)}
                  </td>
                  <td className="px-5 py-3.5">
                    {call.lead_captured ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 font-medium px-2 py-0.5 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 max-w-xs">
                    <span className="line-clamp-2">{call.summary ?? "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
