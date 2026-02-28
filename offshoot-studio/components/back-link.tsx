"use client"

import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

const linkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"

export function BackLink() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={linkClass}
      aria-label="Go back"
    >
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        className="size-4 shrink-0"
        strokeWidth={2}
        aria-hidden
      />
      Back
    </button>
  )
}
