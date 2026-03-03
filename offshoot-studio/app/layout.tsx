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
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tigerteamstudios.com/#organization",
      name: "Tiger Team Studios",
      url: siteUrl,
      logo: `${siteUrl}/og-image.png`,
      description: "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.",
    },
    {
      "@type": "WebSite",
      name: "Tiger Team Studios - Strategic Design Engineering",
      url: siteUrl,
      description: "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.",
      image: `${siteUrl}/og-image.png`,
      publisher: { "@id": "https://tigerteamstudios.com/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  title: "Tiger Team Studios - Strategic Design Engineering",
  description: "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Tiger Team Studios — Strategic Design Engineering",
    description: "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.",
    url: "https://tigerteamstudios.com",
    siteName: "Tiger Team Studios",
    images: [
      {
        url: "https://tigerteamstudios.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tiger Team Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiger Team Studios — Strategic Design Engineering",
    description: "Your parallel team for the ideas your core team doesn't have time for.",
    images: ["https://tigerteamstudios.com/og-image.png"],
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
