import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const TRILLET_BASE = "https://api.trillet.ai/api/v1";

function trilletHeaders() {
  const key = process.env.TRILLET_API_KEY;
  if (!key) return null;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
}

// Demo agent settings for when Trillet isn't configured.
function demoSettings() {
  return {
    id: "demo-agent-001",
    name: "Demo Agent's AI Receptionist",
    greeting:
      "Thank you for calling Demo Agent with Demo Brokerage. I'm their AI assistant. How can I help you today?",
    voice: "professional-female",
    language: "en-US",
    status: "active",
    demo: true,
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const headers = trilletHeaders();
  if (!headers) {
    return NextResponse.json(demoSettings());
  }

  try {
    const res = await fetch(`${TRILLET_BASE}/agents/${session.agentId}`, {
      headers,
    });
    if (!res.ok) {
      return NextResponse.json(demoSettings());
    }
    const data = await res.json();
    return NextResponse.json({ ...data, demo: false });
  } catch {
    return NextResponse.json(demoSettings());
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { greeting, name } = body as { greeting?: string; name?: string };

  if (!greeting && !name) {
    return NextResponse.json(
      { error: "Provide at least one field to update (greeting, name)." },
      { status: 400 }
    );
  }

  const headers = trilletHeaders();
  if (!headers) {
    // Demo mode — simulate success
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const updates: Record<string, string> = {};
    if (greeting) updates.greeting = greeting;
    if (name) updates.name = name;

    const res = await fetch(`${TRILLET_BASE}/agents/${session.agentId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `Failed to update agent: ${err}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, demo: false });
  } catch (err) {
    return NextResponse.json(
      { error: `Network error: ${err}` },
      { status: 502 }
    );
  }
}
