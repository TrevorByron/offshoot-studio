"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function AboutPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home with about modal parameter
    router.replace("/?about=true")
  }, [router])

  return (
    <main>
      <Header />
      <Footer />
    </main>
  )
}
