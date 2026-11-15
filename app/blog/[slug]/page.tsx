import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";
import { marked } from "marked";
import { DarkNav, DarkMobileBar, DarkFooter } from "@/components/dark-sections";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  // Parse markdown securely
  const htmlContent = marked.parse(post.content);

  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main className="py-20">
        <article className="wrap max-w-[720px]">
          <header className="mb-12 text-center">
            <div className="mb-4 flex justify-center gap-3 text-[14px] font-medium text-white/40">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mb-6 text-[clamp(2rem,1.3rem+2.4vw,3rem)] font-bold leading-[1.15] text-white">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold text-white">
                ATC
              </div>
              <div className="text-left">
                <div className="text-[14px] font-semibold text-white">{post.author}</div>
                <div className="text-[13px] text-white/50">AllTheCalls Team</div>
              </div>
            </div>
          </header>

          {/*
            No Tailwind typography plugin in this project (confirmed: tailwind.config.ts
            has plugins: []), so headings/lists/links inside this markdown body need
            explicit dark styling here rather than a `prose` class, which does nothing.
          */}
          <div
            className="atc-blog-body max-w-none text-[18px] leading-[1.8] text-white/75"
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />
          <style>{`
            .atc-blog-body :where(h2, h3) { color: #fff; font-weight: 700; margin-top: 2em; margin-bottom: 0.6em; }
            .atc-blog-body h2 { font-size: 1.5em; }
            .atc-blog-body h3 { font-size: 1.2em; }
            .atc-blog-body p { margin-bottom: 1.2em; }
            .atc-blog-body a { color: #4cd7f6; text-decoration: underline; text-underline-offset: 2px; }
            .atc-blog-body ul, .atc-blog-body ol { margin: 1em 0 1.2em 1.4em; }
            .atc-blog-body li { margin-bottom: 0.4em; }
            .atc-blog-body strong { color: #fff; }
            .atc-blog-body code { background: rgba(255,255,255,0.08); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.9em; }
            .atc-blog-body blockquote { border-left: 2px solid rgba(76,215,246,0.5); padding-left: 1em; color: rgba(255,255,255,0.6); }
          `}</style>

          <div className="my-16 rounded-[16px] border border-white/10 bg-white/[0.03] p-10 text-center">
            <h3 style={{ fontFamily: "var(--font-space-grotesk)" }} className="mb-3 text-[24px] font-bold text-white">
              Ready to automate your calls?
            </h3>
            <p className="mb-6 text-[16px] text-white/60">
              Don&rsquo;t just rely on software to type. Deploy an AI that texts back every missed call, books, and closes for you.
            </p>
            <Link
              href="/book"
              className="inline-flex h-14 items-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-7 text-[16px] font-bold text-[#08090f] transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </article>
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
