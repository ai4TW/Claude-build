---
name: Publish Daily Newsletter Issue
assignee: publisher
project: newsletter
schedule:
  timezone: America/Chicago
  startsAt: 2026-04-07T07:15:00-05:00
  recurrence:
    frequency: daily
    interval: 1
    time:
      hour: 7
      minute: 15
---

The morning brief is ready. Format it as a newsletter issue and publish it.

1. Receive today's morning brief from the Director
2. Write a compelling subject line (not generic — lead with the most interesting finding)
3. Run the publish-newsletter skill to format and post
4. Run the social-post skill to create LinkedIn and X posts
5. Save a local copy to ./published/
6. Report the published URL back to the Director
