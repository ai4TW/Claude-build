import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const TRILLET_BASE = "https://api.trillet.ai";

function trilletHeaders() {
  const key = process.env.TRILLET_API_KEY;
  const workspaceId = process.env.TRILLET_WORKSPACE_ID;
  if (!key || !workspaceId) return null;
  return {
    "Content-Type": "application/json",
    "x-api-key": key,
    "x-workspace-id": workspaceId,
  };
}

// Demo call log data used when Trillet isn't configured.
function demoCalls() {
  const now = Date.now();
  return [
    {
      id: "call-001",
      from: "+14155551234",
      duration: 142,
      status: "completed",
      summary: "Caller inquired about 3BR listings in Maplewood. Scheduled viewing for Saturday.",
      lead_captured: true,
      created_at: new Date(now - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "call-002",
      from: "+19175559876",
      duration: 58,
      status: "completed",
      summary: "Asked about current mortgage rates. Forwarded contact details.",
      lead_captured: true,
      created_at: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: "call-003",
      from: "+13125554321",
      duration: 22,
      status: "completed",
      summary: "Wrong number.",
      lead_captured: false,
      created_at: new Date(now - 1000 * 60 * 60 * 8).toISOString(),
    },
    {
      id: "call-004",
      from: "+14085558765",
      duration: 210,
      status: "completed",
      summary: "Buyer interested in downtown condos under $500k. Set callback appointment.",
      lead_captured: true,
      created_at: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "call-005",
      from: "+16175553210",
      duration: 95,
      status: "completed",
      summary: "Seller inquiry — wants a home valuation for 45 Oak Street.",
      lead_captured: true,
      created_at: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
    },
  ];
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "50";
  const offset = searchParams.get("offset") || "0";

  const headers = trilletHeaders();
  if (!headers) {
    // No API key configured — return demo data
    return NextResponse.json({ calls: demoCalls(), demo: true });
  }

  try {
    const res = await fetch(`${TRILLET_BASE}/v2/api/call-history`, { headers });
    if (!res.ok) {
      const err = await res.text();
      console.error("Trillet calls error:", err);
      return NextResponse.json({ calls: demoCalls(), demo: true });
    }
    const data = await res.json();
    return NextResponse.json({ calls: data.calls ?? data, demo: false });
  } catch (err) {
    console.error("Trillet calls fetch failed:", err);
    return NextResponse.json({ calls: demoCalls(), demo: true });
  }
}
