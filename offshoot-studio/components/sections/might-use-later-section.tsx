"use client"

import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { ChatPreview } from "@/components/chat-preview"
import { CalendarPreview } from "@/components/calendar-preview"
import { ProductPreview } from "@/components/product-preview"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

const cards = [
  {
    title: "Test ideas before you commit resources",
    description: "Working prototypes in front of users in weeks. Validation without derailing the roadmap.",
    linkText: "Rapid prototyping",
    serviceId: "rapid-prototyping",
  },
  {
    title: "Scale capacity without hiring delays",
    description: "Senior design-eng talent embedded in weeks. No W2, no 3-month hire.",
    linkText: "Team expansion",
    serviceId: "team-expansion",
  },
  {
    title: "Turn your scrappy MVP into a professional product",
    description: "Polish that closes deals and raises rounds. From founder-built to enterprise-ready.",
    linkText: "Design refinement",
    serviceId: "design-refinement",
  },
]

export function MightUseLaterSection() {
  const [previewHeight, setPreviewHeight] = useState<number | undefined>(undefined)

  return (
    <SectionWrapper id="might-use-later">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-section-title mb-6">might use later</h2>
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3 md:gap-3 no-scrollbar"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] max-w-[400px] snap-center snap-always md:w-auto md:max-w-none md:contents"
            >
              <Card className="flex flex-col bg-card h-full">
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-3">{card.title}</h3>
                  <p className="font-pp-neue-montreal text-muted-foreground text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <a
                    href={`#services-tab-${card.serviceId}`}
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.hash = `services-tab-${card.serviceId}`
                      setTimeout(() => {
                        const tabsElement = document.getElementById("services-tabs")
                        if (tabsElement) {
                          const headerOffset = 64
                          const elementPosition = tabsElement.getBoundingClientRect().top
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          })
                        }
                        window.dispatchEvent(new HashChangeEvent("hashchange"))
                      }, 0)
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-link hover:opacity-90 transition-colors group"
                  >
                    {card.linkText}
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </a>
                  {index === 0 && <CalendarPreview height={previewHeight} />}
                  {index === 1 && <ChatPreview onHeightReport={setPreviewHeight} />}
                  {index === 2 && <ProductPreview height={previewHeight} />}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
