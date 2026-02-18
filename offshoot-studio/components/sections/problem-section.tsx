"use client"

import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { ChatPreview } from "@/components/chat-preview"
import { CalendarPreview } from "@/components/calendar-preview"
import { ProductPreview } from "@/components/product-preview"
import { ArrowRight } from "lucide-react"

const problemCards = [
  {
    title: "Test ideas before you commit resources",
    description:
      "Put working prototypes in front of users before you allocate resources on them. Learn fast. Fail fast or double down with confidence. Validation takes days, not months.",
    linkText: "Learn about our Rapid Prototyping",
    serviceId: "rapid-prototyping",
  },
  {
    title: "Scale capacity without hiring delays",
    description:
      "Ship critical features for enterprise deals, product launches, or funding milestones. Get senior design-engineering talent embedded with your team in weeks, not months—without the commitment or overhead of a full-time hire.",
    linkText: "Learn about our Team Expansion",
    serviceId: "team-expansion",
  },
  {
    title: "Turn your scrappy MVP into a professional product",
    description:
      "Stop losing enterprise deals because your product looks like founders built it. Get the polish you need to close bigger customers, raise your next round, or attract senior talent.",
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
          <p className="text-lg text-muted-foreground">
            Great product ideas die on the backlog. Good MVPs stay scrappy too
            long. Your core team is shipping the roadmap, but there's critical
            work that can't wait.
            <br />
            <br />
            AI tools like Lovable and v0 build fast but lack context—the output
            feels like a demo, not something you'd show stakeholders or
            enterprise buyers. You need work that feels like it's been shipped
            to production.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          {problemCards.map((card, index) => {
            return (
              <Card
                key={index}
                className="flex flex-col bg-[#f7f7f7] dark:bg-card"
              >
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-3">
                    {card.title}
                  </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {card.description}
                </p>
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
