import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Fraunces, Montserrat } from "next/font/google";
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

const APP_URL = "https://allthecalls.ai";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    default: "AllTheCalls — AI Call-Answering, CRM & Local SEO for Local Businesses",
    template: "%s | AllTheCalls",
  },
  description:
    "Every missed call is money walking out the door. AllTheCalls is a done-for-you system — 24/7 AI call-answering with missed-call text-back, a branded CRM app, and local SEO — built for any local business that can't afford to miss a call.",
  keywords: [
    "AI receptionist",
    "AI phone answering service",
    "24/7 AI receptionist",
    "never miss a call",
    "missed call text back",
    "AI receptionist for small business",
    "AI receptionist for plumbers",
    "AI receptionist for HVAC companies",
    "AI receptionist for barbershops and salons",
    "AI receptionist for auto repair shops",
    "AI receptionist for real estate agents",
    "AI receptionist for real estate investors",
    "branded CRM app for local business",
    "local SEO for service businesses",
    "AI lead response",
    "speed to lead",
    "automated answering service",
    "AI call answering",
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
      "24/7 AI call-answering with missed-call text-back, a done-for-you website, your own branded CRM app, and local SEO — one system, built for any local business that can't miss a call.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AllTheCalls — 24/7 AI call-answering. Never miss another call.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTheCalls — Never Miss Another Call",
    description:
      "24/7 AI call-answering + missed-call text-back, a branded CRM app, and local SEO. $1,997 setup + $497/mo.",
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
        "Done-for-you AI call-answering, missed-call text-back, branded CRM app, and local SEO for any local business that can't afford to miss a call.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@allthecalls.ai",
      },
    },
    { "@type": "WebSite", name: "AllTheCalls", url: APP_URL },
    {
      "@type": "Service",
      name: "AllTheCalls — AI Call-Answering, CRM & Local SEO",
      provider: { "@type": "Organization", name: "AllTheCalls" },
      description:
        "24/7 AI phone answering with instant missed-call text-back, a done-for-you website, a branded CRM app, and ongoing local SEO. Built for any local business.",
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
    <html lang="en" className={`${archivo.variable} ${montserrat.variable} ${fraunces.variable}`}>
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
