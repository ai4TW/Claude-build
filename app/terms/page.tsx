import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "All The Calls terms of service — the agreement governing your use of our AI receptionist service.",
  alternates: { canonical: "https://allthecalls.ai/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-brand-900">All The Calls</Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: April 3, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Service</h2>
              <p>All The Calls provides an AI-powered phone answering service for real estate agents. By signing up, you agree to these terms. We reserve the right to update these terms with 30 days notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Subscription & Billing</h2>
              <p>Subscriptions are billed monthly. Your 14-day free trial begins at signup. After the trial, your selected plan is charged automatically. You may cancel anytime from your dashboard — cancellation takes effect at the end of your current billing period.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Your Responsibilities</h2>
              <p>You are responsible for configuring call forwarding correctly, complying with call recording laws in your jurisdiction, ensuring your AI receptionist is not used for illegal purposes, and maintaining the security of your account credentials.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptable Use</h2>
              <p>All The Calls is for legitimate real estate business use only. You may not use the service to harass callers, violate TCPA or other telecom regulations, or impersonate anyone other than yourself.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
              <p>All The Calls is not liable for missed calls, lost leads, or revenue loss due to service interruptions. Our AI receptionist performs best-effort call handling. We do not guarantee 100% uptime or 100% accuracy in call transcription or lead qualification.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Termination</h2>
              <p>We may suspend or terminate accounts that violate these terms. You may cancel at any time. Upon termination, your AI receptionist is deactivated and call forwarding should be removed from your phone.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
              <p>Questions? Email <a href="mailto:hello@allthecalls.ai" className="text-brand-600 hover:underline">hello@allthecalls.ai</a>.</p>
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
