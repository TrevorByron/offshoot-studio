"use client"

import * as React from "react"

/**
 * Syncs sticky scroll-section imagery to the text panel being read.
 * Adapted from the Alkami portfolio `useScrollSections` hook for a modal
 * (or other nested) scroll root instead of window scroll.
 */
export function useCaseStudyStickyScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  scrollRootRef?: React.RefObject<HTMLElement | null>
) {
  React.useLayoutEffect(() => {
    let rafId = 0
    let cancelled = false

    const run = () => {
      const section = sectionRef.current
      if (!section) return

      const panels = section.querySelectorAll<HTMLElement>("[data-ss-panel]")
      const images = section.querySelectorAll<HTMLElement>("[data-ss-img]")
      const dots = section.querySelectorAll<HTMLElement>("[data-ss-dot]")
      const cap = section.querySelector<HTMLElement>("[data-ss-caption]")

      if (!panels.length) return

      const activate = (imgIdx: number, captionText: string | undefined) => {
        images.forEach((img) => {
          const idx = parseInt(img.dataset.ssImg ?? "-1", 10)
          img.classList.toggle("opacity-100", idx === imgIdx)
          img.classList.toggle("opacity-0", idx !== imgIdx)
          img.classList.toggle("pointer-events-auto", idx === imgIdx)
          img.classList.toggle("pointer-events-none", idx !== imgIdx)
          img.setAttribute("aria-hidden", idx === imgIdx ? "false" : "true")
        })
        dots.forEach((dot, i) => {
          dot.classList.toggle("bg-[#e07a4d]", i === imgIdx)
          dot.classList.toggle("scale-150", i === imgIdx)
          dot.classList.toggle("bg-white/35", i !== imgIdx)
        })
        if (cap && captionText !== undefined) cap.textContent = captionText
      }

      const root = scrollRootRef?.current
      const rootRect = root?.getBoundingClientRect()
      const vh = rootRect?.height ?? window.innerHeight
      const rootTop = rootRect?.top ?? 0

      // Reading band relative to the scroll viewport
      const bandTop = rootTop + vh * 0.22
      const bandBottom = rootTop + vh * 0.48
      const probeY = rootTop + vh * 0.32

      const panelEls = Array.from(panels)
      let bestI = 0
      let bestOverlap = Number.NEGATIVE_INFINITY
      for (let i = 0; i < panelEls.length; i++) {
        const r = panelEls[i].getBoundingClientRect()
        const overlap = Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop)
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestI = i
        }
      }

      if (bestOverlap >= 0) {
        activate(
          parseInt(panelEls[bestI].dataset.ssImgIndex ?? String(bestI), 10),
          panelEls[bestI].dataset.ssCaption ?? ""
        )
        return
      }

      const firstR = panelEls[0].getBoundingClientRect()
      const last = panelEls[panelEls.length - 1]
      const lastR = last.getBoundingClientRect()

      if (probeY < firstR.top) {
        activate(
          parseInt(panelEls[0].dataset.ssImgIndex ?? "0", 10),
          panelEls[0].dataset.ssCaption ?? ""
        )
        return
      }
      if (probeY > lastR.bottom) {
        activate(
          parseInt(last.dataset.ssImgIndex ?? String(panelEls.length - 1), 10),
          last.dataset.ssCaption ?? ""
        )
        return
      }

      let bestIdx = 0
      let bestCaption = panelEls[0].dataset.ssCaption ?? ""
      let bestDist = Infinity
      for (let i = 0; i < panelEls.length; i++) {
        const r = panelEls[i].getBoundingClientRect()
        const mid = (r.top + r.bottom) / 2
        const d = Math.abs(mid - probeY)
        if (d < bestDist) {
          bestDist = d
          bestIdx = parseInt(panelEls[i].dataset.ssImgIndex ?? String(i), 10)
          bestCaption = panelEls[i].dataset.ssCaption ?? ""
        }
      }
      activate(bestIdx, bestCaption)
    }

    const schedule = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        if (!cancelled) run()
      })
    }

    const initFrame = requestAnimationFrame(() => {
      if (cancelled) return
      run()
      requestAnimationFrame(() => {
        if (!cancelled) run()
      })
    })

    const root = scrollRootRef?.current ?? window
    root.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      cancelled = true
      cancelAnimationFrame(initFrame)
      if (rafId) cancelAnimationFrame(rafId)
      root.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [sectionRef, scrollRootRef])
}
