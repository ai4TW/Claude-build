#!/usr/bin/env node
/**
 * RealtyVoice AI — Churn Monitoring Script
 * Flags active clients with 0 calls in the last 7 days.
 *
 * Usage: node scripts/check-clients.js
 *        node scripts/check-clients.js --days 14   (change lookback window)
 *        node scripts/check-clients.js --dry-run   (print report, don't write file)
 *
 * Output: shared-workspace/client-success/churn-risk.md
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const fs = require("fs");
const path = require("path");
const { getCallLogs } = require("../integrations/trillet");

const CLIENTS_FILE = path.join(__dirname, "../shared-workspace/client-success/clients.md");
const CHURN_RISK_FILE = path.join(__dirname, "../shared-workspace/client-success/churn-risk.md");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, val, i, arr) => {
    if (val.startsWith("--") && !["--dry-run"].includes(val)) {
      acc.push([val.slice(2), arr[i + 1]]);
    }
    return acc;
  }, [])
);
const DRY_RUN = process.argv.includes("--dry-run");
const LOOKBACK_DAYS = parseInt(args.days || "7", 10);

/**
 * Parse clients.md table rows into client objects.
 * Expects columns: Name | Brokerage | Tier | Go-Live Date | Sub-Account ID | Agent ID | Phone Number | Status
 */
function parseClientsFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[check-clients] clients.md not found at ${filePath}`);
    return [];
  }

  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const clients = [];

  for (const line of lines) {
    if (!line.startsWith("|") || line.startsWith("| Name") || line.startsWith("|---")) continue;
    const cols = line.split("|").map((s) => s.trim()).filter(Boolean);
    if (cols.length < 8) continue;

    const [name, brokerage, tier, goLiveDate, subAccountId, agentId, phone, status] = cols;
    if (!name || !subAccountId || subAccountId === "Sub-Account ID") continue;

    clients.push({ name, brokerage, tier, goLiveDate, subAccountId, agentId, phone, status });
  }

  return clients;
}

/**
 * Fetch call count for a client over the lookback window.
 */
async function getCallCount(subAccountId, startDate, endDate) {
  try {
    const result = await getCallLogs(subAccountId, { startDate, endDate, limit: 1 });
    // Trillet API may return { calls: [...], total: N } or just an array
    if (Array.isArray(result)) return result.length > 0 ? result.length : 0;
    if (result && typeof result.total === "number") return result.total;
    if (result && Array.isArray(result.calls)) return result.calls.length;
    return 0;
  } catch (err) {
    console.error(`[check-clients] Error fetching calls for ${subAccountId}: ${err.message}`);
    return null; // null = error, not zero
  }
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function buildReport(checkedAt, lookbackDays, atRisk, healthy, errors) {
  const lines = [
    `# Churn Risk Report`,
    ``,
    `**Generated:** ${checkedAt}`,
    `**Lookback window:** Last ${lookbackDays} days`,
    ``,
  ];

  if (atRisk.length === 0 && healthy.length === 0 && errors.length === 0) {
    lines.push(`> No active clients yet. Nothing to monitor.`);
    lines.push(``);
    lines.push(`Once clients are added to \`clients.md\`, this script will monitor their call activity automatically.`);
    return lines.join("\n");
  }

  if (atRisk.length > 0) {
    lines.push(`## At-Risk Clients (0 calls in last ${lookbackDays} days)`);
    lines.push(``);
    lines.push(`| Client | Brokerage | Tier | Go-Live | Phone |`);
    lines.push(`|--------|-----------|------|---------|-------|`);
    for (const c of atRisk) {
      lines.push(`| ${c.name} | ${c.brokerage} | ${c.tier} | ${c.goLiveDate} | ${c.phone} |`);
    }
    lines.push(``);
    lines.push(`**Action required:** Send check-in email and verify call forwarding is active.`);
    lines.push(``);
  } else {
    lines.push(`## At-Risk Clients`);
    lines.push(``);
    lines.push(`None — all active clients had call activity in the last ${lookbackDays} days.`);
    lines.push(``);
  }

  if (healthy.length > 0) {
    lines.push(`## Healthy Clients (active call volume)`);
    lines.push(``);
    lines.push(`| Client | Brokerage | Tier | Calls (${lookbackDays}d) |`);
    lines.push(`|--------|-----------|------|--------|`);
    for (const c of healthy) {
      lines.push(`| ${c.name} | ${c.brokerage} | ${c.tier} | ${c.callCount} |`);
    }
    lines.push(``);
  }

  if (errors.length > 0) {
    lines.push(`## Errors (could not fetch call data)`);
    lines.push(``);
    for (const c of errors) {
      lines.push(`- **${c.name}** (${c.subAccountId}): ${c.error}`);
    }
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`*Run \`node scripts/check-clients.js\` to refresh this report.*`);

  return lines.join("\n");
}

async function main() {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - LOOKBACK_DAYS);

  const checkedAt = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(now);

  console.log(`\n=== RealtyVoice AI — Churn Monitor ===`);
  console.log(`Lookback: ${LOOKBACK_DAYS} days (${startDateStr} → ${endDateStr})`);

  const allClients = parseClientsFile(CLIENTS_FILE);
  const activeClients = allClients.filter((c) => c.status === "active");

  console.log(`Clients found: ${allClients.length} total, ${activeClients.length} active`);

  if (activeClients.length === 0) {
    console.log(`No active clients to check.`);
    const report = buildReport(checkedAt, LOOKBACK_DAYS, [], [], []);
    if (!DRY_RUN) {
      fs.writeFileSync(CHURN_RISK_FILE, report, "utf8");
      console.log(`\nReport written to: ${CHURN_RISK_FILE}`);
    } else {
      console.log(`\n[DRY RUN] Report:\n\n${report}`);
    }
    return;
  }

  const atRisk = [];
  const healthy = [];
  const errors = [];

  for (const client of activeClients) {
    process.stdout.write(`  Checking ${client.name} (${client.subAccountId})... `);
    const callCount = await getCallCount(client.subAccountId, startDateStr, endDateStr);

    if (callCount === null) {
      console.log(`ERROR`);
      errors.push({ ...client, error: "API call failed — check TRILLET_API_KEY and sub-account ID" });
    } else if (callCount === 0) {
      console.log(`AT RISK (0 calls)`);
      atRisk.push(client);
    } else {
      console.log(`OK (${callCount} calls)`);
      healthy.push({ ...client, callCount });
    }
  }

  console.log(`\nResults: ${atRisk.length} at-risk, ${healthy.length} healthy, ${errors.length} errors`);

  const report = buildReport(checkedAt, LOOKBACK_DAYS, atRisk, healthy, errors);

  if (!DRY_RUN) {
    fs.writeFileSync(CHURN_RISK_FILE, report, "utf8");
    console.log(`Report written to: ${CHURN_RISK_FILE}`);
  } else {
    console.log(`\n[DRY RUN] Report:\n\n${report}`);
  }

  if (atRisk.length > 0) {
    console.log(`\n⚠️  ${atRisk.length} client(s) at churn risk — review churn-risk.md and send check-in emails.`);
    process.exit(1); // Non-zero exit so CI/cron can alert on at-risk clients
  }
}

main().catch((err) => {
  console.error(`[check-clients] Fatal error: ${err.message}`);
  process.exit(2);
});
