import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

const comparisons = [
  {
    aspect: "Starting point",
    ai: "Needs a clear, specific prompt to get started",
    us: (
      <>
        Start with strategy session—we help you figure out <em>what</em> to build.
      </>
    ),
  },
  {
    aspect: "Design decisions",
    ai: "Generates generic patterns pulled from millions of existing products",
    us: "Opinionated decisions for your specific users, market, and brand",
  },
  {
    aspect: "Output quality",
    ai: "Has an \"AI look\" that founders, investors, and enterprise buyers recognize instantly",
    us: "Prototypes polished enough to close deals and fundraising rounds",
  },
  {
    aspect: "The hard questions",
    ai: "Builds whatever you ask, no pushback",
    us: "Will tell you when the brief is wrong, the assumption is flawed, or you're solving the wrong problem",
  },
  {
    aspect: "Iteration",
    ai: "You're on your own figuring out what to change and why",
    us: "We guide the refinement based on what's working, what users responded to, and what the data says",
  },
  {
    aspect: "Strategic value",
    ai: "None—AI executes, it doesn't advise",
    us: "Strategic thinking is half the engagement—we help you validate the idea, not just build it",
  },
  {
    aspect: "Best for",
    ai: "Known specs that need to be built fast",
    us: "Fuzzy ideas that need shaping before they're built",
  },
]

export function WhyNotAISection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Why not AI alone?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We use Lovable, v0, Cursor every day. AI can't replace strategy or craft.
          </p>
        </div>
        <Card className="mb-8 bg-card overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_5fr_5fr] gap-3 md:gap-6 mb-6 pb-6 border-b">
              <div className="font-semibold text-sm hidden md:block" aria-hidden />
              <div className="font-semibold text-sm flex items-center gap-2">
                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-destructive shrink-0" strokeWidth={2} />
                AI Tools (Lovable, v0, Bolt)
              </div>
              <div className="font-semibold text-sm flex items-center gap-2">
                <HugeiconsIcon icon={Tick02Icon} className="size-4 text-primary shrink-0" strokeWidth={2} />
                Tiger Team Studios
              </div>
            </div>
            <div className="space-y-6 md:space-y-4">
              {comparisons.map((comparison, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-[2fr_5fr_5fr] gap-2 md:gap-6 md:items-start">
                  <div className="font-medium text-sm text-foreground">{comparison.aspect}</div>
                  <div className="text-sm text-muted-foreground flex items-start gap-2 pl-0 md:pl-0">
                    <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-destructive mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>{comparison.ai}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-start gap-2 pl-0 md:pl-0">
                    <HugeiconsIcon icon={Tick02Icon} className="size-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>{comparison.us}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="bg-muted/50 rounded-lg p-8 text-left md:text-center">
          <p className="text-lg">
            AI gives you what you ask for. We help you decide what to ask for—then build it fast.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
