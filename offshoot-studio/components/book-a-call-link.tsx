"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useCTAModal } from "./cta-modal-provider"
import { cn } from "@/lib/utils"

interface BookACallLinkProps {
  className?: string
  children: React.ReactNode
}

/**
 * On home: renders an anchor that scrolls to #cta.
 * On other pages: renders a button that opens the CTA modal.
 */
export function BookACallLink({ className, children }: BookACallLinkProps) {
  const pathname = usePathname()
  const { openCTAModal } = useCTAModal()

  if (pathname === "/") {
    return (
      <a href="#cta" className={cn(className)}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={openCTAModal}
      className={cn(className)}
    >
      {children}
    </button>
  )
}
