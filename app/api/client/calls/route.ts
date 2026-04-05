/**
 * GET /api/client/calls — fetch call history for the client's agent
 */

import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const TRILLET = "https://api.trillet.ai";

export async function GET() {
  const session = await getSession();
  if (!session?.agentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(
      `${TRILLET}/v1/api/call-history?agentId=${session.agentId}&limit=50`,
      {
        headers: {
          "x-api-key": process.env.TRILLET_API_KEY!,
          "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
        },
        next: { revalidate: 0 },
      }
    );

    // Trillet returns 500 when there are no calls yet — treat as empty
    if (res.status === 500) return NextResponse.json([]);
    if (!res.ok) return NextResponse.json([]);

    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : data.calls || data.data || []);
  } catch {
    return NextResponse.json([]);
  }
}
