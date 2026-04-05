/**
 * POST /api/create-agent
 * Called by the setup wizard after payment to create the client's Trillet AI agent.
 * Verifies the Stripe session, builds the agent knowledge base, creates on Trillet,
 * and marks onboarding_completed in Supabase.
 */

import { NextRequest, NextResponse } from "next/server";
import { buildTrilletAgentPayload } from "@/lib/generateSystemPrompt";
import { supabaseAdmin } from "@/lib/supabase";

const TRILLET_BASE = "https://api.trillet.ai";

interface CreateAgentBody {
  sessionId: string;
  email: string;
  name: string;
  brokerage: string;
  phone: string;
  serviceArea: string;
  specialties: string;
  website: string;
  greetingStyle: "professional" | "friendly" | "luxury";
  workingHours: string;
  customInstructions: string;
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

  const { sessionId, email, name, brokerage, phone, serviceArea, specialties, website, greetingStyle, workingHours, customInstructions } = body;

  if (!email || !name || !brokerage) {
    return NextResponse.json({ error: "name, brokerage, and email are required" }, { status: 400 });
  }

  // Verify the Stripe session before creating anything
  const isValid = await verifyStripeSession(sessionId);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid or unpaid Stripe session" }, { status: 403 });
  }

  // Build and create Trillet agent
  const key = process.env.TRILLET_API_KEY;
  const workspaceId = process.env.TRILLET_WORKSPACE_ID;
  if (!key || !workspaceId) {
    return NextResponse.json({ error: "Trillet not configured" }, { status: 500 });
  }

  const payload = buildTrilletAgentPayload({
    name,
    brokerage,
    serviceArea: serviceArea || "the local area",
    phone,
    website,
    specialties: specialties || "residential real estate",
    greetingStyle: greetingStyle || "professional",
    workingHours,
    customInstructions,
  });

  const trilletRes = await fetch(`${TRILLET_BASE}/v1/api/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "x-workspace-id": workspaceId,
    },
    body: JSON.stringify(payload),
  });

  const trilletText = await trilletRes.text();
  let agent: { _id: string; name: string; status: string };
  try {
    agent = JSON.parse(trilletText);
  } catch {
    return NextResponse.json({ error: `Trillet returned non-JSON: ${trilletText.slice(0, 200)}` }, { status: 500 });
  }

  if (!trilletRes.ok) {
    console.error("[create-agent] Trillet error:", trilletText);
    return NextResponse.json({ error: `Trillet error: ${trilletText.slice(0, 300)}` }, { status: 500 });
  }

  // Update Supabase record with agent ID and mark onboarding complete
  if (supabaseAdmin) {
    const { error: updateError } = await supabaseAdmin
      .from("clients")
      .update({
        trillet_agent_id: agent._id,
        onboarding_completed: true,
        phone: phone || null,
        brokerage,
        name,
      })
      .eq("email", email);

    if (updateError) {
      console.error("[create-agent] Supabase update error:", updateError.message);
      // Non-fatal — agent is created, just log it
    }
  }

  console.log(`[create-agent] Agent created for ${email}: ${agent._id}`);

  return NextResponse.json({
    success: true,
    agentId: agent._id,
    agentName: agent.name,
    note: `Go to app.trillet.ai → assign a phone number to agent ID: ${agent._id}`,
  });
}
