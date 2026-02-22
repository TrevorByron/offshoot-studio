"use client"

import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { cn } from "@/lib/utils"

const HERO_TEXT = "Design team on demand—strategic thinking, production-quality work, zero bureaucracy."

export function HeroSection() {
  return (
    <SectionWrapper variant="spacious" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl text-left md:text-center">
        <h1 className="text-hero mb-6 leading-tight font-semibold tracking-tight">
          {HERO_TEXT}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto text-left md:text-center">
          We've cleaned pools, led safaris, played dive bars, and have been shipping innovative software since 2017. The through line is craft.
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
