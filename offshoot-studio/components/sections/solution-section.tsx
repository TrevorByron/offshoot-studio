import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Brain01Icon, ZapIcon, CodeIcon } from "@hugeicons/core-free-icons"

const features = [
  {
    icon: Brain01Icon,
    title: "Strategic thinking first",
    description: "We help you figure out what to build, not just execute the brief.",
  },
  {
    icon: ZapIcon,
    title: "AI-augmented speed",
    description: "We use Cursor, Claude, v0 to move 3-5x faster—and bring the judgment AI can't.",
  },
  {
    icon: CodeIcon,
    title: "Design + engineering in one",
    description: "No handoff lag, no translation loss.",
  },
]

export function SolutionSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Why Tiger Team Studios
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {features.map((feature, index) => (
              <Card key={index} className="flex flex-col bg-card">
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <HugeiconsIcon icon={feature.icon} className="size-6 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
