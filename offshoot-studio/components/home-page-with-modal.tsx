"use client"

import { useState } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { TheWhySection } from "@/components/sections/the-why-section"
import { ServicesAndProcessSection } from "@/components/sections/services-and-process-section"
import { WhyOffshootSection } from "@/components/sections/why-offshoot-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { Footer } from "@/components/sections/footer"
import { CaseStudyDetailModal } from "@/components/case-study/case-study-detail-modal"

/**
 * Home page content with in-place case study modal. When a carousel case study
 * is clicked, the modal opens without navigating away—"Back home" just closes it.
 */
export function HomePageWithModal() {
  const [caseSlug, setCaseSlug] = useState<string | null>(null)

  return (
    <>
      <main>
        <HeroSection onCaseStudyClick={(slug) => setCaseSlug(slug)} />
        <ProblemSection />
        <TheWhySection />
        <ServicesAndProcessSection />
        <WhyOffshootSection />
        <FinalCTASection />
        <Footer />
      </main>
      <CaseStudyDetailModal
        open={caseSlug !== null}
        slug={caseSlug}
        onClose={() => setCaseSlug(null)}
        backLabel="Back home"
      />
    </>
  )
}
