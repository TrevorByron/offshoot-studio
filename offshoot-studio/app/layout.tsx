import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CTAModalProvider } from "@/components/cta-modal-provider";
import { FloatingNav } from "@/components/floating-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiger Team Studios - Strategic Design Engineering",
  description: "Your parallel team for the ideas your core team doesn't have time for. Strategic design engineering for product teams.",
  icons: {
    icon: "/favicon.png",
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
          {children}
          <FloatingNav />
        </CTAModalProvider>
      </body>
    </html>
  );
}
