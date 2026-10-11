"use client"

import { HeroLogoTicker, type HeroLogoTickerItem } from "./hero-logo-ticker"
import {
  HeroScreenshotMarquee,
  type CarouselScreenshot,
} from "./hero-screenshot-marquee"

/** @deprecated Prefer HeroLogoTickerItem from hero-logo-ticker. */
export type CarouselLogo = HeroLogoTickerItem
export type { CarouselScreenshot }

interface HeroCarouselProps {
  logos?: HeroLogoTickerItem[]
  screenshots?: CarouselScreenshot[]
  /** When set, case study cards open the modal in-place (no navigation). */
  onCaseStudyClick?: (slug: string) => void
}

/**
 * Home hero media stack: logo ticker and screenshot marquee are separate
 * components with no shared animation state. Only the screenshot strip has
 * jump dots; the logo row cannot be sped up.
 */
export function HeroCarousel({
  logos,
  screenshots,
  onCaseStudyClick,
}: HeroCarouselProps) {
  return (
    <div className="w-full">
      <HeroLogoTicker logos={logos} />
      <HeroScreenshotMarquee
        screenshots={screenshots}
        onCaseStudyClick={onCaseStudyClick}
      />
    </div>
  )
}
