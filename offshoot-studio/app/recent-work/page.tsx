import Link from "next/link"
import { SectionWrapper } from "@/components/sections/section-wrapper"
import { HeroLogoStack } from "@/components/sections/hero-logo-stack"
import { Footer } from "@/components/sections/footer"
import { CaseStudyCard } from "@/components/case-study-card"
import { getAllProjects } from "@/lib/recent-work"
import { getCaseStudy, getCaseStudyCardProps } from "@/lib/case-studies"

export default function RecentWorkPage() {
  const projects = getAllProjects()

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
                  title={cardProps.title}
                  badge={cardProps.badge}
                  description={cardProps.description}
                  imageBackground={cardProps.imageBackground}
                  imageScreenshot={cardProps.imageScreenshot}
                  imagePosition={cardProps.imagePosition}
                  imageAlt={cardProps.imageAlt}
                  footerLinkHref={project.footerLinkHref}
                  footerLinkLabel={project.footerLinkLabel}
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
                      <Link
                        href={`/case-studies/${project.caseStudySlug}`}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                      >
                        {card}
                      </Link>
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
    </main>
  )
}
