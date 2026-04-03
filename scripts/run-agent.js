#!/usr/bin/env node
/**
 * All The Calls — Local Agent Runner
 * Runs any agent locally using Claude API, no Paperclip required.
 *
 * Usage:
 *   node scripts/run-agent.js ceo
 *   node scripts/run-agent.js sales
 *   node scripts/run-agent.js content
 *   node scripts/run-agent.js client-success
 *   node scripts/run-agent.js onboarding
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const Anthropic = require("@anthropic-ai/sdk");

const ROOT = path.resolve(__dirname, "..");
const agentName = process.argv[2];

if (!agentName) {
  console.error("Usage: node scripts/run-agent.js <agent-name>");
  console.error("Available agents: ceo, sales, content, client-success, onboarding, cto");
  process.exit(1);
}

// Load agent YAML config
const yamlPath = path.join(ROOT, "agents", `${agentName}.yaml`);
if (!fs.existsSync(yamlPath)) {
  console.error(`No agent config found at: ${yamlPath}`);
  console.error("Available agents: ceo, sales, content, client-success, onboarding, cto");
  process.exit(1);
}

const config = yaml.load(fs.readFileSync(yamlPath, "utf8"));

// Build context from context_files
let contextBlock = "";
if (config.context_files && config.context_files.length > 0) {
  contextBlock = "\n\n---\n# Loaded Context Files\n";
  for (const filePath of config.context_files) {
    const fullPath = path.join(ROOT, filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      contextBlock += `\n## ${filePath}\n${content}\n`;
    } else {
      contextBlock += `\n## ${filePath}\n(file not found — may not exist yet)\n`;
    }
  }
}

// Also load the agent's AGENTS.md if it exists (richer instructions)
const agentsMdPath = path.join(ROOT, "agents", agentName, "AGENTS.md");
let agentsMd = "";
if (fs.existsSync(agentsMdPath)) {
  agentsMd = "\n\n---\n# Detailed Agent Instructions\n" + fs.readFileSync(agentsMdPath, "utf8");
}

const systemPrompt = config.system_prompt + agentsMd + contextBlock;

// Ensure output dir exists
if (config.output_dir) {
  const outDir = path.join(ROOT, config.output_dir);
  fs.mkdirSync(outDir, { recursive: true });
}

const client = new Anthropic.default();
const model = config.model || "claude-sonnet-4-6";

console.log(`\n====================================`);
console.log(`  AllTheCalls — Running: ${config.title || agentName}`);
console.log(`  Model: ${model}`);
console.log(`  Output: ${config.output_dir || "shared-workspace/"}`);
console.log(`====================================\n`);

async function run() {
  const stream = client.messages.stream({
    model,
    max_tokens: 8096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content:
          "Run your standard task now. Read your context, identify what needs to be done, execute it, and write your outputs to the shared workspace. Document everything you produce.",
      },
    ],
  });

  let fullText = "";
  process.stdout.write(`[${agentName}] `);

  stream.on("text", (text) => {
    process.stdout.write(text);
    fullText += text;
  });

  await stream.finalMessage();
  console.log("\n");

  // Save output to a timestamped log
  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const logPath = path.join(ROOT, config.output_dir || "shared-workspace", `run-${ts}.md`);
  const logContent = `# Agent Run: ${config.title || agentName}\nDate: ${new Date().toISOString()}\n\n---\n\n${fullText}`;
  fs.writeFileSync(logPath, logContent);
  console.log(`\n[saved] ${logPath}`);

  // Auto-commit to GitHub
  const { execSync } = require("child_process");
  try {
    execSync(`cd "${ROOT}" && git add -A && git commit -m "Agent run: ${agentName} — ${ts}" && git push`, {
      stdio: "pipe",
    });
    console.log(`[git] pushed`);
  } catch (e) {
    console.log(`[git] push skipped (no changes or not configured)`);
  }
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
