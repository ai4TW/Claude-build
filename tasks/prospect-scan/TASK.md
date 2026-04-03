---
name: Weekly Prospect Scan
project: revenue
assignee: sales-agent
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-07T09:00:00-05:00
  recurrence:
    frequency: weekly
    interval: 1
    dayOfWeek: monday
    time:
      hour: 9
      minute: 0
---

Run the prospect-research skill. Find 50 new real estate agent prospects in a target city. Save to shared-workspace/sales/prospects/. Then run the outreach-draft skill to write the first-touch email for each prospect. Save drafts to shared-workspace/sales/outreach/.
