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
    description: "Working prototypes in front of users in weeks. Validation without derailing the roadmap.",
    linkText: "Rapid prototyping →",
    serviceId: "rapid-prototyping",
  },
  {
    title: "Scale capacity without hiring delays",
    description: "Senior design-eng talent embedded in weeks. No W2, no 3-month hire.",
    linkText: "Team expansion →",
    serviceId: "team-expansion",
  },
  {
    title: "Turn your scrappy MVP into a professional product",
    description: "Polish that closes deals and raises rounds. From founder-built to enterprise-ready.",
    linkText: "Design refinement →",
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
            Ideas die on the backlog. MVPs stay scrappy. You need a parallel
            team that validates and ships without derailing the roadmap.
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
      </div>
    </SectionWrapper>
  )
}
