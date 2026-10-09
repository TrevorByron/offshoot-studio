/**
 * One content block in single-column layout: Label → Heading → Text → Supporting imagery.
 * Matches the structure used on aaronkettl.com/procore for case study sections.
 */
"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { CaseStudyIntroBlock, CaseStudySection } from "@/lib/case-studies"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"
import { CaseStudyBrowserFrame } from "./case-study-browser-frame"
import { CaseStudyEmbedFrame } from "./case-study-embed-frame"
import { ScoutCaseStudyMedia } from "./scout/scout-case-study-media"

const STAGGER_DELAY = 0.12

interface CaseStudyBlockProps {
  section: CaseStudySection
  /** Rendered as the first paragraph (e.g. intro blurb on first block) */
  leadingParagraph?: string
  /** Rich intro for first block (paragraphs + list). When set, uses this instead of leadingParagraph + section text. */
  introBlocks?: CaseStudyIntroBlock[]
  /** When true, the first image container uses the purple background. */
  isFirstSection?: boolean
  /** Scroll container ref for useInView when inside a modal (so in-view is relative to modal, not window). */
  scrollRootRef?: React.RefObject<HTMLElement | null>
}

/** Render text with **bold** markers as <strong>. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

function IntroContent({ blocks }: { blocks: CaseStudyIntroBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) =>
        block.type === "paragraph" ? (
          <div key={i} className="space-y-1">
            {block.label && (
              <p className="text-foreground text-sm leading-relaxed font-geist-mono">
                {block.label}
              </p>
            )}
            {block.href ? (
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground text-sm leading-relaxed hover:text-foreground underline underline-offset-2 transition-colors ${block.font === "mono" ? "font-geist-mono" : ""}`}
              >
                <RichText text={block.text} />
              </a>
            ) : (
              <p
                className={`text-sm leading-relaxed ${block.font === "mono" ? "font-geist-mono text-foreground" : "text-muted-foreground"}`}
              >
                <RichText text={block.text} />
              </p>
            )}
          </div>
        ) : (
          <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed pl-1">
            {block.items.map((item, j) => {
              const colonIndex = item.indexOf(":")
              const label = colonIndex >= 0 ? item.slice(0, colonIndex) : null
              const rest = colonIndex >= 0 ? item.slice(colonIndex) : item
              return (
                <li key={j}>
                  {label !== null ? (
                    <>
                      <span className="font-geist-mono font-semibold">{label}</span>
                      {rest}
                    </>
                  ) : (
                    <RichText text={item} />
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

export function CaseStudyBlock({ section, leadingParagraph, introBlocks, isFirstSection, scrollRootRef }: CaseStudyBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  // "some" = any part visible — works in modal (small viewport) and on full page; 20% would never fire for tall sections
  const isInView = useInView(ref, {
    once: true,
    amount: "some",
    root: scrollRootRef ?? undefined,
  })
  const prefersReducedMotion = useReducedMotion()

  const {
    images,
    imagesHiddenOnMobile,
    text,
    bodyBlocks,
    browserFrame,
    browserFrameBackground,
    browserFrameUrl,
    customMedia,
    label,
    heading,
    embedUrl,
    fullWidth,
    embedMaxWidth,
    embedShowOnMobile,
    linkHref,
    linkAriaLabel,
  } = section

  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate
  const effectiveInView = isFirstSection || isInView

  const hasSectionBody = Boolean(bodyBlocks?.length || text)
  const hasText = introBlocks || leadingParagraph || hasSectionBody

  /** Only hide the whole block on mobile when it's an embedded prototype (e.g. try the prototype), not when it's a video (YouTube). Section can set embedShowOnMobile to show anyway. */
  const isEmbeddedPrototype = Boolean(embedUrl && !embedUrl.includes("youtube"))
  const hideOnMobile = isEmbeddedPrototype && !embedShowOnMobile

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 md:gap-8 ${hideOnMobile ? "hidden md:flex" : ""}`}
    >
      {label && (
        <motion.span
          className="font-geist-mono text-[12px] text-foreground uppercase tracking-wide"
          initial={isFirstSection ? animate : initial}
          animate={effectiveInView ? animate : initial}
          transition={{ ...revealTransition, delay: 0 }}
        >
          {label}
        </motion.span>
      )}

      {heading && (
        <motion.h2
          className="text-2xl md:text-3xl font-normal leading-tight tracking-tight text-foreground"
          initial={isFirstSection ? animate : initial}
          animate={effectiveInView ? animate : initial}
          transition={{ ...revealTransition, delay: STAGGER_DELAY }}
        >
          {heading}
        </motion.h2>
      )}

      {hasText && (
        <motion.div
          className="space-y-4"
          initial={isFirstSection ? animate : initial}
          animate={effectiveInView ? animate : initial}
          transition={{ ...revealTransition, delay: STAGGER_DELAY * 2 }}
        >
          {introBlocks ? (
            <IntroContent blocks={introBlocks} />
          ) : (
            <>
              {leadingParagraph && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <RichText text={leadingParagraph} />
                </p>
              )}
              {bodyBlocks?.length ? (
                <IntroContent blocks={bodyBlocks} />
              ) : text ? (
                <div className="space-y-4">
                  {text.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      <RichText text={para} />
                    </p>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </motion.div>
      )}

      <motion.div
        className={`flex flex-col gap-4 w-full ${fullWidth ? "max-w-full" : ""}`}
        initial={isFirstSection ? animate : initial}
        animate={effectiveInView ? animate : initial}
        transition={{ ...revealTransition, delay: hasText ? STAGGER_DELAY * 3 : STAGGER_DELAY }}
      >
        {embedUrl ? (
          <CaseStudyEmbedFrame
            embedUrl={embedUrl}
            className="h-fit"
            backgroundImage={browserFrameBackground}
            posterImage={section.embedPosterImage}
            fallbackLabel={section.embedFallbackLabel}
            maxWidth={embedMaxWidth}
          />
        ) : customMedia ? (
          <CaseStudyBrowserFrame
            className="min-h-[280px]"
            backgroundImage={browserFrameBackground}
            urlLabel={browserFrameUrl}
            mediaHeightClassName="h-[min(72vh,620px)]"
          >
            <ScoutCaseStudyMedia kind={customMedia} />
          </CaseStudyBrowserFrame>
        ) : (
          images.map((src, i) => {
            const hideImageOnMobile = imagesHiddenOnMobile?.includes(src)
            const framed = (
              <CaseStudyBrowserFrame
                src={src}
                alt=""
                className="min-h-[280px]"
                backgroundImage={browserFrameBackground}
                urlLabel={browserFrameUrl ?? (linkHref && i === 0 ? "Click to explore" : undefined)}
              />
            )
            if (browserFrame || (linkHref && i === 0)) {
              return (
                <div key={i} className={hideImageOnMobile ? "hidden md:block" : ""}>
                  {linkHref && i === 0 ? (
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={linkAriaLabel ?? "Open live prototype"}
                      className="block rounded-lg transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {framed}
                    </a>
                  ) : (
                    framed
                  )}
                </div>
              )
            }
            return (
              <div
                key={i}
                className={`w-full overflow-hidden rounded-[24px] border border-border ${isFirstSection ? "bg-purple" : "bg-muted/30"} ${hideImageOnMobile ? "hidden md:block" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="w-full h-auto block"
                />
              </div>
            )
          })
        )}
      </motion.div>
    </div>
  )
}
