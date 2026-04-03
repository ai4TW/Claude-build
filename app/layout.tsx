import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RealtyVoice AI — Never Miss a Lead. Never Lose a Commission.",
  description:
    "RealtyVoice AI answers every call in your name — 24/7 — qualifying leads, booking showings, and following up automatically. Starting at $149/mo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
