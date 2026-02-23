"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealViewport,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"

interface ScrollRevealProps {
  className?: string
  /** Delay in seconds for staggered reveals (e.g. 0, 0.1, 0.2). */
  staggerDelay?: number
  children?: React.ReactNode
}

export function ScrollReveal({
  className,
  staggerDelay = 0,
  children,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: revealViewport.amount })
  const prefersReducedMotion = useReducedMotion()

  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        ...revealTransition,
        delay: staggerDelay,
      }}
    >
      {children}
    </motion.div>
  )
}
