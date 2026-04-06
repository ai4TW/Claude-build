import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});


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
    "All The Calls gives any business a 24/7 AI receptionist that answers every call in your name, qualifies leads, books appointments, and follows up via SMS automatically. Starting at $199/mo. No contracts.",
  keywords: [
    "AI receptionist",
    "AI phone answering service",
    "24/7 virtual receptionist",
    "never miss a call",
    "AI receptionist real estate",
    "real estate answering service",
    "AI receptionist for small business",
    "AI receptionist legal",
    "AI receptionist medical",
    "AI receptionist home services",
    "automated answering service",
    "lead capture AI",
    "after hours answering service",
    "AI call answering",
    "business phone AI",
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
          name: "Solo",
          price: "199",
          priceCurrency: "USD",
          billingIncrement: "P1M",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "349",
          priceCurrency: "USD",
          billingIncrement: "P1M",
        },
        {
          "@type": "Offer",
          name: "Agency",
          price: "599",
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
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AllTheCalls" />
        <meta name="theme-color" content="#08090f" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
