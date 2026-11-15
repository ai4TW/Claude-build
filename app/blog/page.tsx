import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { DarkNav, DarkMobileBar, DarkFooter } from "@/components/dark-sections";

export const metadata = {
  title: "Blog | AllTheCalls",
  description: "Insights, guides, and tools to automate your business and scale faster.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="bg-[#08090f]">
      <DarkNav />
      <main>
        <section className="py-20 text-center sm:py-24">
          <div className="wrap max-w-2xl">
            <h1 style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[clamp(2.1rem,1.3rem+3vw,3.3rem)] font-bold leading-[1.08] text-white">
              The Automation Playbook
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/60">
              Actionable guides on AI, automating lead flow, and building a business that runs itself.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="wrap grid max-w-5xl gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] transition-colors hover:border-[#4cd7f6]/40"
              >
                <div className="flex h-[180px] items-center justify-center border-b border-white/10 bg-white/[0.02]">
                  <span className="text-[40px]">🤖</span>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex gap-3 text-[13px] font-medium text-white/40">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="mb-3 text-[20px] font-semibold leading-snug text-white">{post.title}</h2>
                  <p className="mb-6 line-clamp-3 text-[14px] leading-relaxed text-white/60">{post.excerpt}</p>
                  <div className="flex items-center text-[14px] font-medium text-[#4cd7f6]">
                    Read Article <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full rounded-[16px] border border-dashed border-white/15 bg-white/[0.02] p-16 text-center">
                <p className="text-white/50">No articles published yet.</p>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-white/10 py-20 text-center">
          <div className="wrap max-w-xl">
            <h2 style={{ fontFamily: "var(--font-space-grotesk)" }} className="text-[clamp(1.7rem,1.3rem+1.6vw,2.2rem)] font-bold text-white">
              Ready to secure every booking?
            </h2>
            <div className="mt-6 flex justify-center">
              <Link
                href="/book"
                className="flex h-14 items-center rounded-[10px] bg-gradient-to-r from-[#4cd7f6] to-[#d2bbff] px-7 text-[16px] font-bold text-[#08090f] transition-opacity hover:opacity-90"
              >
                Set up your AI missed-call text-back
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DarkFooter />
      <DarkMobileBar />
      <div aria-hidden className="h-[76px] md:hidden" />
    </div>
  );
}
