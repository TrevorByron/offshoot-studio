import { SectionWrapper } from "./section-wrapper"

export function AboutMotivationSection() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl">
        <h2 className="text-section-title mb-6">
          What drives this
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Trevor is obsessed with building and tinkering—the kind of obsessed where vacation means "finally have time to rebuild my personal site." Whether it's finish carpentry, songwriting, or product design, the drive is the same: craft things that work beautifully and feel right.
          </p>
          <p className="text-lg text-muted-foreground">
            He's relentlessly energetic (think Energizer Bunny that learned to code). This shows up in how Offshoot works: fast feedback loops, quick iterations, daily progress, zero bureaucracy.
          </p>
          <p className="text-lg text-muted-foreground">
            But the real driver is simpler: We love the moment when a fuzzy idea becomes something you can actually use. When a founder sees their vision working. When a product leader validates a hypothesis in 3 weeks instead of 3 months. When a scrappy MVP closes enterprise deals.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
