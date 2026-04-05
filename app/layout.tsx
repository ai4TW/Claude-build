import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const APP_URL = "https://allthecalls.ai";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    default: "All The Calls — AI Receptionist for Real Estate Agents",
    template: "%s | All The Calls",
  },
  description:
    "All The Calls gives real estate agents a 24/7 AI receptionist that answers every call in your name, qualifies leads, books showings, and follows up automatically. Starting at $149/mo. No contracts.",
  keywords: [
    "AI receptionist real estate",
    "real estate answering service",
    "never miss a call real estate",
    "AI phone answering real estate agents",
    "24/7 receptionist real estate",
    "lead capture real estate",
  ],
  authors: [{ name: "All The Calls" }],
  creator: "All The Calls",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "All The Calls",
    title: "All The Calls — AI Receptionist for Real Estate Agents",
    description:
      "Never miss a lead. Never lose a commission. All The Calls answers every call in your name — 24/7 — qualifying leads and booking showings automatically. Starting at $149/mo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "All The Calls — AI Receptionist for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All The Calls — AI Receptionist for Real Estate Agents",
    description:
      "Never miss a lead. 24/7 AI receptionist that answers in your name, qualifies leads, and books showings. Starting at $149/mo.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: APP_URL,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "All The Calls",
      url: APP_URL,
      description:
        "AI-powered 24/7 receptionist service for real estate agents. Answers every call in your name, qualifies leads, and books showings automatically.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@allthecalls.ai",
      },
    },
    {
      "@type": "WebSite",
      name: "All The Calls",
      url: APP_URL,
    },
    {
      "@type": "Service",
      name: "AI Receptionist for Real Estate Agents",
      provider: { "@type": "Organization", name: "All The Calls" },
      description:
        "24/7 AI phone answering service for real estate agents. Qualifies leads, books showings, and follows up via SMS automatically.",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "149",
          priceCurrency: "USD",
          billingIncrement: "P1M",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "249",
          priceCurrency: "USD",
          billingIncrement: "P1M",
        },
        {
          "@type": "Offer",
          name: "Team",
          price: "399",
          priceCurrency: "USD",
          billingIncrement: "P1M",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
