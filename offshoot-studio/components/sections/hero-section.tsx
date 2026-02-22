"use client"

import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { SectionWrapper } from "./section-wrapper"
import { cn } from "@/lib/utils"

const HERO_TEXT = "Design team on demand — strategic thinkers, prototyping extraordinaires, zero bureaucracy."

export function HeroSection() {
  return (
    <SectionWrapper variant="spacious" className="overflow-hidden">
      <div className="mx-auto max-w-5xl text-left md:text-center">
        <h1 className="text-hero mb-6 leading-tight font-semibold tracking-tight">
          {HERO_TEXT}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto text-left md:text-center">
          We've led African safaris, cleaned swimming pools, played dive bars across America, and have been shipping delightful software since 2017. The through line is craft and human experience.
        </p>
        <div className="flex justify-center mb-10">
          <a
            href="#cta"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Book a call
          </a>
        </div>
        <div className="w-full rounded-lg overflow-hidden border border-border bg-muted">
          <Image
            src="/hero-image.png"
            alt="On the road, always building and exploring"
            width={1280}
            height={720}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
