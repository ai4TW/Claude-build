import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "All The Calls privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "https://allthecalls.ai/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-brand-900">All The Calls</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: April 3, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">What We Collect</h2>
              <p>When you sign up for All The Calls, we collect your name, email address, brokerage name, and phone number. We also collect call data processed through your AI receptionist, including call recordings, transcripts, and lead information captured during calls.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Data</h2>
              <p>We use your information to configure and operate your AI receptionist, deliver call logs and lead summaries to your dashboard, send transactional emails about your account, and improve our service. We do not sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Call Recording & Transcription</h2>
              <p>All calls handled by your AI receptionist may be recorded and transcribed for the purpose of delivering lead summaries to you. You are responsible for complying with applicable call recording disclosure laws in your state.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Data Retention</h2>
              <p>We retain your account data for the duration of your subscription. Call recordings and transcripts are retained for 90 days. Upon cancellation, your data is deleted within 30 days.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Services</h2>
              <p>We use Stripe for payment processing, Trillet AI for voice AI infrastructure, and Resend for email delivery. Each of these providers has their own privacy policy governing their handling of data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
              <p>Questions about this policy? Email us at <a href="mailto:hello@allthecalls.ai" className="text-brand-600 hover:underline">hello@allthecalls.ai</a>.</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-brand-600 hover:underline text-sm">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
