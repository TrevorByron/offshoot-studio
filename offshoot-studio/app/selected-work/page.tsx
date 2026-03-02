"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/sections/section-wrapper"
import { HeroLogoStack } from "@/components/sections/hero-logo-stack"
import { Footer } from "@/components/sections/footer"
import { CaseStudyCard } from "@/components/case-study-card"
import { CaseStudyDetailModal } from "@/components/case-study/case-study-detail-modal"
import { getAllProjects } from "@/lib/recent-work"
import { getCaseStudy, getCaseStudyCardProps } from "@/lib/case-studies"

function SelectedWorkContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const caseFromUrl = searchParams.get("case")
  const fromHome = searchParams.get("from") === "home"
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const projects = getAllProjects()

  const handleCloseModal = () => {
    setOpenSlug(null)
    if (fromHome) router.push("/")
  }

  useEffect(() => {
    if (caseFromUrl) setOpenSlug(caseFromUrl)
  }, [caseFromUrl])

  return (
    <main>
      <SectionWrapper
        variant="spacious"
        className="overflow-visible !pt-44 !pb-0"
        animateOnScroll={false}
      >
        <HeroLogoStack />
        <div className="mx-auto max-w-7xl">
          <div className="text-left md:text-center mb-12 md:mb-18">
            <h1 className="text-[40px] md:text-[56px] font-normal leading-tight tracking-tight mb-10">
              Selected work
            </h1>
          </div>

          <div className="space-y-14 md:space-y-18 lg:space-y-22">
            {projects.map((project, index) => {
              const caseStudy = project.caseStudySlug
                ? getCaseStudy(project.caseStudySlug)
                : null
              const cardProps = caseStudy
                ? getCaseStudyCardProps(caseStudy)
                : {
                    title: project.title,
                    badge: project.badge ?? "",
                    description: project.description,
                    imageBackground:
                      project.imageBackground ?? project.imageUrls?.[0] ?? "",
                    imageScreenshot:
                      project.imageScreenshot ??
                      project.imageUrls?.[1] ??
                      project.imageUrls?.[0] ??
                      "",
                    imagePosition: (project.imagePosition ?? "right") as
                      | "left"
                      | "right",
                    imageAlt:
                      project.imageAlt ?? `${project.title} screenshot`,
                  }

              const card = (
                <CaseStudyCard
                  slug={caseStudy ? project.caseStudySlug : undefined}
                  title={cardProps.title}
                  badge={"badges" in cardProps ? undefined : cardProps.badge}
                  badges={"badges" in cardProps ? cardProps.badges : cardProps.badge ? [cardProps.badge] : undefined}
                  description={cardProps.description}
                  imageBackground={cardProps.imageBackground}
                  imageScreenshot={cardProps.imageScreenshot}
                  imagePosition={cardProps.imagePosition}
                  imageAlt={cardProps.imageAlt}
                  coverImageOnly={"coverImageOnly" in cardProps ? cardProps.coverImageOnly : undefined}
                  footerLinkHref={caseStudy ? `/selected-work?case=${project.caseStudySlug}` : project.footerLinkHref}
                  footerLinkLabel={caseStudy ? "Learn more" : project.footerLinkLabel}
                  onFooterClick={caseStudy ? () => setOpenSlug(project.caseStudySlug ?? null) : undefined}
                />
              )

              return (
                <section
                  key={project.slug}
                  className="scroll-mt-8"
                >
                  <h2 className="font-geist-mono text-[12px] text-left mb-6">
                    {String(index + 1).padStart(2, "0")} {project.title}
                  </h2>
                  <div className="mb-6">
                    {caseStudy ? (
                      <button
                        type="button"
                        onClick={() => setOpenSlug(project.caseStudySlug ?? null)}
                        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                      >
                        {card}
                      </button>
                    ) : (
                      card
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </SectionWrapper>
      <Footer />

      <CaseStudyDetailModal
        open={openSlug !== null}
        slug={openSlug}
        onClose={handleCloseModal}
        backLabel={fromHome ? "Back home" : "Back to Selected Work"}
      />
    </main>
  )
}

export default function SelectedWorkPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <SelectedWorkContent />
    </Suspense>
  )
}
