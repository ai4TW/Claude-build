const stats = [
  { value: "500+", label: "Active Agents" },
  { value: "2.4M", label: "Calls Handled" },
  { value: "99.9%", label: "Answer Rate" },
  { value: "$47K", label: "Avg Annual Value Captured" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-dark-800/50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
