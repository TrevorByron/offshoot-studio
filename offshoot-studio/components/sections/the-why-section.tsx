"use client"

import { createPortal } from "react-dom"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { SectionWrapper } from "./section-wrapper"
import { ScrollReveal } from "@/components/scroll-reveal"

const PARALLAX_SPEED = 0.08
const TOOLTIP_OFFSET = 20
const DESKTOP_BREAKPOINT = 768

const IMAGE_HOVER_TEXT = "👋 Hi! Nice to meet you. Glad you're here!"

const FOUNDER_QUOTE = (
  <>
    I spent 10 years watching some of the most adopted and successful products not come from a road map. They came out of hackathons and side-projects, big bet ideas that felt too risky to put resources on.
    <br />
    <br />
    I started Tiger Team Studios to de-risk those big bets before they die in a backlog.
  </>
)

export function TheWhySection() {
  const [parallaxY, setParallaxY] = useState(0)
  const [imageHovered, setImageHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * PARALLAX_SPEED)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const handleImageMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleImageMouseLeave = useCallback(() => {
    setImageHovered(false)
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
            <ScrollReveal staggerDelay={0.2}>
              <p className="font-geist-mono text-[12px] text-muted-foreground mb-10">
                Trevor Borden, Founder
              </p>
            </ScrollReveal>
            <ScrollReveal
              staggerDelay={0.4}
              className="relative w-96 h-96 max-w-[90vw] max-h-[90vw] rounded-full overflow-hidden"
            >
              <div
                className="absolute inset-0 w-full h-full cursor-default"
                onMouseEnter={() => setImageHovered(true)}
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                aria-hidden
              >
                <div
                  className="absolute inset-0 w-full h-[115%] top-[-55%] left-0"
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      {isDesktop &&
        typeof document !== "undefined" &&
        createPortal(
          imageHovered && (
            <div
              className="fixed left-0 top-0 z-[9999] pointer-events-none font-geist-mono text-sm text-foreground/90 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg max-w-[280px]"
              style={{
                transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
              }}
            >
              {IMAGE_HOVER_TEXT}
            </div>
          ),
          document.body
        )}
    </SectionWrapper>
  )
}
