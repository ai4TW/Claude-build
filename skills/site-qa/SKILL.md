---
name: site-qa
description: Full automated QA pass on a live Vercel-hosted website. Crawls every page, tests every button and link, catches runtime errors from Vercel logs, fixes bugs directly in source files, and redeploys. Run alongside seo-optimize for maximum Google ranking impact — clean site + strong SEO signals compound each other. Requires Vercel MCP token and local source file access.
---

# Site QA — Full Automated Quality Assurance

Crawl, test, fix, and redeploy. No page left broken. No button left dead.

## When to run this skill

- After any deployment to catch regressions
- Before running `seo-optimize` (a broken site tanks SEO regardless of meta tags)
- Any time a user reports something not working
- On a weekly schedule to catch drift

## Prerequisites

1. **Vercel MCP connected** — verify with `list_projects`. If not connected, stop.
2. **Source files accessible** — identify the local project root or GitHub repo.
3. **Live URL known** — get it from `get_project` or `list_deployments`.

---

## Phase 1 — Vercel Connection & Deployment Health

### 1A. Connect and identify the project

Use Vercel MCP tools:
- `list_projects` → find project ID and name
- `get_project` → get framework, root directory, production URL, last deployment state
- `list_deployments` → confirm latest deployment is READY (not ERROR or BUILDING)

If latest deployment is ERROR:
- Use `get_deployment_build_logs` to read the build error
- Fix the build error in source files before proceeding
- Redeploy and wait for READY

### 1B. Pull runtime errors from Vercel

Use `get_runtime_logs` with:
- `level: ["error", "fatal"]`
- `environment: "production"`
- `since: "24h"`

For each error found:
- Record the error message, affected route, and timestamp
- Add to the **Bug Registry** (see Phase 4)

---

## Phase 2 — Full Site Crawl

### 2A. Discover all pages

Fetch the live site and build a complete page inventory:

1. Fetch `/sitemap.xml` — extract every `<loc>` URL
2. Fetch the homepage — extract all `<a href>` links that are internal (same domain)
3. Fetch `/robots.txt` — note any blocked paths
4. Combine into a deduplicated list of all pages to test

For each discovered page, record:
```
| URL | Source (sitemap / nav / footer / in-page) |
```

### 2B. Fetch and analyze every page

For each page in the inventory, fetch the full HTML and extract:

**Links (`<a href>`):**
- Internal links — will be tested for 200 response
- External links — flag any obviously broken domains (not tested)
- Anchor links (`#section`) — verify the target `id` exists on the page
- `href="#"` — dead link, flag for fix
- `href=""` or missing `href` — flag for fix
- `mailto:` links — verify the email address is real (not placeholder)

**Buttons:**
- `<button>` with no `onclick` and no parent `<form>` — dead button, flag
- `<button type="submit">` — verify it's inside a `<form>` with a valid `action` or JS handler
- Any element with `onClick` that navigates — verify the destination exists
- Buttons that trigger API calls — note the endpoint for Phase 3 testing

**Forms:**
- Every `<form>` must have an `action` or a JS submit handler
- Every required `<input>` must have a `name` attribute
- Forms with `method="get"` and `action="mailto:"` — valid, note it
- Forms missing `action` and no JS — dead form, flag

**Images:**
- Missing `alt` attribute — flag (also caught by seo-optimize)
- Broken `src` (404) — flag for fix

**Console-worthy issues:**
- Elements with `href="javascript:void(0)"` — check if they have a real click handler
- Empty `<div>` or `<section>` blocks with no content — flag as possible rendering bug

---

## Phase 3 — Functional Tests

### 3A. HTTP status tests

For every internal URL discovered in Phase 2, make a GET request and record the HTTP status:

| Status | Action |
|--------|--------|
| 200 | Pass |
| 301/302 | Pass if redirect target returns 200 |
| 404 | Bug — fix the link or create the missing page |
| 500 | Bug — check Vercel runtime logs for the error |
| Timeout | Flag — possible serverless cold start or infinite loop |

### 3B. API endpoint tests

For each API route in the project (found in `app/api/*/route.ts` or `pages/api/`):

Test each endpoint with a minimal valid request:

**Auth endpoints** (`/api/auth/login`, `/api/auth/logout`):
- POST `/api/auth/login` with `{}` → expect 400 (missing credentials), not 500
- POST `/api/auth/logout` → expect 200 or redirect

**Checkout endpoint** (`/api/checkout`):
- POST with `{}` → expect 400 "Invalid plan", not 500
- POST with `{ "plan": "starter" }` → expect either a Stripe URL or a specific error (not 500)
- If Stripe key is missing → flag as blocker

**Other API routes:**
- GET each route → expect a non-500 response
- Note: 401/403 for auth-protected routes is expected and correct

### 3C. Navigation tests

Verify every navigation link on every page:
- Clicking nav links should reach a real page (HTTP 200)
- "Log in" → `/login` ✓ or ✗
- "Start Free Trial" → `#pricing` scrolls to pricing section ✓ or ✗
- "Book a Demo" → `/demo` ✓ or ✗
- Footer links → correct pages ✓ or ✗

### 3D. Form submission tests

For each form on the site:
- Verify the form has a valid submission target
- If `action="mailto:"` — confirm the email address is real
- If posting to an API route — run the API test from 3B
- Flag any form that would silently fail on submit

### 3E. Mobile responsiveness check

Fetch each page with a mobile user-agent and check:
- Viewport meta tag is present: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- No elements with fixed pixel widths > 375px that would overflow on mobile
- Navigation collapses correctly (hamburger menu or simplified nav visible)

---

## Phase 4 — Bug Registry

After Phases 1–3, compile every issue into a single registry:

```markdown
# Bug Registry — [domain] — [date]

## CRITICAL (blocks conversion or causes errors)
- [ ] [Page] [Element] — [Description] — [Fix needed]

## HIGH (broken functionality)
- [ ] [Page] [Element] — [Description] — [Fix needed]

## MEDIUM (dead links, placeholder content)
- [ ] [Page] [Element] — [Description] — [Fix needed]

## LOW (cosmetic, missing alt text, etc.)
- [ ] [Page] [Element] — [Description] — [Fix needed]

## PASSED (confirmed working)
- ✓ [List of things that tested clean]
```

Save this file to `shared-workspace/qa/[domain]-bugs-[date].md`.

---

## Phase 5 — Fix Everything

Work through the Bug Registry from CRITICAL → LOW. For each bug, edit the source file directly.

### Common fixes

**Dead `href="#"` on buttons that should navigate:**
```tsx
// Before
<a href="#">Book a Demo</a>

// After
<Link href="/demo">Book a Demo</Link>
```

**Missing page (404):**
- Create the page at `app/[route]/page.tsx` with basic content
- Add it to `app/sitemap.ts`

**API route returning 500 on bad input:**
- Add input validation at the top of the route handler
- Return 400 with a descriptive error instead of crashing

**Form with no action:**
```tsx
// Add onSubmit handler or fix the action attribute
<form action="mailto:hello@allthecalls.com" method="get">
```

**Missing viewport meta tag:**
- Add to `app/layout.tsx` in the `<head>` or via Next.js viewport export

**Broken image src:**
- Fix the path or replace with a working placeholder

**Button with no handler:**
```tsx
// Add an href or onClick
<button onClick={() => window.location.href = '/demo'}>
  Book a Demo
</button>
```

### Fix rules
- Fix the root cause, not the symptom
- Don't add error suppression — fix the actual error
- Don't create pages with just a heading — add real content
- Test each fix mentally: "if a user clicks this, what happens?"

---

## Phase 6 — SEO Health Check (Quick Pass)

Run a condensed SEO check as part of every QA pass. Full optimization is in the `seo-optimize` skill — this is a quick sanity check only.

For each page, verify:
- [ ] `<title>` tag exists and is not the default/template value
- [ ] `<meta name="description">` exists and is not empty
- [ ] Exactly one `<h1>` per page
- [ ] `<link rel="canonical">` present
- [ ] Open Graph `og:title` and `og:description` present
- [ ] `/sitemap.xml` returns 200 and includes this page
- [ ] `/robots.txt` returns 200 and does not block this page

Flag any failures. Fix the quick ones (missing tags). For deeper SEO work, invoke `seo-optimize`.

**Why SEO matters here:** Google's ranking algorithm penalizes sites with broken links, 404 pages, and slow/erroring routes. A site that passes QA ranks better than a technically broken site with perfect meta tags. Run `site-qa` before `seo-optimize` for compounding benefit.

---

## Phase 7 — Deploy & Verify

After all fixes are applied:

### 7A. Commit and push
```bash
cd [project-root]
git add -A
git commit -m "QA fix: [summary of fixes — e.g. dead links, missing pages, API validation]"
git push
```

### 7B. Deploy to production
Use Vercel MCP `deploy_to_vercel` or CLI `vercel --prod`.

Monitor with `list_deployments` until state is READY.

### 7C. Re-run critical tests post-deploy

After deployment, re-test every CRITICAL and HIGH bug that was fixed:
- Fetch the page again and verify the fix is live
- Check `get_runtime_logs` for new errors introduced by the fixes
- Confirm `/sitemap.xml` and `/robots.txt` still return 200

### 7D. Smoke test the full user journey

Simulate what a real visitor does:
1. Land on homepage → page loads, no errors
2. Click "Start Free Trial" → scrolls to pricing
3. Click a pricing plan button → hits `/api/checkout` → gets a valid response (Stripe URL or clear error)
4. Click "Book a Demo" → reaches `/demo` page
5. Click "Log in" → reaches `/login` page
6. Click footer "Privacy Policy" → reaches `/privacy`
7. Click footer "Terms" → reaches `/terms`
8. Click footer "Contact" → reaches `/contact`

Mark each step ✓ or ✗ in the QA report.

---

## Phase 8 — QA Report

Write a completion report. Save to `shared-workspace/qa/[domain]-report-[date].md`.

```markdown
# QA Report — [domain] — [date]

## Summary
- Pages tested: [N]
- Bugs found: [N] (Critical: X, High: X, Medium: X, Low: X)
- Bugs fixed: [N]
- Deployment: [URL] — READY

## User Journey Test
- [ ] ✓/✗ Homepage loads
- [ ] ✓/✗ Start Free Trial → pricing
- [ ] ✓/✗ Pricing button → Stripe checkout
- [ ] ✓/✗ Book a Demo → /demo
- [ ] ✓/✗ Log in → /login
- [ ] ✓/✗ Privacy Policy → /privacy
- [ ] ✓/✗ Terms → /terms
- [ ] ✓/✗ Contact → /contact

## API Health
- [ ] ✓/✗ /api/checkout — validates input, no 500s
- [ ] ✓/✗ /api/auth/login — validates input, no 500s
- [ ] ✓/✗ /api/calls — returns data or auth error (not 500)

## SEO Quick Check
- [ ] ✓/✗ All pages have title tags
- [ ] ✓/✗ All pages have meta descriptions
- [ ] ✓/✗ /sitemap.xml returns 200
- [ ] ✓/✗ /robots.txt returns 200

## Runtime Errors
- [List any errors from Vercel logs, or "None detected"]

## Remaining Issues (not fixed this run)
- [Any bugs deferred and why]

## Recommended Next Run
- If any SEO flags raised: run `seo-optimize`
- Schedule next QA in: 7 days
```

---

## How to invoke this skill

When asked to run QA on a site, or when a user says "check if everything works":

1. Identify the live URL and source files (from `.vercel/project.json` or context)
2. Confirm Vercel MCP is connected
3. Run all 8 phases in order — do not skip
4. Fix everything fixable — do not just report bugs
5. Deploy the fixes
6. Return the QA report

**Pair with `seo-optimize`:** Run `site-qa` first to ensure the site is technically clean, then run `seo-optimize` to maximize Google ranking signals. A clean, fast, fully-functional site with strong SEO metadata outranks a broken site with perfect meta tags every time.
