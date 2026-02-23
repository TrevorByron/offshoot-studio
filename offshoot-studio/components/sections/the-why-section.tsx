"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"
import { ScrollReveal } from "@/components/scroll-reveal"

const PARALLAX_SPEED = 0.08

const FOUNDER_QUOTE = (
  <>
    I spent 10 years watching the most succesful products and features not come from the roadmap. They came out of hackathons and side-projects, big bet ideas that felt too risky to put resources on.
    <br />
    <br />
    I started Tiger Team to de-risk those big-bets before they die in a backlog.
  </>
)

export function TheWhySection() {
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * PARALLAX_SPEED)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <SectionWrapper id="the-why">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
          <div className="w-full md:w-[116px] shrink-0">
            <span className="font-geist-mono text-[12px] text-left">
              The Why:
            </span>
          </div>
          <div className="flex flex-col text-left min-w-0 flex-1">
            <ScrollReveal staggerDelay={0}>
              <blockquote className="max-w-3xl text-xl md:text-3xl font-normal leading-relaxed text-foreground mb-6">
                &ldquo;{FOUNDER_QUOTE}&rdquo;
              </blockquote>
            </ScrollReveal>
            <ScrollReveal staggerDelay={0.1}>
              <p className="font-geist-mono text-[12px] text-muted-foreground mb-10">
                Trevor Borden, Founder
              </p>
            </ScrollReveal>
            <ScrollReveal staggerDelay={0.2} className="relative w-96 h-96 max-w-[90vw] max-h-[90vw] rounded-full overflow-hidden">
              <div
                className="absolute inset-0 w-full h-[110%] top-[-50%] left-0"
                style={{ transform: `translateY(${parallaxY}px)` }}
              >
                <Image
                  src="/trevor-driving.png"
                  alt="Trevor Borden driving"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 400px) 90vw, 384px"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
