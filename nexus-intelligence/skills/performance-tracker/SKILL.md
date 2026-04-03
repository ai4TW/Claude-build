---
name: performance-tracker
description: Pull engagement metrics from Beehiiv after each issue, log what performed best, and update the content strategy based on what the audience responds to
---

# Performance Tracker

Pull metrics after every published issue and build a living record of what works. This is how the company learns.

## When to Run

- **24 hours after each newsletter issue** — open rate and click data is reliable by then
- **Weekly** — compile a performance summary for the Director and Publisher

## Metrics to Pull (via Beehiiv API)

For each issue:
- Open rate
- Click rate
- New subscribers gained
- Unsubscribes
- Top clicked link
- Replies received (qualitative signal)

## Performance Log

Maintain a running log at `./performance/content-log.md`:

```markdown
# Content Performance Log

## [DATE] — [Issue Subject Line]
- **Open rate:** [X]% (benchmark: [avg]%)
- **Click rate:** [X]%
- **Net subscribers:** +[N]
- **Top clicked:** [URL or section]
- **Topic:** [What this issue covered]
- **Format:** [Use case story / Tool launch / Quick win / Warning / List]
- **Lead angle:** [Outcome-focused / Feature-focused / Problem-focused]
- **Notes:** [Anything notable — high replies, forwards, unsubscribes spike]

---
```

## Weekly Performance Summary

Every Monday, compile this report for the Director:

```
## Weekly Performance Summary — Week of [DATE]

### What Worked
- Best performing topic: [Topic] — [X]% open rate
- Best performing format: [Format] — [X]% click rate
- Best subject line pattern: [Pattern with example]

### What Didn't Work
- Lowest performing topic: [Topic] — [X]% open rate
- Format to use less: [Format]

### Audience Growth
- Subscribers this week: +[N]
- Total subscribers: [N]
- Unsubscribe rate: [X]%

### Content Recommendations for Next Week
1. Lead with [topic] — consistently above-average open rates
2. Use [format] more — highest click rates
3. Avoid [topic/angle] — below-average engagement 3 weeks in a row
4. Test: [new angle or format to try this week]
```

## Learning Rules

Track patterns over time, not just individual issues:

- **3 data points = a pattern.** If the same topic type outperforms 3 weeks in a row, it's not a fluke — prioritize it.
- **Subject line patterns matter most.** Track which types of subject lines get opened (questions vs. statements vs. numbers vs. warnings).
- **Unsubscribes are a signal too.** If a topic spikes unsubscribes, the audience doesn't want it — drop it.
- **Clicks reveal intent.** What people click shows what they actually want to do, not just read about.
- **Forwards are gold.** If an issue gets forwarded heavily, that topic brings in new subscribers — do more of it.

## Beehiiv API Instructions

Use the Beehiiv API with `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` to pull:
- `GET /v2/publications/{id}/posts` — list all posts with stats
- `GET /v2/publications/{id}/posts/{post_id}` — individual post metrics

Pass the weekly summary to the Director every Monday before the weekly review runs.
