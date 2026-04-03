---
name: pipeline-review
description: Review the business development pipeline weekly — who needs follow-up, who's close to converting, and what the revenue outlook looks like
---

# Pipeline Review

Run a weekly review of the business development pipeline and produce a prioritized action plan.

## Pipeline Stages

Track every prospect through these stages:

| Stage | Definition |
|-------|-----------|
| **Identified** | Found, not yet contacted |
| **Contacted** | First outreach sent |
| **Engaged** | Replied or showed interest |
| **Proposal Sent** | Pricing/scope shared |
| **Negotiating** | Active back-and-forth |
| **Closed Won** | Paying client |
| **Closed Lost** | Said no or went dark |

## Output Format

```
## Pipeline Review — [DATE]

### Summary
- Total prospects tracked: [N]
- New this week: [N]
- Engaged: [N]
- Proposals out: [N]
- Projected MRR if all proposals close: $[N]

### Priority Actions This Week

1. **[Name] — [Company]** ([Stage])
   Status: [What happened last contact]
   Action: [Specific next step — follow up / send proposal / schedule call]
   Deadline: [Date]

2. ...

### Follow-Ups Due

[List of prospects who haven't responded in 5–7 days and need a follow-up]

### Won This Week

[Any new paying clients — celebrate and hand off to Client Success]

### Lost / Stalled

[Prospects who said no or have gone dark for 14+ days — move to Closed Lost]

### Next Week's Targets

[3–5 new prospects from the Identified list to contact next week]
```

## Instructions

1. Review all prospects in the pipeline file (`./pipeline/prospects.md`)
2. Identify who needs action this week
3. Draft follow-up messages for anyone in the "Contacted" stage for 6+ days
4. Update pipeline stages based on any new information
5. Calculate projected revenue if all active proposals close
6. Return the full pipeline report to the Director
