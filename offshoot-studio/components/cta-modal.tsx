"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { FinalCTAContent } from "./sections/final-cta-section"

const CAL_MODAL_NAMESPACE = "30minModal"

interface CTAModalProps {
  open: boolean
  onClose: () => void
}

export function CTAModal({ open, onClose }: CTAModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  if (!open || !mounted) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full w-full overflow-y-auto bg-background min-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-end p-4 bg-background border-b border-border">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close book a call modal"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-18 lg:py-22">
          <FinalCTAContent
            calNamespace={CAL_MODAL_NAMESPACE}
            embedWrapperClassName="cta-embed-container"
          />
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
