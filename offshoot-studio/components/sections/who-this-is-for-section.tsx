import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, User, Briefcase, Lightbulb } from "lucide-react"

const goodFit = [
  "Your engineering team is underwater but you have product ideas worth testing",
  "You need senior design-engineering talent without 3-month hiring timelines",
  "Your MVP works but looks unprofessional—it's costing you deals or funding",
  "You're pitching investors, enterprise customers, or recruiting senior talent (first impressions matter)",
  "You value strategic product thinking as much as fast execution",
]

const weWorkWith = [
  {
    icon: User,
    title: "Founders & CEOs",
    description:
      "Who need a strategic thinking partner, not just a design vendor. We help you figure out what to build before we build it.",
  },
  {
    icon: Briefcase,
    title: "Product Leaders",
    description:
      "Running product experiments outside the core roadmap. Testing big bet ideas, exploring adjacent markets, validating pivots.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Teams",
    description:
      "At established companies exploring new product lines without disrupting core engineering teams.",
  },
]

export function WhoThisIsForSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Built for Product Teams & Innovation Leaders
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-12">
          <Card className="bg-[#f7f7f7] dark:bg-card">
            <CardHeader>
              <h3 className="text-sm font-medium">You're a good fit if:</h3>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-3">
                {goodFit.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-[#f7f7f7] dark:bg-card">
            <CardHeader>
              <h3 className="text-sm font-medium">We work with:</h3>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {weWorkWith.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
