import { SectionWrapper } from "@/components/sections/section-wrapper"
import { Footer } from "@/components/sections/footer"
import { CaseStudyCard } from "@/components/case-study-card"
import { getAllProjects } from "@/lib/recent-work"

export default function RecentWorkPage() {
  const projects = getAllProjects()

  return (
    <main>
      <SectionWrapper
        variant="spacious"
        className="overflow-visible !pt-28 md:!pt-36 lg:!pt-44 !pb-0"
        animateOnScroll={false}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-left mb-12 md:mb-18">
            <h1 className="text-section-title mb-6">Selected Recent Work</h1>
            <p className="text-lg text-muted-foreground">
              Prototyping, embedded design-eng, and refinement.
            </p>
          </div>

          <div className="space-y-14 md:space-y-18 lg:space-y-22">
            {projects.map((project) => (
              <section key={project.slug} className="scroll-mt-8">
                <h2 className="font-geist-mono text-[12px] text-left mb-1">
                  {project.title}
                </h2>
                {project.subtitle ? (
                  <h3 className="font-sans text-[22px] font-medium text-left mb-6">
                    {project.subtitle}
                  </h3>
                ) : (
                  <div className="mb-6" />
                )}
                {project.slug === "procore" && (
                  <div className="mb-6">
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
                  </div>
                )}
                {project.slug === "open-joy" && (
                  <div className="mb-6">
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
                )}
                {project.slug === "get-shit-done" && (
                  <div className="mb-6">
                    <CaseStudyCard
                      title="Get Sh*t Done"
                      badge="Rapid Prototype"
                      description={[
                        "Two-person strike team with Robert Hohman (Glassdoor cofounder) to validate a to-do app concept inspired by Getting Things Done.",
                        "Defined core problems, mapped user journeys and IA, assessed the market for differentiated positioning. 2-week sprint.",
                      ]}
                      imageBackground="/case-study-background.png"
                      imageScreenshot="/get-shit-done-screenshot.png"
                      imagePosition="left"
                      imageAlt="Get Sh*t Done app screenshot"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}
