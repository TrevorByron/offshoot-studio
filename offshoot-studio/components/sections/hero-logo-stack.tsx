"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { REVEAL_DURATION, REVEAL_EASE } from "@/lib/reveal-config"

const LOGO_PARALLAX_RATES = [0, 0.1, 0.2, 0.3, 0.4]
const HERO_OFFSET = 28
const heroTransition = { duration: REVEAL_DURATION + 0.7, ease: REVEAL_EASE }

export function HeroLogoStack() {
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

  return (
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
  )
}
