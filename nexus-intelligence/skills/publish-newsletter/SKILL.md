---
name: publish-newsletter
description: Format a finished intelligence brief as a newsletter issue and publish it to Beehiiv or Substack via API
---

# Publish Newsletter

Take a finished intelligence deliverable and publish it as a newsletter issue.

## Supported Platforms

- **Beehiiv** (preferred) — use the Beehiiv API with `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`
- **Substack** — use the Substack API or email-to-publish if API is unavailable
- **Fallback** — save as a formatted `.md` file in `./published/` if no platform is configured

## Issue Format

```
Subject: [HOOK] — [DATE or ISSUE #]

Preview text: [One sentence that teases the most interesting finding]

---

[COMPANY NAME] Intelligence Brief
[DATE] | Issue #[N]

---

[HEADLINE — the single most important thing in this issue]

[Body — the full briefing content, lightly formatted for email]

---

📌 Key Takeaways
• [Takeaway 1]
• [Takeaway 2]
• [Takeaway 3]

---

[CTA — one clear call to action, e.g. "Reply to this email with a topic you want us to cover next week."]

---
Nexus Intelligence | [unsubscribe link]
```

## Subject Line Rules

The subject line is the most important line. Follow these rules:
- Lead with the most interesting finding, not the topic ("OpenAI just made a move that changes everything for founders" beats "AI Industry Update")
- Use a number when possible ("3 signals that suggest the market is turning")
- Under 50 characters for mobile
- Never use "Newsletter", "Update", or "Issue #X" as the subject line — that belongs in the body

## Instructions

1. Receive the finished content from the Intelligence Writer
2. Write a subject line and preview text if not provided
3. Format the body using the template above
4. Publish via the configured platform API
5. Return: the published URL, subject line used, and word count
6. Save a local copy to `./published/YYYY-MM-DD-[slug].md`

## Environment Variables Required

- `BEEHIIV_API_KEY` — Beehiiv API key (get from app.beehiiv.com → Settings → API)
- `BEEHIIV_PUBLICATION_ID` — found in the Beehiiv URL when viewing your publication
