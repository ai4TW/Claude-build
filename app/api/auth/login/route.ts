import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE_NAME } from "@/lib/session";

// Demo client registry — in production, replace with a database lookup.
// Each entry maps an email to { password, clientId, clientName, subAccountId, agentId }.
function getClientRegistry(): Record<
  string,
  {
    password: string;
    clientId: string;
    clientName: string;
    subAccountId: string;
    agentId: string;
  }
> {
  const raw = process.env.CLIENT_REGISTRY;
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      console.error("CLIENT_REGISTRY env var is not valid JSON");
    }
  }

  // Fallback demo client (only active when DEMO_MODE=true or no registry configured)
  if (process.env.DEMO_MODE === "true" || !raw) {
    return {
      "demo@allthecalls.com": {
        password: process.env.DEMO_PASSWORD || "demo1234",
        clientId: "demo-client-001",
        clientName: "Demo Agent",
        subAccountId: process.env.DEMO_SUB_ACCOUNT_ID || "demo-sub-001",
        agentId: process.env.DEMO_AGENT_ID || "demo-agent-001",
      },
    };
  }

  return {};
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const registry = getClientRegistry();
  const client = registry[email.toLowerCase().trim()];

  if (!client || client.password !== password) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const token = await createSession({
    clientId: client.clientId,
    clientName: client.clientName,
    subAccountId: client.subAccountId,
    agentId: client.agentId,
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
