import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Code } from "lucide-react"

const processPoints = [
  {
    icon: Brain,
    title: "Strategic thinking first",
    description: "Every project starts with hard questions: What are we testing? What validates or kills this idea? If the brief is wrong, we'll tell you.",
  },
  {
    icon: Zap,
    title: "AI-augmented, human-judged",
    description: "We use Cursor, Claude, v0—every tool that makes building faster. But AI doesn't know your market, your users, or when a prototype needs one more iteration.",
  },
  {
    icon: Code,
    title: "Design + engineering in one person",
    description: "No handoff lag. No coordination overhead. What you see in the prototype is exactly what your team builds from.",
  },
]

export function AboutProcessSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            How we work
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {processPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card key={index} className="flex flex-col bg-[#f7f7f7] dark:bg-card">
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{point.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
