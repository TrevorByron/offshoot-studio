import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Code } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Strategic thinking first",
    description: "We help you figure out what to build, not just execute what you ask for. The thinking work is half the value. Every engagement starts with a strategy session—not Figma, not code. We ask hard questions about what success looks like, what we're actually testing, and what the minimum version is that gives us signal. We're not an execution shop that takes a brief and disappears. If the brief is wrong, we'll tell you.",
  },
  {
    icon: Zap,
    title: "AI-augmented speed",
    description: "We use AI tools to move faster, but bring human judgment that AI can't replace: taste, strategy, and craft. Cursor, Claude, and v0 let us build in days what used to take weeks—but AI doesn't know your market, your users, or when an interaction feels wrong. We do. We're not a prompt-and-ship operation. AI is how we move fast. Judgment is how we get it right.",
  },
  {
    icon: Code,
    title: "Design + engineering in one",
    description: "No handoff lag, no translation loss, no coordination overhead. When design and engineering live in the same person, things that usually break don't—edge cases get caught early, interactions get refined in code, and what you see in the prototype is what your team actually builds from. We're not a designer who throws files over the wall, and we're not an engineer who needs designs handed to them. We're both, which means nothing falls through the gap.",
  },
]

export function SolutionSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            You've got a vision, we've got the experience
          </h2>
          <p className="text-lg text-muted-foreground">
            Building innovative products since 2017, we help insure your visions come to life
          </p>
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
