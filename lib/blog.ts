import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  content: string;
  readTime: string;
}

const blogDirectory = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs() {
  try {
    return fs.readdirSync(blogDirectory);
  } catch (e) {
    if ((e as any).code === 'ENOENT') {
      fs.mkdirSync(blogDirectory, { recursive: true });
      return [];
    }
    throw e;
  }
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(blogDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Simple Frontmatter Parser (regex based, no deps needed)
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = fileContents.match(frontmatterRegex);
  
  let metadata: Record<string, string> = {};
  let content = fileContents;

  if (match) {
    const rawMeta = match[1];
    rawMeta.split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length > 0) {
        // remove surrounding quotes if exist
        let val = value.join(':').trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        metadata[key.trim()] = val;
      }
    });
    content = fileContents.replace(frontmatterRegex, '').trim();
  }

  return {
    slug: realSlug,
    title: metadata.title || 'Untitled',
    date: metadata.date || 'Unknown Date',
    excerpt: metadata.excerpt || '',
    author: metadata.author || 'AllTheCalls Team',
    readTime: metadata.readTime || '5 min',
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
