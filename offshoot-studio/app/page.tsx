import { Suspense } from "react"
import { HomePageWithModal } from "@/components/home-page-with-modal"
import type { Metadata } from "next"

const siteUrl = "https://tigerteamstudios.com"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ about?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  if (params?.about === "true") {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: siteUrl },
    }
  }
  return {}
}

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <HomePageWithModal />
    </Suspense>
  )
}
