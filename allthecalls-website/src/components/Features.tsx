const features = [
  {
    title: "Answers in Your Name",
    desc: "\"Hi, this is Sarah with Keller Williams\" — callers think they reached you directly.",
    icon: "🎙️",
  },
  {
    title: "Lead Qualification",
    desc: "Asks the right questions: timeline, budget, pre-approved, motivation. Delivers a full lead profile to you.",
    icon: "🎯",
  },
  {
    title: "Calendar Booking",
    desc: "Syncs with your Google or Outlook calendar to book showings and consultations in real time.",
    icon: "📅",
  },
  {
    title: "SMS Follow-Up",
    desc: "Automatically texts leads after the call with your contact info and next steps. Keeps them warm.",
    icon: "💬",
  },
  {
    title: "CRM Sync",
    desc: "Pushes call summaries and lead data straight to your CRM. No manual entry.",
    icon: "🔄",
  },
  {
    title: "After-Hours Coverage",
    desc: "3 AM call about a listing? Handled. Saturday open house inquiry? Handled. Every call, every time.",
    icon: "🌙",
  },
  {
    title: "Live Call Transcripts",
    desc: "Get the full conversation transcript and AI summary via text or email within seconds of the call ending.",
    icon: "📋",
  },
  {
    title: "Custom Scripts",
    desc: "Set exactly how you want to be introduced, what to say for different inquiry types, and your specific service areas.",
    icon: "✏️",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-dark-800/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Everything a top-tier receptionist does,
            <br />
            <span className="text-gradient">at a fraction of the cost.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            One commission covers years of service. And your AI never calls in sick.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card-dark rounded-2xl p-6 hover:border-brand-500/20 transition-colors group">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-brand-400 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
