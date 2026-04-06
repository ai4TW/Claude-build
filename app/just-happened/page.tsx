"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const stats = [
  { value: "<1s", label: "Answer time" },
  { value: "24/7", label: "Always on" },
  { value: "3x", label: "Auto follow-ups sent" },
  { value: "0", label: "Calls missed" },
];

const whatHappened = [
  {
    step: "01",
    title: "Answered in under a second",
    body: "No hold music. No voicemail. No \"let me transfer you.\" The AI picked up instantly and knew exactly who it was representing.",
  },
  {
    step: "02",
    title: "Listened and understood",
    body: "It heard why you called, pulled context from a real knowledge base, and responded to your actual situation — not a generic script.",
  },
  {
    step: "03",
    title: "Drove toward a next step",
    body: "Every call has a job. The AI's job is to make sure the conversation ends with something — a booking, a link, a callback time. Never a dead end.",
  },
  {
    step: "04",
    title: "Will follow up automatically",
    body: "Within the hour, a personalized text goes out. Then again at 24 hours. Again at 48. No human required.",
  },
];

export default function JustHappenedPage() {
  const [visible, setVisible] = useState(false);
  const [countUp, setCountUp] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setCountUp(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main
      style={{ background: "#08090f", minHeight: "100vh", color: "#e2e8f0", fontFamily: "var(--font-dm-sans, system-ui, sans-serif)" }}
    >
      {/* Nav */}
      <nav style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)", fontWeight: 700, fontSize: 18, background: "linear-gradient(90deg, #4cd7f6, #d2bbff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          allthecalls.ai
        </span>
        <a
          href="https://allthecalls.ai/pricing"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
        >
          See plans →
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "80px 24px 60px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(124,58,237,0.15)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", display: "inline-block", boxShadow: "0 0 8px #22d3ee" }} />
          <span style={{ fontSize: 13, color: "#a78bfa", fontWeight: 600, letterSpacing: "0.05em" }}>
            THAT WAS AI
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)",
          fontSize: "clamp(42px, 8vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: 24,
          color: "#fff",
        }}>
          The call you just had?{" "}
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Fully automated.
          </span>
        </h1>

        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
          No human on the other end. No script reader. No call center.
          Just an AI that knew your name, understood your situation, and drove the conversation forward — on every call, forever.
        </p>

        <a
          href="/checkout?plan=pro"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "#fff",
            textDecoration: "none",
            padding: "18px 40px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 17,
            boxShadow: "0 0 32px rgba(124,58,237,0.4)",
            transition: "box-shadow 0.2s ease",
          }}
        >
          Get one for your business →
        </a>

        <p style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
          14-day free trial · no setup fees · cancel anytime
        </p>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        opacity: countUp ? 1 : 0,
        transform: countUp ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
      }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <div style={{
              fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)",
              fontSize: 44,
              fontWeight: 800,
              background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      {/* What happened */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#7c3aed", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
          What just happened
        </p>
        <h2 style={{
          fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)",
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 800,
          textAlign: "center",
          color: "#fff",
          marginBottom: 56,
          letterSpacing: "-0.02em",
        }}>
          Four things happened on that call.<br />
          <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400, fontSize: "0.75em" }}>All of them automatically.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {whatHappened.map((item, i) => (
            <div
              key={item.step}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 32px",
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                opacity: countUp ? 1 : 0,
                transform: countUp ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${0.4 + i * 0.1}s, transform 0.5s ease ${0.4 + i * 0.1}s`,
              }}
            >
              <div style={{
                minWidth: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))",
                border: "1px solid rgba(124,58,237,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-space-grotesk, monospace)",
                fontSize: 13,
                fontWeight: 700,
                color: "#a78bfa",
              }}>
                {item.step}
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof quote */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 20,
          padding: "48px 40px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "clamp(18px, 3vw, 26px)", fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)", fontWeight: 600, color: "#fff", lineHeight: 1.5, marginBottom: 24 }}>
            "Every missed call is a missed client.<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              The AI doesn't miss calls.
            </span>"
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: 0 }}>
            — Brayden Myers, AllTheCalls.ai
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "0 24px 100px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.02em",
          marginBottom: 16,
        }}>
          Your business.<br />This AI. Every call.
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", marginBottom: 40, lineHeight: 1.6 }}>
          Built for you in days. Answers in your name. Follows up automatically.<br />Starts at $349/month.
        </p>
        <a
          href="/checkout?plan=pro"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "#fff",
            textDecoration: "none",
            padding: "20px 48px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 18,
            boxShadow: "0 0 40px rgba(124,58,237,0.35)",
          }}
        >
          Start your free trial — $497/mo after 14 days
        </a>
        <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
          No commitment · Cancel anytime · Live in days
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", margin: 0 }}>
          © 2026 AllTheCalls.ai · <a href="https://allthecalls.ai" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>allthecalls.ai</a>
        </p>
      </footer>
    </main>
  );
}
