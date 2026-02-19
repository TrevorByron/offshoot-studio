import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Code } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Strategic thinking first",
    description: "We help you figure out what to build, not just execute the brief.",
  },
  {
    icon: Zap,
    title: "AI-augmented speed",
    description: "We use Cursor, Claude, v0 to move 3-5x faster—and bring the judgment AI can't.",
  },
  {
    icon: Code,
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
            Why Offshoot
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="flex flex-col bg-[#f7f7f7] dark:bg-card">
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
