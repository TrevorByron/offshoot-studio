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

interface SectionWrapperProps {
  variant?: "default" | "spacious" | "compact"
  animateOnScroll?: boolean
  id?: string
  className?: string
  children?: React.ReactNode
}

export function SectionWrapper({
  className,
  variant = "default",
  animateOnScroll = true,
  id,
  children,
}: SectionWrapperProps) {
  const ref = React.useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: revealViewport.amount })
  const prefersReducedMotion = useReducedMotion()

  const paddingClasses = {
    default: "py-10 md:py-14 lg:py-18",
    spacious: "py-14 md:py-18 lg:py-22",
    compact: "py-6 md:py-8 lg:py-10",
  }

  const baseClassName = cn(
    "mx-auto max-w-7xl px-4 md:px-6",
    paddingClasses[variant],
    className
  )

  if (!animateOnScroll) {
    return (
      <section id={id} className={baseClassName}>
        {children}
      </section>
    )
  }

  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate

  return (
    <motion.section
      ref={ref}
      id={id}
      className={baseClassName}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={revealTransition}
    >
      {children}
    </motion.section>
  )
}
