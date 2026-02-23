"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Briefcase01Icon, UserIcon } from "@hugeicons/core-free-icons"
import { useState, useEffect, useRef } from "react"

const STAGES = [
  { label: "Post", key: "post" },
  { label: "Screen", key: "screen" },
  { label: "Interview", key: "interview" },
  { label: "Offer", key: "offer" },
]

export function HiringTimelinePreview() {
  const [activeStage, setActiveStage] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || hasStarted) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasStarted) {
          setHasStarted(true)
          let step = 0
          const interval = setInterval(() => {
            step++
            setActiveStage(Math.min(step, STAGES.length - 1))
            if (step >= STAGES.length) clearInterval(interval)
          }, 600)
        }
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
            <HugeiconsIcon icon={Briefcase01Icon} className="size-5 text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-sm text-card-foreground block truncate">
              Senior Engineer
            </span>
            <span className="text-xs text-muted-foreground">Open role</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className="flex gap-1.5">
          {STAGES.map((stage, index) => (
            <div
              key={stage.key}
              className={`flex-1 rounded-md border py-2 px-1.5 flex flex-col items-center justify-center min-h-[56px] transition-colors ${
                index <= activeStage
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-muted/30"
              }`}
            >
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {stage.label}
              </span>
              {index === activeStage && (
                <div className="mt-1 flex items-center justify-center gap-0.5 text-primary">
                  <HugeiconsIcon icon={UserIcon} className="size-3" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
          <span>Pipeline</span>
          <span className="font-medium">~90 days to hire</span>
        </div>
      </div>
    </div>
  )
}
