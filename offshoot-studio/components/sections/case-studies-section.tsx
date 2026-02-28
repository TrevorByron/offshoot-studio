import { SectionWrapper } from "./section-wrapper"
import { CaseStudyCard } from "@/components/case-study-card"
import {
  getCaseStudy,
  getCaseStudyCardProps,
  FEATURED_CASE_STUDY_SLUGS,
} from "@/lib/case-studies"

export function CaseStudiesSection() {
  const featuredCards = FEATURED_CASE_STUDY_SLUGS.map((slug) => {
    const caseStudy = getCaseStudy(slug)
    return caseStudy ? { slug, ...getCaseStudyCardProps(caseStudy) } : null
  }).filter(Boolean) as { slug: string; title: string; badge: string; description: string[]; imageBackground: string; imageScreenshot: string; imageAlt: string; imagePosition: "left" | "right" }[]

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

        <CaseStudyCard
          title="Procore Construction Network"
          badge="Embedded Design"
          description={[
            "Discovery, vision casting, and internal alignment for a free business directory connecting contractors, owners, architects, and vendors.",
            "RITE research, HTML/CSS prototype for rapid iteration, then final polish and front-end implementation in their production repo. Launched 2021.",
          ]}
          imageBackground="/procore-case-study.png"
          imageScreenshot="/procore-screenshot.png"
          imagePosition="right"
          imageAlt="Procore Construction Network screenshot"
          footerLinkHref="https://trevorborden.github.io/GCN-prototype/index.html"
          footerLinkLabel="See Prototype"
        />

        {featuredCards.map((card) => (
          <CaseStudyCard
            key={card.slug}
            title={card.title}
            badge={card.badge}
            description={card.description}
            imageBackground={card.imageBackground}
            imageScreenshot={card.imageScreenshot}
            imagePosition={card.imagePosition}
            imageAlt={card.imageAlt}
            footerLinkHref={`/case-studies/${card.slug}`}
            footerLinkLabel="View more"
          />
        ))}

        <CaseStudyCard
          title="Recibook – Onboarding Audit & Redesign"
          badge="Rapid Prototype • 11 hours | 2 days"
          description={[
            "Recipe app was losing users before they saw value. Audited onboarding, identified activation killers, built two prototypes in 11 hours: show value first, ask for commitment after.",
            "Also flagged generic branding and produced cookbook-inspired visual direction.",
          ]}
          imageBackground="/recibook-background.png"
          imageScreenshot="/recibook-screenshot.png"
          imagePosition="right"
          imageAlt="Recibook onboarding redesign screenshot"
          footerLinkHref="https://furry-suggestion-fb5.notion.site/Onboarding-Flow-Audit-Redesign-304f942244b680ad9c78ca9fe209b9a3"
          footerLinkLabel="View 11hr deliverable"
        />
      </div>
    </SectionWrapper>
  )
}
