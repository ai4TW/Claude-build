# Pilot Client Activation Playbook

**Agent:** Client Success  
**Created:** 2026-04-07  
**Purpose:** Fast-activation guide for free 30-day pilot clients. When someone says yes, this is how we go from "yes" to "live AI line" in under 2 hours.

---

## 1. The DM Reply When Someone Says Yes

Send this within **30 minutes** of seeing their reply. Speed signals professionalism.

```
Hi [Name] — awesome, let's get you set up!

To get your AI line configured, I need just 3 quick things:

1. The phone number you want to forward calls from (your current business line)
2. Your typical business hours (e.g. Mon–Fri 9am–7pm CST)
3. A few words on how you'd like the AI to greet callers — or just say "keep it professional" and I'll handle it

Takes me about 30–45 minutes to configure once I have these. I'll send you a test call number to try it yourself before it goes live.

Talk soon,
[Your name]
```

---

## 2. Info to Collect in the First 5 Minutes

Before touching Trillet, get these from the agent (DM, text, or quick call):

| Item | Why We Need It | Example |
|------|---------------|---------|
| **Full name** | AI greeting, Trillet agent name | "Sarah Johnson" |
| **Brokerage name** | AI greeting | "Compass Realty" |
| **Their current phone number** | Number forwarding setup | (214) 555-1234 |
| **Business hours** | AI behavior after hours | Mon–Fri 9am–7pm CST |
| **Greeting preference** | Script personalization | "Friendly and professional" |
| **Top 3 FAQs** | Script training | "Available for showings?", "What areas do you serve?" |
| **Lead capture preference** | Call handling | Name + phone only, or full address too? |
| **Callback preference** | What AI promises callers | "Agent will call back within 2 hours" |

> **Shortcut:** If they're in a rush, the minimum is name + brokerage + phone number. You can fill in sensible defaults for the rest and refine after the test call.

---

## 3. Provisioning Their Line in Trillet

**Time estimate:** 15–20 minutes

### Step 1: Create the AI agent

Use `integrations/trillet.js` → `onboardClient()`:

```javascript
const { onboardClient } = require('./integrations/trillet');

const result = await onboardClient({
  name: "Sarah Johnson",       // agent's full name
  brokerage: "Compass Realty", // their brokerage
  greeting: "Hi, you've reached the office of Sarah Johnson at Compass Realty..."
});

console.log(result);
// → { agentId: "abc123", agentName: "Sarah Johnson — Compass Realty (AllTheCalls)", ... }
// → note: "Agent created. Go to app.trillet.ai → Telephony → assign a phone number..."
```

### Step 2: Assign a phone number

1. Log into **app.trillet.ai**
2. Go to **Telephony** → **Phone Numbers**
3. Click **Assign** next to an available number (or provision a new local number near their market)
4. Select the agent created in Step 1
5. Record the assigned number — this is what the client will forward calls to

> **Note:** Phone number provisioning is dashboard-only — cannot be done via API (Trillet limitation as of Apr 2026).

### Step 3: Configure the agent script

In app.trillet.ai, open the agent and set:

- **Greeting:** "Hi, you've reached [Name] at [Brokerage]. I'm [Name]'s assistant — how can I help you today?"
- **After-hours message:** "Our office is closed right now, but I'd love to take your information so [Name] can follow up with you first thing tomorrow."
- **Lead capture fields:** First name, callback number, and reason for call (minimum)
- **Business hours:** Set to their stated hours (calls outside hours go to after-hours flow)

### Step 4: Record in clients.md

Add them to `shared-workspace/client-success/clients.md` immediately:

```
| [Name] | [Brokerage] | [City, State] | [Tier] | [Trillet Agent ID] | [AllTheCalls #] | [Start Date] | Pilot (30-day free) |
```

---

## 4. What the Client Receives on Day 1

Once the line is live, send this message (DM or email):

```
Subject: Your AI line is live — here's how to test it

Hi [Name]!

Your AllTheCalls AI line is active. Here's what to do right now:

📞 Your AllTheCalls number: [+1 XXX-XXX-XXXX]

TEST IT FIRST (takes 60 seconds):
Call that number from a friend's phone. You should hear your personalized greeting and be able to leave a lead inquiry. I'll see the recording on my end.

THEN FORWARD YOUR CALLS:
On your phone, go to Settings → Phone → Call Forwarding and enter your AllTheCalls number. From that point on, every missed call goes to your AI.

A few things your AI will do:
✅ Answer 24/7, never go to voicemail
✅ Capture lead name + callback number for every caller
✅ Qualify whether they're buying, selling, or just browsing
✅ Promise a callback from you within [X hours]

You'll get a daily summary email of all calls handled.

Any issues in the first 48 hours, just reply here and I'll fix it immediately.

Welcome aboard!
[Your name]
```

---

## 5. Converting to Paid at Day 30

### Day 25 check-in (proactive)

Send 5 days before the pilot ends:

```
Hi [Name] — it's been 25 days since your AI line went live.

Quick check-in: How has it been going? Any calls you were glad the AI caught?

Your trial wraps up on [date]. If you've found it useful, I'd love to keep it running for you — Starter plan is $349/month and covers everything you've been using.

If you want to keep going, just reply "yes" and I'll send you a checkout link. No pressure either way.

— [Your name]
```

### Day 30 conversion message (if no reply to Day 25)

```
Hi [Name] — your free trial ends today.

Your AI has handled [X] calls over the past 30 days. 

To keep it active: [Stripe checkout link — Starter $349/mo]

If you'd like to pause or cancel, just say the word — no hard feelings and no billing.

— [Your name]
```

### If they don't convert

1. Move to `Lost / Archived` in `shared-workspace/sales/pipeline.md` with note: "Pilot ended, did not convert — [reason if known]"
2. Remove from `clients.md`
3. Delete their Trillet agent (to free up the slot)
4. Follow up 60 days later: "We've made improvements — want to try again?"

### Upsell trigger at Day 30

If they've had **50+ calls in 30 days** → pitch Pro ($497/mo):

```
Hi [Name] — before I send the renewal link, I want to flag something:

Your AI handled [X] calls last month. That's a lot of leads. 

At that volume, you might want Pro — it includes priority support and [additional feature]. It's $497/month vs $349.

Worth a quick 10-minute call to walk through what's right for you?

— [Your name]
```

---

## Quick Reference — Activation Checklist

- [ ] Received "yes" from pilot prospect
- [ ] Sent the DM reply (within 30 min)
- [ ] Collected: name, brokerage, phone, hours, greeting preference
- [ ] Created Trillet agent via `onboardClient()`
- [ ] Assigned phone number in app.trillet.ai
- [ ] Configured greeting + after-hours + lead capture
- [ ] Added to clients.md
- [ ] Sent Day 1 go-live message
- [ ] Scheduled Day 25 check-in reminder
- [ ] Scheduled Day 30 conversion touchpoint

---

_Reference: `integrations/trillet.js` for API calls | `shared-workspace/client-success/clients.md` for client registry_
