import { Suspense } from "react"
import { HomePageWithModal } from "@/components/home-page-with-modal"

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <HomePageWithModal />
    </Suspense>
  )
}
