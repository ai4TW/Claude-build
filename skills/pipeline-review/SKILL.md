---
name: pipeline-review
description: Review the AllTheCalls sales pipeline — who needs follow-up, who's close to converting, and what the revenue outlook looks like. Use weekly to keep deals moving and flag anyone going cold. Reads the pipeline tracker and produces a prioritized action list.
---

# Pipeline Review

Review the current sales pipeline and produce a prioritized action list for the week.

## Read first

Open `shared-workspace/sales/pipeline.md`. This is the source of truth for every prospect who has been contacted.

## Pipeline stages

Each prospect should be in one of these stages:
- **Contacted** — first email sent, no reply yet
- **Replied** — they responded (positive, negative, or question)
- **Interested** — expressed interest, needs follow-up or demo
- **Closing** — agreed in principle, working out details
- **Won** — signed up, handed to Onboarding
- **Lost** — said no, or unresponsive after 4+ touches
- **Archived** — not a fit, do not contact again

## What to assess per prospect

For each active prospect (not Lost or Archived):
1. When was the last touch? If more than 5 days ago with no reply — send follow-up
2. What's the next action? Be specific: "send follow-up #2", "answer their pricing question", "send demo audio"
3. Is there a blocker? Flag it clearly so Sales or Director can address it

## Output

Write a weekly pipeline report to `shared-workspace/sales/pipeline-review-[date].md`:

```
## This Week's Pipeline Summary
- Total active prospects: X
- Replied this week: X
- Interested / in closing: X
- Won this week: X
- Needs follow-up (action required): X

## Priority Actions (do these first)
1. [Name] — [action] — [reason]
2. ...

## Going Cold (risk of losing)
- [Name] — last touch [date] — [recommended action]

## Won This Week (hand to Onboarding)
- [Name] — [brokerage] — [tier] — details in shared-workspace/onboarding/new-clients.md
```

Update `shared-workspace/sales/pipeline.md` with any stage changes after the review.
