"use client"

import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { type ReactNode, useCallback, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CarouselLogo {
  src: string
  alt: string
}

export interface CarouselScreenshot {
  src: string
  alt: string
  /** Optional image to fill the inner content area (e.g. case study cover). */
  coverImage?: string
  /** Optional logo shown in cursor-following tooltip on hover. */
  hoverLogo?: string
  /** Optional content rendered in an inner div (e.g. service card, CTA). Container is prepared with relative z-10 and flex layout. */
  content?: ReactNode
}

const DEFAULT_LOGOS: CarouselLogo[] = [
  { src: "/logos/openJoy.png", alt: "OpenJoy" },
  { src: "/logos/Procore.png", alt: "Procore" },
  { src: "/logos/Iodine.png", alt: "Iodine" },
  { src: "/logos/Transcarent.png", alt: "Transcarent" },
  { src: "/logos/TweakingCat.png", alt: "Tweaking Cat Studios" },
  { src: "/logos/Toro.png", alt: "Toro" },
]

const TOOLTIP_OFFSET = 20
const DESKTOP_BREAKPOINT = 768

const DEFAULT_SCREENSHOTS: CarouselScreenshot[] = [
  { src: "/background-images/man-on-rock.png", alt: "Man on rock", coverImage: "/case-study-covers/procore-cover.png", hoverLogo: "/logos/Procore.png" },
  { src: "/background-images/rock.png", alt: "Rock", coverImage: "/case-study-covers/gsd-cover.png", hoverLogo: "/logos/TweakingCat.png" },
  { src: "/background-images/two-on-rock.png", alt: "Two on rock", coverImage: "/case-study-covers/toro-cover.png", hoverLogo: "/logos/Toro.png" },
]

interface HeroCarouselProps {
  logos?: CarouselLogo[]
  screenshots?: CarouselScreenshot[]
}

export function HeroCarousel({
  logos = DEFAULT_LOGOS,
  screenshots = DEFAULT_SCREENSHOTS,
}: HeroCarouselProps) {
  // Triple the lists so the loop is long and feels unending; animate by one segment for seamless repeat
  const logoList = [...logos, ...logos, ...logos]
  const screenshotList = [...screenshots, ...screenshots, ...screenshots]

  // Same duration would make the wider strip move more pixels/sec. Scale screenshot duration by approximate segment-width ratio so both strips have the same perceived (pixel) speed.
  const logoSegmentWidth = logos.length * 170 + (logos.length - 1) * 14 // ~170px per logo, 14px gap
  const screenshotSegmentWidth = screenshots.length * 1000 + (screenshots.length - 1) * 8 // ~1000px per card (85vw-ish), 8px gap
  const baseDuration = 55
  const screenshotDurationBase = baseDuration * (screenshotSegmentWidth / logoSegmentWidth)

  const [isMobile, setIsMobile] = useState(false)
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const handleCardMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  // Faster scroll on mobile (~3x vs desktop)
  const screenshotDuration = isMobile ? screenshotDurationBase / 3 : screenshotDurationBase

  return (
    <div className="w-full">
      {/* Part 1: Logo strip – continuous horizontal scroll, runs off edges */}
      <div className="w-full overflow-hidden bg-muted/50 pt-0 pb-0">
        <motion.div
          className="flex items-center gap-0 md:gap-16 w-max"
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0,
              duration: baseDuration,
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
                width={180}
                height={140}
                className="w-full h-full object-contain object-center"
                sizes="180px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Part 2: Screenshot strip – continuous horizontal scroll, runs off edges */}
      <div className="w-full overflow-hidden bg-background pt-0 pb-8 md:pb-12">
        <motion.div
          key={isMobile ? "mobile" : "desktop"}
          className="flex items-center gap-6 md:gap-8 w-max min-h-[50vh] md:min-h-[280px]"
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0,
              duration: screenshotDuration,
              ease: "linear",
            },
          }}
          style={{ willChange: "transform" }}
        >
          {screenshotList.map((shot, i) => (
            <div
              key={`${shot.src}-${i}`}
              className={cn(
                "group relative flex-shrink-0 w-[80vh] h-[50vh] md:w-[78vw] md:h-auto md:aspect-[16/10] max-w-[1200px] rounded-lg border border-border overflow-hidden flex flex-col p-6 md:p-[60px]",
                shot.hoverLogo && "cursor-default"
              )}
              style={{
                backgroundImage: `url(${shot.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              role="img"
              aria-label={shot.alt}
              {...(shot.hoverLogo && {
                onMouseEnter: () => setHoveredLogo(shot.hoverLogo!),
                onMouseMove: handleCardMouseMove,
                onMouseLeave: () => setHoveredLogo(null),
              })}
            >
              <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none rounded-lg"
                aria-hidden
              />
              <div
                className={cn(
                  "relative z-10 w-full flex-1 min-h-0 rounded-lg overflow-hidden transition-transform duration-300 ease-out origin-center group-hover:scale-[1.02]",
                  !shot.coverImage && "bg-muted"
                )}
                style={
                  shot.coverImage
                    ? {
                        backgroundImage: `url(${shot.coverImage})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* View all recent work – right-aligned */}
      <div className="w-full flex justify-end px-4 md:px-6 pt-2 pb-2">
        <Link
          href="/recent-work"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "inline-flex items-center justify-center gap-2 w-full md:w-auto"
          )}
        >
          View all recent work
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </Link>
      </div>
      {isDesktop &&
        typeof document !== "undefined" &&
        hoveredLogo &&
        createPortal(
          <div
            className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-lg border border-border/50 shadow-lg overflow-hidden bg-background/95 backdrop-blur-sm p-3 max-w-[200px]"
            style={{
              transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
            }}
          >
            <img
              src={hoveredLogo}
              alt=""
              className="block w-full h-auto max-h-[40px] object-contain"
            />
          </div>,
          document.body
        )}
    </div>
  )
}
