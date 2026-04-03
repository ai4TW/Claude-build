---
name: client-onboard
description: Provision a new AllTheCalls client on Trillet AI — create their sub-account, generate their AI receptionist persona, train it from their website, and confirm go-live. Use whenever a new client signs up. Runs the full Trillet API flow and sends the welcome email. Client should be live within 30 minutes of signup.
---

# Client Onboard

Activate a new client's AI receptionist end-to-end.

## Inputs needed

Read the client record from `shared-workspace/onboarding/new-clients.md`. Required fields:
- Full name
- Brokerage name
- Email address
- Phone number (their current business line)
- Website URL (for AI training — use their Realtor.com profile if no website)
- Pricing tier (Starter / Pro / Team)
- Any custom notes (specialty, market, preferred name for the AI to use)

## Step 1 — Generate AI persona

Run `integrations/claude-personas.js` with the client's details. This produces:
- **Greeting**: `"Thank you for calling [Name] with [Brokerage]. I'm their AI assistant — how can I help you today?"`
- **Lead qualification script**: asks buyer/seller, timeline, pre-approval status, property type
- **Objection handling**: for "I want to talk to a real person", "Are you a robot?", "I'll call back later"
- **Voicemail message**: for calls that can't be answered live

Review the output. Adjust the greeting if the agent uses a title (e.g., "The Smith Team") or has a specialty that should be mentioned.

## Step 2 — Provision on Trillet

Run `scripts/create-client.js` with the client's info, or call `integrations/trillet.js` directly:

```
node scripts/create-client.js \
  --name "[Client Name]" \
  --brokerage "[Brokerage]" \
  --email "[email]" \
  --website "[website URL]"
```

This will:
1. Create a Trillet sub-account
2. Create an AI agent with the generated persona
3. Train the agent from their website
4. Return a phone number

Save the result: `subAccountId`, `agentId`, `phoneNumber`.

## Step 3 — Send welcome email

Send from `hello@allthecalls.com` via Resend. Subject: `"Your AI receptionist is live — here's your number"`

Email body must include:
- Their assigned phone number (the one to forward calls to)
- Forwarding instructions: "To activate, call your carrier and set up conditional call forwarding to [number]. On iPhone: Settings → Phone → Call Forwarding. Typical carriers can do this in 2 minutes."
- What happens next: callers will hear their custom greeting, leads get qualified and logged in the portal
- Portal link: https://allthecalls.com/dashboard (login with their signup email)
- Reply-to: the human's email address for any questions

## Step 4 — Log and update

Add the client to `shared-workspace/client-success/clients.md`:

```
| Name | Brokerage | Tier | Go-Live Date | Sub-Account ID | Agent ID | Phone Number | Status |
```

Update `shared-workspace/COMPANY_STATUS.md` — increment active clients and MRR.

## If something fails

Trillet provisioning errors go to `shared-workspace/onboarding/issues.md`. Flag for the Director immediately — don't leave a new client waiting.
