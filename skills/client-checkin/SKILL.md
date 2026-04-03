---
name: client-checkin
description: Check the health of all active AllTheCalls clients — pull Trillet call logs, identify at-risk clients, flag upsell opportunities, and draft check-in messages. Use weekly to prevent churn and grow revenue from existing clients.
---

# Client Check-In

Review every active client's health and take action where needed.

## Read first

Open `shared-workspace/client-success/clients.md` for the full client list. You need each client's Trillet sub-account ID to pull their call logs.

## Pull call data

For each client, use `integrations/trillet.js` → `getCallLogs(subAccountId)` to pull the last 7 days of calls.

Key metrics per client:
- **Total calls this week**
- **Calls answered by AI** vs missed
- **Average call duration** (very short = hang-ups, possible AI issue)
- **Days since last call** (0 calls in 7 days = red flag)

## Health classification

**Green** — 10+ calls/week, AI answering correctly, client has been active 30+ days
→ Action: send monthly wins email if it's been 30 days since last one

**Yellow** — 3–9 calls/week, or client is in first 30 days
→ Action: send a friendly check-in, confirm they've forwarded their number, offer tips

**Red** — 0–2 calls in 7 days, or active less than 14 days with no calls yet
→ Action: reach out personally — "Just checking that your forwarding is set up correctly. Here's how to test it..."
→ Flag in `shared-workspace/client-success/churn-risks.md` for Director awareness

**Upsell** — Starter client with 50+ calls/week, or Pro client with 100+ calls/week
→ Draft upsell pitch: frame as "your AI is working hard — here's what the next tier unlocks"

## Output

Write weekly health report to `shared-workspace/client-success/health-report-[date].md`:

```
## Client Health Summary — [Date]
- Total active clients: X
- Green (healthy): X
- Yellow (watch): X
- Red (at risk): X
- Upsell candidates: X

## Actions Taken
- [Client name] — [action] — [reason]

## Escalations for Director
- [Client name] — [issue] — [recommended action]
```

Save all drafted emails to `shared-workspace/client-success/outbox/` — the human reviews and sends, or flags for automation.
