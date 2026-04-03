---
name: Daily Morning Brief
assignee: director
project: operations
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-07T07:00:00-05:00
  recurrence:
    frequency: daily
    interval: 1
    time:
      hour: 7
      minute: 0
---

Run the morning-brief skill. Scan overnight signals, surface top developments, and deliver the daily digest to the user before 7:15am.

Dispatch the signal-scan skill first, then synthesize into the morning brief format.
