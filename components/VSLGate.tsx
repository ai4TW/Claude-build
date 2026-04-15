"use client";

import { useEffect, useState } from "react";
import { trackLead, trackVideoView } from "@/lib/meta";

const STORAGE_KEY = "atc_vsl_unlocked_v1";

const BUSINESS_TYPES = [
  "Real Estate Investor",
  "Real Estate Agent",
  "Home Services / Trades",
  "Roofing / HVAC / Plumbing",
  "Legal",
  "Medical / Dental",
  "Salon / Beauty",
  "Auto",
  "Restaurant / Hospitality",
  "Other",
];

type Status = "form" | "submitting" | "video";

export default function VSLGate({
  videoUrl,
  videoPoster,
  demoPhone,
  demoPhoneHref,
}: {
  videoUrl: string;
  videoPoster: string;
  demoPhone: string;
  demoPhoneHref: string;
}) {
  const [status, setStatus] = useState<Status>("form");
  const [error, setError] = useState<string | null>(null);

  // On mount: if they've already unlocked, skip straight to the video.
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
        setStatus("video");
      }
    } catch {
      /* localStorage may be blocked */
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      businessType: String(fd.get("businessType") || ""),
      source: "pricing-vsl",
    };

    if (!payload.email.includes("@")) {
      setError("Please enter a valid email.");
      setStatus("form");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // Don't block — log and roll forward. The video is more important than the lead.
        console.warn("[vsl-gate] lead post failed:", res.status);
      }
    } catch (err) {
      console.warn("[vsl-gate] lead post error:", err);
    }

    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }

    // Meta Pixel: fire Lead + ViewContent
    trackLead({
      email: payload.email,
      businessType: payload.businessType,
    });
    trackVideoView();

    setStatus("video");
  }

  if (status === "video") {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] shadow-2xl shadow-violet-500/10">
        <div className="aspect-video">
          {videoUrl ? (
            <video
              controls
              autoPlay
              playsInline
              poster={videoPoster || undefined}
              className="h-full w-full object-cover"
            >
              <source src={videoUrl} />
              Your browser doesn&apos;t support embedded video.
            </video>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(124,58,237,0.25) 0%, #0f1119 70%)",
              }}
            >
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] shadow-2xl shadow-violet-500/40">
                  <svg className="ml-1 h-8 w-8 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-white/90">
                  Video coming soon — we&apos;re recording it now
                </div>
                <div className="text-xs text-white/50">
                  In the meantime, call{" "}
                  <a
                    href={demoPhoneHref}
                    className="font-semibold text-violet-300 hover:text-violet-200"
                  >
                    {demoPhone}
                  </a>{" "}
                  to hear our AI live, or pick a plan below to get started.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] shadow-2xl shadow-violet-500/10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="relative grid gap-6 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
        {/* Left: pitch */}
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300">
              Free 4-min training
            </span>
          </div>
          <h3
            className="text-2xl font-bold leading-tight text-white md:text-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            How we answer{" "}
            <span className="bg-gradient-to-br from-[#4cd7f6] via-[#a78bfa] to-[#d2bbff] bg-clip-text text-transparent">
              every call
            </span>{" "}
            for over 1,200 businesses
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-[15px]">
            Watch how we built an AI receptionist that picks up every call in
            your name, qualifies the lead, and texts you the details — before
            your competitor can even ring back.
          </p>

          <ul className="mt-5 space-y-2 text-[13px] text-white/70">
            <li className="flex items-start gap-2">
              <Bullet /> The exact reason most businesses lose 30% of their leads
            </li>
            <li className="flex items-start gap-2">
              <Bullet /> How to be answering calls 24/7 within a few days
            </li>
            <li className="flex items-start gap-2">
              <Bullet /> Live demo line you can call right after watching
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-300">
            Unlock the video
          </div>
          <div className="grid gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
              maxLength={80}
              autoComplete="given-name"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.06]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              maxLength={200}
              autoComplete="email"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.06]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              maxLength={40}
              autoComplete="tel"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.06]"
            />
            <select
              name="businessType"
              defaultValue=""
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/60 focus:bg-white/[0.06]"
            >
              <option value="" disabled>
                What kind of business?
              </option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#0f1119] text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#4cd7f6] via-[#7c3aed] to-[#c4b5fd] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          >
            {status === "submitting" ? "Loading video…" : "Watch the video →"}
          </button>
          <p className="text-center text-[11px] text-white/35">
            We&apos;ll never spam you. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}

function Bullet() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className="mt-[3px] flex-shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="#a78bfa" fillOpacity="0.18" />
      <path
        d="M5 8l2 2 4-4"
        stroke="#a78bfa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
