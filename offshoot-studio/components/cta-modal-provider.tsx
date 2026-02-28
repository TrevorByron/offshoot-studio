"use client"

import * as React from "react"
import { CTAModal } from "./cta-modal"

interface CTAModalContextValue {
  openCTAModal: () => void
  closeCTAModal: () => void
}

const CTAModalContext = React.createContext<CTAModalContextValue | null>(null)

export function useCTAModal() {
  const ctx = React.useContext(CTAModalContext)
  if (!ctx) {
    throw new Error("useCTAModal must be used within CTAModalProvider")
  }
  return ctx
}

interface CTAModalProviderProps {
  children: React.ReactNode
}

export function CTAModalProvider({ children }: CTAModalProviderProps) {
  const [open, setOpen] = React.useState(false)

  const value = React.useMemo<CTAModalContextValue>(
    () => ({
      openCTAModal: () => setOpen(true),
      closeCTAModal: () => setOpen(false),
    }),
    []
  )

  return (
    <CTAModalContext.Provider value={value}>
      {children}
      <CTAModal open={open} onClose={() => setOpen(false)} />
    </CTAModalContext.Provider>
  )
}
