const testimonials = [
  {
    quote: "I was losing deals because I couldn't answer calls during showings. All The Calls fixed that overnight. I closed an extra $380K deal last month from a lead that called at 11 PM.",
    name: "Marcus T.",
    role: "RE/MAX Agent, Dallas TX",
    stars: 5,
  },
  {
    quote: "My AI receptionist sounds so natural that clients think they talked to me directly. The transcripts are incredibly detailed — I know exactly what the client wants before I ever call back.",
    name: "Jennifer L.",
    role: "Coldwell Banker, Miami FL",
    stars: 5,
  },
  {
    quote: "I run a team of 4 agents and we use the Team plan. It's like having a full-time receptionist for less than I spend on coffee. The calendar sync alone saves us 3 hours a week.",
    name: "David R.",
    role: "Century 21, Phoenix AZ",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Real agents. <span className="text-gradient">Real results.</span>
          </h2>
          <p className="text-slate-400 text-lg">Don't take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-dark rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-slate-500 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
