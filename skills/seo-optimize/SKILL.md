---
name: seo-optimize
description: Run a complete, automated SEO optimization on any live website hosted on Vercel. Crawls the site, audits every SEO signal, edits source files directly, and redeploys — end to end with no human input. Requires: Vercel MCP token, access to the project's local or GitHub source files, and Claude Code running locally.
---

# SEO Optimize

Perform a full SEO audit and automated optimization on a live Vercel-hosted website. Produce a written SEO plan, apply every fix directly to the source files, and trigger a production redeploy.

## Prerequisites (verify before starting)

1. **Vercel token** — Claude must have a valid Vercel MCP token connected (`vcp_...`). Verify by running `list_projects` and confirming the target project appears.
2. **Source access** — The website's source files must be accessible locally or via the GitHub repo linked to the Vercel project. Identify the local path or clone the repo.
3. **Live URL** — The production URL must be reachable for crawling.

If any prerequisite is missing, stop and surface what is needed before proceeding.

---

## Phase 1 — Discovery (do not skip)

### 1A. Identify the project

Use Vercel MCP tools:
- `list_projects` — find the project ID and name
- `get_project` — get the framework, root directory, linked Git repo, and latest deployment URL

Record:
- Live URL
- Framework (Next.js, Astro, SvelteKit, etc.)
- Git repo URL
- Local source path (or clone it)

### 1B. Crawl the live site

Fetch the following pages and extract their full HTML:
- Homepage (`/`)
- Up to 5 additional pages (find them via sitemap.xml, robots.txt, or nav links)

For each page, extract and record:
- `<title>` tag content and character count
- `<meta name="description">` content and character count
- `<h1>` count and text
- `<h2>`, `<h3>` structure
- Image `alt` attributes (flag any missing)
- Canonical tag (`<link rel="canonical">`)
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter card tags
- Structured data / JSON-LD blocks
- Internal link count
- Page load time (note if response is slow)

### 1C. Check technical SEO signals

Fetch and analyze:
- `/robots.txt` — is it present? Is anything incorrectly blocked?
- `/sitemap.xml` — is it present? Does it include all key pages?

---

## Phase 2 — Audit & SEO Plan

Write a complete SEO audit report. Save it to `shared-workspace/seo/[domain]-audit-[date].md`.

### Audit report structure

```
# SEO Audit — [domain] — [date]

## Executive Summary
3-5 sentence summary of the site's current SEO health and biggest opportunities.

## Critical Issues (fix immediately)
List every issue that is actively hurting rankings:
- Missing title tags
- Duplicate titles
- Missing meta descriptions
- Missing H1 or multiple H1s
- Missing alt text on images
- Missing canonical tags
- Sitemap missing or broken
- robots.txt blocking important pages

## High-Impact Improvements
Issues that are not broken but are underperforming:
- Title tags that are too short, too long, or keyword-weak
- Meta descriptions that don't include target keywords or a CTA
- Open Graph/Twitter cards missing or incomplete
- No structured data (LocalBusiness, FAQPage, Product, etc.)
- Internal linking opportunities

## Keyword Opportunities
Based on the site's topic and content:
- 3–5 primary target keywords (head terms)
- 5–10 secondary/long-tail keywords
- Recommended keyword placement per page

## Page-by-Page Recommendations
For each crawled page:
| Page | Current Title | Recommended Title | Current Description | Recommended Description | Other Fixes |
|------|--------------|-------------------|--------------------|-----------------------|-------------|

## Structured Data Recommendations
Which schema types to add and on which pages (e.g., Organization, WebSite, FAQPage, BreadcrumbList).

## Sitemap & robots.txt Recommendations
What to add, fix, or remove.
```

---

## Phase 3 — Apply All Fixes

Work through every fix identified in the audit. Edit source files directly.

### Framework-specific file locations

**Next.js (App Router)**
- Page metadata: `app/[page]/page.tsx` — update `export const metadata = { title, description, openGraph, twitter }`
- Root metadata/defaults: `app/layout.tsx`
- Sitemap: `app/sitemap.ts` (generate dynamically) or `public/sitemap.xml`
- robots.txt: `app/robots.ts` or `public/robots.txt`
- Structured data: Add `<script type="application/ld+json">` in page components

**Next.js (Pages Router)**
- Metadata: `pages/[page].tsx` — update `<Head>` tags via `next/head`
- Sitemap: `public/sitemap.xml`

**Other frameworks**
- Locate the equivalent metadata and static file locations for the detected framework

### Fix checklist — apply every item

#### Title tags
- [ ] Every page has a unique title
- [ ] Titles are 50–60 characters
- [ ] Primary keyword is in the first 50 characters
- [ ] Brand name appended at end where appropriate: `[Page Topic] | [Brand]`

#### Meta descriptions
- [ ] Every page has a unique meta description
- [ ] Descriptions are 140–160 characters
- [ ] Each includes the primary keyword naturally
- [ ] Each ends with a soft CTA ("Learn more", "Get started", "See how it works")

#### Heading structure
- [ ] Exactly one `<h1>` per page containing the primary keyword
- [ ] `<h2>` tags used for major sections
- [ ] No heading levels skipped

#### Image alt text
- [ ] Every `<img>` has a descriptive `alt` attribute
- [ ] Alt text describes what's in the image and includes keywords where natural
- [ ] Decorative images use `alt=""`

#### Open Graph tags (add to every page)
```
og:title       — same as page title
og:description — same as meta description
og:image       — absolute URL to a 1200×630px image
og:url         — canonical URL of the page
og:type        — "website" for homepage, "article" for blog posts
og:site_name   — brand name
```

#### Twitter card tags (add to every page)
```
twitter:card        — "summary_large_image"
twitter:title       — same as og:title
twitter:description — same as og:description
twitter:image       — same as og:image
```

#### Canonical tags
- [ ] Every page has `<link rel="canonical" href="[absolute-url]" />`

#### Structured data — add JSON-LD blocks

**Homepage minimum (Organization + WebSite)**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Brand Name]",
  "url": "[https://domain.com]",
  "logo": "[https://domain.com/logo.png]",
  "description": "[One sentence about the business]",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "[hello@domain.com]"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Brand Name]",
  "url": "[https://domain.com]",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "[https://domain.com/search?q={search_term_string}]",
    "query-input": "required name=search_term_string"
  }
}
```

Add additional schema types based on the business:
- `LocalBusiness` — if the business serves a geographic area
- `FAQPage` — if there is a FAQ section
- `Product` / `Service` — for product or service pages
- `Article` / `BlogPosting` — for blog/content pages

#### Sitemap
- [ ] `/sitemap.xml` exists and is reachable
- [ ] Contains all indexable pages with `<lastmod>` dates
- [ ] Excludes noindex pages, admin routes, and API routes
- [ ] Referenced in `robots.txt` as `Sitemap: https://domain.com/sitemap.xml`

#### robots.txt
- [ ] Exists at `/robots.txt`
- [ ] `User-agent: *` with `Allow: /`
- [ ] Only disallows routes that should not be indexed (admin, api, private)
- [ ] Sitemap URL declared at the bottom

---

## Phase 4 — Deploy

After all edits are applied:

1. **Commit changes**
```bash
cd [project-root]
git add -A
git commit -m "SEO optimization — titles, meta, OG tags, structured data, sitemap"
git push
```

2. **Verify Vercel auto-deploys** — if the project is linked to Git, the push triggers a deployment automatically. Use `list_deployments` to monitor.

3. **If manual deploy needed** — use the Vercel MCP `deploy_to_vercel` tool to trigger a production deployment.

4. **Confirm live** — fetch the homepage again after deployment and verify:
   - Title tag matches the optimized version
   - Meta description is present
   - OG tags are present
   - Structured data is in the page source

---

## Phase 5 — Report

Write a completion report. Save to `shared-workspace/seo/[domain]-completed-[date].md`.

```
# SEO Optimization Complete — [domain] — [date]

## What Was Done
- Pages optimized: [list]
- Title tags updated: [count]
- Meta descriptions added/updated: [count]
- Images with alt text fixed: [count]
- OG/Twitter tags added: [count]
- Structured data added: [schema types]
- Sitemap: [created/updated/confirmed]
- robots.txt: [created/updated/confirmed]

## Deployment
- Commit: [git commit hash]
- Vercel deployment: [deployment URL]
- Live at: [production URL]

## Estimated SEO Impact
- Short-term (1–4 weeks): Better click-through rates from improved titles and descriptions
- Medium-term (1–3 months): Improved indexing from sitemap and structured data
- Long-term (3–6 months): Ranking improvement for target keywords as signals compound

## Recommended Next Steps
1. Submit sitemap to Google Search Console (manual step — requires owner access)
2. Set up Google Search Console to monitor impressions and clicks
3. Add internal links between related pages (can be automated on next run)
4. Run this skill again in 30 days to audit progress
```

---

## How to invoke this skill

When asked to run SEO on a site:

1. Ask for (or identify from context): the live URL and either the local source path or GitHub repo
2. Confirm Vercel token is connected
3. Run all 5 phases in order — do not skip any phase
4. Do not ask for permission at each step — execute and report results at the end
