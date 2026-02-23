"use client"

import { createPortal } from "react-dom"
import { useState, useCallback, useEffect } from "react"
import { SectionWrapper } from "./section-wrapper"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDownRight01Icon,
  ZapIcon,
  UserGroupIcon,
  PaintBrush01Icon,
  Layers01Icon,
  CrownIcon,
  TestTubeIcon,
  SparklesIcon,
  Building01Icon,
} from "@hugeicons/core-free-icons"

const TOOLTIP_OFFSET = 20

const whatWeDo = [
  {
    label: "Design Sprints",
    icon: ZapIcon,
    hoverImage: "/what-we-do-hovers/Design Sprints.png",
  },
  {
    label: "Team Expansion",
    icon: UserGroupIcon,
    hoverImage: "/what-we-do-hovers/Team Expansion.png",
  },
  {
    label: "UI/UX Refinement",
    icon: PaintBrush01Icon,
    hoverImage: "/what-we-do-hovers/UI/UX Refinement.png",
  },
  {
    label: "Design systems",
    icon: Layers01Icon,
    hoverImage: "/what-we-do-hovers/Design systems.png",
  },
]

const whoWeWorkWith = [
  {
    title: "Founders & CEOs",
    subtitle: "Flushing Out Ideas",
    hoverText: "who don't want to distract their team",
    icon: CrownIcon,
  },
  {
    title: "Product Leaders",
    subtitle: "Running Experiments Outside the Core Roadmap",
    hoverText: "who have a big bet idea to de-risk",
    icon: TestTubeIcon,
  },
  {
    title: "Early-Stage Startups",
    subtitle: "Looking For Refinement",
    hoverText: "who need to level up the MVP designs",
    icon: SparklesIcon,
  },
  {
    title: "Innovative Enterprises",
    subtitle: "Scaling Design & Product",
    hoverText: "wanting to explore new spaces",
    icon: Building01Icon,
  },
]

const DESKTOP_BREAKPOINT = 768

export function ProblemSection() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [hoveredWhatKey, setHoveredWhatKey] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredKey(null)
  }, [])

  const handleWhatMouseLeave = useCallback(() => {
    setHoveredWhatKey(null)
  }, [])

  const handleWhatTap = useCallback((label: string) => {
    if (!isDesktop) setHoveredWhatKey((k) => (k === label ? null : label))
  }, [isDesktop])

  const handleWhoTap = useCallback((title: string) => {
    if (!isDesktop) setHoveredKey((k) => (k === title ? null : title))
  }, [isDesktop])

  const hoveredItem = hoveredKey
    ? whoWeWorkWith.find((item) => item.title === hoveredKey)
    : null

  const hoveredWhatItem = hoveredWhatKey
    ? whatWeDo.find((item) => item.label === hoveredWhatKey)
    : null

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:flex-wrap md:gap-16 mb-6">
          <ScrollReveal staggerDelay={0} className="flex flex-col gap-4 w-full md:flex-row md:items-start md:gap-12 md:flex-1 md:min-w-0">
            <div className="w-full md:w-[116px] shrink-0">
              <span className="font-geist-mono text-[12px] text-left">
                What we do:
              </span>
            </div>
            <div
              className="flex-1 min-w-0"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleWhatMouseLeave}
            >
              <ul className="font-geist-mono text-lg md:text-[24px] text-left space-y-2">
                <li className="flex items-center gap-2 min-h-9">
                  <HugeiconsIcon
                    icon={ArrowDownRight01Icon}
                    className="size-4 shrink-0 text-foreground"
                    strokeWidth={2}
                    aria-hidden
                  />
                </li>
                {whatWeDo.map(({ label, icon }) => {
                  const isHovered = hoveredWhatKey === label
                  const shouldDim = isDesktop && hoveredWhatKey !== null && !isHovered
                  return (
                    <li
                      key={label}
                      role={isDesktop ? undefined : "button"}
                      tabIndex={isDesktop ? undefined : 0}
                      onKeyDown={
                        isDesktop
                          ? undefined
                          : (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                handleWhatTap(label)
                              }
                            }
                      }
                      className={`flex items-center gap-2 transition-opacity duration-200 touch-manipulation ${
                        shouldDim ? "opacity-40" : "opacity-100"
                      } ${!isDesktop ? "cursor-pointer min-h-[44px]" : ""}`}
                      onMouseEnter={isDesktop ? () => setHoveredWhatKey(label) : undefined}
                      onClick={() => !isDesktop && handleWhatTap(label)}
                    >
                      <HugeiconsIcon
                        icon={icon}
                        className="size-4 shrink-0 text-foreground"
                        strokeWidth={2}
                      />
                      <span>{label}</span>
                    </li>
                  )
                })}
              </ul>
              {!isDesktop && hoveredWhatItem && (
                <div className="mt-4 rounded-lg border border-border/50 shadow-lg overflow-hidden max-w-[280px]">
                  <img
                    src={hoveredWhatItem.hoverImage}
                    alt={hoveredWhatItem.label}
                    className="block w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
          <ScrollReveal staggerDelay={0.1} className="flex flex-col gap-4 w-full md:flex-row md:items-start md:gap-12 md:flex-1 md:min-w-0">
            <div className="w-full md:w-[116px] shrink-0">
              <span className="font-geist-mono text-[12px] text-left">
                Who we work with
              </span>
            </div>
            <div
              className="flex-1 min-w-0"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="font-geist-mono text-lg md:text-[24px] text-left space-y-2">
                <li className="flex items-center gap-2 min-h-9">
                  <HugeiconsIcon
                    icon={ArrowDownRight01Icon}
                    className="size-4 shrink-0 text-foreground"
                    strokeWidth={2}
                    aria-hidden
                  />
                </li>
                {whoWeWorkWith.map(({ title, icon, hoverText }) => {
                  const isHovered = hoveredKey === title
                  const shouldDim = isDesktop && hoveredKey !== null && !isHovered
                  return (
                    <li
                      key={title}
                      role={isDesktop ? undefined : "button"}
                      tabIndex={isDesktop ? undefined : 0}
                      onKeyDown={
                        isDesktop
                          ? undefined
                          : (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                handleWhoTap(title)
                              }
                            }
                      }
                      className={`flex items-center gap-2 transition-opacity duration-200 touch-manipulation ${
                        shouldDim ? "opacity-40" : "opacity-100"
                      } ${!isDesktop ? "cursor-pointer min-h-[44px]" : ""}`}
                      onMouseEnter={isDesktop ? () => setHoveredKey(title) : undefined}
                      onClick={() => !isDesktop && handleWhoTap(title)}
                    >
                      <HugeiconsIcon
                        icon={icon}
                        className="size-4 shrink-0 text-foreground"
                        strokeWidth={2}
                      />
                      <span>{title}</span>
                    </li>
                  )
                })}
              </ul>
              {!isDesktop && hoveredItem && (
                <p className="mt-4 font-geist-mono text-sm text-foreground/90 max-w-[280px]">
                  {hoveredItem.hoverText}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
      {isDesktop &&
        typeof document !== "undefined" &&
        createPortal(
          hoveredItem && (
            <div
              className="fixed left-0 top-0 z-[9999] pointer-events-none font-geist-mono text-sm text-foreground/90 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg max-w-[280px]"
              style={{
                transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
              }}
            >
              {hoveredItem.hoverText}
            </div>
          ),
          document.body
        )}
      {isDesktop &&
        typeof document !== "undefined" &&
        createPortal(
          hoveredWhatItem && (
            <div
              className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-lg border border-border/50 shadow-lg overflow-hidden max-w-[280px]"
              style={{
                transform: `translate(${mousePosition.x + TOOLTIP_OFFSET}px, ${mousePosition.y + TOOLTIP_OFFSET}px)`,
              }}
            >
              <img
                src={hoveredWhatItem.hoverImage}
                alt={hoveredWhatItem.label}
                className="block w-full h-auto object-cover"
              />
            </div>
          ),
          document.body
        )}
    </SectionWrapper>
  )
}
