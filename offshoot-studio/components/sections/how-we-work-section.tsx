import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const processes = [
  {
    title: "Rapid Prototyping",
    steps: [
      {
        week: "Week 1",
        title: "Discovery & Strategy",
        description: "90-minute strategy session. What are we testing? What validates or invalidates this? We shape the fuzzy idea into a testable hypothesis.",
      },
      {
        week: "Weeks 2-4",
        title: "Build & Deliver",
        description: "AI-augmented development. We use Cursor, Claude, and v0 to build fast—but bring strategic thinking and craft AI can't match. Weekly check-ins to show progress.",
      },
      {
        week: "Weeks 4-6",
        title: "Test & Refine",
        description: "You test with users/stakeholders. Iteration cycles to refine based on learnings.",
      },
      {
        week: "Handoff",
        title: "Documentation & Handoff",
        description: "Documentation and strategic recommendations on whether to build, kill, or pivot.",
      },
    ],
  },
  {
    title: "Embedded Work",
    steps: [
      {
        week: "Week 1",
        title: "Integration",
        description: "We plug into your workflow (Slack, Linear, GitHub, Figma). Understand your product, users, and goals. Align on sprint scope.",
      },
      {
        week: "Ongoing",
        title: "Build & Ship",
        description: "Daily collaboration. Design reviews, PRs, standups—whatever matches your cadence. We work like a senior member of your team.",
      },
      {
        week: "Final Week",
        title: "Handoff",
        description: "Documentation and knowledge transfer to your team.",
      },
    ],
  },
  {
    title: "Design Refinement",
    steps: [
      {
        week: "Week 1",
        title: "Audit & Strategy",
        description: "Deep dive into your current product. What's working? What's not? Where are users dropping off? What signals 'amateur hour'?",
      },
      {
        week: "Weeks 2-5",
        title: "Design & Rebuild",
        description: "Redesign core flows. Build design system. Implement with modern React components and interactions.",
      },
      {
        week: "Weeks 6-8",
        title: "Polish & Handoff",
        description: "Animations, edge cases, responsive design. Handoff session with your team. Documentation so you can maintain it.",
      },
    ],
  },
]

export function HowWeWorkSection() {
  return (
    <SectionWrapper id="how-we-work">
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">How We Work</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{process.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 flex-1 space-y-6">
                {process.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="relative pl-8">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />
                    <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-primary -translate-x-1.5" />
                    <Badge variant="outline" className="mb-2">
                      {step.week}
                    </Badge>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
