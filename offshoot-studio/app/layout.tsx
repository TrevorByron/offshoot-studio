import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CTAModalProvider } from "@/components/cta-modal-provider";
import { FloatingNav } from "@/components/floating-nav";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://tigerteamstudios.com";
const siteTitle = "Tiger Team Studios - Strategic Design Engineering";
const siteDescription =
  "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.";
const ogImageUrl = `${siteUrl}/og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Tiger Team Studios",
      url: siteUrl,
      logo: ogImageUrl,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteTitle,
      url: siteUrl,
      description: siteDescription,
      image: ogImageUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      name: siteTitle,
      description: siteDescription,
      url: siteUrl,
      image: ogImageUrl,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Tiger Team Studios", url: siteUrl }],
  keywords: [
    "strategic design",
    "design engineering",
    "product team",
    "prototyping",
    "MVP",
    "Tiger Team Studios",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Tiger Team Studios",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Tiger Team Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <link
          href="https://fonts.cdnfonts.com/css/pp-neue-montreal"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CTAModalProvider>
          {/* Cal.com script is loaded by @calcom/embed-react when Cal component mounts — do not load here to avoid double load / race */}
          <PageTransition>{children}</PageTransition>
          <FloatingNav />
        </CTAModalProvider>
      </body>
    </html>
  );
}
