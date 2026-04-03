---
name: trend-tracker
description: Build and maintain a running intelligence file on a tracked topic, accumulating signals over time and surfacing trend shifts
---

# Trend Tracker

Maintain a living intelligence file on a topic that accumulates and sharpens over time.

## What a Trend File Is

A trend file is not a snapshot — it's a log. Every time new intelligence arrives on a tracked topic, it's added to the file with a date. Over time, the file becomes a unique asset: a longitudinal view of how a market, technology, or situation is evolving.

This is what premium intelligence looks like. Anyone can write a one-off report. A trend file shows the arc.

## File Structure

Location: `./trends/[topic-slug]/TREND.md`

```markdown
# Trend File: [Topic Name]
**Started:** [DATE]
**Last Updated:** [DATE]
**Coverage:** [What this file tracks — scope in 1-2 sentences]

---

## Summary (updated monthly)
[Current state of play — written fresh each month based on all entries below]

## Signal Log

### [DATE]
**Source:** [Source name / URL]
**Signal:** [What happened — 1-2 sentences]
**Significance:** [Why it matters — what it suggests about the trend direction]

### [DATE]
...
```

## When to Update

- Add a new entry whenever a relevant signal arrives from `signal-scan` or a research brief
- Update the Summary section monthly
- Flag a **Trend Shift** when 3+ consecutive signals point in a new direction

## Trend Shift Alert Format

```
## ⚠️ TREND SHIFT DETECTED — [DATE]

[Topic] appears to be inflecting. Evidence:
1. [Signal 1]
2. [Signal 2]
3. [Signal 3]

Previous direction: [X]
New direction: [Y]

Confidence: Medium / High
```

Send a Trend Shift Alert immediately to the Director and to any clients who track this topic.

## Instructions

1. Receive a topic to track (from Director or Client Success Manager)
2. Create the trend file if it doesn't exist
3. Add new entries from recent intelligence
4. Update the Summary if the last update was more than 30 days ago
5. Check for Trend Shift conditions
6. Return the updated file and flag any Trend Shift Alerts
