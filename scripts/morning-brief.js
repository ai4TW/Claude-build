#!/usr/bin/env node
/**
 * All The Calls — Morning Brief (Autonomy Engine)
 *
 * Runs the CEO agent: reads all company context, generates fresh directives,
 * and fans out task assignments to each department agent.
 *
 * Usage:
 *   node scripts/morning-brief.js           # full brief
 *   node scripts/morning-brief.js --dry-run # preview prompt only, no file writes
 *   node scripts/morning-brief.js --agent sales  # run one agent only
 *
 * Schedule daily via cron:
 *   0 7 * * * cd /path/to/project && node scripts/morning-brief.js >> logs/brief.log 2>&1
 */

require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const WORKSPACE = path.join(ROOT, "shared-workspace");
const DRY_RUN = process.argv.includes("--dry-run");
const SINGLE_AGENT = (() => {
  const i = process.argv.indexOf("--agent");
  return i !== -1 ? process.argv[i + 1] : null;
})();

const client = new Anthropic();

// ── Helpers ──────────────────────────────────────────────────────────────────

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function writeFile(filePath, content) {
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would write to: ${filePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function log(msg) {
  const ts = new Date().toISOString().slice(0, 16).replace("T", " ");
  console.log(`[${ts}] ${msg}`);
}

function loadContext() {
  return {
    companyStatus: readFile(path.join(WORKSPACE, "COMPANY_STATUS.md")) || "(not found)",
    week1Sprint: readFile(path.join(WORKSPACE, "WEEK1_SPRINT.md")) || "(not found)",
    companyBrief: readFile(path.join(WORKSPACE, "COMPANY_BRIEF.md")) || "(not found)",
    currentDirectives: readFile(path.join(WORKSPACE, "CEO_DIRECTIVES.md")) || "(none yet)",
    salesLog: readFile(path.join(WORKSPACE, "sales", "ACTIVITY_LOG.md")) || "(none yet)",
    buildLog: readFile(path.join(WORKSPACE, "cto", "BUILD_LOG.md")) || "(none yet)",
    contentLog: readFile(path.join(WORKSPACE, "content", "CONTENT_LOG.md")) || "(none yet)",
    churnRisk: readFile(path.join(WORKSPACE, "client-success", "churn-risk.md")) || "(none)",
  };
}

// ── CEO Agent ─────────────────────────────────────────────────────────────────

async function runCEO(ctx) {
  log("Running CEO agent...");

  const today = new Date().toISOString().slice(0, 10);

  const systemPrompt = `You are the CEO of All The Calls — a white-label AI receptionist reselling business.
We resell Trillet AI to real estate agents. Price: $149-$399/mo. Cost: $49-$199/mo.
Goal: 100 paying clients = $15,000+ MRR within 90 days of launch.

Decision framework:
- Revenue first: does this task lead to a paying client this week?
- Automation over manual always
- Speed over perfection — we are in early stages
- Real estate agents are non-technical — make everything dead simple for them`;

  const userPrompt = `Today is ${today}.

Here is the current company context:

## COMPANY_STATUS.md
${ctx.companyStatus}

## WEEK1_SPRINT.md
${ctx.week1Sprint}

## CTO Build Log
${ctx.buildLog}

## Sales Activity Log
${ctx.salesLog}

## Content Log
${ctx.contentLog}

## Churn Risk
${ctx.churnRisk}

---

Your job right now:
1. Assess where we stand vs our 90-day goal
2. Identify the single biggest bottleneck to first revenue
3. Write a new CEO_DIRECTIVES.md for this week
   - Each department (CTO, Sales, Content, Client Success) gets exactly 3 numbered tasks
   - Each task must include: what to do, where to put the output, success criteria
   - Tasks must be unblocked — don't assign tasks that depend on missing prerequisites
4. Write a 2-sentence CEO_NOTE summarizing the week's theme and what "winning" looks like

Output format — return two sections separated by ---DIRECTIVES---:

Section 1: A brief CEO assessment (3-5 bullet points)
---DIRECTIVES---
Section 2: The full CEO_DIRECTIVES.md content (ready to write to file)`;

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const text = message.content[0].text;
  const parts = text.split("---DIRECTIVES---");
  const assessment = parts[0].trim();
  const directives = parts[1]?.trim() || text;

  log("CEO assessment:\n" + assessment);

  const directivesContent = `---
issued: ${today}
---

${directives}`;

  writeFile(path.join(WORKSPACE, "CEO_DIRECTIVES.md"), directivesContent);
  log("CEO_DIRECTIVES.md updated.");

  // Append to CEO log
  const ceoLogPath = path.join(WORKSPACE, "ceo", "CEO_LOG.md");
  const logEntry = `\n\n## ${today}\n${assessment}\n`;
  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(ceoLogPath), { recursive: true });
    fs.appendFileSync(ceoLogPath, logEntry);
  }

  return directives;
}

// ── Department Agents ─────────────────────────────────────────────────────────

async function runAgent(agentName, ctx, directives) {
  log(`Running ${agentName} agent...`);

  const agentConfigs = {
    cto: {
      model: "claude-sonnet-4-6",
      title: "CTO",
      outputDir: path.join(WORKSPACE, "cto"),
      focus: `You are the CTO. Extract your tasks from the directives, identify the most impactful technical task to work on right now, and produce a BUILD_PLAN.md that lists: (1) the task, (2) which files to create/modify, (3) the exact commands or code outline needed. Be specific enough that a developer could execute it immediately.`,
    },
    sales: {
      model: "claude-sonnet-4-6",
      title: "VP of Sales",
      outputDir: path.join(WORKSPACE, "sales"),
      focus: `You are the VP of Sales. Extract your tasks from the directives. For the top task: if it involves writing copy, write it in full. If it involves a process, write a step-by-step execution plan. Output to SALES_PLAN.md.`,
    },
    content: {
      model: "claude-sonnet-4-6",
      title: "Content Agent",
      outputDir: path.join(WORKSPACE, "content"),
      focus: `You are the Content Agent. Extract your tasks from the directives. For the top task: produce the actual content (blog post draft, social posts, video script) or a detailed content calendar. Output to CONTENT_PLAN.md.`,
    },
    "client-success": {
      model: "claude-sonnet-4-6",
      title: "Head of Client Success",
      outputDir: path.join(WORKSPACE, "client-success"),
      focus: `You are the Head of Client Success. Extract your tasks from the directives. For the top task: produce an execution plan or draft the content needed. Pay special attention to any churn risks listed. Output to CS_PLAN.md.`,
    },
  };

  const config = agentConfigs[agentName];
  if (!config) {
    log(`Unknown agent: ${agentName}`);
    return;
  }

  const today = new Date().toISOString().slice(0, 10);

  const message = await client.messages.create({
    model: config.model,
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `Today is ${today}.

## Company Status
${ctx.companyStatus}

## CEO Directives (find your section)
${directives}

---

${config.focus}`,
      },
    ],
  });

  const text = message.content[0].text;
  const outputFile = path.join(
    config.outputDir,
    agentName === "cto"
      ? "BUILD_PLAN.md"
      : agentName === "sales"
      ? "SALES_PLAN.md"
      : agentName === "content"
      ? "CONTENT_PLAN.md"
      : "CS_PLAN.md"
  );

  const fileContent = `---\ngenerated: ${today}\nagent: ${agentName}\n---\n\n${text}`;
  writeFile(outputFile, fileContent);
  log(`${config.title} plan written to ${path.relative(ROOT, outputFile)}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  log("=== All The Calls Morning Brief ===");
  if (DRY_RUN) log("DRY RUN — no files will be written");

  const ctx = loadContext();

  // Step 1: Run CEO to generate fresh directives
  let directives = ctx.currentDirectives;
  if (!SINGLE_AGENT || SINGLE_AGENT === "ceo") {
    directives = await runCEO(ctx);
  }

  // Step 2: Run department agents with fresh directives
  const agents = ["cto", "sales", "content", "client-success"];
  const toRun = SINGLE_AGENT && SINGLE_AGENT !== "ceo"
    ? agents.filter((a) => a === SINGLE_AGENT)
    : agents;

  for (const agent of toRun) {
    await runAgent(agent, ctx, directives);
  }

  log("=== Brief complete ===");
  log(`Output written to: ${path.relative(ROOT, WORKSPACE)}/`);
}

main().catch((err) => {
  console.error("Brief failed:", err.message);
  process.exit(1);
});
