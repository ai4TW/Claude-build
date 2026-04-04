import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the All The Calls team. We respond within 1 business hour.",
  alternates: { canonical: "https://allthecalls.ai/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-brand-900">All The Calls</Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">Log in</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">We respond within 1 business hour.</p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { label: "Email", value: "hello@allthecalls.com", href: "mailto:hello@allthecalls.com" },
              { label: "Book a Demo", value: "Schedule a free 15-min call", href: "/demo" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 hover:border-brand-400 transition-colors group"
              >
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                  <p className="text-gray-900 font-semibold group-hover:text-brand-600 transition-colors">{item.value}</p>
                </div>
                <span className="text-gray-400 group-hover:text-brand-500 text-xl">→</span>
              </a>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            <Link href="/" className="text-brand-600 hover:underline">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
