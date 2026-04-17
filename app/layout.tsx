import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
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
    default: "AllTheCalls — The AI Acquisitions Manager for Real Estate Investors",
    template: "%s | AllTheCalls",
  },
  description:
    "Never lose another motivated seller. AllTheCalls answers every inbound call 24/7 and calls every new lead back in under 30 seconds — fully synced with your CRM. $497/mo.",
  keywords: [
    "AI acquisitions manager",
    "AI for real estate investors",
    "motivated seller AI",
    "real estate investor phone answering",
    "speed to lead real estate",
    "AI lead response",
    "wholesaling AI",
    "fix and flip AI receptionist",
    "REI AI voice agent",
    "PPL lead response",
    "motivated seller qualification",
    "real estate CRM AI",
    "AI cold caller real estate",
    "investor call center",
  ],
  authors: [{ name: "AllTheCalls" }],
  creator: "AllTheCalls",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "AllTheCalls",
    title: "AllTheCalls — The AI Acquisitions Manager for Real Estate Investors",
    description:
      "Every inbound motivated seller answered. Every new lead called back in under 30 seconds. Synced to your CRM. $497/mo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AllTheCalls — The AI Acquisitions Manager for Real Estate Investors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTheCalls — The AI Acquisitions Manager for Real Estate Investors",
    description:
      "Every inbound motivated seller answered. Every new lead called back in under 30 seconds. $497/mo.",
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
      name: "AllTheCalls",
      url: APP_URL,
      description:
        "AI acquisitions manager for real estate investors. Answers every inbound motivated seller call 24/7 and calls every new lead back in under 30 seconds, fully synced with your CRM.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@allthecalls.ai",
      },
    },
    {
      "@type": "WebSite",
      name: "AllTheCalls",
      url: APP_URL,
    },
    {
      "@type": "Service",
      name: "AI Acquisitions Manager for Real Estate Investors",
      provider: { "@type": "Organization", name: "AllTheCalls" },
      description:
        "24/7 AI phone agent built for real estate investors. Handles inbound motivated seller calls, outbound lead response in under 30 seconds, CRM auto-sync, calendar booking, and SMS follow-up.",
      offers: [
        {
          "@type": "Offer",
          name: "AllTheCalls for Investors",
          price: "497",
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
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
