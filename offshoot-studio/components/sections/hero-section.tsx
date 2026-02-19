"use client"

import { useRef, useCallback, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { cn } from "@/lib/utils"

const HERO_TEXT = "Think of us as your AI-empowered design engineers on demand."

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [maskPos, setMaskPos] = useState({ x: "-9999px", y: "-9999px" })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMaskPos({ x: `${x}px`, y: `${y}px` })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setMaskPos({ x: "-9999px", y: "-9999px" })
  }, [])

  return (
    <SectionWrapper variant="spacious" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl text-left md:text-center">
        <div
          ref={wrapperRef}
          className="hero-headline-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              "--mouse-x": maskPos.x,
              "--mouse-y": maskPos.y,
            } as React.CSSProperties
          }
        >
          <h1 className="hero-headline text-hero mb-6 leading-tight">
            <span className="hero-headline-base">{HERO_TEXT}</span>
            <span className="hero-headline-gradient" aria-hidden="true">
              {HERO_TEXT}
            </span>
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-left md:text-center">
          Strategic design engineering for product teams. We validate ideas, scale capacity, and ship production-ready work—faster than agencies, smarter than AI alone.
        </p>
        <div className="flex justify-center">
          <a
            href="#cta"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Book a call
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
