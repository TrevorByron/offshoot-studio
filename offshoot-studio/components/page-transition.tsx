"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const FADE_DURATION = 0.2

/**
 * Wraps page content and runs a simple fade-in when the route changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: FADE_DURATION, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
