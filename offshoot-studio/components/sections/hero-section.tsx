"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BookACallLink } from "@/components/book-a-call-link"
import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { HeroCarousel } from "./hero-carousel"
import { HeroLogoStack } from "./hero-logo-stack"
import { cn } from "@/lib/utils"
import { REVEAL_DURATION, REVEAL_EASE } from "@/lib/reveal-config"

const HERO_OFFSET = 28
const heroTransition = { duration: REVEAL_DURATION + 0.7, ease: REVEAL_EASE }

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
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
            Your design strike team
              <br className="hidden md:block" />
              {" "}on demand.
          </h1>
          <p className="font-pp-neue-montreal text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl md:max-w-[85%] md:mx-0">
            Your core team is heads down shipping the roadmap. But you have ideas that can't wait, features in discovery, and MVPs that need polish. Tiger Team Studios exists for these very moments. Like the original NASA Tiger Team, we parachute in, solve it, and move on.
          </p>
          <div className="flex flex-wrap justify-start gap-3 mb-10">
            <BookACallLink
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Book a call
            </BookACallLink>
            <a
              href="/recent-work"
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
          <HeroCarousel />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
