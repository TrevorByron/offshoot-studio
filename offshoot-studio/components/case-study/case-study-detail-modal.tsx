"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { CaseStudyBadge } from "@/components/case-study/case-study-badge"
import { getCaseStudy, getCaseStudyCardProps } from "@/lib/case-studies"
import { CaseStudyBlock } from "./case-study-block"
import { CaseStudyQuote } from "./case-study-quote"
import { Footer } from "@/components/sections/footer"

interface CaseStudyDetailModalProps {
  open: boolean
  onClose: () => void
  slug: string | null
  /** Label for the back/close button, e.g. "Back home" or "Back to Selected Work". */
  backLabel?: string
}

const FADE_DURATION = 0.2

const DEFAULT_BACK_LABEL = "Back to Selected Work"

export function CaseStudyDetailModal({ open, onClose, slug, backLabel = DEFAULT_BACK_LABEL }: CaseStudyDetailModalProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [isExiting, setIsExiting] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setIsExiting(true)
  }, [])

  const handleFadeComplete = React.useCallback(() => {
    if (isExiting) {
      setIsExiting(false)
      onClose()
    }
  }, [isExiting, onClose])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      queueMicrotask(() => closeRef.current?.focus())
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !isExiting) {
        handleClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, isExiting, handleClose])

  if (!open || !mounted) return null

  const caseStudy = slug ? getCaseStudy(slug) : undefined
  const cardProps = caseStudy ? getCaseStudyCardProps(caseStudy) : null
  const isImageLeft = cardProps?.imagePosition === "left"
  const gridCols = isImageLeft ? "md:grid-cols-[13fr_7fr]" : "md:grid-cols-[7fr_13fr]"
  const contentOrder = isImageLeft ? "order-2 md:order-2" : "order-1 md:order-1"
  const imageOrder = isImageLeft ? "order-1 md:order-1" : "order-2 md:order-2"

  const modalContent = (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
      initial={false}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: FADE_DURATION }}
      onAnimationComplete={handleFadeComplete}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={caseStudy ? "case-study-modal-title" : undefined}
    >
      <div
        className="h-full w-full overflow-y-auto bg-card min-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button top-left */}
        <div className="sticky top-0 z-20 flex justify-start p-4 bg-transparent pointer-events-none">
          <div className="pointer-events-auto">
            <button
              ref={closeRef}
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border shadow-sm hover:bg-muted transition-colors text-sm font-medium"
              aria-label={backLabel}
              title={backLabel}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              <span>{backLabel}</span>
            </button>
          </div>
        </div>

        {caseStudy && cardProps ? (
          <div className="min-h-screen bg-card text-foreground">
            {slug ? (
              isExiting ? (
                <section
                  className={`relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col md:grid ${gridCols} gap-8 md:gap-12 md:items-stretch p-6 max-w-7xl mx-auto`}
                >
                  <div
                    className={`max-w-3xl bg-muted/30 md:bg-muted/20 flex flex-col justify-center p-4 md:p-6 ${contentOrder}`}
                  >
                    <span id="case-study-modal-title" className="sr-only">
                      {caseStudy.title}
                    </span>
                    <h2 className="text-2xl font-semibold md:text-3xl mb-2 text-foreground">
                      {caseStudy.title}
                    </h2>
                    {cardProps.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cardProps.badges.map((label) => (
                          <CaseStudyBadge key={label} label={label} />
                        ))}
                      </div>
                    )}
                    {cardProps.description.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`text-muted-foreground text-sm leading-relaxed ${
                          index < cardProps.description.length - 1 ? "mb-4" : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div
                    className={`relative p-2 md:p-6 w-full min-h-[70vh] md:h-full rounded-lg overflow-hidden bg-cover bg-center ${imageOrder}`}
                    style={{ backgroundImage: `url(${cardProps.imageBackground})`, paddingRight: "-24px" }}
                  >
                    <div
                      className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 bg-background/95 dark:bg-card/90 rounded-lg shadow-lg flex flex-col"
                      style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
                    >
                      <div className="flex items-center p-4 pb-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                        </div>
                      </div>
                      <div className="flex-1 relative overflow-hidden rounded-b-lg">
                        <Image
                          src={cardProps.imageScreenshot}
                          alt={cardProps.imageAlt}
                          fill
                          unoptimized
                          className="object-cover object-left-top"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
              <motion.section
                layoutId={`case-study-hero-${slug}`}
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                className={`relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col md:grid ${gridCols} gap-8 md:gap-12 md:items-stretch p-6 max-w-7xl mx-auto`}
              >
                  {/* Left: same sizing as case-study card — title, badge, description */}
                  <div
                    className={`max-w-3xl bg-muted/30 md:bg-muted/20 flex flex-col justify-center p-4 md:p-6 ${contentOrder}`}
                  >
                    <span id="case-study-modal-title" className="sr-only">
                      {caseStudy.title}
                    </span>
                    <h2 className="text-2xl font-semibold md:text-3xl mb-2 text-foreground">
                      {caseStudy.title}
                    </h2>
                    {cardProps.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cardProps.badges.map((label) => (
                          <CaseStudyBadge key={label} label={label} />
                        ))}
                      </div>
                    )}
                    {cardProps.description.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`text-muted-foreground text-sm leading-relaxed ${
                          index < cardProps.description.length - 1 ? "mb-4" : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Right: textured background + browser window — match card: overflow trick */}
                  <div
                    className={`relative p-2 md:p-6 w-full min-h-[70vh] md:h-full rounded-lg overflow-hidden bg-cover bg-center ${imageOrder}`}
                    style={{ backgroundImage: `url(${cardProps.imageBackground})`, paddingRight: "-24px" }}
                  >
                    <div
                      className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 bg-background/95 dark:bg-card/90 rounded-lg shadow-lg flex flex-col"
                      style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
                    >
                      <div className="flex items-center p-4 pb-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                        </div>
                      </div>
                      <div className="flex-1 relative overflow-hidden rounded-b-lg">
                        <Image
                          src={cardProps.imageScreenshot}
                          alt={cardProps.imageAlt}
                          fill
                          unoptimized
                          className="object-cover object-left-top"
                        />
                      </div>
                    </div>
                  </div>
              </motion.section>
              )
            ) : null}

            {/* Extended content below hero */}
            {caseStudy && (
              <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-18 lg:py-22 space-y-18 lg:space-y-22">
                {caseStudy.sections.map((section, i) => (
                  <CaseStudyBlock
                    key={i}
                    section={section}
                    leadingParagraph={i === 0 && !caseStudy.introBlocks ? caseStudy.introBlurb : undefined}
                    introBlocks={i === 0 ? caseStudy.introBlocks : undefined}
                    isFirstSection={i === 0}
                  />
                ))}

                {caseStudy.quote && (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-full md:w-[116px] shrink-0 self-start">
                      <span className="font-geist-mono text-[12px] text-left text-foreground">
                        Testimonials:
                      </span>
                    </div>
                    <CaseStudyQuote quote={caseStudy.quote} />
                  </div>
                )}

              </div>
            )}
          </div>
        ) : null}
        <Footer />
      </div>
    </motion.div>
  )

  return createPortal(modalContent, document.body)
}
