"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { HeroCarousel } from "./hero-carousel"
import { cn } from "@/lib/utils"
import { REVEAL_DURATION, REVEAL_EASE } from "@/lib/reveal-config"

// Bottom (0) scrolls slowest, top (4) scrolls fastest – top layer peels away first
const LOGO_PARALLAX_RATES = [0, 0.1, 0.2, 0.3, 0.4]

const HERO_OFFSET = 24
const heroTransition = { duration: REVEAL_DURATION + 0.5, ease: REVEAL_EASE }

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const logoInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -HERO_OFFSET }
  const textInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: HERO_OFFSET }
  const carouselInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: HERO_OFFSET }

  return (
    <SectionWrapper variant="spacious" className="overflow-visible !pt-28 md:!pt-36 lg:!pt-44 !pb-0" animateOnScroll={false}>
      {/* Stack of 5 logos – animate in from top */}
      <div
        className="w-screen relative -mt-28 md:-mt-36 lg:-mt-44 p-1 pt-4 mb-20 md:pt-6 md:px-6 md:pb-0 pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div
          className="relative w-full"
          style={{ aspectRatio: "1200 / 200" }}
          initial={logoInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: 0 }}
        >
          {LOGO_PARALLAX_RATES.map((rate, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center px-1 md:px-6 transition-transform duration-0"
              style={{
                transform: `translateY(${-scrollY * rate}px)`,
              }}
              aria-hidden={i > 0}
            >
              <Image
                src="/logo-NASA.svg"
                alt={i === 0 ? "Tiger Team Studios" : ""}
                width={1200}
                height={200}
                className="w-full h-auto object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mx-auto max-w-5xl text-left md:text-center">
        {/* Headline, subtext, CTA – animate in from right */}
        <motion.div
          className="w-full md:w-[65%] md:ml-auto text-left"
          initial={textInitial}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...heroTransition, delay: 0.12 }}
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
            <a
              href="#cta"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Book a call
            </a>
            <a
              href="#case-studies"
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
          transition={{ ...heroTransition, delay: 0.24 }}
        >
          <HeroCarousel />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
