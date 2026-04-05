---
updated: 2026-04-05
week: 2
---

# AllTheCalls — Company Status

## KPIs
| Metric | Target (30 days) | Actual |
|--------|-----------------|--------|
| MRR | $1,500 | $0 (pre-revenue) |
| Active paying clients | 10 | 0 |
| Pilot clients | 3 | 0 |
| Prospects contacted | 100 | 0 |
| Pipeline (interested) | 10 | 0 |

## Infrastructure Status (Updated — HANDOFF.md authoritative)
| Item | Status |
|------|--------|
| Domain (allthecalls.ai) | ✅ live |
| Vercel deployment | ✅ live — auto-deploys from main |
| Stripe billing | ✅ live — 3 plans, 14-day trial, webhooks active |
| Supabase database | ✅ live — clients + call_logs tables exist |
| Trillet API | ✅ working — confirmed endpoints in HANDOFF.md |
| Welcome email (Resend) | ❌ RESEND_API_KEY not set in Vercel |
| NEXT_PUBLIC_APP_URL | ❌ not set in Vercel — may break checkout redirect |
| Login → Stripe/Supabase | ❌ CLIENT_REGISTRY hack — paying clients CANNOT log in |
| Mobile layout | ❌ broken — inline styles, no Tailwind breakpoints |
| Inner pages dark theme | ❌ login, checkout, demo pages still white |
| Dashboard (real data) | ⚠️ partial — session not connected to real client IDs |

## Current Bottleneck

**The login bug is the #1 revenue blocker.** The payment flow works — clients can pay. But when they land on `/login`, they cannot authenticate because the login system uses a hardcoded `CLIENT_REGISTRY` env var that isn't connected to Stripe or Supabase. This means any client who pays today is immediately stuck. Fix this before running any outreach.

**Secondary blockers (owner action needed):**
- Facebook group posting — needs owner's Facebook account
- Blog (Hashnode) — needs owner to create brand account
- LinkedIn scheduling (Buffer) — needs owner's Buffer API token + LinkedIn profile ID
- Pilot DMs — needs owner to send Instagram/Facebook DMs

## Agent Task Status (Week of 2026-04-03)
| Agent | Task | Status |
|-------|------|--------|
| Sales | ALLAA-8: Build 500-agent list | ✅ done — shared-workspace/sales/prospects/ |
| Sales | Cold email setup (Instantly.ai) | todo — list is ready, needs account setup |
| Sales | ALLAA-9: Post in 3 FB groups | ⚠️ blocked — needs human Facebook access |
| Content | ALLAA-3: Write outreach copy | ✅ done |
| Content | ALLAA-10: Publish blog post | ⚠️ blocked — needs owner to create Hashnode account |
| Content | ALLAA-11: Schedule LinkedIn posts | ⚠️ blocked — needs Buffer API token from owner |
| Client Success | ALLAA-4: Onboarding playbook | ✅ done |
| Client Success | ALLAA-12: Recruit 3 pilot clients | ⚠️ blocked — DM template ready, needs human to send |
| Client Success | ALLAA-13: Churn monitoring script | ✅ done |
| Onboarding | ALLAA-14: Trillet dry-run | ✅ partially done — runbook written, paths confirmed in HANDOFF.md |
| Engineering | P0: Fix login → Supabase/Stripe | ❌ not started — urgent |
| Engineering | P0: Set NEXT_PUBLIC_APP_URL in Vercel | ❌ not started — urgent |
| Engineering | P1: Fix mobile layout | ❌ not started |
| Engineering | P1: Dark theme inner pages | ❌ not started |
| Engineering | P2: Set RESEND_API_KEY in Vercel | ❌ not started |

## What's Built (Corrected Picture)
- `allthecalls.ai` — full Next.js 14 site, live on Vercel
- Stripe checkout — 3 tiers live ($97/$197/$297), 14-day trial
- Supabase — clients + call_logs tables, RLS configured
- `/api/onboard` — creates Trillet agent on payment
- `/api/webhooks/stripe` — auto-triggers onboarding on checkout.session.completed
- `integrations/trillet.js` — full Trillet API integration
- `scripts/create-client.js` — one-command client onboarding
- `shared-workspace/sales/prospects/2026-04-03-500-agent-list.md` — 500 real estate agents ready to contact
- `shared-workspace/sales/content/outreach-sequence.md` — 5-email cold sequence
- `shared-workspace/client-success/` — onboarding playbook, churn monitoring, pilot outreach tracker
- `shared-workspace/content/blog-missed-calls.md` — ready to publish

## Next Director Review
Thursday 2026-04-06 — mid-week pulse (scheduled). Current priority: P0 login fix must be done before Thursday.
