import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function AgentSettings() {
  const { client, refreshClient } = useAuth();

  const [aiName, setAiName] = useState(client?.ai_name || "Sarah");
  const [brokerage, setBrokerage] = useState(client?.brokerage || "");
  const [phone, setPhone] = useState(client?.phone || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const { error: dbError } = await supabase
      .from("clients")
      .update({ ai_name: aiName, brokerage, phone })
      .eq("user_id", client?.user_id);

    if (dbError) { setError(dbError.message); setSaving(false); return; }

    // Also update Trillet agent name if agent exists
    if (client?.trillet_agent_id) {
      await fetch("/api/agent", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: client.trillet_agent_id, name: aiName }),
      });
    }

    await refreshClient();
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
      <p className="text-slate-500 text-sm mb-8">Configure your AI receptionist</p>

      {/* AI Status card */}
      <div className="card-dark rounded-2xl p-5 mb-6 border border-brand-500/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold text-sm mb-0.5">Your AI Receptionist</div>
            <div className="text-slate-500 text-xs">
              Agent ID: <span className="font-mono text-slate-400">{client?.trillet_agent_id || "Not set up yet"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">Active</span>
          </div>
        </div>

        {client?.trillet_phone_number && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="text-xs text-slate-500 mb-1">Your dedicated AI number</div>
            <div className="font-mono text-white font-bold text-xl">{client.trillet_phone_number}</div>
            <div className="text-xs text-slate-600 mt-1">Forward calls from your personal number to this number to activate your AI</div>
          </div>
        )}
      </div>

      {/* Settings form */}
      <form onSubmit={handleSave} className="card-dark rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">AI Receptionist Name</label>
          <input
            type="text" value={aiName} onChange={e => setAiName(e.target.value)}
            placeholder="Sarah"
            className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
          />
          <p className="text-slate-600 text-xs mt-1.5">
            Callers hear: "Hi, I'm <strong className="text-slate-500">{aiName}</strong>, {client?.name}'s AI receptionist..."
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Brokerage</label>
          <input
            type="text" value={brokerage} onChange={e => setBrokerage(e.target.value)}
            placeholder="Keller Williams, Compass, etc."
            className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Personal Phone Number</label>
          <input
            type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-colors"
          />
          <p className="text-slate-600 text-xs mt-1.5">For our records. Forward this number to your AI number to go live.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
        )}

        <button
          type="submit" disabled={saving}
          className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </form>

      {/* Install PWA */}
      <div className="card-dark rounded-2xl p-5 mt-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📱</span>
          <div>
            <div className="text-white font-semibold text-sm mb-1">Add to Home Screen</div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Install this dashboard as an app on your phone for instant notifications on every call.
              In Safari: tap <strong className="text-slate-400">Share</strong> → <strong className="text-slate-400">Add to Home Screen</strong>.
              In Chrome: tap the menu → <strong className="text-slate-400">Install app</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Plan */}
      <div className="card-dark rounded-2xl p-5 mt-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-white font-semibold text-sm">Current Plan</div>
          <span className="text-brand-400 text-xs font-bold capitalize">{client?.plan || "Pro"}</span>
        </div>
        <p className="text-slate-600 text-xs">Manage billing and upgrade at <a href="https://allthecalls.ai" className="text-brand-400 hover:underline">allthecalls.ai</a></p>
      </div>
    </div>
  );
}
