import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Enhance from "@/components/Enhance";
import { site, socials } from "@/lib/data";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Harsh V Singh — Reporter turned brand & delivery leader",
    template: "%s · Harsh V Singh",
  },
  description:
    "Harsh V Singh is Associate Director of Project Delivery at Rang Digitech — a former Times of India / NewsX reporter now running global delivery across the US, UK, Canada, UAE and India.",
  keywords: [
    "Harsh V Singh",
    "Rang Digitech",
    "project delivery",
    "brand strategy",
    "journalist",
    "content leadership",
    "SEO",
    "generative AI",
  ],
  authors: [{ name: "Harsh V Singh" }],
  creator: "Harsh V Singh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Harsh V Singh — Reporter turned brand & delivery leader",
    description:
      "Get the facts right, then make people care. Nine years across the newsroom and the brand desk.",
    url: site.url,
    siteName: "Harsh V Singh",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh V Singh",
    description:
      "Reporter turned brand & delivery leader. Get the facts right, then make people care.",
    creator: "@singhharsh_7",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16130e",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh V Singh",
  jobTitle: "Associate Director, Project Delivery",
  worksFor: { "@type": "Organization", name: "Rang Digitech LLC" },
  email: `mailto:${site.email}`,
  telephone: site.phoneHref,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "COMMITS, Bangalore" },
    { "@type": "CollegeOrUniversity", name: "Presidency College, Bangalore" },
  ],
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* Mark JS as available before paint so reveal animations only hide
            content when JavaScript can bring it back. No-JS = fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="grain" aria-hidden="true" />
        <a href="#desk" className="skip-link">Skip to content</a>
        <div className="scroll-rail" aria-hidden="true">
          <span id="scroll-progress" />
        </div>
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        <Enhance />
      </body>
    </html>
  );
}
