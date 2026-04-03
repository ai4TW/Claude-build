#!/usr/bin/env node
/**
 * RealtyVoice AI — Client Onboarding Script
 * Usage: node scripts/create-client.js --name "Sarah Johnson" --brokerage "Compass" --email "sarah@example.com" --website "https://sarahjohnson.com"
 *
 * Add --dry-run to preview without making API calls.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const { onboardClient } = require("../integrations/trillet");
const { generatePersona } = require("../integrations/claude-personas");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, val, i, arr) => {
    if (val.startsWith("--")) acc.push([val.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const required = ["name", "phone"];
  const missing = required.filter((k) => !args[k]);
  if (missing.length) {
    console.error(`Missing required args: ${missing.map((k) => `--${k}`).join(", ")}`);
    process.exit(1);
  }

  const client = {
    name: args.name,
    brokerage: args.brokerage || null,
    email: args.email || null,
    phone: args.phone,
    websiteUrl: args.website || null,
    specialty: args.specialty || "residential real estate",
    markets: args.markets || null,
    personality: args.personality || "professional and friendly",
  };

  console.log("\n=== RealtyVoice AI — New Client Onboarding ===");
  console.log(JSON.stringify(client, null, 2));

  if (DRY_RUN) {
    console.log("\n[DRY RUN] Generating persona only (no API calls to Trillet)...\n");
    const persona = await generatePersona(client);
    console.log("Generated Persona:\n", JSON.stringify(persona, null, 2));
    return;
  }

  // Step 1: Generate custom persona via Claude
  console.log("\n[1/2] Generating custom AI persona via Claude...");
  const persona = await generatePersona(client);
  client.greeting = persona.greeting;
  console.log(`Greeting: "${persona.greeting}"`);

  // Step 2: Onboard to Trillet
  console.log("\n[2/2] Creating Trillet sub-account and AI agent...");
  const result = await onboardClient(client);

  // Save result to shared workspace
  const fs = require("fs");
  const log = {
    timestamp: new Date().toISOString(),
    client,
    persona,
    trillet: result,
  };
  const logsDir = require("path").resolve(__dirname, "../shared-workspace/logs");
  const logPath = require("path").join(logsDir, `client-${Date.now()}.json`);
  fs.mkdirSync(logsDir, { recursive: true });
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  console.log("\n=== ONBOARDING COMPLETE ===");
  console.log(`Agent ID:       ${result.agentId}`);
  console.log(`Phone Number:   ${result.phoneNumber}`);
  console.log(`\nGive client this number to forward their calls to: ${result.phoneNumber}`);
  console.log(`Log saved to: ${logPath}`);
}

main().catch((err) => {
  console.error("Onboarding failed:", err.message);
  process.exit(1);
});
