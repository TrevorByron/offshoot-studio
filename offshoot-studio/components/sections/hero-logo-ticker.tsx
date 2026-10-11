"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

export interface HeroLogoTickerItem {
  src: string
  alt: string
  /** Displayed width. Use the file's native pixels so a small mark stays sharp. */
  width?: number
  height?: number
  className?: string
}

/** All ticker logos are exported at this size from Figma. */
const LOGO_WIDTH = 689
const LOGO_HEIGHT = 354
const LOGO_LOOP_DURATION_SEC = 78

const DEFAULT_LOGOS: HeroLogoTickerItem[] = [
  { src: "/logos/openJoy.png", alt: "OpenJoy" },
  { src: "/logos/Procore.png", alt: "Procore" },
  {
    src: "/logos/Scout.png",
    alt: "Scout",
    width: 139,
    height: 79,
    className: "h-auto w-[70px] max-h-full md:w-[110px]",
  },
  { src: "/logos/Alkami.png", alt: "Alkami" },
  { src: "/logos/Iodine.png", alt: "Iodine" },
  { src: "/logos/Transcarent.png", alt: "Transcarent" },
  { src: "/logos/TweakingCat.png", alt: "Tweaking Cat Studios" },
  { src: "/logos/Toro.png", alt: "Toro" },
  { src: "/logos/prc.png", alt: "The Public Run Club" },
  { src: "/logos/pgy1.png", alt: "Disability Insurance for Physicians" },
]

interface HeroLogoTickerProps {
  logos?: HeroLogoTickerItem[]
}

/**
 * Continuous client-logo marquee. Intentionally has no dots, jump controls,
 * or shared state with the screenshot strip — it cannot be sped up.
 */
export function HeroLogoTicker({ logos = DEFAULT_LOGOS }: HeroLogoTickerProps) {
  const prefersReducedMotion = useReducedMotion()
  // Triple so the loop feels unending; animate by one segment for a seamless repeat.
  const logoList = [...logos, ...logos, ...logos]

  return (
    <div
      className="w-full overflow-hidden bg-muted/50 pt-0 pb-0"
      aria-label="Client logos"
    >
      <motion.div
        className="flex items-center gap-0 md:gap-16 w-max"
        animate={prefersReducedMotion ? undefined : { x: [0, "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
            duration: LOGO_LOOP_DURATION_SEC,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
      >
        {logoList.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="flex-shrink-0 w-[160px] h-[80px] md:w-[180px] md:h-[140px] flex items-center justify-center p-3 rounded-lg bg-transparent"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? LOGO_WIDTH}
              height={logo.height ?? LOGO_HEIGHT}
              unoptimized
              className={logo.className ?? "w-full h-full object-contain object-center"}
              sizes="(max-width: 767px) 160px, 180px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
