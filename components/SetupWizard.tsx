"use client";

import { useEffect, useState } from "react";

const DEFAULT_SERVICES = [
  { slug: "sewer-smell", label: "Sewer smell detection & repair" },
  { slug: "drain-cleaning", label: "Drain cleaning & clog removal" },
  { slug: "gas-leak", label: "Gas leak detection & repair" },
  { slug: "water-heater", label: "Water heater repair & replacement" },
  { slug: "general-plumbing", label: "General residential plumbing" },
];

type LoadState =
  | { status: "loading" }
  | { status: "invalid" }
  | { status: "error" }
  | { status: "ready"; tier: string; ownerEmail: string; alreadySubmitted: boolean }
  | { status: "done" };

export default function SetupWizard({ sessionId }: { sessionId: string }) {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [serviceArea, setServiceArea] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>(DEFAULT_SERVICES.map((s) => s.slug));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/setup/${sessionId}`)
      .then(async (res) => {
        if (res.status === 402) {
          setLoad({ status: "invalid" });
          return;
        }
        if (!res.ok) {
          setLoad({ status: "error" });
          return;
        }
        const data = await res.json();
        setLoad({
          status: data.alreadySubmitted ? "done" : "ready",
          tier: data.tier,
          ownerEmail: data.ownerEmail,
          alreadySubmitted: data.alreadySubmitted,
        });
      })
      .catch(() => setLoad({ status: "error" }));
  }, [sessionId]);

  if (load.status === "loading") {
    return <p className="text-ink-soft">Checking your payment…</p>;
  }

  if (load.status === "invalid") {
    return (
      <div>
        <h1 className="display heading-2">We can&apos;t find that payment.</h1>
        <p className="mt-3 text-ink-soft">
          This link only works after a completed payment. If you think this is a mistake, email{" "}
          <a href="mailto:hello@allthecalls.ai" className="text-brand underline">
            hello@allthecalls.ai
          </a>
          .
        </p>
      </div>
    );
  }

  if (load.status === "error") {
    return (
      <div>
        <h1 className="display heading-2">Something went wrong on our end.</h1>
        <p className="mt-3 text-ink-soft">
          Your payment is fine — this is us, not you. Refresh in a minute, or email{" "}
          <a href="mailto:hello@allthecalls.ai" className="text-brand underline">
            hello@allthecalls.ai
          </a>{" "}
          and we&apos;ll sort it out directly.
        </p>
      </div>
    );
  }

  if (load.status === "done") {
    return (
      <div>
        <h1 className="display heading-2">You&apos;re all set.</h1>
        <p className="mt-3 text-ink-soft">
          We&apos;ve already got your business details. We&apos;ll email you the moment your site
          and CRM are ready.
        </p>
      </div>
    );
  }

  const addCity = () => {
    const city = cityInput.trim();
    if (city && !serviceArea.includes(city)) setServiceArea([...serviceArea, city]);
    setCityInput("");
  };

  const toggleService = (slug: string) => {
    setServices((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const steps = [
    {
      title: "Tell us about your business",
      valid: businessName.trim().length > 0 && phone.trim().length > 0,
      body: (
        <div className="space-y-5">
          <label className="block">
            <span className="text-[14px] font-semibold text-ink">Business name</span>
            <input
              className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-[16px] outline-none focus-visible:border-brand"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Drainiacs Plumbing of Wichita"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="text-[14px] font-semibold text-ink">Business phone</span>
            <input
              className="mt-1.5 w-full rounded-lg border border-line px-4 py-3 text-[16px] outline-none focus-visible:border-brand"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(316) 555-0100"
              type="tel"
            />
            {phone.trim().length > 0 && phone.replace(/\D/g, "").length < 10 && (
              <span className="mt-1 block text-[13px] text-brand">That doesn&apos;t look like a full phone number yet.</span>
            )}
          </label>
        </div>
      ),
    },
    {
      title: "Where do you serve?",
      valid: serviceArea.length > 0,
      body: (
        <div className="space-y-4">
          <label className="block">
            <span className="text-[14px] font-semibold text-ink">Add each city you serve</span>
            <div className="mt-1.5 flex gap-2">
              <input
                className="w-full rounded-lg border border-line px-4 py-3 text-[16px] outline-none focus-visible:border-brand"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCity();
                  }
                }}
                placeholder="Wichita"
                autoFocus
              />
              <button type="button" onClick={addCity} className="btn-primary rounded-lg px-5 text-[15px] font-semibold">
                Add
              </button>
            </div>
          </label>
          {serviceArea.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {serviceArea.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-2 rounded-full border border-line bg-mist px-3 py-1.5 text-[14px] text-ink"
                >
                  {city}
                  <button
                    type="button"
                    onClick={() => setServiceArea(serviceArea.filter((c) => c !== city))}
                    aria-label={`Remove ${city}`}
                    className="text-ink-soft hover:text-brand"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
    {
      title: "Which services do you offer?",
      valid: services.length > 0,
      body: (
        <div className="space-y-2">
          {DEFAULT_SERVICES.map((s) => (
            <label
              key={s.slug}
              className="flex items-center gap-3 rounded-lg border border-line px-4 py-3 text-[15px] text-ink"
            >
              <input
                type="checkbox"
                checked={services.includes(s.slug)}
                onChange={() => toggleService(s.slug)}
                className="h-4 w-4 accent-[var(--color-brand)]"
              />
              {s.label}
            </label>
          ))}
          <p className="pt-1 text-[13px] text-ink-soft">All checked by default — uncheck anything you don&apos;t do.</p>
        </div>
      ),
    },
    {
      title: "Review & submit",
      valid: true,
      body: (
        <div className="space-y-3 text-[15px] text-ink-soft">
          <p>
            <span className="font-semibold text-ink">{businessName}</span> — {phone}
          </p>
          <p>Serving: {serviceArea.join(", ")}</p>
          <p>
            Services: {DEFAULT_SERVICES.filter((s) => services.includes(s.slug)).map((s) => s.label).join(", ")}
          </p>
          {submitError && <p className="text-brand">{submitError}</p>}
        </div>
      ),
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/setup/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, phone, serviceArea, services }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setLoad({ status: "done" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-8 rounded-full ${i <= step ? "bg-brand" : "bg-line"}`}
          />
        ))}
      </div>
      <h1 className="display heading-2">{current.title}</h1>
      <div className="mt-6">{current.body}</div>
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="rounded-lg border border-line px-5 py-3 text-[15px] font-semibold text-ink"
          >
            Back
          </button>
        )}
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="btn-primary rounded-lg px-6 py-3 text-[15px] font-semibold disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!current.valid}
            className="btn-primary rounded-lg px-6 py-3 text-[15px] font-semibold disabled:opacity-40"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
