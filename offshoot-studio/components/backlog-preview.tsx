"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { CheckListIcon } from "@hugeicons/core-free-icons"
import { useState, useEffect, useRef } from "react"

const BACKLOG_ITEMS = [
  { title: "New onboarding flow", badge: "Someday" },
  { title: "Pricing page A/B test", badge: "Someday" },
  { title: "Mobile app v2", badge: "Someday" },
  { title: "Dashboard redesign", badge: "Someday" },
]

export function BacklogPreview() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || hasStarted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            setVisibleCount(1)
            let current = 1
            const interval = setInterval(() => {
              current++
              setVisibleCount(current)
              if (current >= BACKLOG_ITEMS.length) clearInterval(interval)
            }, 200)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  return (
    <div
      ref={containerRef}
      className="mt-4 rounded-lg border border-border bg-card shadow-sm overflow-hidden h-[270px] flex flex-col"
    >
      <div className="border-b border-border p-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={CheckListIcon} className="size-5 text-muted-foreground" strokeWidth={2} />
          </div>
          <span className="font-semibold text-sm text-card-foreground">
            Backlog
          </span>
        </div>
      </div>
      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {BACKLOG_ITEMS.map((item, index) => {
          const isVisible = index < visibleCount
          return (
            <div
              key={index}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
              }`}
            >
              <span className="text-sm text-card-foreground truncate flex-1 min-w-0">
                {item.title}
              </span>
              <span className="shrink-0 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                {item.badge}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
