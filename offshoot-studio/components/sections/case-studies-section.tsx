import { SectionWrapper } from "./section-wrapper"
import { CaseStudyCard } from "@/components/case-study-card"

export function CaseStudiesSection() {
  return (
    <SectionWrapper id="case-studies">
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Recent Client Work
          </h2>
          <p className="text-lg text-muted-foreground">
            From rapid prototyping sprints to embedded design engineering—here's how we help companies ship faster.
          </p>
        </div>

        <CaseStudyCard
          title="Procore Construction Network"
          badge="Embedded Design"
          description={[
            "We led discovery, vision casting, and internal alignment for the Procore Construction Network—a free online business directory that connects general contractors, specialty contractors, owners, architects, and vendors on one platform.",
            "We used RITE research methodology and built the first version in HTML/CSS to iterate rapidly after user testing. We owned the final polish and much of the front-end implementation in their production repo.",
          ]}
          imageBackground="/procore-case-study.png"
          imageScreenshot="/procore-screenshot.png"
          imagePosition="right"
          imageAlt="Procore Construction Network screenshot"
          footerLinkHref="https://trevorborden.github.io/GCN-prototype/index.html"
          footerLinkLabel="See Prototype"
        />

        <CaseStudyCard
          title="Get Sh*t Done"
          badge="Rapid Prototype"
          description={[
            "We partnered directly with Robert Hohman, cofounder of Glassdoor, as a focused two-person strike team to explore and validate a new to-do app concept inspired by Getting Sht Done*. The engagement was designed for speed and clarity—testing the idea early without distracting an existing team or consuming unnecessary resources.",
            "Working in close collaboration, we defined the core problems worth solving, mapped key user journeys and information architecture, and assessed the crowded to-do app market to identify where a differentiated approach could realistically succeed.",
          ]}
          imageBackground="/case-study-background.png"
          imageScreenshot="/get-shit-done-screenshot.png"
          imagePosition="left"
          imageAlt="Get Sh*t Done app screenshot"
        />

        <CaseStudyCard
          title="Recibook - Onboarding Audit & Redesign"
          badge="Rapid Prototype • Strategy • 11 hours | 2 days"
          description={[
            "Recipe app was losing users before they understood the value—too many friction points between landing and experiencing the product.",
            "Audited full onboarding flow, identified activation killers, and built two functional prototypes in 11 hours that flipped the funnel: show value first, ask for commitment after.",
            'Also flagged generic "AI slop" branding and produced cookbook-inspired visual direction that actually reflected what the product does.',
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
