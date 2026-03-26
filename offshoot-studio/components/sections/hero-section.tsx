"use client"

import { createPortal } from "react-dom"
import { useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { BookACallLink } from "@/components/book-a-call-link"
import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { HeroCarousel } from "./hero-carousel"
import { HeroLogoStack } from "./hero-logo-stack"
import { cn } from "@/lib/utils"
import { REVEAL_DURATION, REVEAL_EASE } from "@/lib/reveal-config"

const HERO_OFFSET = 28
const TOOLTIP_OFFSET = 20
const NASA_TIGER_TEAM_GIF =
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVncmx4ZWdyNTFjZGFoaDc0dWNjam85Z3A5ZzU0NWF1c3A5ZmhidiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5ndfKr0Nv92LkWrKpU/giphy.gif"
const heroTransition = { duration: REVEAL_DURATION + 0.7, ease: REVEAL_EASE }

interface HeroSectionProps {
  /** When set, carousel case study cards open the modal in-place (no navigation). */
  onCaseStudyClick?: (slug: string) => void
}

export function HeroSection({ onCaseStudyClick }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [showTigerTeamCard, setShowTigerTeamCard] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleTigerTeamMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleTigerTeamMouseEnter = useCallback(() => setShowTigerTeamCard(true), [])
  const handleTigerTeamMouseLeave = useCallback(() => setShowTigerTeamCard(false), [])

  const textInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: HERO_OFFSET }
  const carouselInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: HERO_OFFSET }

  return (
    <SectionWrapper variant="spacious" className="overflow-visible !pt-44 !pb-0" animateOnScroll={false}>
      <HeroLogoStack />
      <div className="mx-auto max-w-5xl text-left md:text-center">
        {/* Headline, subtext, CTA – animate in from right */}
        <motion.div
          className="w-full md:w-[65%] md:ml-auto text-left"
          initial={textInitial}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...heroTransition, delay: 0.2 }}
        >
          <span className="font-geist-mono block text-[12px] mb-2">
            Product Design Agency
          </span>
          <h1 className="text-[40px] md:text-[56px] font-normal leading-tight tracking-tight mb-10">
            Your design strike team,
              <br className="hidden md:block" />
              {" "}on demand.
          </h1>
          <p className="font-pp-neue-montreal text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl md:max-w-[85%] md:mx-0">
            Your core team is heads down shipping the roadmap. But you have ideas that can't wait, features in discovery, and MVPs that need polish. Tiger Team Studios exists for these very moments. Like the original{" "}
            <span
              role="button"
              tabIndex={0}
              onMouseEnter={handleTigerTeamMouseEnter}
              onMouseLeave={handleTigerTeamMouseLeave}
              onMouseMove={handleTigerTeamMouseMove}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setShowTigerTeamCard((prev) => !prev)
                }
              }}
              className="cursor-pointer border-b border-muted-foreground/40 hover:border-foreground/60 transition-colors"
            >
              Apollo 13 Tiger Team
            </span>
            , we handle the mission-critical work your core team doesn't have bandwidth for.
          </p>
          <div className="flex flex-wrap justify-start gap-3 mb-10">
            <BookACallLink
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Book a call
            </BookACallLink>
            <a
              href="/selected-work"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex w-full sm:w-auto"
              )}
            >
              See our work
            </a>
          </div>
        </motion.div>
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          showTigerTeamCard && (
            <div
              className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-lg border border-border/50 shadow-lg overflow-hidden max-w-[280px] bg-background"
              style={{
                transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
              }}
            >
              <img
                src={NASA_TIGER_TEAM_GIF}
                alt="Apollo 13 Tiger Team"
                className="block w-full h-auto object-cover"
              />
            </div>
          ),
          document.body
        )}
      {/* Full-bleed carousel – animate in from bottom */}
      <div
        className="w-screen relative left-1/2 -translate-x-1/2 mt-8"
        aria-label="Clients and recent work"
      >
        <motion.div
          initial={carouselInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0.4 }}
        >
          <HeroCarousel onCaseStudyClick={onCaseStudyClick} />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
