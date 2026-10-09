"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { CaseStudySideBySideSection } from "@/lib/case-studies"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"

interface CaseStudySideBySideBlockProps {
  section: CaseStudySideBySideSection
  scrollRootRef?: React.RefObject<HTMLElement | null>
}

function Shot({
  kicker,
  title,
  image,
  urlBar = "scoutfuel.app/dashboard",
}: {
  kicker: string
  title: string
  image: string
  urlBar?: string
}) {
  return (
    <article className="flex flex-col gap-3 min-w-0">
      <div className="space-y-1 px-0.5">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
          {kicker}
        </p>
        <p className="text-sm md:text-base text-white/85 leading-snug">{title}</p>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
        <div className="flex items-center gap-3 px-3 py-2.5 border-b border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#FF5F57]" />
            <span className="size-2 rounded-full bg-[#FEBC2E]" />
            <span className="size-2 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 min-w-0 rounded-md bg-black/35 px-2.5 py-1 font-geist-mono text-[10px] text-white/45 truncate">
            {urlBar}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="w-full h-auto block" />
      </div>
    </article>
  )
}

export function CaseStudySideBySideBlock({
  section,
  scrollRootRef,
}: CaseStudySideBySideBlockProps) {
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
    <motion.div
      ref={ref}
      className="w-full"
      initial={initial}
      animate={isInView ? animate : initial}
      transition={revealTransition}
      role="img"
      aria-label="Before and after browser-framed Scout Fuel dashboard redesign comparison."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Shot {...section.before} />
        <Shot {...section.after} />
      </div>
    </motion.div>
  )
}
