"use client"

import { useRef, useCallback, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { cn } from "@/lib/utils"
import Image from "next/image"

const HERO_TEXT = "Your AI-accelerated design team on demand"

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
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-left md:text-center">
          Here to validate ideas, scale capacity, and ship products users trust—Offshoot Studio is the best way to prototype and ship without the hiring overhead.
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
              "hidden sm:inline-flex w-full sm:w-auto"
            )}
          >
            See What We Do
          </a>
        </div>
      </div>
      <div className="mt-12 md:mt-16 w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Hero Image Placeholder</span>
        </div>
      </div>
    </SectionWrapper>
  )
}
