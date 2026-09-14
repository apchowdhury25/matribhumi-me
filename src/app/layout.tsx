import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { CompareProvider } from "@/components/providers/CompareProvider";
import { CompareBar } from "@/components/property/CompareBar";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A1916",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline.replace(/\.$/, "")}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "MatriBhumi",
    "Bangladesh homes",
    "expat housing Bangladesh",
    "retire to Bangladesh",
    "Bashundhara apartments",
    "Dhaka new developments",
    "Bangladeshi diaspora",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/brand/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/og-default.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip bg-ivory font-sans text-charcoal">
        <JsonLd data={organizationJsonLd()} />
        <FavoritesProvider>
          <CompareProvider>
            {children}
            <CompareBar />
            <CookieBanner />
            <Analytics />
          </CompareProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
