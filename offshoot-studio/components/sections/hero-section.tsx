"use client"

import { useRef, useCallback, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { cn } from "@/lib/utils"

const HERO_TEXT = "Design engineering to help strategize, prototype, and bring products to life."

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
      <div className="mx-auto max-w-4xl text-left md:text-center">
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
          Offshoot Studio comes alongside your team to validate ideas, scale capacity, and ship production-ready prototypes—faster than traditional agencies, smarter than AI tools alone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#cta"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Book a Strategy Call
          </a>
          <a
            href="#services"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full sm:w-auto"
            )}
          >
            See What We Do
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
