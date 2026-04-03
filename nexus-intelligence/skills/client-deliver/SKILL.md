---
name: client-deliver
description: Format a finished intelligence report and deliver it to a client via email with a personal cover note
---

# Client Deliver

Send a finished intelligence deliverable to a client. Every delivery should feel personal, not automated.

## Delivery Format

Every client delivery has three parts:

1. **Subject line** — specific to the content, not generic ("Your competitive brief on [topic]" not "Intelligence Report")
2. **Cover note** — 3–4 sentences, personal, connecting the research to their specific situation
3. **Deliverable** — the full report, either inline or as an attached PDF

## Cover Note Template

```
Hi [First Name],

Attached is your [brief type] on [topic].

The key finding for you specifically: [one sentence connecting the research to something in their situation — a decision they're facing, a competitor they mentioned, a market they're entering].

[Optional: one sentence about what to watch next, framed as a question or observation.]

Let me know if you want us to go deeper on anything.

[Your name]
Nexus Intelligence
```

## Email Delivery

Use the configured email provider (`SENDGRID_API_KEY` or `RESEND_API_KEY`) to send from the Nexus Intelligence sending address.

For retainer clients, send to their confirmed delivery email on file in `./clients/[slug]/profile.md`.

## Instructions

1. Receive the finished deliverable from the Intelligence Writer
2. Read the client's profile to understand their context
3. Write the cover note — make it specific to them, not generic
4. Format the deliverable as either inline email body or PDF attachment
5. Send via the configured email API
6. Log the delivery: `./clients/[slug]/deliveries/YYYY-MM-DD-[brief-slug].md`
7. Report back to Client Success Manager with delivery confirmation

## Environment Variables Required

- `RESEND_API_KEY` — preferred (get from resend.com → API Keys)
- `SENDGRID_API_KEY` — fallback option
- `FROM_EMAIL` — the sending address (e.g. `intel@nexusintelligence.com`)
