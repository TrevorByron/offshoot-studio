"use client"

import { createPortal } from "react-dom"
import Link from "next/link"
import {
  type ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react"
import { useReducedMotion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  /** Optional content rendered in an inner div (e.g. service card, CTA). */
  content?: ReactNode
}

const TOOLTIP_OFFSET = 20
const DESKTOP_BREAKPOINT = 768
/** Quick ease when a dot jumps the marquee ahead to the next screenshot. */
const JUMP_DURATION_MS = 550
/**
 * Baseline continuous speed for the screenshot strip alone (px/sec).
 * Kept independent from the logo ticker — dots only affect this strip.
 */
const SCREENSHOT_PX_PER_SEC = 23.4
const SCREENSHOT_PX_PER_SEC_MOBILE = SCREENSHOT_PX_PER_SEC * 3

const DEFAULT_SCREENSHOTS: CarouselScreenshot[] = [
  { src: "/background-images/rock.png", alt: "Scout Fuel", coverImage: "/case-study-covers/scout-fuel-cover.png", coverFrame: true, hoverLogo: "/logos/Scout.png", caseStudySlug: "scout-fuel" },
  { src: "/background-images/two-on-rock.png", alt: "Toro", coverImage: "/case-study-covers/toro-cover.png", hoverLogo: "/logos/Toro.png" },
  { src: "/background-images/man-on-rock.png", alt: "Procore", coverImage: "/case-study-covers/procore-cover.png", hoverLogo: "/logos/Procore.png", caseStudySlug: "procore" },
  { src: "/background-images/two-on-rock.png", alt: "Get Sh*t Done", coverImage: "/case-study-covers/gsd-cover.png", hoverLogo: "/logos/TweakingCat.png", caseStudySlug: "gsd" },
]

interface HeroScreenshotMarqueeProps {
  screenshots?: CarouselScreenshot[]
  /** When set, case study cards open the modal in-place (no navigation). */
  onCaseStudyClick?: (slug: string) => void
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

/**
 * Continuous case-study screenshot marquee with optional jump dots.
 * Fully isolated from the client logo ticker above it.
 */
export function HeroScreenshotMarquee({
  screenshots = DEFAULT_SCREENSHOTS,
  onCaseStudyClick,
}: HeroScreenshotMarqueeProps) {
  const screenshotList = [...screenshots, ...screenshots, ...screenshots]

  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(true)
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  const screenshotViewportRef = useRef<HTMLDivElement>(null)
  const screenshotTrackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const segmentWidthRef = useRef(0)
  const stepWidthRef = useRef(0)
  const jumpingRef = useRef(false)
  const activeScreenshotRef = useRef(0)

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

  const measureStrip = useCallback(() => {
    const track = screenshotTrackRef.current
    if (!track || screenshots.length === 0) return
    const first = track.children[0] as HTMLElement | undefined
    const second = track.children[1] as HTMLElement | undefined
    if (!first) return
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth
    stepWidthRef.current = step
    segmentWidthRef.current = step * screenshots.length
  }, [screenshots.length])

  useEffect(() => {
    measureStrip()
    const track = screenshotTrackRef.current
    if (!track) return
    const observer = new ResizeObserver(() => measureStrip())
    observer.observe(track)
    window.addEventListener("resize", measureStrip)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measureStrip)
    }
  }, [measureStrip, isMobile])

  // Continuous marquee for screenshots only. Dots jump this strip ahead.
  useEffect(() => {
    const track = screenshotTrackRef.current
    if (!track) return

    measureStrip()

    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0px, 0, 0)"
      return
    }

    const speed = isMobile ? SCREENSHOT_PX_PER_SEC_MOBILE : SCREENSHOT_PX_PER_SEC
    let last = performance.now()
    let raf = 0

    const applyTransform = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }

    const updateActiveFromOffset = () => {
      const step = stepWidthRef.current
      const segment = segmentWidthRef.current
      if (step <= 0 || segment <= 0 || screenshots.length === 0) return
      const viewport = screenshotViewportRef.current
      const viewCenter = viewport ? viewport.clientWidth / 2 : 0
      const centerInStrip = viewCenter - offsetRef.current
      let index = Math.round(centerInStrip / step) % screenshots.length
      if (index < 0) index += screenshots.length
      if (index !== activeScreenshotRef.current) {
        activeScreenshotRef.current = index
        setActiveScreenshot(index)
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.064, (now - last) / 1000)
      last = now

      const segment = segmentWidthRef.current
      if (!jumpingRef.current && segment > 0) {
        offsetRef.current -= speed * dt
        while (offsetRef.current <= -segment) {
          offsetRef.current += segment
        }
        applyTransform()
        updateActiveFromOffset()
      }

      raf = requestAnimationFrame(tick)
    }

    applyTransform()
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [prefersReducedMotion, isMobile, screenshots.length, measureStrip])

  const jumpToScreenshot = useCallback(
    (targetIndex: number) => {
      if (screenshots.length === 0) return
      if (prefersReducedMotion) {
        activeScreenshotRef.current = targetIndex
        setActiveScreenshot(targetIndex)
        return
      }

      const track = screenshotTrackRef.current
      const viewport = screenshotViewportRef.current
      const step = stepWidthRef.current
      const segment = segmentWidthRef.current
      if (!track || !viewport || step <= 0 || segment <= 0) return

      const viewCenter = viewport.clientWidth / 2
      const currentCenterInStrip = viewCenter - offsetRef.current
      const currentIndex =
        ((Math.round(currentCenterInStrip / step) % screenshots.length) +
          screenshots.length) %
        screenshots.length

      let cardsAhead =
        (targetIndex - currentIndex + screenshots.length) % screenshots.length
      if (cardsAhead === 0) {
        // Same dot: nudge forward to the next occurrence so click still speeds ahead.
        cardsAhead = screenshots.length
      }

      const targetCenterInStrip = currentCenterInStrip + cardsAhead * step
      const targetOffset = viewCenter - targetCenterInStrip

      const startOffset = offsetRef.current
      let delta = targetOffset - startOffset
      while (delta > 0) delta -= segment
      while (delta < -segment) delta += segment

      jumpingRef.current = true
      const start = performance.now()

      const animateJump = (now: number) => {
        const t = Math.min(1, (now - start) / JUMP_DURATION_MS)
        offsetRef.current = startOffset + delta * easeOutCubic(t)
        while (offsetRef.current <= -segment) offsetRef.current += segment
        while (offsetRef.current > 0) offsetRef.current -= segment
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`

        if (t < 1) {
          requestAnimationFrame(animateJump)
        } else {
          jumpingRef.current = false
          activeScreenshotRef.current = targetIndex % screenshots.length
          setActiveScreenshot(targetIndex % screenshots.length)
        }
      }

      requestAnimationFrame(animateJump)
    },
    [prefersReducedMotion, screenshots.length]
  )

  const handleCardMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden bg-background pt-0 pb-6 md:pb-10">
        <div
          ref={screenshotViewportRef}
          className="w-full overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Case study screenshots"
        >
          <div
            ref={screenshotTrackRef}
            className="flex items-center gap-6 md:gap-8 w-max min-h-[50vh] md:min-h-[280px]"
            style={{ willChange: "transform" }}
          >
            {screenshotList.map((shot, i) => {
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
                      key={`${shot.src}-${i}`}
                      onClick={() => onCaseStudyClick(shot.caseStudySlug!)}
                      className={cardClassName}
                      style={cardStyle}
                      aria-label={shot.alt}
                      onMouseEnter={() => shot.hoverLogo && setHoveredLogo(shot.hoverLogo)}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={() => setHoveredLogo(null)}
                    >
                      {cardContent}
                    </button>
                  )
                }
                return (
                  <Link
                    key={`${shot.src}-${i}`}
                    href={`/selected-work?case=${shot.caseStudySlug}&from=home`}
                    className={cardClassName}
                    style={cardStyle}
                    role="img"
                    aria-label={shot.alt}
                    onMouseEnter={() => shot.hoverLogo && setHoveredLogo(shot.hoverLogo)}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    {cardContent}
                  </Link>
                )
              }
              return (
                <div
                  key={`${shot.src}-${i}`}
                  className={cardClassName}
                  style={cardStyle}
                  role="img"
                  aria-label={shot.alt}
                  {...(shot.hoverLogo && {
                    onMouseEnter: () => setHoveredLogo(shot.hoverLogo!),
                    onMouseMove: handleCardMouseMove,
                    onMouseLeave: () => setHoveredLogo(null),
                  })}
                >
                  {cardContent}
                </div>
              )
            })}
          </div>
        </div>

        {screenshots.length > 1 && (
          <div
            className="flex items-center justify-center gap-2.5 pt-5"
            role="tablist"
            aria-label="Jump screenshot marquee ahead"
          >
            {screenshots.map((shot, i) => {
              const selected = i === activeScreenshot
              return (
                <button
                  key={`${shot.coverImage ?? shot.alt}-dot`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Jump to ${shot.alt}`}
                  onClick={() => jumpToScreenshot(i)}
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
