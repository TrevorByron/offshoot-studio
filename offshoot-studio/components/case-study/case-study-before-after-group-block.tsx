/**
 * One section containing multiple before/after sliders (e.g. "Before and After" with Login, Todays Tasks, Menu).
 */
"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { CaseStudyBeforeAfterGroupSection } from "@/lib/case-studies"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"
import { CaseStudyBeforeAfterBlock } from "./case-study-before-after-block"

const STAGGER_DELAY = 0.12

interface CaseStudyBeforeAfterGroupBlockProps {
  section: CaseStudyBeforeAfterGroupSection
  scrollRootRef?: React.RefObject<HTMLElement | null>
}

export function CaseStudyBeforeAfterGroupBlock({
  section,
  scrollRootRef,
}: CaseStudyBeforeAfterGroupBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: "some",
    root: scrollRootRef ?? undefined,
  })
  const prefersReducedMotion = useReducedMotion()
  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate

  return (
    <div ref={ref} className="flex flex-col gap-6 md:gap-8">
      {section.label && (
        <motion.span
          className="font-geist-mono text-[12px] text-foreground uppercase tracking-wide"
          initial={initial}
          animate={isInView ? animate : initial}
          transition={{ ...revealTransition, delay: 0 }}
        >
          {section.label}
        </motion.span>
      )}
      <motion.div
        className="flex flex-col gap-18 lg:gap-22"
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{ ...revealTransition, delay: STAGGER_DELAY }}
      >
        {section.items.map((item, i) => (
          <CaseStudyBeforeAfterBlock
            key={i}
            section={{
              type: "beforeAfter",
              label: item.label,
              beforeImage: item.beforeImage,
              afterImage: item.afterImage,
            }}
            scrollRootRef={scrollRootRef}
          />
        ))}
      </motion.div>
    </div>
  )
}
