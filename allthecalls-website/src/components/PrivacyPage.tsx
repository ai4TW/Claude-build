import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100">
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="font-bold text-white text-lg">All The Calls</Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16 prose prose-invert prose-sm max-w-none">
        <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        {[
          { title: "Information We Collect", body: "We collect information you provide when you sign up (name, email, phone), call data processed by our AI system (call recordings, transcripts, lead information), and usage data (how you interact with our platform). We do not sell your personal information to third parties." },
          { title: "How We Use Your Information", body: "We use your information to provide the AI receptionist service, send you call summaries and notifications, improve our AI models (using aggregated, anonymized data only), and communicate with you about your account." },
          { title: "Call Recordings and Transcripts", body: "Calls handled by your AI receptionist are recorded and transcribed to generate summaries. You are responsible for complying with applicable call recording laws in your jurisdiction. We store recordings for 90 days by default; you can delete them at any time from your dashboard." },
          { title: "Data Security", body: "We use industry-standard encryption (TLS/SSL) for all data in transit and at rest. Payment information is processed by Stripe and never stored on our servers." },
          { title: "Data Retention", body: "We retain your account data for as long as your account is active. You may request deletion of your data at any time by contacting support@allthecalls.ai." },
          { title: "Contact", body: "Questions about this policy? Email us at privacy@allthecalls.ai." },
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
