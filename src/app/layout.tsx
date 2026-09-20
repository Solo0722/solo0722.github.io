import type { Metadata, Viewport } from "next";
import { Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { Grain } from "@/components/layout/grain";
import { Cursor } from "@/components/layout/cursor";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { profile, socials, SITE_URL } from "@/data";

/* The serif carries the whole design. Upright only: the italic face was a
   second preloaded woff2 on the critical path, serving just the wordmark and
   one word on the 404 — and the wordmark is the LCP element, so it was the
   thing waiting on it. */
const instrumentSerif = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.metaDescription,
  keywords: [
    "Solomon Owusu-Ansah",
    "software developer",
    "full-stack developer",
    "React",
    "Next.js",
    "React Native",
    "data scientist",
    "Ghana",
    "Kumasi",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.metaDescription,
    creator: "@DevEx_Alchemy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#080706",
  colorScheme: "dark",
};

/** Structured data so search engines read the page as a person, not a blob. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kumasi",
    addressCountry: "GH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations are server-rendered at opacity:0 and brought in by
            JS. If JS never runs, that would leave the page blank — so without
            it, force everything to its resting state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-bone focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>

        <Grain />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
