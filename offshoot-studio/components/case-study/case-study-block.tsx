/**
 * One content block: 65% left (images / optional hero card), 35% right (text).
 * Used for all case study sections; keeps column layout consistent across case studies.
 */
"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { CaseStudyIntroBlock, CaseStudySection } from "@/lib/case-studies"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealViewport,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"
import { CaseStudyHeroCard } from "./case-study-hero-card"

const COLUMN_STAGGER_DELAY = 0.22

interface CaseStudyBlockProps {
  section: CaseStudySection
  /** Rendered as the first paragraph in the text column (e.g. intro blurb on first block) */
  leadingParagraph?: string
  /** Rich intro for first block (paragraphs + list). When set, text column uses this instead of leadingParagraph + section text. */
  introBlocks?: CaseStudyIntroBlock[]
  /** When true, the image container uses the purple background (first section only). */
  isFirstSection?: boolean
}

function IntroContent({ blocks }: { blocks: CaseStudyIntroBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) =>
        block.type === "paragraph" ? (
          <div key={i} className="space-y-1">
            {block.label && (
              <p className="text-white text-sm leading-relaxed font-geist-mono">
                {block.label}
              </p>
            )}
            <p
              className={`text-white text-sm leading-relaxed ${block.font === "mono" ? "font-geist-mono" : ""}`}
            >
              {block.text}
            </p>
          </div>
        ) : (
          <ul key={i} className="list-disc list-inside space-y-2 text-white text-sm leading-relaxed pl-1">
            {block.items.map((item, j) => {
              const colonIndex = item.indexOf(":")
              const label = colonIndex >= 0 ? item.slice(0, colonIndex) : null
              const rest = colonIndex >= 0 ? item.slice(colonIndex) : item
              return (
                <li key={j}>
                  {label !== null ? (
                    <>
                      <span className="font-semibold">{label}</span>
                      {rest}
                    </>
                  ) : (
                    item
                  )}
                </li>
              )
            })}
          </ul>
        )
      )}
    </div>
  )
}

export function CaseStudyBlock({ section, leadingParagraph, introBlocks, isFirstSection }: CaseStudyBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: revealViewport.amount })
  const prefersReducedMotion = useReducedMotion()

  const { heroImage, heroImages, images, text } = section
  const heroCards = heroImages?.length
    ? heroImages
    : heroImage
      ? [heroImage, heroImage]
      : []

  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-8 lg:gap-12 items-start">
      <motion.div
        className="order-2 lg:order-1 flex flex-col gap-4 w-full"
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{ ...revealTransition, delay: 0 }}
      >
        {heroCards.map((card, i) => (
          <CaseStudyHeroCard key={i} heroImage={card} />
        ))}
        {images.map((src, i) => (
          <div
            key={i}
            className={`w-full overflow-hidden rounded-[24px] border border-border flex justify-center items-center p-6 ${isFirstSection ? "bg-purple" : "bg-muted/30"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="max-h-[452px] max-w-full w-auto h-auto block object-contain"
            />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="order-1 lg:order-2 flex flex-col justify-center lg:pt-1 space-y-4 lg:sticky lg:top-6 lg:self-start"
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{ ...revealTransition, delay: COLUMN_STAGGER_DELAY }}
      >
        {introBlocks ? (
          <IntroContent blocks={introBlocks} />
        ) : (
          <>
            {leadingParagraph && (
              <p className="text-white text-sm leading-relaxed">
                {leadingParagraph}
              </p>
            )}
            <p className="text-white text-sm leading-relaxed">{text}</p>
          </>
        )}
      </motion.div>
    </div>
  )
}
