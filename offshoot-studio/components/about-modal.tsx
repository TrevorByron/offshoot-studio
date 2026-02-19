"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { AboutHeroSection } from "./sections/about-hero-section"
import { AboutProblemSection } from "./sections/about-problem-section"
import { AboutVisionSection } from "./sections/about-vision-section"
import { AboutMotivationSection } from "./sections/about-motivation-section"
import { AboutCTASection } from "./sections/about-cta-section"
import { Footer } from "./sections/footer"
import { cn } from "@/lib/utils"

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
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
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-end p-4 bg-background border-b border-border">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close about modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* About content */}
        <div className="max-w-7xl mx-auto px-4">
          <AboutHeroSection />
          <AboutProblemSection />
          <AboutVisionSection />
          <AboutMotivationSection />
          <AboutCTASection />
          <Footer />
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
