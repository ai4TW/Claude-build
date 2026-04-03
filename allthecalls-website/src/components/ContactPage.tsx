import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100">
      <div className="border-b border-white/5 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="font-bold text-white text-lg">All The Calls</Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2 text-center">Contact Us</h1>
        <p className="text-slate-400 text-center mb-10">Questions? We typically respond within 1 business hour.</p>

        {sent ? (
          <div className="card-dark rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">✉️</div>
            <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-slate-400 text-sm mb-6">We'll get back to you at {form.email} within an hour.</p>
            <Link to="/" className="text-brand-400 hover:underline text-sm">← Back to home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-dark rounded-2xl p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
