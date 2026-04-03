import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100">
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="font-bold text-white text-lg">All The Calls</Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        {[
          { title: "Acceptance of Terms", body: "By using All The Calls, you agree to these Terms of Service. If you do not agree, do not use the service." },
          { title: "The Service", body: "All The Calls provides an AI-powered call answering and lead qualification service for real estate professionals. You are responsible for how you use the service, including compliance with all applicable laws regarding call recording and AI disclosure requirements in your jurisdiction." },
          { title: "Subscription and Billing", body: "Plans are billed monthly. Your 14-day free trial begins on the date you sign up. No charge occurs during the trial. After the trial, your selected plan rate is charged monthly. You may cancel at any time; cancellation takes effect at the end of your current billing period." },
          { title: "Acceptable Use", body: "You may not use All The Calls for spam, fraud, harassment, or any illegal purpose. You may not attempt to reverse engineer, copy, or resell the service. We reserve the right to terminate accounts that violate these terms." },
          { title: "Limitation of Liability", body: "All The Calls is not liable for missed calls, lost leads, or business losses. The service is provided as-is. Our total liability to you in any month is limited to the amount you paid in that month." },
          { title: "Governing Law", body: "These terms are governed by the laws of the State of Texas, United States. Disputes shall be resolved in Travis County, Texas." },
          { title: "Contact", body: "Questions? Email legal@allthecalls.ai." },
        ].map((s) => (
          <div key={s.title} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-3">{s.title}</h2>
            <p className="text-slate-400 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
