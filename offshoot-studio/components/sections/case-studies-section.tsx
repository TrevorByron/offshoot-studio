"use client"

import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"
import { CaseStudyCard } from "@/components/case-study-card"
import { CaseStudyDetailModal } from "@/components/case-study/case-study-detail-modal"
import {
  getCaseStudy,
  getCaseStudyCardProps,
  FEATURED_CASE_STUDY_SLUGS,
} from "@/lib/case-studies"

export function CaseStudiesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const featuredCards = FEATURED_CASE_STUDY_SLUGS.map((slug) => {
    const caseStudy = getCaseStudy(slug)
    return caseStudy ? { slug, ...getCaseStudyCardProps(caseStudy) } : null
  }).filter(Boolean) as { slug: string; title: string; badge: string; badges: string[]; description: string[]; imageBackground: string; imageScreenshot: string; imageAlt: string; imagePosition: "left" | "right"; coverImageOnly?: boolean }[]

  return (
    <SectionWrapper id="case-studies">
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Work
          </h2>
          <p className="text-lg text-muted-foreground">
            Prototyping, embedded design-eng, and refinement.
          </p>
        </div>

        {featuredCards.map((card) => (
          <div key={card.slug} className="block w-full text-left rounded-lg">
            <CaseStudyCard
              slug={card.slug}
              title={card.title}
              badges={card.badges}
              description={card.description}
              imageBackground={card.imageBackground}
              imageScreenshot={card.imageScreenshot}
              imagePosition={card.imagePosition}
              imageAlt={card.imageAlt}
              coverImageOnly={card.coverImageOnly}
              footerLinkLabel="View more"
              onFooterClick={() => setOpenSlug(card.slug)}
            />
          </div>
        ))}
      </div>

      <CaseStudyDetailModal
        open={openSlug !== null}
        slug={openSlug}
        onClose={() => setOpenSlug(null)}
        backLabel="Back home"
      />
    </SectionWrapper>
  )
}
