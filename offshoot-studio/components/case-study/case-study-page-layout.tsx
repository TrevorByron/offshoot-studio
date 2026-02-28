/**
 * Canonical case study page layout. All case study pages use this structure:
 *
 * 1. Header — Title (h1) + tags (badges with icons, Geist Mono)
 * 2. Columns with text — Repeated blocks: 65% left (images / hero card), 35% right (text).
 *    First block can include an intro blurb above the section text.
 * 3. Optional full-width banners, then site footer.
 *
 * Add new case studies by defining content in lib/case-studies/content/[slug].ts
 * and registering in lib/case-studies/index.ts. The page at app/case-studies/[slug]
 * renders this layout with getCaseStudy(slug).
 */
"use client"

import { SectionWrapper } from "@/components/sections/section-wrapper"
import { Footer } from "@/components/sections/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackLink } from "@/components/back-link"
import type { CaseStudyContent } from "@/lib/case-studies"
import { CaseStudyHeader } from "./case-study-header"
import { CaseStudyBlock } from "./case-study-block"
import { CaseStudyBanner } from "./case-study-banner"

interface CaseStudyPageLayoutProps {
  caseStudy: CaseStudyContent
}

const BLOCK_STAGGER = 0.2

export function CaseStudyPageLayout({ caseStudy }: CaseStudyPageLayoutProps) {
  const { sections, banners } = caseStudy
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
            <ScrollReveal key={i} staggerDelay={i * BLOCK_STAGGER}>
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

      {banners?.map((banner, i) => (
        <ScrollReveal key={i} staggerDelay={i * BLOCK_STAGGER}>
          <CaseStudyBanner banner={banner} />
        </ScrollReveal>
      ))}

      <Footer variant="dark" />
    </main>
  )
}
