"use client"

import * as React from "react"
import type { CaseStudyIntroBlock, CaseStudySection } from "@/lib/case-studies"
import { useCaseStudyStickyScroll } from "@/hooks/use-case-study-sticky-scroll"
import { CaseStudyBrowserFrame } from "./case-study-browser-frame"
import { CaseStudyEmbedFrame } from "./case-study-embed-frame"
import { ScoutCaseStudyMedia } from "./scout/scout-case-study-media"

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

function PanelBody({
  bodyBlocks,
  text,
}: {
  bodyBlocks?: CaseStudyIntroBlock[]
  text?: string
}) {
  if (bodyBlocks?.length) {
    return (
      <div className="space-y-4">
        {bodyBlocks.map((block, i) =>
          block.type === "paragraph" ? (
            <p
              key={i}
              className={`text-[15px] leading-relaxed text-white/65 ${
                block.font === "mono" ? "font-geist-mono text-white/55" : ""
              }`}
            >
              <RichText text={block.text} />
            </p>
          ) : (
            <ul key={i} className="list-disc list-inside space-y-2 text-white/65 text-[15px]">
              {block.items.map((item, j) => (
                <li key={j}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    )
  }
  if (!text) return null
  return (
    <div className="space-y-4">
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-white/65 whitespace-pre-line">
          <RichText text={para} />
        </p>
      ))}
    </div>
  )
}

function PanelMedia({ section }: { section: CaseStudySection }) {
  if (section.embedUrl) {
    return (
      <CaseStudyEmbedFrame
        embedUrl={section.embedUrl}
        className="h-full"
        backgroundImage={section.browserFrameBackground}
        posterImage={section.embedPosterImage}
        fallbackLabel={section.embedFallbackLabel}
        maxWidth={section.embedMaxWidth}
      />
    )
  }
  if (section.customMedia) {
    return (
      <CaseStudyBrowserFrame
        className="h-full min-h-0"
        backgroundImage={section.browserFrameBackground}
        urlLabel={section.browserFrameUrl}
        mediaHeightClassName="h-[min(62vh,520px)]"
      >
        <ScoutCaseStudyMedia kind={section.customMedia} />
      </CaseStudyBrowserFrame>
    )
  }
  if (section.images[0]) {
    return (
      <CaseStudyBrowserFrame
        src={section.images[0]}
        alt=""
        className="h-full min-h-0"
        backgroundImage={section.browserFrameBackground}
        urlLabel={section.browserFrameUrl}
      />
    )
  }
  return null
}

function panelCaption(section: CaseStudySection): string {
  return (
    section.browserFrameUrl?.replace(/^www\./, "") ||
    section.label ||
    section.heading ||
    ""
  )
}

interface CaseStudyStickyScrollProps {
  panels: CaseStudySection[]
  scrollRootRef?: React.RefObject<HTMLElement | null>
}

/**
 * Portfolio sticky-scroll: left text panels scroll; right media stays put and
 * crossfades to match the active panel until the section ends.
 */
export function CaseStudyStickyScroll({
  panels,
  scrollRootRef,
}: CaseStudyStickyScrollProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  useCaseStudyStickyScroll(sectionRef, scrollRootRef)

  if (!panels.length) return null

  return (
    <>
      {/* Desktop / tablet: sticky media column */}
      <section
        ref={sectionRef}
        className="hidden md:grid grid-cols-[42%_58%] items-start border-t border-white/10"
        aria-label="Case study process"
      >
        <div className="min-w-0">
          {panels.map((section, i) => (
            <div
              key={i}
              data-ss-panel
              data-ss-img-index={i}
              data-ss-caption={panelCaption(section)}
              className={`min-h-[100vh] flex flex-col justify-center py-16 lg:py-20 pr-8 lg:pr-12 ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              {section.label && (
                <p className="font-geist-mono text-[11px] uppercase tracking-[0.12em] text-[#e07a4d] mb-5">
                  {section.label}
                </p>
              )}
              {section.heading && (
                <h3 className="text-2xl lg:text-[2rem] font-normal tracking-tight leading-tight text-white mb-6">
                  {section.heading}
                </h3>
              )}
              <div className="max-w-md">
                <PanelBody bodyBlocks={section.bodyBlocks} text={section.text} />
              </div>
            </div>
          ))}
        </div>

        <div
          className="sticky top-16 self-start h-[calc(100vh-4rem)] overflow-visible pl-2 lg:pl-4"
          aria-hidden={false}
        >
          <div className="relative w-full h-full flex items-center">
            {panels.map((section, i) => (
              <div
                key={i}
                data-ss-img={i}
                className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-out ${
                  i === 0
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={i === 0 ? "false" : "true"}
              >
                <div className="w-full">
                  <PanelMedia section={section} />
                </div>
              </div>
            ))}

            <p
              data-ss-caption
              className="absolute bottom-4 left-4 right-4 font-geist-mono text-[10px] uppercase tracking-[0.09em] text-white/40 pointer-events-none z-10"
            >
              {panelCaption(panels[0])}
            </p>

            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
              {panels.map((_, i) => (
                <span
                  key={i}
                  data-ss-dot
                  className={`size-[5px] rounded-full transition-all duration-300 ${
                    i === 0 ? "bg-[#e07a4d] scale-150" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: stacked text + media per panel */}
      <div className="md:hidden border-t border-white/10">
        {panels.map((section, i) => (
          <div
            key={i}
            className={`py-12 space-y-6 ${i > 0 ? "border-t border-white/10" : ""}`}
          >
            {section.label && (
              <p className="font-geist-mono text-[11px] uppercase tracking-[0.12em] text-[#e07a4d]">
                {section.label}
              </p>
            )}
            {section.heading && (
              <h3 className="text-2xl font-normal tracking-tight leading-tight text-white">
                {section.heading}
              </h3>
            )}
            <PanelBody bodyBlocks={section.bodyBlocks} text={section.text} />
            <PanelMedia section={section} />
          </div>
        ))}
      </div>
    </>
  )
}
