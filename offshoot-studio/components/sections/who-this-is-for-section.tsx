import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

const goodFit = [
  "Your engineering team is underwater but you have ideas worth testing",
  "You need senior design-eng talent without 3-month hiring timelines",
  "Your MVP works but looks unprofessional—costing you deals or funding",
  "You're pitching investors, enterprise customers, or senior talent",
  "You value strategic product thinking as much as fast execution",
]

const weWorkWithSummary =
  "Founders, product leaders, and innovation teams who need a strategic partner, not just a vendor."

export function WhoThisIsForSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            Built for product teams and innovation teams.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-12">
          <Card className="bg-card">
            <CardHeader>
              <h3 className="text-sm font-medium">You're a good fit if:</h3>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <ul className="space-y-3">
                {goodFit.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <HugeiconsIcon icon={Tick02Icon} className="size-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <h3 className="text-sm font-medium">We work with:</h3>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-sm text-muted-foreground">
                {weWorkWithSummary}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
