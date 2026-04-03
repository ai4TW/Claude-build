---
name: Weekly Client Health Check
project: operations
assignee: client-success-agent
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-07T10:00:00-05:00
  recurrence:
    frequency: weekly
    interval: 1
    dayOfWeek: wednesday
    time:
      hour: 10
      minute: 0
---

Run the client-checkin skill. Pull Trillet call logs for every active client. Classify each as green/yellow/red. Draft check-in emails for yellow and red clients. Flag upsell candidates. Write the weekly health report to shared-workspace/client-success/health-report-[date].md.
