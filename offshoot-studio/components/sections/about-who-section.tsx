import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const goodFit = [
  "Your core team is maxed out but you have ideas worth testing",
  "You need senior capacity without 3-month hiring timelines",
  "Your MVP needs professional polish to scale or fundraise",
]

const industries = [
  "B2B SaaS",
  "Fintech",
  "Developer tools",
  "AI products",
]

export function AboutWhoSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-section-title mb-6">
            Who this is for
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We work with Series A+ companies and innovation teams who need strategic design engineering without hiring overhead or agency slowness.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <Card className="bg-[#f7f7f7] dark:bg-card">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">You're a good fit if:</h3>
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
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">Industries:</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-md"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
