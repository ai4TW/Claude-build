# All The Calls — Monthly Wins Email Template

> **Send:** 1st–3rd of each month, to all active clients
> **Goal:** Reinforce value, celebrate results, and create stickiness / reduce churn

---

## Template

**Subject:** Your [Month] AI Receptionist Report — [X] calls handled

---

Hi [First Name],

Here's what your All The Calls receptionist did for you in [Month]:

---

### Your [Month] Numbers

| Metric | This Month |
|--------|------------|
| Total calls answered | [X] |
| Leads captured | [X] |
| Lead qualification rate | [X]% |
| Avg. response time | Instant (24/7) |
| Calls handled after hours | [X] |
| Estimated missed calls prevented | [X] |

---

### What This Means for Your Business

You didn't miss a single call last month — even during showings, open houses, and client meetings.

At an average commission of $15,000 per closed deal, even **one converted lead** from this month more than pays for a full year of All The Calls.

---

### Top Caller Intent This Month

Based on your call data:
- **[X]% buyers** — mostly asking about [neighborhood/price range]
- **[X]% sellers** — inquiring about listing timeline and valuations
- **[X]% referrals** — calling because someone recommended you specifically

> *Tip: If you're seeing a lot of [buyer type], consider adding a custom script line about your [relevant specialty] experience.*

---

### This Month's Highlight

> *"[Insert a real or representative quote from a caller transcript or agent feedback, e.g.:]*
> 'Your receptionist was so professional — I thought it was a real person!'"
> — Caller from [City], [Date]*

---

### Quick Actions for [Next Month]

1. [ ] **Review your call recordings** — spot any patterns worth addressing → [View Calls]
2. [ ] **Update your qualification script** — market conditions shift, your questions should too → [Edit Script]
3. [ ] **Check your CRM sync** — make sure all leads flowed through correctly → [View Leads]

---

### Ready to Do More?

[**Starter clients:**]
*You're on the Starter plan. Want unlimited call minutes, multi-line support, and SMS follow-up automation? **Pro plan** is $249/month and most agents upgrade after their first busy season.*
[Explore Pro → Upgrade Now]

[**Pro clients:**]
*You're on Pro — great choice. If you're managing a team or want white-glove onboarding support for your agents, our **Team plan** at $399/month might be worth a look.*
[See Team Features →]

---

As always, I'm here if you have questions or want to talk through your results.

Here for you,
[CS Rep Name]
Client Success, All The Calls
[Calendly link]

---

*All The Calls · [Unsubscribe] · [Company Address]*

---

## Template Notes (Internal)

**Personalization variables to populate:**
- `[First Name]` — from CRM
- `[Month]` — prior calendar month
- `[X] calls handled` — from Trillet dashboard API
- `[X] leads captured` — qualified leads (answered all 3+ questions)
- `[X]% qualification rate` — leads / total calls
- `[X] after-hours calls` — calls between 7pm–8am + weekends
- `[X] missed calls prevented` — same as total calls (every call was answered)
- Buyer/seller/referral split — from call intent data
- Highlight quote — pull from transcript with highest positive sentiment score

**Send criteria:**
- Active clients only (status = active, last_call_date within 30 days)
- Do NOT send to clients with 0 calls in the month (use churn prevention playbook instead)
- Send from CS rep's personal email alias, not noreply

**Timing:** Send 1st–3rd of month, Tuesday–Thursday, 8–10am local time
