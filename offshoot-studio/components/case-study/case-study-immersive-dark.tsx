"use client"

import * as React from "react"
import { Inter } from "next/font/google"
import type {
  CaseStudyContent,
  CaseStudyIntroBlock,
  CaseStudySection,
  CaseStudySectionItem,
} from "@/lib/case-studies"
import {
  isBeforeAfterGroupSection,
  isBeforeAfterSection,
  isSideBySideSection,
} from "@/lib/case-studies"
import { ScoutCaseStudyMedia } from "./scout/scout-case-study-media"
import "./scout-review-layout.css"

const scoutSans = Inter({
  subsets: ["latin"],
  variable: "--font-scout-sans",
  display: "swap",
})

const PANEL_CHROME = [
  { caption: "Research & brief", url: "Research — discovery" },
  { caption: "Vision doc", url: "Design vision — narrative" },
  { caption: "Cursor prompt", url: "www.tweakcn.com" },
  { caption: "First layout", url: "Ideate — V1 prompt" },
  { caption: "Subtractive pass", url: "Refinement — subtractive pass" },
  { caption: "Gamification", url: "Gamification" },
  { caption: "Documentation", url: "Notion — documentation" },
] as const

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

function asStandardSection(section: CaseStudySectionItem): CaseStudySection | null {
  if (
    isBeforeAfterSection(section) ||
    isBeforeAfterGroupSection(section) ||
    isSideBySideSection(section)
  ) {
    return null
  }
  return section
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="bf-chrome">
      <div className="bf-dots">
        <span className="bf-dot bf-red" />
        <span className="bf-dot bf-yellow" />
        <span className="bf-dot bf-green" />
      </div>
      <div className="bf-urlbar">{url}</div>
    </div>
  )
}

function useKeyedScroll(scrollRootRef: React.RefObject<HTMLElement | null>) {
  React.useLayoutEffect(() => {
    let rafId = 0
    let cancelled = false
    let root: HTMLElement | null = null

    const run = () => {
      if (!root) return
      const probeY = window.innerHeight * 0.32
      const bandTop = window.innerHeight * 0.22
      const bandBottom = window.innerHeight * 0.48

      root.querySelectorAll(".scroll-section").forEach((section) => {
        const panels = [...section.querySelectorAll<HTMLElement>(".ss-panel")]
        const images = section.querySelectorAll<HTMLElement>(".ss-img")
        const dots = section.querySelectorAll<HTMLElement>(".ss-dot")
        const cap = section.querySelector(".ss-caption")
        if (!panels.length) return

        const activate = (imgIdx: number, captionText: string | undefined) => {
          images.forEach((img) => {
            const idx = parseInt(img.dataset.index ?? "-1", 10)
            img.classList.toggle("active", idx === imgIdx)
          })
          dots.forEach((dot, i) => dot.classList.toggle("active", i === imgIdx))
          if (cap && captionText !== undefined) cap.textContent = captionText
        }

        let bestI = 0
        let bestOverlap = Number.NEGATIVE_INFINITY
        panels.forEach((panel, i) => {
          const r = panel.getBoundingClientRect()
          const overlap = Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop)
          if (overlap > bestOverlap) {
            bestOverlap = overlap
            bestI = i
          }
        })

        if (bestOverlap >= 0) {
          activate(parseInt(panels[bestI].dataset.img ?? String(bestI), 10), panels[bestI].dataset.caption ?? "")
          return
        }

        const firstR = panels[0].getBoundingClientRect()
        const last = panels[panels.length - 1]
        const lastR = last.getBoundingClientRect()
        if (probeY < firstR.top) {
          activate(parseInt(panels[0].dataset.img ?? "0", 10), panels[0].dataset.caption ?? "")
          return
        }
        if (probeY > lastR.bottom) {
          activate(parseInt(last.dataset.img ?? String(panels.length - 1), 10), last.dataset.caption ?? "")
          return
        }

        let bestIdx = 0
        let bestCaption = panels[0].dataset.caption ?? ""
        let bestDist = Infinity
        panels.forEach((panel, i) => {
          const r = panel.getBoundingClientRect()
          const mid = (r.top + r.bottom) / 2
          const d = Math.abs(mid - probeY)
          if (d < bestDist) {
            bestDist = d
            bestIdx = parseInt(panel.dataset.img ?? String(i), 10)
            bestCaption = panel.dataset.caption ?? ""
          }
        })
        activate(bestIdx, bestCaption)
      })
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
      root = scrollRootRef.current
      if (!root) return
      root.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      run()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(initFrame)
      if (rafId) cancelAnimationFrame(rafId)
      root?.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [scrollRootRef])
}

function PanelBody({ section }: { section: CaseStudySection }) {
  const blocks = section.bodyBlocks ?? []
  if (blocks.length) {
    return (
      <div className="ss-body">
        {blocks.map((block, i) =>
          block.type === "paragraph" ? (
            <p key={i}>
              <RichText text={block.text} />
            </p>
          ) : null
        )}
      </div>
    )
  }
  if (!section.text) return null
  return (
    <div className="ss-body">
      <p>
        <RichText text={section.text} />
      </p>
    </div>
  )
}

function KeyedMedia({ section, index }: { section: CaseStudySection; index: number }) {
  const screenClass =
    section.embedUrl
      ? "bf-screen bf-screen--media bf-screen--iframe"
      : section.images?.[0] && !section.customMedia
        ? "bf-screen bf-screen--media bf-screen--auto-height"
        : "bf-screen bf-screen--media"

  return (
    <div className="bfw">
      <div className="bfw-bg dark" aria-hidden />
      <div className="browser-frame">
        <BrowserChrome url={PANEL_CHROME[index]?.url ?? ""} />
        <div className={screenClass}>
          {section.customMedia ? (
            <ScoutCaseStudyMedia kind={section.customMedia} />
          ) : section.embedUrl ? (
            <iframe
              src={section.embedUrl}
              title={section.heading ?? "Embedded document"}
              loading="lazy"
              allowFullScreen
            />
          ) : section.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={section.images[0]} alt="" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

interface CaseStudyImmersiveDarkProps {
  caseStudy: CaseStudyContent
  scrollRootRef: React.RefObject<HTMLElement | null>
}

export function CaseStudyImmersiveDark({
  caseStudy,
  scrollRootRef,
}: CaseStudyImmersiveDarkProps) {
  useKeyedScroll(scrollRootRef)

  const standards = caseStudy.sections
    .map(asStandardSection)
    .filter((section): section is CaseStudySection => Boolean(section))

  const hero = standards.find((section) => section.heroBleed)
  const process = standards.find((section) => section.heading === "An Update in Process")
  const showcase = standards.find((section) => section.showcaseBleed)
  const nextSteps = standards.find(
    (section) =>
      (section.label?.toLowerCase().includes("going forward") ?? false) ||
      (section.heading?.toLowerCase().includes("next steps") ?? false)
  )
  const narrative = standards.filter(
    (section) => section !== hero && section !== process && section !== showcase && section !== nextSteps
  )

  const lede = (caseStudy.introBlocks ?? []).filter(
    (block): block is Extract<CaseStudyIntroBlock, { type: "paragraph" }> =>
      block.type === "paragraph" && !block.label && !block.href
  )
  const meta = (caseStudy.introBlocks ?? []).filter(
    (block): block is Extract<CaseStudyIntroBlock, { type: "paragraph" }> =>
      block.type === "paragraph" && Boolean(block.label)
  )

  const quoteRaw = process?.imageCaption ?? ""
  const quoteSplit = quoteRaw.replace(/^"|"$/g, "").split(" — ")
  const processQuote = quoteSplit[0]?.replace(/^"|"$/g, "")
  const processAuthor = quoteSplit[1]

  const titleLines = caseStudy.title.includes("—")
    ? caseStudy.title.split("—").map((part) => part.trim())
    : [caseStudy.title]

  return (
    <div className={`${scoutSans.className} ${scoutSans.variable} scout-review`}>
      <div className="page-hero page-hero--scout">
        <p className="label">Case Study 01 — Scout Fuel</p>
        <h2 className="page-headline" id="case-study-modal-title">
          {titleLines.map((line, i) => (
            <React.Fragment key={line}>
              {i > 0 ? <br /> : null}
              {line}
            </React.Fragment>
          ))}
        </h2>
        <div className="page-lede-stack">
          {lede.map((block, i) => (
            <p key={i}>{block.text}</p>
          ))}
        </div>
        {meta.length > 0 && (
          <div className="cs-meta">
            {meta.map((block) => (
              <div key={block.label} className="cs-meta-item">
                <span className="cs-meta-label">{block.label}</span>
                <span className="cs-meta-value">{block.text}</span>
              </div>
            ))}
          </div>
        )}
        <div
          className="cs-hero-bleed"
          role="img"
          aria-label="Before and after browser-framed Scout Fuel dashboard redesign comparison."
        >
          <div className="cs-hero-compare">
            <article className="cs-hero-shot cs-hero-shot--before">
              <div className="cs-hero-shot-meta">
                <p className="cs-hero-shot-kicker">Before</p>
                <p className="cs-hero-shot-title">Legacy UI shipped by engineering</p>
              </div>
              <div className="cs-hero-browser">
                <div className="cs-hero-browser-chrome">
                  <span className="cs-hero-dot cs-hero-dot--red" />
                  <span className="cs-hero-dot cs-hero-dot--yellow" />
                  <span className="cs-hero-dot cs-hero-dot--green" />
                  <span className="cs-hero-url">scoutfuel.app/dashboard</span>
                </div>
                <div className="cs-hero-browser-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/case-studies/scout-fuel/hero-before.png"
                    alt="Original Scout Fuel pricing table."
                    className="cs-hero-bleed-img"
                  />
                </div>
              </div>
            </article>
            <article className="cs-hero-shot cs-hero-shot--after">
              <div className="cs-hero-shot-meta">
                <p className="cs-hero-shot-kicker">After</p>
                <p className="cs-hero-shot-title">Systemized design with clearer hierarchy</p>
              </div>
              <div className="cs-hero-browser">
                <div className="cs-hero-browser-chrome">
                  <span className="cs-hero-dot cs-hero-dot--red" />
                  <span className="cs-hero-dot cs-hero-dot--yellow" />
                  <span className="cs-hero-dot cs-hero-dot--green" />
                  <span className="cs-hero-url">scoutfuel.app/dashboard</span>
                </div>
                <div className="cs-hero-browser-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/case-studies/scout-fuel/hero-after.png"
                    alt="Redesigned Scout Fuel map and fuel finder."
                    className="cs-hero-bleed-img"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {process && (
        <section className="cs-process" id="scout-process" aria-labelledby="scout-process-label">
          <div className="cs-process-inner">
            <div className="cs-process-text">
              {process.label && (
                <p className="ss-num" id="scout-process-label">
                  {process.label}
                </p>
              )}
              {process.heading && <h3 className="ss-title">{process.heading}</h3>}
              <PanelBody section={process} />
            </div>
            <div className="cs-process-visual">
              {process.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={process.images[0]} alt="" width={1100} height={900} />
              )}
              {processQuote && (
                <p className="cs-process-quote">
                  &ldquo;{processQuote}&rdquo;
                  {processAuthor && <span className="cs-process-quote-author">— {processAuthor}</span>}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {narrative.length > 0 && (
        <div className="scroll-section img-right" id="scout-scroll">
          <div className="ss-text-col">
            {narrative.map((section, index) => (
              <div
                key={section.heading ?? index}
                className="ss-panel"
                data-img={index}
                data-caption={PANEL_CHROME[index]?.caption ?? section.heading ?? ""}
              >
                <div className="ss-panel-copy">
                  {section.label && <p className="ss-num">{section.label}</p>}
                  {section.heading && <h3 className="ss-title">{section.heading}</h3>}
                  <PanelBody section={section} />
                </div>
                <div className="ss-inline-stage">
                  <KeyedMedia section={section} index={index} />
                  {PANEL_CHROME[index]?.caption && (
                    <p className="ss-inline-caption">{PANEL_CHROME[index].caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="ss-image-col">
            <div className="ss-image-wrap">
              {narrative.map((section, index) => (
                <div
                  key={section.heading ?? index}
                  className={`ss-img${index === 0 ? " active" : ""}`}
                  data-index={index}
                >
                  <KeyedMedia section={section} index={index} />
                </div>
              ))}
              <div className="ss-caption">{PANEL_CHROME[0]?.caption}</div>
              <div className="ss-progress">
                {narrative.map((section, index) => (
                  <span
                    key={section.heading ?? index}
                    className={`ss-dot${index === 0 ? " active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showcase && (
        <section className="cs-showcase cs-showcase--scout" aria-labelledby="scout-showcase-label">
          <div className="cs-showcase-inner">
            <div className="cs-showcase-wire-lede">
              {showcase.label && (
                <p className="ss-num" id="scout-showcase-label">
                  {showcase.label}
                </p>
              )}
              {showcase.heading && <h3 className="ss-title">{showcase.heading}</h3>}
              <PanelBody section={showcase} />
            </div>
            {showcase.images?.[0] && (
              <div className="bfw cs-showcase-bfw">
                <a
                  href={showcase.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browser-frame browser-frame--showcase"
                  aria-label={showcase.linkAriaLabel ?? "Open live prototype"}
                >
                  <BrowserChrome url={showcase.browserFrameUrl ?? "Click to explore"} />
                  <div className="bf-screen bf-screen--media bf-screen--scout-showcase">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={showcase.images[0]} alt="" />
                  </div>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {nextSteps && (
        <section className="cs-process scout-relevance" aria-labelledby="scout-relevance-label">
          <div className="cs-process-inner scout-relevance-inner">
            <div className="cs-process-text">
              {nextSteps.label && (
                <p className="ss-num" id="scout-relevance-label">
                  {nextSteps.label}
                </p>
              )}
              {nextSteps.heading && <h3 className="ss-title">{nextSteps.heading}</h3>}
              <PanelBody section={nextSteps} />
            </div>
            {caseStudy.quote && (
              <div className="cs-process-visual scout-relevance-visual">
                <figure className="scout-relevance-quote-card">
                  <blockquote className="scout-relevance-quote">{caseStudy.quote.quote}</blockquote>
                  <figcaption className="scout-relevance-quote-source">{caseStudy.quote.name}</figcaption>
                </figure>
              </div>
            )}
          </div>
        </section>
      )}

      {caseStudy.tags && caseStudy.tags.length > 0 && (
        <div className="cs-footer">
          <div className="tags">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
