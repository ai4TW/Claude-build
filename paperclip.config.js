module.exports = {
  workspace: "./shared-workspace",
  company: {
    name: "RealtyVoice AI",
    goal: "Build and scale a white-label AI receptionist reselling business exclusively targeting real estate agents. We resell Trillet AI under our brand. Our mission: every real estate agent has a 24/7 AI receptionist that captures leads, books showings, and never misses a call.",
    kpis: [
      "Monthly Recurring Revenue (MRR)",
      "Number of active agent clients",
      "Lead capture rate per client",
      "Client churn rate",
      "Average revenue per client"
    ]
  },
  agents: [
    "./agents/ceo.yaml",
    "./agents/cto.yaml",
    "./agents/sales.yaml",
    "./agents/client-success.yaml",
    "./agents/content.yaml"
  ],
  communication: {
    method: "file-based",
    polling_interval: 2000
  },
  models: {
    default: "claude-sonnet-4-6",
    ceo: "claude-opus-4-6",
    engineering: "claude-sonnet-4-6"
  },
  integrations: {
    trillet: {
      base_url: "https://api.trillet.ai/api/v1",
      api_key_env: "TRILLET_API_KEY"
    },
    anthropic: {
      api_key_env: "ANTHROPIC_API_KEY"
    }
  }
};
