/**
 * Trillet AI API Integration
 * All The Calls — White-label reseller layer
 *
 * Docs: https://docs.trillet.ai/v1/api-reference/introduction
 *
 * Base URL: https://api.trillet.ai
 * Auth: x-api-key + x-workspace-id headers on every request.
 */

const BASE_URL = "https://api.trillet.ai";

function getHeaders() {
  const key = process.env.TRILLET_API_KEY;
  const workspaceId = process.env.TRILLET_WORKSPACE_ID;
  if (!key) throw new Error("TRILLET_API_KEY environment variable not set");
  if (!workspaceId) throw new Error("TRILLET_WORKSPACE_ID environment variable not set");
  return {
    "Content-Type": "application/json",
    "x-api-key": key,
    "x-workspace-id": workspaceId,
  };
}

async function apiRequest(method, path, body = null) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Trillet API ${method} ${path} failed (${res.status}): ${err}`);
  }
  return res.json();
}

/**
 * Create an AI receptionist (call agent) for a client.
 * POST /v1/api/agents
 */
async function createAgent(agentConfig) {
  return apiRequest("POST", "/v1/api/agents", {
    name: agentConfig.name,
    llmModel: agentConfig.llmModel || "gpt-4o-mini",
    ttsModel: agentConfig.ttsModel || {
      provider: "elevenlabs",
      voiceId: "default",
      language: "en-US",
    },
    settings: {
      speed: 1.0,
      volume: 1.0,
      temperature: 0.7,
    },
    variables: {
      greeting: agentConfig.greeting,
      specialty: agentConfig.specialty || "real estate",
      reseller: "allthecalls",
    },
  });
}

/**
 * List all call agents in this workspace.
 * GET /v1/api/agents
 */
async function listAgents() {
  return apiRequest("GET", "/v1/api/agents");
}

/**
 * Get call history.
 * GET /v2/api/call-history
 */
async function getCallHistory() {
  return apiRequest("GET", "/v2/api/call-history");
}

/**
 * Get workspace info (useful for verifying API key works).
 */
async function getWorkspace() {
  return apiRequest("GET", "/v1/api/workspace");
}

/**
 * Full onboarding flow: create agent for a new client.
 * Trillet uses a single workspace model — each client gets their own agent.
 * @param {object} client - { name, brokerage, websiteUrl, specialty }
 * @returns {object} { agentId }
 */
async function onboardClient(client) {
  const greeting =
    client.greeting ||
    `Thank you for calling ${client.name} with ${client.brokerage}. ` +
      `I'm their AI assistant. How can I help you today?`;

  console.log(`[Trillet] Creating AI agent for ${client.name}...`);
  const agent = await createAgent({
    name: `${client.name}'s AI Receptionist`,
    greeting,
    specialty: client.specialty || "real estate",
  });

  console.log(`[Trillet] Onboarding complete for ${client.name}`);
  return {
    agentId: agent._id || agent.id,
  };
}

module.exports = {
  createAgent,
  listAgents,
  getCallHistory,
  getWorkspace,
  onboardClient,
};
