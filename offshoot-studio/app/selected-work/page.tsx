import { Suspense } from "react"
import { SelectedWorkContent } from "@/components/selected-work-content"
import type { Metadata } from "next"

const siteUrl = "https://tigerteamstudios.com"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ case?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  if (params?.case) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: `${siteUrl}/selected-work` },
    }
  }
  return {}
}

export default function SelectedWorkPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <SelectedWorkContent />
    </Suspense>
  )
}
