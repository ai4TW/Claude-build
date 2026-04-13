import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
    default: "All The Calls — AI Voice Receptionist For Your Business",
    template: "%s | All The Calls",
  },
  description:
    "All The Calls gives any business a 24/7 AI receptionist that answers every call in your name, qualifies leads, books appointments, and follows up via SMS automatically. Starting at $349/mo. No contracts.",
  keywords: [
    "AI receptionist",
    "AI phone answering service",
    "24/7 virtual receptionist",
    "never miss a call",
    "AI receptionist for small business",
    "AI receptionist legal",
    "AI receptionist medical",
    "AI receptionist real estate",
    "AI receptionist home services",
    "AI receptionist dental",
    "AI receptionist financial advisor",
    "automated answering service",
    "lead capture AI",
    "after hours answering service",
    "AI call answering",
    "business phone AI",
    "AI voice agent",
  ],
  authors: [{ name: "All The Calls" }],
  creator: "All The Calls",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "All The Calls",
    title: "AllTheCalls.ai — AI Voice Receptionist",
    description:
      "Never miss a call again. AI answers in your name 24/7, qualifies leads, and sends follow-ups. Built for realtors, investors, and tradespeople.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "All The Calls — AI Voice Receptionist For Your Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All The Calls — AI Voice Receptionist For Your Business",
    description:
      "Never miss a call. 24/7 AI voice receptionist that answers in your name, qualifies leads, and follows up via SMS. Works for any business. Starting at $349/mo.",
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
        "AI-powered 24/7 receptionist service for any business. Answers every call in your name, qualifies leads, and follows up automatically.",
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
      name: "AI Voice Receptionist For Any Business",
      provider: { "@type": "Organization", name: "All The Calls" },
      description:
        "24/7 AI phone answering service for any business. Qualifies leads, books appointments, and follows up via SMS automatically.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`} style={{ scrollBehavior: "smooth" }}>
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
