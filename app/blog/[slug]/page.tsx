import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";
import { marked } from "marked";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  // Parse markdown securely
  const htmlContent = marked.parse(post.content);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* minimal nav */}
      <nav style={{ padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", borderBottom: "1px solid #e4e4e7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#09090b", textDecoration: "none", letterSpacing: "-0.5px" }}>
            AllTheCalls
          </Link>
          <Link href="/blog" style={{ fontSize: "14px", fontWeight: 500, color: "#52525b", textDecoration: "none" }}>← Back to Blog</Link>
        </div>
      </nav>

      <main style={{ padding: "80px 1.5rem" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto" }}>
          
          <header style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", fontSize: "14px", color: "#71717a", marginBottom: "16px", fontWeight: 500 }}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#09090b", marginBottom: "24px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#09090b" }}>
                ATC
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#09090b" }}>{post.author}</div>
                <div style={{ fontSize: "13px", color: "#71717a" }}>AllTheCalls Team</div>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none"
            style={{ color: "#3f3f46", lineHeight: 1.8, fontSize: "18px" }}
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />

          {/* Persistent Inline CTA */}
          <div style={{ margin: "64px 0", padding: "40px", background: "#fafafa", borderRadius: "16px", border: "1px solid #e4e4e7", textAlign: "center" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#09090b", marginBottom: "12px" }}>
              Ready to automate your calls?
            </h3>
            <p style={{ color: "#52525b", marginBottom: "24px", fontSize: "16px" }}>
              Don't just rely on software to type. Deploy an AI receptionist that talks, books, and closes for you.
            </p>
            <Link href="/onboarding" className="btn-primary" style={{ display: "inline-block", padding: "14px 32px", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
              Get Started Free
            </Link>
          </div>

        </article>
      </main>
      
      {/* Footer minimal */}
      <footer style={{ borderTop: "1px solid #e4e4e7", padding: "40px 1.5rem", background: "#f4f4f5", textAlign: "center" }}>
        <p style={{ color: "#a1a1aa", fontSize: "13px" }}>© 2026 AllTheCalls. All rights reserved.</p>
      </footer>
    </div>
  );
}
