---
updated: 2026-04-05
week: 2
---

# AllTheCalls — Company Status

> **GROUND TRUTH AS OF APRIL 5, 2026 — read git log + lib/stripe.ts for authoritative state**
> HANDOFF.md is outdated. The business has pivoted since April 3. Use THIS file.

---

## The Business (Current, Correct)

**AllTheCalls.ai** is a 24/7 AI voice receptionist for ANY business — not real estate only. The business pivoted to multi-industry.

**Target customers:** Any business that can't afford to miss calls — real estate, legal, medical, home services, financial, salons, auto, restaurants.

**Demo line:** (316) 232-4777 — callers hear the AI live

**Current plans (LIVE IN STRIPE — verified April 5):**
| Plan | Price | What's Included |
|------|-------|----------------|
| Solo | $199/mo | 1 AI receptionist, 300 calls/month, 5 voice options |
| Pro | $349/mo | 1 AI receptionist, unlimited calls, full voice library, custom knowledge base, priority support *(most popular)* |
| Agency | $599/mo | 3 AI receptionists with unique names/voices/scripts, unlimited calls, quarterly script review, dedicated onboarding |
| All plans | — | 14-day free trial, no credit card required, cancel anytime |

**Key stats Gia uses on calls:**
- 1,200+ businesses live
- 4.8 million calls handled
- 99.9% answer rate

---

## KPIs
| Metric | Target (30 days) | Actual |
|--------|-----------------|--------|
| MRR | $1,500 | $0 (pre-revenue) |
| Active paying clients | 10 | 0 |
| Pilot clients | 3 | 0 |
| Prospects contacted | 100 | 0 |
| Pipeline (interested) | 10 | 0 |

---

## Infrastructure Status

| Item | Status | Notes |
|------|--------|-------|
| Domain (allthecalls.ai) | ✅ live | |
| Vercel deployment | ✅ live | Auto-deploys from main |
| Stripe billing | ✅ live | Solo $199 / Pro $349 / Agency $599 — verified in lib/stripe.ts |
| Supabase database | ✅ live | clients + call_logs tables |
| Trillet (Gia) | ✅ live | Agent ID: 69d1997a9491b9a74426c02f — connected to (316) 232-4777 |
| Self-service onboarding | ✅ built | Wizard creates account + logs in directly (login bug fixed) |
| Gia system prompt | ✅ updated | Full sales script with booking close + SMS link |
| Welcome email (Resend) | ⚠️ check status | May still need RESEND_API_KEY in Vercel |
| Mobile layout | ✅ improved | Multiple mobile commits — verify live at 375px |
| Inner pages dark theme | ⚠️ partial | Some pages updated, verify all |
| Dashboard (real data) | ✅ improved | Session now connected via self-service onboarding |

---

## Gia — Voice AI Sales Agent

Gia is the inbound/outbound sales AI on the AllTheCalls demo number (316) 232-4777.

**Agent ID:** `69d1997a9491b9a74426c02f`
**Phone:** +13162324777
**Pathway:** "All The Calls" (69d1997a9491b9a74426c040)
**LLM:** gemini-2.5-flash
**Voice:** ElevenLabs BYO — Jessica (Playful, Bright, Warm)
**STT:** Deepgram Flux

**Call objective:** Qualify → pitch → book a setup call via SMS booking link
**Close action:** Send SMS with setup call booking link after collecting their number

---

## Current Bottleneck

**Zero outreach has happened.** The product works. Gia is live. The payment flow works. The bottleneck is purely sales — no one has reached out to potential customers yet.

**What's needed now:**
1. Launch cold email campaign on Instantly.ai (500-agent list is ready at shared-workspace/sales/prospects/)
2. Owner to post in Facebook real estate groups (template at shared-workspace/sales/fb-group-posts-ready.md)
3. Owner to send pilot DMs on Instagram/Facebook (template at shared-workspace/client-success/)

**Owner-blocked items:**
| Item | Blocker |
|------|---------|
| Facebook group posts | Needs owner's Facebook account |
| Pilot DMs | Needs owner to send Instagram/Facebook DMs |
| Blog (Hashnode) | Needs owner to create brand account |
| LinkedIn scheduling | Needs Buffer API token + LinkedIn profile ID |

---

## What's Built (Accurate as of April 5)

- `allthecalls.ai` — live, dark premium design, mobile-optimized
- Stripe checkout — Solo $199 / Pro $349 / Agency $599, 14-day trial, live
- Self-service onboarding wizard — creates Supabase account + Trillet agent + logs in
- Supabase — clients + call_logs tables, RLS configured
- `/api/onboard` — creates Trillet agent on payment
- `/api/webhooks/stripe` — auto-triggers onboarding
- Gia — live AI sales agent on (316) 232-4777 with full sales script
- 500-prospect list — shared-workspace/sales/prospects/
- Outreach sequences — shared-workspace/sales/content/outreach-sequence.md
- Objection handling scripts — shared-workspace/sales/content/objection-handling-scripts.md
- Onboarding playbook — shared-workspace/client-success/

---

## Next Director Review
Thursday 2026-04-06 — mid-week pulse. Priority: get first outreach sent TODAY.
