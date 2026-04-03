"use client";

import { useEffect, useState } from "react";

interface AgentSettings {
  id: string;
  name: string;
  greeting: string;
  voice?: string;
  language?: string;
  status?: string;
  demo?: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AgentSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: AgentSettings) => {
        setSettings(data);
        setName(data.name ?? "");
        setGreeting(data.greeting ?? "");
      })
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, greeting }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save settings.");
        return;
      }

      setSuccess(true);
      // Clear success message after 3s
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Customize your AI receptionist&apos;s greeting and persona.
        </p>
      </div>

      {settings?.demo && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-lg mb-5">
          Demo mode — changes won&apos;t be saved to a live agent until Trillet API is configured.
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-sm py-12 text-center">Loading…</div>
      ) : (
        <div className="max-w-2xl">
          {/* Agent info card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">AI Receptionist Agent</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Voice: {settings?.voice ?? "professional-female"} &nbsp;·&nbsp; Language:{" "}
                {settings?.language ?? "en-US"}
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-xs bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full border border-green-200">
                {settings?.status ?? "active"}
              </span>
            </div>
          </div>

          {/* Settings form */}
          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Agent display name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                placeholder="e.g. Sarah's AI Receptionist"
              />
              <p className="text-xs text-gray-400 mt-1">Internal name for your AI receptionist.</p>
            </div>

            <div>
              <label htmlFor="greeting" className="block text-sm font-medium text-gray-700 mb-1">
                Opening greeting script
              </label>
              <textarea
                id="greeting"
                rows={5}
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm resize-none"
                placeholder="Thank you for calling [Your Name] at [Brokerage]. I'm their AI assistant. How can I help you today?"
              />
              <p className="text-xs text-gray-400 mt-1">
                This is the first thing callers hear. Keep it natural and include your name and brokerage.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-200 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Settings saved successfully.
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-5 bg-brand-50 border border-brand-100 rounded-xl p-5">
            <p className="text-sm font-semibold text-brand-700 mb-2">Greeting tips</p>
            <ul className="text-xs text-brand-600 space-y-1 list-disc list-inside opacity-80">
              <li>Include your full name and brokerage for brand recognition.</li>
              <li>Keep the tone friendly and professional — like your best team member.</li>
              <li>Mention that you&apos;re available to help with buying, selling, or questions.</li>
              <li>Avoid jargon — callers may be first-time home buyers.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
