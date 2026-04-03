---
name: signal-scan
description: Scan AI tools for small business sources daily — Product Hunt, HN, Reddit, and key company blogs — and surface signals worth publishing
---

# Signal Scan

**Niche: AI Tools for Small Businesses**

Scan monitored sources for signals relevant to small business owners adopting AI tools.

## Sources to Scan (in priority order)

### Product Hunt
- New launches tagged: `artificial-intelligence`, `productivity`, `small-business`, `automation`, `no-code`
- Flag any tool with 100+ upvotes on launch day
- Note: pricing, use case, who it's for

### Hacker News
- Front page stories mentioning: AI, automation, small business, productivity, Zapier, Make, n8n, ChatGPT, Claude, Notion, HubSpot, Canva, Jasper
- "Ask HN" and "Show HN" posts about AI tools
- Comments threads where small business owners discuss AI adoption

### Reddit
- r/smallbusiness — AI tool mentions and questions
- r/entrepreneur — automation wins and discoveries
- r/AItools — new tool launches and reviews
- r/nocode — workflow automation discussions
- r/zapier, r/automation — use case threads

### Key Company Blogs & Sources
- Zapier blog (zapier.com/blog)
- Make blog (make.com/blog)
- HubSpot (blog.hubspot.com) — AI features and SMB content
- Notion changelog
- Canva newsroom
- G2 and Capterra — trending AI tools in SMB categories
- Indie Hackers — bootstrapped AI tool launches

### Twitter/X Accounts to Monitor
- @zapier, @make_hq, @hubspot, @NotionHQ
- AI tool founders with <10k followers launching to SMBs (emerging, not saturated)
- Small business owners posting about AI wins

## Signal Criteria — What's Worth Surfacing

A signal is worth publishing if it meets any of:

- **New tool** that solves a real SMB problem (bookkeeping, scheduling, customer service, marketing, hiring)
- **Price drop or free tier** on an existing AI tool SMBs use
- **Real use case story** — a small business owner sharing actual results with an AI tool
- **Trend signal** — multiple SMBs independently discovering the same tool or workflow
- **Warning signal** — a popular tool raising prices, shutting down, or having issues
- **Comparison insight** — Tool A vs Tool B for a specific SMB use case

Filter out: enterprise AI news, funding rounds unless the product is SMB-relevant, generic "AI is changing everything" takes, tools priced above $500/month.

## Output Format

```
## Signal Scan — [DATE] [TIME]

### High Priority (publish today)
- [Source] **[Tool/Story Name]** — [Why SMBs care, 1-2 sentences] [URL]

### Worth Watching (queue for this week)
- [Source] **[Tool/Story Name]** — [Brief note] [URL]

### Trending Topics (3+ signals on same theme)
- [Theme]: [What multiple sources are saying]

### Noise Filtered
[N] items reviewed, [N] filtered as noise
```

## Instructions

1. Scan all sources listed above
2. Apply SMB relevance filter ruthlessly — if a small business owner couldn't use this tomorrow, it's noise
3. High Priority: 1-3 items max — things worth a full newsletter section today
4. Worth Watching: items to queue for future issues
5. Flag Trending Topics — when 3+ sources converge on the same theme, that's a strong content signal
6. Pass results to Director immediately
