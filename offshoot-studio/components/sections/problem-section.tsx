"use client"

import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { ChatPreview } from "@/components/chat-preview"
import { CalendarPreview } from "@/components/calendar-preview"
import { ProductPreview } from "@/components/product-preview"
import { ArrowRight, X, Check } from "lucide-react"

const problemCards = [
  {
    title: "Test ideas before you commit resources",
    description:
      "Put working prototypes in front of users before you allocate resources on them. Learn fast. Fail fast or double down with confidence. Validation takes days, not months.",
    linkText: "Learn about our Rapid Prototyping",
    serviceId: "rapid-prototyping",
  },
  {
    title: "Scale capacity without the hiring gauntlet",
    description:
      "Ship critical features for enterprise deals, product launches, or funding milestones. Get senior design-engineering talent embedded with your team in days, not months—without the commitment or overhead of a full-time hire.",
    linkText: "Learn about our Team Expansion",
    serviceId: "team-expansion",
  },
  {
    title: "Stop losing deals because your product looks homemade",
    description:
      "Your MVP works. You have traction. But when enterprise prospects see it, they hesitate. When investors demo it, you see the look.\nIt's not broken—it just looks like founders built it. Because they did.",
    linkText: "Learn about our Design Refinement",
    serviceId: "design-refinement",
  },
]

export function ProblemSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-left md:text-center mb-10">
          <h2 className="text-section-title mb-6">
            Your team is maxed out. Your ideas aren't.
          </h2>
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              Your core team is shipping the roadmap. But critical work keeps getting pushed:
            </p>
            <Card className="bg-[#faf5f5] dark:bg-card text-left">
              <CardContent className="p-4 md:p-2">
                <p className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span>Product ideas that could change your trajectory—stuck on the backlog because your team doesn't have 3 months to test them.</span>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#faf5f5] dark:bg-card text-left">
              <CardContent className="p-4 md:p-2">
                <p className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span>Critical features that need to ship now for a deal, a launch, or a milestone—but hiring takes 90 days and you don't have 90 days.</span>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#faf5f5] dark:bg-card text-left">
              <CardContent className="p-4 md:p-2">
                <p className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span>An MVP that works but looks homemade—costing you enterprise deals and making investors hesitate.</span>
                </p>
              </CardContent>
            </Card>
            <p>
              You've tried AI tools. Lovable and v0 are fast, but the output has that look—...the "generated yesterday" vibe that always requires extra hand waving.
            </p>
            <p>
              You need work that looks like it's been in production for months, not built in an afternoon.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          {problemCards.map((card, index) => {
            return (
              <Card
                key={index}
                className="flex flex-col bg-[#f7f7f7] dark:bg-card"
              >
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                    {card.title}
                  </h3>
                <div className="text-muted-foreground text-sm leading-relaxed flex-1 space-y-2">
                  {card.description.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                <a
                  href={`#services-tab-${card.serviceId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    // Set hash and trigger navigation
                    window.location.hash = `services-tab-${card.serviceId}`
                    // Scroll to tab control area, positioning it just below header
                    setTimeout(() => {
                      const tabsElement = document.getElementById("services-tabs")
                      if (tabsElement) {
                        // Get header height (typically around 64px for top-16)
                        const headerOffset = 64
                        const elementPosition = tabsElement.getBoundingClientRect().top
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                        
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        })
                      }
                      // Trigger hashchange event manually
                      window.dispatchEvent(new HashChangeEvent("hashchange"))
                    }, 0)
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                >
                  {card.linkText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                {index === 0 && <CalendarPreview />}
                {index === 1 && <ChatPreview />}
                {index === 2 && <ProductPreview />}
              </CardContent>
            </Card>
            )
          })}
        </div>
        <p className="mx-auto max-w-3xl text-lg text-left md:text-center font-medium">
          You need a parallel team that validates ideas, scales capacity, and
          ships quality—without disrupting what you're building.
        </p>
      </div>
    </SectionWrapper>
  )
}
