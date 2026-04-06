import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | AllTheCalls",
  description: "Insights, guides, and tools to automate your business and scale faster.",
};

const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE || "(888) 555-0100";
const DEMO_PHONE_HREF = process.env.NEXT_PUBLIC_DEMO_PHONE_HREF || "tel:+18885550100";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #e4e4e7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.5px" }}>AllTheCalls</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/blog" style={{ color: "#09090b", textDecoration: "none", fontWeight: 600 }}>Blog</Link>
            <Link href="/#how-it-works" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>How it works</Link>
            <Link href="/#pricing" style={{ color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Pricing</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href={DEMO_PHONE_HREF} style={{ fontSize: "14px", color: "#52525b", textDecoration: "none", fontWeight: 500 }}>Call {DEMO_PHONE}</a>
            <Link href="/onboarding" className="btn-primary" style={{ fontSize: "14px", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ marginBottom: "64px", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "#09090b", marginBottom: "16px", letterSpacing: "-0.04em" }}>
              The Automation Playbook
            </h1>
            <p style={{ color: "#52525b", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
              Actionable guides on AI, automating lead flow, and building a business that runs itself.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
            {posts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.slug} style={{ display: "block", textDecoration: "none", borderRadius: "16px", border: "1px solid #e4e4e7", background: "white", overflow: "hidden", transition: "box-shadow 0.2s" }} className="blog-card">
                <style>{`
                  .blog-card:hover {
                    box-shadow: 0 12px 32px -12px rgba(0,0,0,0.08);
                  }
                `}</style>
                <div style={{ height: "180px", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e4e4e7" }}>
                   <span style={{ fontSize: "40px" }}>🤖</span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#71717a", marginBottom: "12px", fontWeight: 500 }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#09090b", marginBottom: "12px", lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: "#52525b", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#09090b", display: "flex", alignItems: "center" }}>
                    Read Article <span style={{ marginLeft: "4px" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {posts.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px", background: "white", borderRadius: "16px", border: "1px dashed #e4e4e7" }}>
                <p style={{ color: "#71717a" }}>No articles published yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER CTA */}
      <section style={{ padding: "80px 1.5rem", borderTop: "1px solid #e4e4e7", background: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#09090b", marginBottom: "16px" }}>
            Ready to secure every booking?
          </h2>
          <div className="flex justify-center mt-6">
            <Link href="/onboarding" className="btn-primary" style={{ padding: "14px 32px", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>Set up your AI receptionist</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
