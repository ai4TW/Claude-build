---
name: Weekly Content Batch
project: operations
assignee: content-agent
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-07T09:00:00-05:00
  recurrence:
    frequency: weekly
    interval: 1
    dayOfWeek: tuesday
    time:
      hour: 9
      minute: 0
---

Run the content-create skill. Produce this week's full content batch: 3 LinkedIn posts, 2 Facebook group posts, 1 email. Save to shared-workspace/content/. Flag anything needing human review in shared-workspace/content/needs-review.md.
