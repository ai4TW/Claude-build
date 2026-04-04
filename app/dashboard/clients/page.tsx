"use client";

import { useState, useEffect, useCallback } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  brokerage: string | null;
  plan: string;
  trillet_agent_id: string | null;
  trillet_agent_name: string | null;
  phone_number: string | null;
  status: string;
  created_at: string;
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
  backdropFilter: "blur(20px)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "white",
  fontSize: "14px",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: "4px",
};

const statusColors: Record<string, string> = {
  pending_phone: "#f59e0b",
  active: "#4ade80",
  cancelled: "#f87171",
  pending: "#94a3b8",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Manual onboard form
  const [form, setForm] = useState({ name: "", email: "", brokerage: "", plan: "pro" });
  const [onboarding, setOnboarding] = useState(false);
  const [onboardResult, setOnboardResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/clients");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setClients(data.clients ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  function copyAgentId(id: string) {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleOnboard(e: React.FormEvent) {
    e.preventDefault();
    setOnboarding(true);
    setOnboardResult(null);
    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setOnboardResult({ success: true, message: `Agent created: ${data.agentId} — ${data.agentName}` });
        setForm({ name: "", email: "", brokerage: "", plan: "pro" });
        fetchClients();
      } else {
        setOnboardResult({ success: false, message: data.error || "Onboard failed" });
      }
    } catch {
      setOnboardResult({ success: false, message: "Network error" });
    } finally {
      setOnboarding(false);
    }
  }

  return (
    <div style={{ color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "white", marginBottom: "4px" }}>
          Client Management
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Manage all AllTheCalls clients and their AI agents.</p>
      </div>

      {/* Manual Onboard Form */}
      <div style={{ ...cardStyle, marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px", marginBottom: "4px" }}>Manual Onboard</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "20px" }}>Onboard a pilot client without Stripe. Requires INTERNAL_SECRET in Vercel env vars.</p>
        <form onSubmit={handleOnboard} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} type="text" required placeholder="Sarah Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input style={inputStyle} type="email" required placeholder="sarah@compass.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Brokerage *</label>
            <input style={inputStyle} type="text" required placeholder="Compass" value={form.brokerage} onChange={(e) => setForm({ ...form, brokerage: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Plan</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
              <option value="starter">Starter — $149/mo</option>
              <option value="pro">Pro — $249/mo</option>
              <option value="team">Team — $399/mo</option>
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="submit"
              disabled={onboarding}
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "white", fontWeight: 700, fontSize: "14px", padding: "10px 24px", borderRadius: "10px", border: "none", cursor: onboarding ? "not-allowed" : "pointer", opacity: onboarding ? 0.6 : 1, fontFamily: "'DM Sans', sans-serif" }}
            >
              {onboarding ? "Creating agent…" : "Onboard Client →"}
            </button>
            {onboardResult && (
              <p style={{ fontSize: "13px", color: onboardResult.success ? "#4ade80" : "#f87171", fontWeight: 500 }}>
                {onboardResult.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Clients Table */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: "16px" }}>
            All Clients ({clients.length})
          </h2>
          <button onClick={fetchClients} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px 14px", color: "rgba(255,255,255,0.6)", fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            Refresh
          </button>
        </div>

        {loading && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", padding: "20px 0" }}>Loading clients…</p>}
        {error && <p style={{ color: "#f87171", fontSize: "14px" }}>{error}</p>}

        {!loading && !error && clients.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", padding: "20px 0" }}>No clients yet. Onboard your first client above.</p>
        )}

        {clients.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Name", "Plan", "Status", "Agent ID", "Phone", "Created"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "rgba(255,255,255,0.35)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px" }}>
                      <p style={{ color: "white", fontWeight: 600, marginBottom: "2px" }}>{c.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{c.email}</p>
                      {c.brokerage && <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}>{c.brokerage}</p>}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px" }}>
                        {c.plan}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ color: statusColors[c.status] || "#94a3b8", fontSize: "12px", fontWeight: 600 }}>
                        ● {c.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {c.trillet_agent_id ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <code style={{ color: "#22d3ee", fontSize: "11px", fontFamily: "monospace" }}>
                            {c.trillet_agent_id.slice(0, 16)}…
                          </code>
                          <button
                            onClick={() => copyAgentId(c.trillet_agent_id!)}
                            style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "6px", padding: "2px 8px", color: copied === c.trillet_agent_id ? "#4ade80" : "rgba(255,255,255,0.4)", fontSize: "11px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {copied === c.trillet_agent_id ? "✓" : "Copy"}
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>Not created</span>
                      )}
                    </td>
                    <td style={{ padding: "12px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                      {c.phone_number || <span style={{ color: "rgba(255,255,255,0.2)" }}>Pending</span>}
                    </td>
                    <td style={{ padding: "12px", color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
