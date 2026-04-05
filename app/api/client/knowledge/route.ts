/**
 * GET /api/client/knowledge  — fetch the client's knowledge base
 * PUT /api/client/knowledge  — update knowledge base text content
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

const TRILLET = "https://api.trillet.ai";

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

async function getOrCreateKbId(agentId: string, clientName: string): Promise<string | null> {
  const flowRes = await fetch(`${TRILLET}/v1/api/call-flows/${agentId}`, { headers: trilletHeaders() });
  if (!flowRes.ok) return null;
  const flow = await flowRes.json();
  const kbIds: string[] = flow?.settings?.knowledgeBases || [];
  if (kbIds[0]) return kbIds[0];

  // Create a KB and link it to the flow
  const kbRes = await fetch(`${TRILLET}/v1/api/knowledgebase`, {
    method: "POST",
    headers: trilletHeaders(),
    body: JSON.stringify({
      name: `${clientName} — Knowledge Base`,
      description: "Business info for AI receptionist",
      isSMB: true,
      textContent: "{}",
    }),
  });
  if (!kbRes.ok) return null;
  const kb = await kbRes.json();
  const kbId: string = kb._id;

  // Link KB to the call flow
  await fetch(`${TRILLET}/v1/api/call-flows/${agentId}`, {
    method: "PUT",
    headers: trilletHeaders(),
    body: JSON.stringify({ settings: { ...flow.settings, knowledgeBases: [kbId] } }),
  });

  return kbId;
}

export async function GET() {
  const session = await getSession();
  if (!session?.agentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const kbId = await getOrCreateKbId(session.agentId, session.clientName);
  if (!kbId) return NextResponse.json({ content: "", sections: {} });

  const res = await fetch(`${TRILLET}/v1/api/knowledgebase/${kbId}`, {
    headers: trilletHeaders(),
    next: { revalidate: 0 },
  });
  if (!res.ok) return NextResponse.json({ content: "", sections: {} });

  const kb = await res.json();
  let sections: Record<string, string> = {};

  try {
    const raw = kb.textContent;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    const bi = parsed?.knowledge_base?.business_identity || {};
    const services = parsed?.knowledge_base?.services || {};
    sections = {
      about: [bi.business_description, bi.business_values].filter(Boolean).join("\n\n"),
      services: Array.isArray(services.service_list)
        ? services.service_list.map((s: { name?: string; description?: string }) => `• ${s.name || ""}: ${s.description || ""}`).join("\n")
        : services.service_list || "",
      faqs: (parsed?.knowledge_base?.faqs || [])
        .map((f: { question?: string; answer?: string }) => `Q: ${f.question || ""}\nA: ${f.answer || ""}`)
        .join("\n\n"),
      custom: parsed?.knowledge_base?.custom_instructions || "",
    };
  } catch {
    sections = { about: String(kb.textContent || "") };
  }

  return NextResponse.json({ kbId, sections });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session?.agentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { sections } = body as { sections: Record<string, string> };

  const kbId = await getOrCreateKbId(session.agentId, session.clientName);
  if (!kbId) return NextResponse.json({ error: "No knowledge base found" }, { status: 404 });

  // Fetch client name for KB
  let clientName = session.clientName;
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("clients")
      .select("name, brokerage")
      .eq("id", session.clientId)
      .single();
    if (data) clientName = `${data.name} — ${data.brokerage || ""}`;
  }

  // Build structured content from sections
  const structured = {
    knowledge_base: {
      business_identity: {
        business_name: clientName,
        business_description: sections.about || "",
      },
      services: {
        service_list: sections.services || "",
      },
      faqs: (sections.faqs || "")
        .split(/\n\nQ:|\nQ:/)
        .filter(Boolean)
        .map((block: string) => {
          const [q, ...rest] = block.replace(/^Q:\s*/, "").split(/\nA:\s*/);
          return { question: q?.trim(), answer: rest.join("").trim() };
        })
        .filter((f: { question?: string }) => f.question),
      custom_instructions: sections.custom || "",
    },
  };

  const updateRes = await fetch(`${TRILLET}/v1/api/knowledgebase/${kbId}`, {
    method: "PUT",
    headers: trilletHeaders(),
    body: JSON.stringify({ textContent: JSON.stringify(structured, null, 2) }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.text();
    console.error("[client/knowledge PUT] Trillet error:", err);
    return NextResponse.json({ error: "Failed to update knowledge base" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
