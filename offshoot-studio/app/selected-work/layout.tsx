import type { Metadata } from "next"

const siteUrl = "https://tigerteamstudios.com"

export const metadata: Metadata = {
  title: "Selected Work – Tiger Team Studios",
  description:
    "Case studies and selected projects from Tiger Team Studios. Strategic design and prototyping for product teams.",
  alternates: {
    canonical: "/selected-work",
  },
  openGraph: {
    title: "Selected Work – Tiger Team Studios",
    description:
      "Case studies and selected projects from Tiger Team Studios. Strategic design and prototyping for product teams.",
    url: `${siteUrl}/selected-work`,
    siteName: "Tiger Team Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work – Tiger Team Studios",
    description:
      "Case studies and selected projects from Tiger Team Studios. Strategic design and prototyping for product teams.",
  },
}

export default function SelectedWorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
