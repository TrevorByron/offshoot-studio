"use client"

import * as React from "react"
import type { CaseStudyContent, CaseStudyIntroBlock } from "@/lib/case-studies"
import {
  isBeforeAfterGroupSection,
  isBeforeAfterSection,
} from "@/lib/case-studies"
import { CaseStudyBlock } from "./case-study-block"
import { CaseStudyBeforeAfterBlock } from "./case-study-before-after-block"
import { CaseStudyBeforeAfterGroupBlock } from "./case-study-before-after-group-block"
import { CaseStudyBanner } from "./case-study-banner"

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

interface CaseStudyImmersiveDarkProps {
  caseStudy: CaseStudyContent
  scrollRootRef: React.RefObject<HTMLElement | null>
}

/**
 * Portfolio-style immersive layout for Scout Fuel and similar case studies.
 * Breaks from the default card-template modal: stacked hero, continuous dark canvas,
 * no light footer chrome.
 */
export function CaseStudyImmersiveDark({
  caseStudy,
  scrollRootRef,
}: CaseStudyImmersiveDarkProps) {
  // Skip the first empty "Overview" shell section when intro is rendered in the hero.
  const contentSections = caseStudy.sections.filter((section, i) => {
    if (i !== 0) return true
    if (isBeforeAfterSection(section) || isBeforeAfterGroupSection(section)) return true
    return Boolean(
      section.images?.length ||
        section.embedUrl ||
        section.customMedia ||
        section.bodyBlocks?.length ||
        section.text
    )
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="mx-auto max-w-7xl px-4 md:px-6 pt-6 md:pt-10 pb-12 md:pb-16">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.14em] text-white/45 mb-4">
          Case Study — {caseStudy.title.replace(/\s*—\s*/, " · ")}
        </p>
        <h1
          id="case-study-modal-title"
          className="text-3xl md:text-5xl font-normal tracking-tight leading-[1.1] mb-8 md:mb-10"
        >
          {caseStudy.title.includes("—") ? (
            <>
              {caseStudy.title.split("—")[0].trim()}
              <br />
              <span className="text-white/90">{caseStudy.title.split("—").slice(1).join("—").trim()}</span>
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

      <div className="mx-auto max-w-7xl px-4 md:px-6 pb-20 md:pb-28 space-y-20 md:space-y-28">
        {contentSections.map((section, i) =>
          isBeforeAfterGroupSection(section) ? (
            <CaseStudyBeforeAfterGroupBlock
              key={i}
              section={section}
              scrollRootRef={scrollRootRef}
            />
          ) : isBeforeAfterSection(section) ? (
            <CaseStudyBeforeAfterBlock
              key={i}
              section={section}
              scrollRootRef={scrollRootRef}
            />
          ) : (
            <CaseStudyBlock
              key={i}
              section={section}
              isFirstSection={i === 0}
              scrollRootRef={scrollRootRef}
            />
          )
        )}

        {caseStudy.quote && (
          <figure className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 md:px-8 md:py-10">
            <blockquote className="text-xl md:text-2xl leading-snug tracking-tight text-white/95">
              &ldquo;{caseStudy.quote.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 font-geist-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
              {caseStudy.quote.name}
              {caseStudy.quote.title ? ` · ${caseStudy.quote.title}` : ""}
              {caseStudy.quote.company ? ` · ${caseStudy.quote.company}` : ""}
            </figcaption>
          </figure>
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

      {caseStudy.banners?.map((banner, i) => (
        <div key={i} className="border-t border-white/10 bg-[#0a0a0a]">
          <CaseStudyBanner banner={banner} />
        </div>
      ))}
    </div>
  )
}
