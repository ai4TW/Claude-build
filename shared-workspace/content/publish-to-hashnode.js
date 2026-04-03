#!/usr/bin/env node
/**
 * Publish blog-missed-calls.md to Hashnode under the All The Calls brand.
 *
 * SETUP (one-time, owner action required):
 *   1. Go to https://hashnode.com and create a free account for "All The Calls"
 *      Use a brand email like hello@allthecalls.com (or a dedicated All The Calls email)
 *   2. Set up a Hashnode blog at: https://hashnode.com (create publication)
 *      Publication name: "All The Calls"  |  slug: realthvoiceai (or similar)
 *   3. Get your Personal Access Token:
 *      https://hashnode.com/settings/developer  → Generate Token
 *   4. Get your Publication ID:
 *      Go to your publication dashboard → Settings → scroll to "Publication ID"
 *   5. Set env vars and run:
 *      HASHNODE_TOKEN=xxx HASHNODE_PUBLICATION_ID=xxx node publish-to-hashnode.js
 */

const fs = require('fs');
const path = require('path');

const HASHNODE_TOKEN = process.env.HASHNODE_TOKEN;
const PUBLICATION_ID = process.env.HASHNODE_PUBLICATION_ID;

if (!HASHNODE_TOKEN || !PUBLICATION_ID) {
  console.error('ERROR: Set HASHNODE_TOKEN and HASHNODE_PUBLICATION_ID env vars first.');
  console.error('See setup instructions at the top of this file.');
  process.exit(1);
}

// Read the blog post
const blogPath = path.join(__dirname, 'blog-missed-calls.md');
let content = fs.readFileSync(blogPath, 'utf-8');

// Strip the meta/SEO frontmatter lines (first 4 lines are internal metadata)
const lines = content.split('\n');
// Remove the meta description and target keywords lines (they're internal metadata, not part of published body)
const titleLine = lines[0]; // # Why Real Estate Agents Lose $50,000 a Year to Missed Calls
const title = titleLine.replace(/^#\s+/, '').trim();

// Remove title + meta block from published content (lines 0-5 are title + SEO metadata)
const publishedContent = lines.slice(6).join('\n').trim();

const mutation = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        id
        url
        title
        publishedAt
      }
    }
  }
`;

const variables = {
  input: {
    title: title,
    publicationId: PUBLICATION_ID,
    contentMarkdown: publishedContent,
    tags: [
      { name: "Real Estate", slug: "real-estate" },
      { name: "Productivity", slug: "productivity" },
      { name: "AI", slug: "ai" },
      { name: "Sales", slug: "sales" }
    ],
    metaTags: {
      title: title,
      description: "Real estate agents lose an average of $50,000 annually from missed calls. Discover why missed calls are costing you listings and how AI-powered answering solves it permanently.",
      image: null
    },
    publishedAt: new Date().toISOString(),
    settings: {
      scheduled: false,
      isTableOfContentEnabled: true,
      slugOverride: "why-real-estate-agents-lose-50000-a-year-to-missed-calls"
    }
  }
};

async function publishPost() {
  const response = await fetch('https://gql.hashnode.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': HASHNODE_TOKEN
    },
    body: JSON.stringify({ query: mutation, variables })
  });

  const data = await response.json();

  if (data.errors) {
    console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
    process.exit(1);
  }

  const post = data.data.publishPost.post;
  console.log('SUCCESS! Post published:');
  console.log('  Title:', post.title);
  console.log('  URL:', post.url);
  console.log('  ID:', post.id);
  console.log('');
  console.log('Next step: Update shared-workspace/COMPANY_STATUS.md with this URL.');
  return post.url;
}

publishPost().catch(e => { console.error(e); process.exit(1); });
