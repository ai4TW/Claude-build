import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Fraunces, Montserrat, Space_Grotesk } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

// Fonts and layout ported from the We Buy Houses Columbia / Brayden Buys
// Homes sites: Archivo for body copy, Montserrat ExtraBold for headings.
// The palette is AllTheCalls' own — see app/globals.css.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// One deliberate accent face, used only for the single emphasized phrase in
// the closing section — not a site-wide type change. Grounded in a real
// reference (an editorial display serif reserved for one emphasis moment
// per page), adapted with AllTheCalls' own palette, not that site's.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-accent-serif",
  display: "swap",
});

// Only used by the dark "Midnight Intelligence" brand A/B variant
// (components/dark-sections.tsx) — Variant A never references this font.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
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
    default: "AllTheCalls — AI Missed-Call Text-Back, CRM & Local SEO for Local Businesses",
    template: "%s | AllTheCalls",
  },
  description:
    "Every missed call is money walking out the door. AllTheCalls is a done-for-you system — 24/7 AI missed-call text-back, a branded CRM app, and local SEO — built for any local business that can't afford to miss a call.",
  keywords: [
    "AI missed call text back",
    "missed call text back service",
    "24/7 missed call text back",
    "never miss a call",
    "missed call text back",
    "AI missed-call text-back for small business",
    "AI missed-call text-back for plumbers",
    "AI missed-call text-back for HVAC companies",
    "AI missed-call text-back for barbershops and salons",
    "AI missed-call text-back for auto repair shops",
    "AI missed-call text-back for real estate agents",
    "AI missed-call text-back for real estate investors",
    "branded CRM app for local business",
    "local SEO for service businesses",
    "AI lead response",
    "speed to lead",
    "automated missed call text back",
    "AI text back service",
    "missed call solution",
    "business phone AI",
  ],
  authors: [{ name: "AllTheCalls" }],
  creator: "AllTheCalls",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "AllTheCalls",
    title: "AllTheCalls — Never Miss Another Call",
    description:
      "24/7 AI missed-call text-back, a done-for-you website, your own branded CRM app, and local SEO — one system, built for any local business that can't miss a call.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AllTheCalls — 24/7 AI missed-call text-back. Never miss another call.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTheCalls — Never Miss Another Call",
    description:
      "24/7 AI missed-call text-back, a branded CRM app, and local SEO. $1,997 setup + $497/mo.",
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
        "Done-for-you AI missed-call text-back, branded CRM app, and local SEO for any local business that can't afford to miss a call.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@allthecalls.ai",
      },
    },
    { "@type": "WebSite", name: "AllTheCalls", url: APP_URL },
    {
      "@type": "Service",
      name: "AllTheCalls — AI Missed-Call Text-Back, CRM & Local SEO",
      provider: { "@type": "Organization", name: "AllTheCalls" },
      description:
        "24/7 instant AI missed-call text-back, a done-for-you website, a branded CRM app, and ongoing local SEO. Built for any local business.",
      offers: [
        {
          "@type": "Offer",
          name: "AllTheCalls — All-In-One",
          price: "497",
          priceCurrency: "USD",
          billingIncrement: "P1M",
          description: "Monthly fee. A separate one-time $1,997 setup fee applies.",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${montserrat.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
