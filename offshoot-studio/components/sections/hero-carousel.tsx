"use client"

import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import {
  type ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react"
import { motion, useReducedMotion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CarouselLogo {
  src: string
  alt: string
  /** Displayed width. Use the file's native pixels so a small mark stays sharp. */
  width?: number
  height?: number
  className?: string
}

export interface CarouselScreenshot {
  src: string
  alt: string
  /** Optional image to fill the inner content area (e.g. case study cover). */
  coverImage?: string
  /**
   * Draw the black rounded frame in CSS. Other covers have this stroke baked into
   * the image (3px border, 21px radius on a 1920px-wide asset).
   */
  coverFrame?: boolean
  /** Optional logo shown in cursor-following tooltip on hover. */
  hoverLogo?: string
  /** Optional case study slug; when set, the card links to /selected-work?case=[slug]. */
  caseStudySlug?: string
  /** Optional content rendered in an inner div (e.g. service card, CTA). Container is prepared with relative z-10 and flex layout. */
  content?: ReactNode
}

const DEFAULT_LOGOS: CarouselLogo[] = [
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

const TOOLTIP_OFFSET = 20
const DESKTOP_BREAKPOINT = 768
/** All ticker logos are exported at this size from Figma. */
const LOGO_WIDTH = 689
const LOGO_HEIGHT = 354
const SCREENSHOT_AUTOPLAY_DESKTOP_MS = 5500
const SCREENSHOT_AUTOPLAY_MOBILE_MS = 4000

const DEFAULT_SCREENSHOTS: CarouselScreenshot[] = [
  { src: "/background-images/man-on-rock.png", alt: "Man on rock", coverImage: "/case-study-covers/procore-cover.png", hoverLogo: "/logos/Procore.png", caseStudySlug: "procore" },
  { src: "/background-images/rock.png", alt: "Rock", coverImage: "/case-study-covers/scout-fuel-cover.png", coverFrame: true, hoverLogo: "/logos/Scout.png", caseStudySlug: "scout-fuel" },
  { src: "/background-images/two-on-rock.png", alt: "Two on rock", coverImage: "/case-study-covers/gsd-cover.png", hoverLogo: "/logos/TweakingCat.png", caseStudySlug: "gsd" },
]

interface HeroCarouselProps {
  logos?: CarouselLogo[]
  screenshots?: CarouselScreenshot[]
  /** When set, case study cards open the modal in-place (no navigation). Use on home page for a polished feel. */
  onCaseStudyClick?: (slug: string) => void
}

function ScreenshotCard({
  shot,
  onCaseStudyClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}: {
  shot: CarouselScreenshot
  onCaseStudyClick?: (slug: string) => void
  onMouseEnter?: () => void
  onMouseMove?: (e: React.MouseEvent) => void
  onMouseLeave?: () => void
}) {
  const cardClassName = cn(
    "group relative flex-shrink-0 w-[80vh] h-[50vh] md:w-[78vw] md:h-auto md:aspect-[16/10] max-w-[1200px] rounded-lg border border-border overflow-hidden flex flex-col p-6 md:p-[60px]",
    shot.caseStudySlug ? "cursor-pointer" : shot.hoverLogo && "cursor-default"
  )
  const cardStyle = {
    backgroundImage: `url(${shot.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
  const cardContent = (
    <>
      <div
        className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-300 pointer-events-none rounded-lg"
        aria-hidden
      />
      {shot.coverImage && shot.coverFrame ? (
        <div className="relative z-10 flex h-full w-full min-h-0 flex-1 items-center justify-center">
          <div
            className="h-full max-w-full origin-center transition-transform duration-300 ease-out group-hover:scale-[1.02] [container-type:inline-size]"
            style={{ aspectRatio: "3360 / 2080" }}
          >
            {/* Frame matches the Procore cover: 3px stroke and 21px radius at 1920px wide. */}
            <img
              src={shot.coverImage}
              alt=""
              className="block h-full w-full border-solid border-black object-cover"
              style={{
                borderWidth: "0.15625cqw",
                borderRadius: "1.09375cqw",
              }}
            />
          </div>
        </div>
      ) : (
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
      )}
    </>
  )

  if (shot.caseStudySlug) {
    if (onCaseStudyClick) {
      return (
        <button
          type="button"
          onClick={() => onCaseStudyClick(shot.caseStudySlug!)}
          className={cardClassName}
          style={cardStyle}
          aria-label={shot.alt}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {cardContent}
        </button>
      )
    }
    return (
      <Link
        href={`/selected-work?case=${shot.caseStudySlug}&from=home`}
        className={cardClassName}
        style={cardStyle}
        role="img"
        aria-label={shot.alt}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <div
      className={cardClassName}
      style={cardStyle}
      role="img"
      aria-label={shot.alt}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {cardContent}
    </div>
  )
}

export function HeroCarousel({
  logos = DEFAULT_LOGOS,
  screenshots = DEFAULT_SCREENSHOTS,
  onCaseStudyClick,
}: HeroCarouselProps) {
  // Logo ticker only: triple the list so the loop is long and feels unending.
  const logoList = [...logos, ...logos, ...logos]
  const baseDuration = 78

  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(true)

  // Screenshot carousel (independent of logo ticker): indexed snap + dots
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [screenshotPaused, setScreenshotPaused] = useState(false)
  const [autoplayEpoch, setAutoplayEpoch] = useState(0)
  const [trackX, setTrackX] = useState(0)
  const screenshotViewportRef = useRef<HTMLDivElement>(null)
  const screenshotTrackRef = useRef<HTMLDivElement>(null)

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

  const updateTrackX = useCallback(() => {
    const viewport = screenshotViewportRef.current
    const track = screenshotTrackRef.current
    if (!viewport || !track) return
    const card = track.children[activeScreenshot] as HTMLElement | undefined
    if (!card) return
    const viewportCenter = viewport.clientWidth / 2
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    setTrackX(viewportCenter - cardCenter)
  }, [activeScreenshot])

  useEffect(() => {
    updateTrackX()
    const viewport = screenshotViewportRef.current
    if (!viewport) return
    const observer = new ResizeObserver(() => updateTrackX())
    observer.observe(viewport)
    const track = screenshotTrackRef.current
    if (track) observer.observe(track)
    window.addEventListener("resize", updateTrackX)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateTrackX)
    }
  }, [updateTrackX, screenshots.length])

  useEffect(() => {
    if (
      prefersReducedMotion ||
      screenshotPaused ||
      screenshots.length <= 1
    ) {
      return
    }
    const ms = isMobile ? SCREENSHOT_AUTOPLAY_MOBILE_MS : SCREENSHOT_AUTOPLAY_DESKTOP_MS
    const id = window.setInterval(() => {
      setActiveScreenshot((prev) => (prev + 1) % screenshots.length)
    }, ms)
    return () => window.clearInterval(id)
  }, [
    prefersReducedMotion,
    screenshotPaused,
    screenshots.length,
    isMobile,
    autoplayEpoch,
  ])

  const goToScreenshot = useCallback((index: number) => {
    setActiveScreenshot(index)
    setAutoplayEpoch((epoch) => epoch + 1)
  }, [])

  const handleCardMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div className="w-full">
      {/* Part 1: Logo strip – continuous horizontal scroll, runs off edges.
          Kept fully independent from the screenshot carousel (no dots / snap). */}
      <div className="w-full overflow-hidden bg-muted/50 pt-0 pb-0">
        <motion.div
          className="flex items-center gap-0 md:gap-16 w-max"
          animate={prefersReducedMotion ? undefined : { x: [0, "-33.333%"] }}
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

      {/* Part 2: Screenshot strip – snap carousel with clickable dots (logo ticker unaffected) */}
      <div
        className="w-full bg-background pt-0 pb-6 md:pb-10"
        onMouseEnter={() => setScreenshotPaused(true)}
        onMouseLeave={() => setScreenshotPaused(false)}
      >
        <div
          ref={screenshotViewportRef}
          className="relative w-full overflow-hidden min-h-[50vh] md:min-h-[280px]"
          aria-roledescription="carousel"
          aria-label="Case study screenshots"
        >
          <motion.div
            ref={screenshotTrackRef}
            className="flex items-center gap-6 md:gap-8 w-max"
            initial={false}
            animate={{ x: trackX }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 280, damping: 32, mass: 0.9 }
            }
            style={{ willChange: "transform" }}
          >
            {screenshots.map((shot, i) => (
              <ScreenshotCard
                key={`${shot.src}-${i}`}
                shot={shot}
                onCaseStudyClick={onCaseStudyClick}
                onMouseEnter={
                  shot.hoverLogo
                    ? () => setHoveredLogo(shot.hoverLogo!)
                    : undefined
                }
                onMouseMove={shot.hoverLogo ? handleCardMouseMove : undefined}
                onMouseLeave={
                  shot.hoverLogo ? () => setHoveredLogo(null) : undefined
                }
              />
            ))}
          </motion.div>
        </div>

        {screenshots.length > 1 && (
          <div
            className="flex items-center justify-center gap-2.5 pt-5"
            role="tablist"
            aria-label="Screenshot slides"
          >
            {screenshots.map((shot, i) => {
              const selected = i === activeScreenshot
              return (
                <button
                  key={`${shot.src}-dot`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Show ${shot.alt}`}
                  onClick={() => goToScreenshot(i)}
                  className={cn(
                    "size-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "bg-foreground"
                      : "bg-foreground/25 hover:bg-foreground/45"
                  )}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* View selected work – right-aligned */}
      <div className="w-full flex justify-end px-4 md:px-6 pt-2 pb-2">
        <Link
          href="/selected-work"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "inline-flex items-center justify-center gap-2 w-full md:w-auto"
          )}
        >
          View selected work
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </Link>
      </div>
      {isDesktop &&
        typeof document !== "undefined" &&
        hoveredLogo &&
        createPortal(
          <div
            className="fixed left-0 top-0 z-[9999] pointer-events-none w-max rounded-lg border border-border/50 shadow-lg overflow-hidden bg-background/95 backdrop-blur-sm p-2.5"
            style={{
              transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
            }}
          >
            <img
              src={hoveredLogo}
              alt=""
              className="block h-10 w-auto max-w-[11rem] object-contain"
            />
          </div>,
          document.body
        )}
    </div>
  )
}
