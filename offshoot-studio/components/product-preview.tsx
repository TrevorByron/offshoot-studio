"use client"

import { TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function ProductPreview() {
  const [isPolished, setIsPolished] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isStatusReady, setIsStatusReady] = useState(false)
  const [isFlickering, setIsFlickering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to start animation when component is in view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            // Start polish animation after a brief delay
            setTimeout(() => {
              setIsPolished(true)
            }, 100)
            
            // Start status flickering animation
            setTimeout(() => {
              // Flicker for about 1.2 seconds, then turn green
              let flickerCount = 0
              const maxFlickers = 8
              const flickerInterval = setInterval(() => {
                setIsFlickering((prev) => {
                  flickerCount++
                  if (flickerCount >= maxFlickers) {
                    clearInterval(flickerInterval)
                    setIsStatusReady(true)
                    return false
                  }
                  return !prev
                })
              }, 150)
            }, 2500) // Start flickering near the end of polish animation
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasStarted])

  return (
    <div 
      ref={containerRef}
      className={`mt-4 rounded-lg border border-border bg-card shadow-sm h-[270px] flex flex-col overflow-hidden transition-all duration-[3000ms] ${
        isPolished ? "grayscale-0" : "grayscale"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-border">
        <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
          <BarChart3 className="size-5 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-card-foreground truncate">
            Product Dashboard
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div 
            className={`bg-muted rounded-lg p-2 border border-border transition-all duration-[3000ms] ${
              isPolished 
                ? "translate-x-0 translate-y-0 rotate-0" 
                : "translate-x-[-4px] translate-y-[2px] rotate-[-1.5deg]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="size-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase">Users</span>
            </div>
            <div className="text-sm font-semibold text-card-foreground">12.4K</div>
            <div className="text-[10px] text-green-600 flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              +24%
            </div>
          </div>
          <div 
            className={`bg-muted rounded-lg p-2 border border-border transition-all duration-[3000ms] delay-75 ${
              isPolished 
                ? "translate-x-0 translate-y-0 rotate-0" 
                : "translate-x-[3px] translate-y-[-2px] rotate-[1.2deg]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="size-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase">Revenue</span>
            </div>
            <div className="text-sm font-semibold text-card-foreground">$89K</div>
            <div className="text-[10px] text-green-600 flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              +18%
            </div>
          </div>
          <div 
            className={`bg-muted rounded-lg p-2 border border-border transition-all duration-[3000ms] delay-150 ${
              isPolished 
                ? "translate-x-0 translate-y-0 rotate-0" 
                : "translate-x-[-3px] translate-y-[2px] rotate-[-1deg]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="size-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase">Growth</span>
            </div>
            <div className="text-sm font-semibold text-card-foreground">142%</div>
            <div className="text-[10px] text-green-600 flex items-center gap-0.5">
              <TrendingUp className="size-2.5" />
              +32%
            </div>
          </div>
        </div>

        {/* Chart area */}
        <div 
          className={`flex-1 bg-muted rounded-lg border border-border p-3 flex flex-col transition-all duration-[3000ms] delay-200 ${
            isPolished 
              ? "translate-x-0 translate-y-0 rotate-0" 
              : "translate-x-[2px] translate-y-[-2px] rotate-[0.8deg]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Performance</span>
            <span className="text-[10px] text-muted-foreground">Last 30 days</span>
          </div>
          {/* Simple bar chart */}
          <div className="flex-1 flex items-end gap-1.5">
            {[65, 78, 82, 71, 88, 92, 85].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500/60 to-purple-400/40 rounded-t border border-purple-500/40"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom status */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div 
              className={`size-2 rounded-full transition-colors duration-150 ${
                isStatusReady 
                  ? "bg-green-500" 
                  : isFlickering 
                    ? "bg-green-500 opacity-30" 
                    : "bg-muted-foreground/50"
              }`}
            />
            <span className="text-muted-foreground">
              {isStatusReady ? "All systems operational" : "Systems not ready"}
            </span>
          </div>
          <span className="text-muted-foreground">Enterprise ready</span>
        </div>
      </div>
    </div>
  )
}
