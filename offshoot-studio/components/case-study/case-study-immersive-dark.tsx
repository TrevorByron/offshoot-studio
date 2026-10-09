"use client"

import * as React from "react"
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
import { CaseStudyBlock } from "./case-study-block"
import { CaseStudyBeforeAfterBlock } from "./case-study-before-after-block"
import { CaseStudyBeforeAfterGroupBlock } from "./case-study-before-after-group-block"
import { CaseStudySideBySideBlock } from "./case-study-side-by-side-block"
import { CaseStudyStickyScroll } from "./case-study-sticky-scroll"

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

function IntroBlocks({ blocks }: { blocks: CaseStudyIntroBlock[] }) {
  const lede = blocks.filter((b) => b.type === "paragraph" && !b.label && !b.href)
  const meta = blocks.filter((b) => b.type === "paragraph" && b.label)
  const links = blocks.filter((b) => b.type === "paragraph" && b.href)
  const lists = blocks.filter((b) => b.type === "list")

  return (
    <div className="space-y-8">
      <div className="space-y-4 max-w-3xl">
        {lede.map((block, i) =>
          block.type === "paragraph" ? (
            <p key={i} className="text-[15px] md:text-base leading-relaxed text-white/70">
              <RichText text={block.text} />
            </p>
          ) : null
        )}
        {lists.map((block, i) =>
          block.type === "list" ? (
            <ul key={`list-${i}`} className="list-disc list-inside space-y-2 text-white/70 text-[15px]">
              {block.items.map((item, j) => (
                <li key={j}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          ) : null
        )}
      </div>

      {meta.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 pt-2 border-t border-white/10">
          {meta.map((block, i) =>
            block.type === "paragraph" ? (
              <div key={i} className="space-y-1">
                <p className="font-geist-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                  {block.label}
                </p>
                <p className="text-sm text-white/85 leading-snug">{block.text}</p>
              </div>
            ) : null
          )}
        </div>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {links.map((block, i) =>
            block.type === "paragraph" && block.href ? (
              <a
                key={i}
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-geist-mono text-sm text-[#e07a4d] underline underline-offset-4 hover:text-[#f0a07a] transition-colors"
              >
                {block.text}
              </a>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}

function isNextStepsSection(section: CaseStudySection): boolean {
  const label = section.label?.toLowerCase() ?? ""
  const heading = section.heading?.toLowerCase() ?? ""
  return label.includes("going forward") || heading.includes("next steps")
}

function isShowcaseSection(section: CaseStudySection): boolean {
  return Boolean(section.showcaseBleed)
}

/** Process / contrast row sits outside the sticky scroll band (matches portfolio). */
function isProcessSection(section: CaseStudySection): boolean {
  const label = section.label?.toLowerCase() ?? ""
  const heading = section.heading?.toLowerCase() ?? ""
  return label.includes("2020") || heading.includes("update in process")
}

function isStickyScrollPanel(section: CaseStudySectionItem): section is CaseStudySection {
  if (
    isBeforeAfterSection(section) ||
    isBeforeAfterGroupSection(section) ||
    isSideBySideSection(section)
  ) {
    return false
  }
  if (
    isShowcaseSection(section) ||
    isNextStepsSection(section) ||
    isProcessSection(section)
  ) {
    return false
  }
  return Boolean(
    section.customMedia ||
      section.embedUrl ||
      section.images?.length ||
      section.bodyBlocks?.length ||
      section.text
  )
}

interface CaseStudyImmersiveDarkProps {
  caseStudy: CaseStudyContent
  scrollRootRef: React.RefObject<HTMLElement | null>
}

/**
 * Portfolio-style immersive layout for Scout Fuel:
 * - Hero intro + first visual (before/after) full width
 * - Process row: text left / media right (sticky within the row)
 * - Sticky scroll band: left panels scroll, right media stays put + crossfades
 * - Last visual (prototype showcase) full width
 * - Next steps + quote + tags
 */
export function CaseStudyImmersiveDark({
  caseStudy,
  scrollRootRef,
}: CaseStudyImmersiveDarkProps) {
  const contentSections = caseStudy.sections.filter((section, i) => {
    if (i !== 0) return true
    if (
      isBeforeAfterSection(section) ||
      isBeforeAfterGroupSection(section) ||
      isSideBySideSection(section)
    ) {
      return true
    }
    return Boolean(
      section.images?.length ||
        section.embedUrl ||
        section.customMedia ||
        section.bodyBlocks?.length ||
        section.text
    )
  })

  const nextStepsIndex = contentSections.findIndex(
    (s) =>
      !isBeforeAfterSection(s) &&
      !isBeforeAfterGroupSection(s) &&
      !isSideBySideSection(s) &&
      isNextStepsSection(s)
  )
  const nextStepsSection =
    nextStepsIndex >= 0 ? (contentSections[nextStepsIndex] as CaseStudySection) : null
  const sectionsWithoutNextSteps =
    nextStepsIndex >= 0
      ? contentSections.filter((_, i) => i !== nextStepsIndex)
      : contentSections

  // Group consecutive sticky-scroll panels into one band (portfolio scout-scroll).
  type RenderChunk =
    | { kind: "single"; section: CaseStudySectionItem; index: number }
    | { kind: "sticky"; panels: CaseStudySection[]; index: number }

  const chunks: RenderChunk[] = []
  let stickyBuffer: CaseStudySection[] = []
  let stickyStartIndex = 0

  const flushSticky = () => {
    if (!stickyBuffer.length) return
    chunks.push({ kind: "sticky", panels: stickyBuffer, index: stickyStartIndex })
    stickyBuffer = []
  }

  sectionsWithoutNextSteps.forEach((section, i) => {
    if (isStickyScrollPanel(section)) {
      if (!stickyBuffer.length) stickyStartIndex = i
      stickyBuffer.push(section)
      return
    }
    flushSticky()
    chunks.push({ kind: "single", section, index: i })
  })
  flushSticky()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="mx-auto max-w-7xl px-4 md:px-6 pt-6 md:pt-10 pb-10 md:pb-12">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.14em] text-white/45 mb-4">
          Case Study 02 — Scout Fuel
        </p>
        <h1
          id="case-study-modal-title"
          className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1] mb-8 md:mb-10"
        >
          {caseStudy.title.includes("—") ? (
            <>
              {caseStudy.title.split("—")[0].trim()}
              <br />
              <span className="text-white/90">
                {caseStudy.title.split("—").slice(1).join("—").trim()}
              </span>
            </>
          ) : (
            caseStudy.title
          )}
        </h1>

        {caseStudy.introBlocks?.length ? (
          <IntroBlocks blocks={caseStudy.introBlocks} />
        ) : (
          <p className="max-w-3xl text-[15px] md:text-base leading-relaxed text-white/70">
            {caseStudy.introBlurb}
          </p>
        )}
      </header>

      <div className="pb-20 md:pb-28">
        {chunks.map((chunk) => {
          if (chunk.kind === "sticky") {
            return (
              <div
                key={`sticky-${chunk.index}`}
                className="mx-auto max-w-7xl px-4 md:px-6 mt-10 md:mt-16"
              >
                <CaseStudyStickyScroll
                  panels={chunk.panels}
                  scrollRootRef={scrollRootRef}
                />
              </div>
            )
          }

          const { section, index: i } = chunk

          if (isBeforeAfterGroupSection(section)) {
            return (
              <div key={i} className="mx-auto max-w-7xl px-4 md:px-6 mt-10 md:mt-14">
                <CaseStudyBeforeAfterGroupBlock
                  section={section}
                  scrollRootRef={scrollRootRef}
                />
              </div>
            )
          }
          if (isBeforeAfterSection(section)) {
            return (
              <div key={i} className="mx-auto max-w-7xl px-4 md:px-6 mt-10 md:mt-14">
                <CaseStudyBeforeAfterBlock
                  section={section}
                  scrollRootRef={scrollRootRef}
                />
              </div>
            )
          }
          if (isSideBySideSection(section)) {
            return (
              <div key={i} className="mt-4 md:mt-6">
                <CaseStudySideBySideBlock
                  section={section}
                  scrollRootRef={scrollRootRef}
                />
              </div>
            )
          }

          if (isShowcaseSection(section)) {
            return (
              <div
                key={i}
                className="mt-16 md:mt-24 border-t border-white/10 pt-14 md:pt-20"
              >
                <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8 md:mb-10">
                  <CaseStudyBlock
                    section={{
                      ...section,
                      images: [],
                      showcaseBleed: false,
                      linkHref: undefined,
                    }}
                    isFirstSection={false}
                    scrollRootRef={scrollRootRef}
                    layout="stack"
                  />
                </div>
                <CaseStudyBlock
                  section={{
                    ...section,
                    label: undefined,
                    heading: undefined,
                    text: "",
                    bodyBlocks: undefined,
                  }}
                  isFirstSection={false}
                  scrollRootRef={scrollRootRef}
                  layout="stack"
                />
              </div>
            )
          }

          // Process (and any other lone split row): text left, sticky media right
          return (
            <div key={i} className="mx-auto max-w-7xl px-4 md:px-6">
              <CaseStudyBlock
                section={section}
                isFirstSection={false}
                scrollRootRef={scrollRootRef}
                layout="split"
              />
            </div>
          )
        })}

        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-16 md:mt-24 space-y-14 md:space-y-16">
          {(nextStepsSection || caseStudy.quote) && (
            <section className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-14 items-start border-t border-white/10 pt-14 md:pt-20">
              {nextStepsSection ? (
                <div className="space-y-4">
                  {nextStepsSection.label && (
                    <p className="font-geist-mono text-[12px] uppercase tracking-wide text-white/50">
                      {nextStepsSection.label}
                    </p>
                  )}
                  {nextStepsSection.heading && (
                    <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-white">
                      {nextStepsSection.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {(nextStepsSection.bodyBlocks ?? []).map((block, i) =>
                      block.type === "paragraph" ? (
                        <p key={i} className="text-[15px] leading-relaxed text-white/70">
                          <RichText text={block.text} />
                        </p>
                      ) : null
                    )}
                    {!nextStepsSection.bodyBlocks?.length && nextStepsSection.text ? (
                      <p className="text-[15px] leading-relaxed text-white/70">
                        <RichText text={nextStepsSection.text} />
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div />
              )}

              {caseStudy.quote ? (
                <figure className="rounded-2xl border border-white/10 bg-white px-6 py-8 md:px-8 md:py-10 text-[#26251e]">
                  <blockquote className="text-xl md:text-2xl leading-snug tracking-tight">
                    &ldquo;{caseStudy.quote.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 font-geist-mono text-[11px] uppercase tracking-[0.12em] text-[#26251e]/55">
                    {caseStudy.quote.name}
                    {caseStudy.quote.title ? ` · ${caseStudy.quote.title}` : ""}
                    {caseStudy.quote.company ? ` · ${caseStudy.quote.company}` : ""}
                  </figcaption>
                </figure>
              ) : null}
            </section>
          )}

          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-geist-mono text-[11px] text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
