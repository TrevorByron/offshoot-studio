/**
 * Case study section that renders a before/after image slider (e.g. founder design vs. redesign).
 * Label only, no heading or text. Custom bar and handle on top; handle drives the slider via drag.
 */
"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { CaseStudyBeforeAfterSection } from "@/lib/case-studies"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  revealInitialReduced,
  revealAnimateReduced,
} from "@/lib/reveal-config"
import ReactBeforeSliderComponent from "react-before-after-slider-component"
import "react-before-after-slider-component/dist/build.css"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

const STAGGER_DELAY = 0.12

/** Aspect ratio for 380px width (height = 380 * 19/9 ≈ 802). Keeps height ratio-correct to 380px. */
const SLIDER_ASPECT_RATIO = 9 / 19

/** Smoothstep for eased opacity tied to slider position (0–1 in, 0–1 out). */
function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

interface CaseStudyBeforeAfterBlockProps {
  section: CaseStudyBeforeAfterSection
  /** Scroll container ref for useInView when inside a modal. */
  scrollRootRef?: React.RefObject<HTMLElement | null>
}

export function CaseStudyBeforeAfterBlock({
  section,
  scrollRootRef,
}: CaseStudyBeforeAfterBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const sliderTrackRef = React.useRef<HTMLDivElement>(null)
  const handleRef = React.useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = React.useState(20)
  const [barLeftPercent, setBarLeftPercent] = React.useState(20)
  const isDraggingRef = React.useRef(false)

  React.useEffect(() => {
    const container = containerRef.current
    const sliderTrack = sliderTrackRef.current
    if (!container || !sliderTrack) return

    const updateBarPosition = () => {
      const cw = container.offsetWidth
      const sw = sliderTrack.offsetWidth
      const sliderLeft = (cw - sw) / 2
      const barLeftPx = sliderLeft + (sliderPosition / 100) * sw
      setBarLeftPercent((barLeftPx / cw) * 100)
    }

    updateBarPosition()
    const ro = new ResizeObserver(updateBarPosition)
    ro.observe(container)
    return () => ro.disconnect()
  }, [sliderPosition])

  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    isDraggingRef.current = true
    handleRef.current?.setPointerCapture?.(e.pointerId)
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    const sliderTrack = sliderTrackRef.current
    if (!container || !sliderTrack) return

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      const rect = container.getBoundingClientRect()
      const trackRect = sliderTrack.getBoundingClientRect()
      const trackStart = rect.left + (rect.width - trackRect.width) / 2
      const trackEnd = trackStart + trackRect.width
      const localX = e.clientX - trackStart
      const pct = (localX / trackRect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, pct)))
    }

    const onPointerUp = (e: PointerEvent) => {
      try {
        handleRef.current?.releasePointerCapture?.(e.pointerId)
      } catch {
        // ignore
      }
      isDraggingRef.current = false
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointercancel", onPointerUp)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
    }
  }, [])

  const isInView = useInView(ref, {
    once: true,
    amount: "some",
    root: scrollRootRef ?? undefined,
  })
  const prefersReducedMotion = useReducedMotion()

  const initial = prefersReducedMotion ? revealInitialReduced : revealInitial
  const animate = prefersReducedMotion ? revealAnimateReduced : revealAnimate

  const { label, beforeImage, afterImage } = section

  return (
    <div ref={ref} className="flex flex-col gap-6 md:gap-8">
      {label && (
        <motion.span
          className="font-geist-mono text-[12px] text-foreground uppercase tracking-wide"
          initial={initial}
          animate={isInView ? animate : initial}
          transition={{ ...revealTransition, delay: 0 }}
        >
          {label}
        </motion.span>
      )}

      <motion.div
        ref={containerRef}
        className="relative w-full rounded-[24px] border border-border bg-muted p-6"
        initial={initial}
        animate={isInView ? animate : initial}
        transition={{ ...revealTransition, delay: STAGGER_DELAY }}
      >
        {/* Labels above slider: "After" left of bar, "Before" right of bar; split moves with slider */}
        <div className="relative z-0 flex flex-col items-center gap-2">
          <div
            className="max-w-[380px] w-full flex items-center text-sm text-muted-foreground font-geist-mono whitespace-nowrap"
            style={{ ["--before-after-gap" as string]: "12px" }}
          >
            <div
              className="overflow-hidden text-right shrink-0"
              style={{
                width: `calc((100% - var(--before-after-gap, 8px)) * ${sliderPosition} / 100)`,
                opacity: smoothstep(sliderPosition / 100),
              }}
            >
              <span className="whitespace-nowrap">After</span>
            </div>
            <div className="shrink-0 w-3" aria-hidden />
            <div
              className="overflow-hidden text-left shrink-0 min-w-0"
              style={{
                width: `calc((100% - var(--before-after-gap, 8px)) * ${100 - sliderPosition} / 100)`,
                opacity: smoothstep((100 - sliderPosition) / 100),
              }}
            >
              <span className="whitespace-nowrap">Before</span>
            </div>
          </div>

          {/* Images: behind bar and handle */}
          <div
            ref={sliderTrackRef}
            className="max-w-[380px] w-full overflow-hidden rounded-[24px]"
            style={{ aspectRatio: SLIDER_ASPECT_RATIO }}
          >
            <ReactBeforeSliderComponent
              firstImage={{ imageUrl: beforeImage, alt: "Before" }}
              secondImage={{ imageUrl: afterImage, alt: "After" }}
              currentPercentPosition={sliderPosition}
              onChangePercentPosition={setSliderPosition}
              delimiterColor="transparent"
              delimiterIconStyles={{
                width: 0,
                height: 0,
                opacity: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
              feelsOnlyTheDelimiter
              className="!rounded-[24px]"
            />
          </div>
        </div>

        {/* Bar and handle on top: same left % so handle is centered on bar; only handle is draggable */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className="absolute top-0 bottom-0 w-[5px] bg-muted pointer-events-none"
            style={{ left: `${barLeftPercent}%`, transform: "translateX(-50%)" }}
          />
          <div
            ref={handleRef}
            className="absolute top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-muted shadow-md cursor-ew-resize touch-none pointer-events-auto"
            style={{ left: `${barLeftPercent}%`, transform: "translate(-50%, -50%)" }}
            onPointerDown={handlePointerDown}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Compare before and after"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5 text-white" />
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-5 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
