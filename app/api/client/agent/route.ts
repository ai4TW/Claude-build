/**
 * GET /api/client/agent  — fetch the client's call flow + linked agent
 * PUT /api/client/agent  — update voice, AI name, custom instructions, hours
 *
 * Architecture: Trillet uses two linked entities:
 *   - Call Flow (session.agentId = flowId): holds prompt, KB, phone numbers
 *   - Agent (session.subAccountId = agentId): holds ttsModel, voice settings
 *
 * NOTE: PUT /v1/api/call-flows returns 500 for API-created flows.
 * We work around this by only updating the Agent entity (systemPrompt + ttsModel).
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { generateSystemPrompt } from "@/lib/generateSystemPrompt";
import { supabaseAdmin } from "@/lib/supabase";

const TRILLET = "https://api.trillet.ai";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

export async function GET() {
  const session = await getSession();
  if (!session?.agentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const flowId = session.agentId;
  const agentId = session.subAccountId;  // linked Trillet agent ID

  const flowRes = await fetch(`${TRILLET}/v1/api/call-flows/${flowId}`, {
    headers: trilletHeaders(),
    next: { revalidate: 0 },
  });

  if (!flowRes.ok) return NextResponse.json({ error: "Failed to fetch agent" }, { status: 502 });

  const flow = await flowRes.json();

  // Fetch linked agent directly by ID (stored at login time)
  let agentData: { _id: string; ttsModel?: { voiceId?: string } } | null = null;
  if (agentId) {
    const agentRes = await fetch(`${TRILLET}/v1/api/agents/${agentId}`, {
      headers: trilletHeaders(),
      next: { revalidate: 0 },
    });
    if (agentRes.ok) {
      agentData = await agentRes.json();
    }
  }

  return NextResponse.json({
    ...flow,
    ttsModel: agentData?.ttsModel || flow.ttsModel || null,
    _agentId: agentData?._id || agentId || null,
  });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session?.agentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const flowId = session.agentId;
  const agentId = session.subAccountId;  // linked Trillet agent ID

  const body = await req.json().catch(() => ({}));
  const { aiName, voiceId, greetingStyle, workingHours, customInstructions } = body;

  // Fetch existing flow for context
  const flowRes = await fetch(`${TRILLET}/v1/api/call-flows/${flowId}`, { headers: trilletHeaders() });
  const flow = flowRes.ok ? await flowRes.json() : {};

  // Fetch client record from Supabase
  let clientRecord: { name: string; brokerage: string; phone: string } | null = null;
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("clients")
      .select("name, brokerage, phone")
      .eq("id", session.clientId)
      .single();
    clientRecord = data;
  }

  const newPrompt = generateSystemPrompt({
    name: clientRecord?.name || session.clientName,
    businessName: clientRecord?.brokerage || session.clientName,
    industry: "Other",
    aiName: aiName || "",
    voiceId: voiceId || "mistv3_astra",
    serviceArea: flow.serviceArea || "the local area",
    phone: clientRecord?.phone || "",
    specialties: flow.specialties || "",
    website: flow.website || "",
    greetingStyle: (greetingStyle || "professional") as "professional" | "friendly" | "luxury",
    workingHours: workingHours || "",
    customInstructions: customInstructions || "",
  });

  const rimeModel = (voiceId || "mistv3_astra").split("_")[0] || "mistv3";
  const newTts = { provider: "rime", voiceId: voiceId || "mistv3_astra", language: "en" };

  if (!agentId) {
    return NextResponse.json({ error: "No linked agent found. Please contact support." }, { status: 404 });
  }

  // Update agent's voice + prompt (skip call-flow PUT — it 500s for API-created flows)
  const agentUpdateRes = await fetch(`${TRILLET}/v1/api/agents/${agentId}`, {
    method: "PUT",
    headers: trilletHeaders(),
    body: JSON.stringify({
      ttsModel: newTts,
      settings: { model: rimeModel, speed: 1.05 },
      systemPrompt: newPrompt,
    }),
  });

  if (!agentUpdateRes.ok) {
    const err = await agentUpdateRes.text();
    console.error("[client/agent PUT] Agent update error:", err);
    return NextResponse.json({ error: "Failed to update agent" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
