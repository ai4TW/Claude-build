---
version: 1.0
updated: 2026-04-03
owner: Client Success
---

# All The Calls — Client Onboarding Playbook

> **Purpose:** Step-by-step runbook for taking a new client from "deal closed" to "AI live and first call handled."
> Target completion time: under 30 minutes for the operator, 5 minutes for the client.

---

## Overview

```
Sales closes → new-clients.md updated → Client Success provisioned → AI live → emails sent → client monitored
```

**People involved:**
- **Sales/CEO** — logs the new client in `onboarding/new-clients.md`
- **Client Success** — runs this playbook
- **Client** — forwards calls and completes their setup steps

---

## Step 1 — Pick Up from Sales

Check `shared-workspace/onboarding/new-clients.md` for any rows with `Status: pending`.

Required fields before you can continue:
- Name (agent name, not brokerage)
- Brokerage
- Email
- Phone (the number they want forwarded)
- Website (optional but improves AI persona)
- Tier (Starter / Pro / Team)

If any required fields are missing, ping Sales before proceeding.

**Update status to `provisioning`** in `new-clients.md` when you begin.

---

## Step 2 — Provision the AI Receptionist

Run from the project root:

```bash
node scripts/create-client.js \
  --name "Sarah Johnson" \
  --brokerage "Compass Realty" \
  --email "sarah@example.com" \
  --phone "+15105550100" \
  --website "https://sarahjohnson.com" \
  --tier "starter"
```

Optional flags:
- `--specialty "luxury residential"` — refines AI persona
- `--markets "Austin, TX"` — adds local market context
- `--dry-run` — preview without making API calls

**What this does:**
1. Creates a Trillet sub-account
2. Provisions an AI agent phone number
3. Generates a Claude persona (greeting + qualification script + objection handling + voicemail)
4. Returns sub-account ID, agent ID, and the forwarding number

**Record the output in `client-success/clients.md`:**

```
| Sarah Johnson | Compass Realty | Starter | 2026-04-03 | sa_xxxxx | ag_xxxxx | +15105559999 | active |
```

**Update status to `live`** in `new-clients.md`.

---

## Step 3 — Send Onboarding Emails

Send the first two emails from `client-success/content/onboarding-sequence.md` immediately.

**Email 1 (Day 0) — Send now:**
Subject: `Welcome to All The Calls — You're live in 3 steps`

Personalize:
- Replace `[First Name]` with client's first name
- Replace `[app link]` with portal login URL
- Replace `[Your Name]` with your name

**Email 2 (Day 1) — Schedule for tomorrow:**
Subject: `How did your first call go?`

This checks that call forwarding is active. If sending manually, set a reminder to send it ~24 hours after Email 1.

Remaining emails (Day 3, 7, 14) follow automatically if using an email sequence tool, or manually per schedule.

---

## Step 4 — Client's 3 Setup Steps

The client needs to complete these on their end. Email 1 covers them, but if they're having trouble, walk them through:

1. **Login** to the portal → [app link]
2. **Complete profile** — name, brokerage, neighborhoods served
3. **Forward calls** — give them forwarding instructions for their carrier:
   - AT&T: Dial `*21*[All The Calls number]#`
   - Verizon: Dial `*71[All The Calls number]`
   - T-Mobile: Dial `**21*[All The Calls number]#`
   - iPhone: Settings → Phone → Call Forwarding
   - Android: Phone app → Settings → Supplementary Services → Call Forwarding

**Most common setup issue:** Client forgot to forward calls. If they report "no calls in dashboard," this is the first thing to check.

---

## Step 5 — Verify the AI is Live

Within 2 hours of provisioning, do a test call:

1. Call the client's forwarding number from a different phone
2. Confirm the AI answers with the correct agent name and greeting
3. Run through 2–3 qualification questions
4. Check that the call appears in the portal dashboard under the client's account

If the test fails, check:
- Trillet sub-account is active (check Trillet dashboard)
- Call forwarding is correctly set
- Client's All The Calls number matches what's in `clients.md`

---

## Step 6 — Day 7 Check-In

Seven days after go-live, check `client-success/churn-risk.md` (auto-updated by `scripts/check-clients.js`).

If the client shows **0 calls in 7 days:**

1. Email them the Day 7 check-in:
   - Subject: `Quick check-in — is your AI answering calls?`
   - Body: Ask if call forwarding is still active, offer to troubleshoot, share their dashboard link

2. If no response in 24 hours, call them directly

3. Most common root causes:
   - Call forwarding got reset (common after phone upgrade or carrier update)
   - They're testing us without committing volume
   - They forgot about it entirely (re-engage with win story from another client)

---

## Step 7 — Day 14 Upsell / Renewal

On Day 14, Email 5 goes out automatically (trial ending).

For pilot/free-trial clients, this is the conversion call. Use `client-success/upsell-script.md` for talking points.

Upgrade path:
- **Starter ($149/mo)** — solo agents, low-medium volume
- **Pro ($249/mo)** — agents with CRM (need sync), high volume, want SMS follow-up
- **Team ($499/mo)** — 2+ agent offices, need team dashboard, don't want missed calls during peak

Conversion decision tree:
```
< 30 calls/month → Starter
30-100 calls/month → Pro
2+ agents OR > 100 calls/month → Team
```

---

## Quick Reference

| File | Purpose |
|------|---------|
| `onboarding/new-clients.md` | Queue of clients pending onboarding |
| `client-success/clients.md` | Registry of active clients |
| `client-success/churn-risk.md` | Daily churn monitoring output |
| `client-success/content/onboarding-sequence.md` | 5-email sequence (days 0,1,3,7,14) |
| `client-success/onboarding-checklist.md` | Per-client setup checklist |
| `client-success/upsell-script.md` | Upgrade talking points |
| `scripts/create-client.js` | Provision Trillet account + AI persona |
| `scripts/check-clients.js` | Daily churn monitoring (run via cron) |

---

## Cron Job — Daily Churn Monitoring

The churn script should run once per day. To run manually:

```bash
node scripts/check-clients.js
```

To run with a custom lookback window:

```bash
node scripts/check-clients.js --days 14
```

Output is written to `shared-workspace/client-success/churn-risk.md`.

For automated daily execution, add to system crontab:

```cron
0 7 * * * cd /path/to/realty-receptionist && node scripts/check-clients.js >> logs/churn-check.log 2>&1
```

---

*All The Calls · Client Success · v1.0 · 2026-04-03*
