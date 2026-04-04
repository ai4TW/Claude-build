import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE_URL = "https://api.trillet.ai";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { agentId, limit = "20" } = req.query as { agentId?: string; limit?: string };

  try {
    const params = new URLSearchParams({ limit });
    if (agentId) params.set("agentId", agentId);

    const r = await fetch(`${BASE_URL}/v1/api/call-history?${params}`, {
      headers: trilletHeaders(),
    });

    if (!r.ok) {
      // Trillet returns 500 when call history is empty — treat as empty
      if (r.status === 500) return res.status(200).json({ calls: [] });
      const text = await r.text();
      return res.status(r.status).json({ error: text.slice(0, 200) });
    }

    const data = await r.json();

    // Normalize Trillet response into our CallLog shape
    const raw = Array.isArray(data) ? data : data.data || data.calls || [];
    const calls = raw.map((c: Record<string, unknown>) => ({
      id: c.id || c._id || String(Math.random()),
      caller_number: c.callerNumber || c.from || c.caller_number || "Unknown",
      duration_seconds: Number(c.duration || c.durationSeconds || c.duration_seconds || 0),
      transcript: c.transcript || c.transcription || null,
      summary: c.summary || c.callSummary || null,
      lead_score: c.leadScore || c.lead_score || null,
      appointment_booked: Boolean(c.appointmentBooked || c.appointment_booked),
      called_at: c.createdAt || c.created_at || c.startedAt || new Date().toISOString(),
    }));

    return res.status(200).json({ calls });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Calls API error:", msg);
    return res.status(500).json({ error: msg });
  }
}
