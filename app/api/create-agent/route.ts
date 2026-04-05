/**
 * POST /api/create-agent
 * Creates a complete Trillet setup for a new client:
 *   1. Call Flow  — shell visible in Trillet dashboard, holds the system prompt
 *   2. Agent      — AI engine with voice/TTS settings, linked to the flow via pathway
 *   3. Knowledge Base — attached to the flow for business info the AI can reference
 * Verifies Stripe session (or internal bypass), then saves flow ID to Supabase.
 */

import { NextRequest, NextResponse } from "next/server";
import { buildTrilletCallFlowPayload, generateSystemPrompt } from "@/lib/generateSystemPrompt";
import { supabaseAdmin } from "@/lib/supabase";
import { createSession, SESSION_COOKIE_NAME } from "@/lib/session";

const TRILLET = "https://api.trillet.ai";

interface CreateAgentBody {
  sessionId: string;
  email: string;
  name: string;
  businessName: string;
  password?: string;
  industry: string;
  aiName: string;
  voiceId: string;
  phone: string;
  serviceArea: string;
  specialties: string;
  website: string;
  greetingStyle: "professional" | "friendly" | "luxury";
  workingHours: string;
  customInstructions: string;
}

function trilletHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.TRILLET_API_KEY!,
    "x-workspace-id": process.env.TRILLET_WORKSPACE_ID!,
  };
}

async function verifyStripeSession(sessionId: string): Promise<boolean> {
  if (!sessionId) return false;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    });
    const session = await res.json();
    return res.ok && (session.payment_status === "paid" || session.status === "complete");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: CreateAgentBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sessionId, email, name, businessName, industry, aiName, voiceId, phone, serviceArea, specialties, website, greetingStyle, workingHours, customInstructions, password } = body;

  if (!email || !name || !businessName) {
    return NextResponse.json({ error: "name, businessName, and email are required" }, { status: 400 });
  }

  const internalSecret = req.headers.get("x-internal-secret");
  const isBypass = internalSecret && internalSecret === process.env.INTERNAL_SECRET?.trim();

  if (!isBypass) {
    const isValid = await verifyStripeSession(sessionId);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid or unpaid Stripe session" }, { status: 403 });
    }
  }

  if (!process.env.TRILLET_API_KEY || !process.env.TRILLET_WORKSPACE_ID) {
    return NextResponse.json({ error: "Trillet not configured" }, { status: 500 });
  }

  const config = {
    name, businessName,
    industry: industry || "Other",
    aiName: aiName || "",
    voiceId: voiceId || "mistv3_astra",
    serviceArea: serviceArea || "the local area",
    phone, website, specialties,
    greetingStyle: (greetingStyle || "professional") as "professional" | "friendly" | "luxury",
    workingHours, customInstructions,
  };

  const flowPayload = buildTrilletCallFlowPayload(config);
  const systemPrompt = generateSystemPrompt(config);
  const voiceIdFinal = voiceId || "mistv3_astra";
  const rimeModel = voiceIdFinal.split("_")[0] || "mistv3";
  const flowName = `${name} — ${businessName} (AllTheCalls)`;

  // ── Step 1: Create Knowledge Base ──────────────────────────────────────────
  let kbId: string | null = null;
  const kbRes = await fetch(`${TRILLET}/v1/api/knowledgebase`, {
    method: "POST",
    headers: trilletHeaders(),
    body: JSON.stringify({
      name: `${businessName} — Knowledge Base`,
      description: `Business info for ${name} at ${businessName}`,
      isSMB: true,
      textContent: JSON.stringify({
        knowledge_base: {
          business_identity: {
            business_name: businessName,
            contact_name: name,
            business_description: specialties || "",
            service_area: serviceArea || "",
          },
          services: { service_list: specialties || "" },
          faqs: [],
          custom_instructions: customInstructions || "",
        },
      }),
    }),
  });
  if (kbRes.ok) {
    const kb = await kbRes.json();
    kbId = kb._id;
  }

  // ── Step 2: Create Call Flow (visible in Trillet dashboard) ────────────────
  const callFlowRes = await fetch(`${TRILLET}/v1/api/call-flows`, {
    method: "POST",
    headers: trilletHeaders(),
    body: JSON.stringify({
      ...flowPayload,
      ...(kbId ? { settings: { knowledgeBases: [kbId] } } : {}),
    }),
  });

  if (!callFlowRes.ok) {
    const err = await callFlowRes.text();
    console.error("[create-agent] Call flow creation error:", err);
    return NextResponse.json({ error: `Failed to create call flow: ${err.slice(0, 200)}` }, { status: 500 });
  }

  const callFlow = await callFlowRes.json();
  const flowId: string = callFlow._id;

  // ── Step 3: Create Agent (handles voice/TTS) ───────────────────────────────
  const agentRes = await fetch(`${TRILLET}/v1/api/agents`, {
    method: "POST",
    headers: trilletHeaders(),
    body: JSON.stringify({
      name: flowName,
      llmModel: "gemini-2.5-flash",
      ttsModel: { provider: "rime", voiceId: voiceIdFinal, language: "en" },
      settings: { model: rimeModel, speed: 1.05 },
      type: "voice",
      systemPrompt,
    }),
  });

  let agentId: string | null = null;
  if (agentRes.ok) {
    const agent = await agentRes.json();
    agentId = agent._id;

    // ── Step 4: Link Agent → Call Flow ─────────────────────────────────────
    await fetch(`${TRILLET}/v1/api/agents/${agentId}`, {
      method: "PUT",
      headers: trilletHeaders(),
      body: JSON.stringify({ pathway: flowId }),
    });
  }

  // ── Step 5: Create / update Supabase account ──────────────────────────────
  let clientId: string | null = null;
  let authUserId: string | null = null;

  if (supabaseAdmin) {
    if (password) {
      // Client came through the wizard and set their own password — create auth user now
      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase().trim(),
        password,
        email_confirm: true,
      });

      if (createErr) {
        // User may already exist (re-attempt) — look them up and update password
        const { data: list } = await supabaseAdmin.auth.admin.listUsers();
        const existing = list?.users.find(u => u.email?.toLowerCase() === email.toLowerCase());
        if (existing) {
          authUserId = existing.id;
          await supabaseAdmin.auth.admin.updateUserById(existing.id, { password });
        } else {
          console.error("[create-agent] Auth user creation failed:", createErr.message);
        }
      } else {
        authUserId = created.user?.id ?? null;
      }
    }

    // Upsert the clients row
    const { data: clientRow } = await supabaseAdmin
      .from("clients")
      .upsert(
        {
          ...(authUserId ? { user_id: authUserId } : {}),
          email: email.toLowerCase().trim(),
          name,
          brokerage: businessName,
          phone: phone || null,
          plan: "starter",
          trillet_agent_id: flowId,
          onboarding_completed: true,
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    clientId = clientRow?.id ?? null;
  }

  console.log(`[create-agent] Setup complete for ${email} — flow: ${flowId}, agent: ${agentId}, kb: ${kbId}`);

  // ── Step 6: Log the client in if they set a password ──────────────────────
  if (password && clientId) {
    const token = await createSession({
      clientId,
      clientName: name,
      email: email.toLowerCase().trim(),
      subAccountId: agentId || "",
      agentId: flowId,
    });

    const response = NextResponse.json({ success: true, agentId: flowId });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json({
    success: true,
    agentId: flowId,
    agentName: flowName,
    note: `Trillet dashboard → Call Flows → "${flowName}" → assign phone number`,
  });
}
