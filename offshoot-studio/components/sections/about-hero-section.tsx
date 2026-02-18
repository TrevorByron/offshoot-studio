import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"

export function AboutHeroSection() {
  return (
    <SectionWrapper variant="spacious">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                About Offshoot Studio
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
                Built by a designer who can&apos;t stop building
              </h2>
            </div>

            <div className="space-y-4 text-base md:text-lg text-muted-foreground">
              <p>
                Offshoot Studio started with Trevor Borden—a design engineer who&apos;s been building
                things his entire life, and digital products since 2017.
              </p>
              <p>
                Trevor was born and raised in a remote corner of Kenya called the Loita Hills, where
                he grew up far from the tech world he&apos;d eventually call home. He was introduced
                to design when he moved to Portugal just before high school—a shift that opened up
                an entirely new way of seeing the world.
              </p>
              <p>
                But Trevor&apos;s path to design wasn&apos;t straightforward from there either.
                He&apos;s toured the USA multiple times as a singer-songwriter, worked as a
                high-end finish carpenter, led safaris in Tanzania, cleaned swimming pools in
                Dripping Springs, Texas, and worked a whole lot of other random jobs in between.
              </p>
              <p>
                The through line? Obsessive attention to detail and deep curiosity about the human
                experience—whether that&apos;s the perfect miter joint, the right chord
                progression, or the interaction that makes a product click.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground">
            <div className="space-y-3">
              <p className="uppercase tracking-[0.2em] text-xs text-muted-foreground/70">
                Our story
              </p>
              <p className="text-base leading-relaxed">
                Offshoot Studio was born from a lifetime of building—from remote Kenya to Portugal,
                from carpentry and songwriting to strategic product design and engineering.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-border" />
              <p className="text-xs leading-relaxed text-muted-foreground/80">
                We ask: What&apos;s the goal? Who&apos;s it for? How do we make it effortless?
                Every project starts with why, who, and how to make it better.
              </p>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/hero-image.png"
                alt="Trevor on the road, always building and exploring"
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
