import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://tigerteamstudios.com/play",
  },
}

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
