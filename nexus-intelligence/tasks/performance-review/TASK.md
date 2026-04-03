---
name: Weekly Performance Review
assignee: publisher
project: newsletter
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-06T06:30:00-05:00
  recurrence:
    frequency: weekly
    interval: 1
    weekdays:
      - monday
    time:
      hour: 6
      minute: 30
---

Pull last week's newsletter and social metrics before anything else runs today.

1. Run the performance-tracker skill to pull Beehiiv metrics for all issues from the past 7 days
2. Update ./performance/content-log.md with each issue's stats
3. Compile the weekly performance summary
4. Send the summary to the Director before the 8am weekly review
5. Update ./performance/social-log.md with social post results

The Director uses this data to set the research agenda for the week. Run this before 7am so the weekly review has fresh performance data.
