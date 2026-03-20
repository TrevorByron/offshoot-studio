"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const linkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"

const buttonClass =
  "flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border text-foreground shadow-sm hover:bg-muted transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"

interface BackLinkProps {
  /** When provided, renders a Link instead of a back button. */
  href?: string
  /** Label for the link/button. Defaults to "Back" for button, or "Back to [context]" when href is set. */
  label?: string
  /** "link" = inline text style; "button" = bordered button style (matches CaseStudyDetailModal). */
  variant?: "link" | "button"
}

export function BackLink({ href, label, variant = "link" }: BackLinkProps) {
  const router = useRouter()
  const displayLabel = label ?? (href ? "Back" : "Back")
  const isButton = variant === "button"

  if (href) {
    return (
      <Link
        href={href}
        className={cn(isButton ? buttonClass : linkClass, isButton && "mb-0")}
        aria-label={displayLabel}
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          className={isButton ? "size-5 shrink-0" : "size-4 shrink-0"}
          strokeWidth={2}
          aria-hidden
        />
        {displayLabel}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(isButton ? buttonClass : linkClass, isButton && "mb-0")}
      aria-label="Go back"
    >
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        className={isButton ? "size-5 shrink-0" : "size-4 shrink-0"}
        strokeWidth={2}
        aria-hidden
      />
      Back
    </button>
  )
}
