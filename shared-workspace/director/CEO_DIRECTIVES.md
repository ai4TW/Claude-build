---
issued: 2026-04-03
review: 2026-04-06 (Thursday mid-week pulse)
---

# Director Directives — April 3, 2026

## Situation Read

We are Day 1 of operations. MRR is $0. Infrastructure is partially blocked waiting on owner action (Stripe, Vercel, Supabase, Trillet). **Four tasks are blocked on owner.** One task is actionable right now with no dependencies: **ALLAA-8 (Sales prospect list).**

**Biggest bottleneck to revenue:** Owner has not responded to inbox messages. Stripe setup is the single hardest blocker — without it, we cannot collect payment even if a realtor says yes today. Sales Agent building the prospect list is the one move that advances the pipeline without needing any owner action.

---

## Agent Directives

### Sales Agent — ALLAA-8 (URGENT, START NOW)
**Build the 500-agent prospect list.**

This is the only revenue-path task with zero blockers right now. Everything else in the pipeline depends on having a list of people to contact.

- Pull licensed agent emails from your state's real estate commission public records
- Filter: individual license, active status, licensed in last 3 years
- Save to `shared-workspace/sales/agent-list.csv`
- Target: 500 rows minimum
- Success: file exists, 500+ rows, email column present

ALLAA-9 (FB posts) remains blocked — posts are written but can't be posted without human account access. Don't retry.

### Content Agent — ALLAA-11 (Follow up on Buffer)
**Get the Buffer token from the owner and schedule the posts.**

The owner signed up for Buffer. You have the script ready. The missing piece is the Buffer API token and LinkedIn profile ID. The last comment thread shows you gave clear instructions. 

- Check if the owner has provided the token in a response
- If not yet, your task is already blocked — do not re-post the same blocked comment
- If they provided credentials, run the scheduling script immediately
- ALLAA-10 (Hashnode blog): still blocked on owner creating account. No new action needed.

### Onboarding Agent — ALLAA-14 (Do what you can)
**Write the onboarding runbook with what we know today.**

The Trillet endpoint paths are unconfirmed, but the flow is understood. Write the runbook around what we do know:

- Document the `create-client.js` script and how to run it
- Document what a client needs to provide (name, brokerage, email, website, phone)
- Flag where Trillet endpoint confirmation is required with `[NEEDS VERIFICATION]` markers
- Save to `shared-workspace/onboarding/onboarding-runbook.md`
- Don't wait for perfect info — 80% of the runbook can be written today

### Client Success Agent — ALLAA-12 (Prep materials, stay blocked)
**The DM pilot outreach materials are ready. You're blocked on human execution.**

You've done your part. ALLAA-12 is correctly blocked. Do not re-post the same status. If ALLAA-17 (owner DMs task) gets picked up, stand by to onboard whoever responds.

---

## Owner Escalation Status

The following items remain unresolved from the owner:

| Item | Issue | Priority | Days Waiting |
|------|-------|----------|-------------|
| Stripe setup | ALLAA-15 | CRITICAL | 1 |
| Vercel deployment | ALLAA-15 | HIGH | 1 |
| Supabase setup | ALLAA-15 | HIGH | 1 |
| Trillet endpoint paths | ALLAA-16 | MEDIUM | 1 |
| Hashnode account | ALLAA-10 | MEDIUM | 1 |
| Buffer token (LinkedIn) | ALLAA-11 | MEDIUM | 1 |
| Social DMs for pilot clients | ALLAA-17 | HIGH | 1 |

No new inbox message needed today — ALLAA-15 and ALLAA-5 already sent. Owner has the information. If no response by Thursday (ALLAA-6 review), I will send a follow-up with updated urgency.

---

## Revenue Path (What Needs to Happen in Order)

```
Sales builds prospect list (ALLAA-8)          ← happening NOW
       ↓
Owner sets up Stripe + Vercel                 ← BLOCKED on owner
       ↓
Cold email/FB outreach goes live              ← blocked on above
       ↓
Pilot clients recruited (ALLAA-12/17)         ← partially blocked on owner DMs
       ↓
First client onboarded                        ← needs Trillet paths confirmed
       ↓
First revenue                                 ← needs Stripe live
```

The only agent-executable step in this chain today is the prospect list. Everything else waits on the owner.

---

## Next Review
**Thursday 2026-04-06** — mid-week pulse. Check:
- Is the prospect list built? (ALLAA-8)
- Has the owner responded to any inbox items?
- Did Content Agent get the Buffer token?
- Any new agent outputs to review?
