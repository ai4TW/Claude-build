---
name: client-brief
description: Receive and process an incoming client intelligence request — clarify scope, dispatch to the right analysts, and set delivery expectations
---

# Client Brief

Process an incoming client request from intake to research dispatch.

## Intake Sources

Client requests arrive via:
1. **Email reply** — client replies to a delivered report with a new question
2. **Intake form** — client submits via the configured form (Tally, Typeform, or Google Form)
3. **Direct message** — client contacts the company directly

## Processing Steps

### Step 1: Classify the Request

Determine which type of intelligence is needed:

| Type | What it is | Who handles it |
|------|-----------|----------------|
| **Research brief** | Deep dive on a topic, technology, or concept | Research Analyst |
| **Market brief** | Competitive landscape, company analysis, industry move | Market Analyst |
| **Data brief** | Quantitative analysis, dataset summary, metric trends | Data Analyst |
| **Combined** | Needs multiple analysts | Dispatch to all relevant |

### Step 2: Scope It

If the request is vague, clarify before dispatching. Ask one focused question:
- "Are you looking for a snapshot of the market today, or a trend over the last 12 months?"
- "Is this for a specific company or the broader sector?"
- "What decision does this research need to support?"

Do not dispatch vague briefs. A wrong brief wastes everyone's time.

### Step 3: Set Expectations

Reply to the client immediately with:
- Confirmation you received their request
- Your interpretation of what they're asking for
- Expected delivery time (standard: 24 hours; rush: 4 hours)
- Any clarifying questions if needed

### Step 4: Dispatch

Create a task for the relevant analyst(s) with:
- The refined research question
- Client context (who they are, what they're trying to decide)
- Deadline
- Delivery format preference

### Step 5: Track

Log the request in `./clients/[slug]/requests/YYYY-MM-DD-[slug].md`

## Output

Return a dispatch summary to Client Success Manager:
- Client name and request received
- Research type and assigned analyst(s)
- Clarifying questions sent (if any)
- Expected delivery time
