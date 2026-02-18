import { SectionWrapper } from "./section-wrapper"

export function AboutVisionSection() {
  return (
    <SectionWrapper>
      <div className="max-w-4xl">
        <h2 className="text-section-title mb-6">
          What we're building
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Offshoot is growing into a small team of senior design engineers—each with the same hybrid skillset and strategic mindset that defined the founding work.
          </p>
          <p className="text-lg text-muted-foreground">
            The vision: A network of design engineers who can parachute into your team, understand your product deeply, and ship production-quality work at startup speed. No account managers. No junior designers. No handoff friction.
          </p>
          <p className="text-lg text-muted-foreground">
            As we grow, the model stays the same: strategic product thinking + AI-augmented execution + design and engineering in one person.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
