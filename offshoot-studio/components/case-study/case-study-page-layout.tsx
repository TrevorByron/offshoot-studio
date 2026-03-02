/**
 * Canonical case study page layout. All case study pages use this structure:
 *
 * 1. Header — Title (h1) + tags (badges with icons, Geist Mono)
 * 2. Single-column sections — Repeated blocks: Label → Heading → Text → Supporting imagery
 *    (same order as aaronkettl.com/procore). First block can include an intro blurb or introBlocks.
 * 3. Optional quote, full-width banners, then site footer.
 *
 * Add new case studies by defining content in lib/case-studies/content/[slug].ts
 * and registering in lib/case-studies/index.ts. Case studies are shown in the
 * CaseStudyDetailModal from /selected-work; this layout is available for a full-page view if needed.
 */
"use client"

import { useEffect } from "react"
import { SectionWrapper } from "@/components/sections/section-wrapper"
import { Footer } from "@/components/sections/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackLink } from "@/components/back-link"
import type { CaseStudyContent } from "@/lib/case-studies"
import { CaseStudyHeader } from "./case-study-header"
import { CaseStudyBlock } from "./case-study-block"
import { CaseStudyBanner } from "./case-study-banner"
import { CaseStudyQuote } from "./case-study-quote"

interface CaseStudyPageLayoutProps {
  caseStudy: CaseStudyContent
}

const BLOCK_STAGGER = 0.2

export function CaseStudyPageLayout({ caseStudy }: CaseStudyPageLayoutProps) {
  const { sections, banners, quote } = caseStudy

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <SectionWrapper
        variant="spacious"
        className="overflow-visible !pt-44 !pb-0"
        animateOnScroll={false}
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <BackLink />

            <CaseStudyHeader caseStudy={caseStudy} />
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="spacious" animateOnScroll={false}>
        <div className="mx-auto max-w-7xl space-y-18 lg:space-y-22">
          {sections.map((section, i) => (
            <ScrollReveal key={i} staggerDelay={i * BLOCK_STAGGER} startInView={i === 0}>
              <CaseStudyBlock
                section={section}
                leadingParagraph={i === 0 && !caseStudy.introBlocks ? caseStudy.introBlurb : undefined}
                introBlocks={i === 0 ? caseStudy.introBlocks : undefined}
                isFirstSection={i === 0}
              />
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {quote && (
        <SectionWrapper variant="spacious" animateOnScroll={false}>
          <div className="mx-auto max-w-7xl flex flex-col items-center gap-6">
            <ScrollReveal className="flex flex-col items-center gap-6 w-full">
              <div className="w-full md:w-[116px] shrink-0 self-start">
                <span className="font-geist-mono text-[12px] text-left text-foreground">
                  Testimonials:
                </span>
              </div>
              <CaseStudyQuote quote={quote} />
            </ScrollReveal>
          </div>
        </SectionWrapper>
      )}

      {banners?.map((banner, i) => (
        <ScrollReveal key={i} staggerDelay={i * BLOCK_STAGGER}>
          <CaseStudyBanner banner={banner} />
        </ScrollReveal>
      ))}

      <Footer variant="dark" />
    </main>
  )
}
