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
  const { agentId } = req.body as { agentId?: string } || req.query as { agentId?: string };

  if (!agentId) return res.status(400).json({ error: "agentId required" });

  if (req.method === "GET") {
    const r = await fetch(`${BASE_URL}/v1/api/agents/${agentId}`, { headers: trilletHeaders() });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  if (req.method === "PATCH") {
    const { name, active, ...rest } = req.body as { name?: string; active?: boolean; [key: string]: unknown };
    const body: Record<string, unknown> = { ...rest };
    if (name !== undefined) body.name = name;
    if (active !== undefined) body.isActive = active;

    const r = await fetch(`${BASE_URL}/v1/api/agents/${agentId}`, {
      method: "PUT",
      headers: trilletHeaders(),
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
