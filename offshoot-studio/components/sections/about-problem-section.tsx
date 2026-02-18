import { SectionWrapper } from "./section-wrapper"

export function AboutProblemSection() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl">
        <h2 className="text-section-title mb-6">
          The problem we're solving
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Great ideas get stuck in the gap between "we should build this" and "the team has bandwidth." Product leaders have hunches worth testing but can't derail their roadmap. Founders build scrappy MVPs that work but look amateur—costing them deals and funding.
          </p>
          <p className="text-lg text-muted-foreground">
            Traditional agencies are too slow. Hiring takes months. AI tools can't think strategically.
          </p>
          <p className="text-lg text-muted-foreground font-medium">
            So Trevor built Offshoot Studio: a design engineering team that works alongside your core team—prototyping ideas, embedding for critical builds, and refining MVPs—without the friction of hiring or the bloat of agencies.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
