"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const TOTAL_ANIMATION_MS = 3000 // 3 seconds total
const EVENT_COUNT = 4
const EVENT_INTERVAL_MS = TOTAL_ANIMATION_MS / EVENT_COUNT // 750ms per event

export function CalendarPreview() {
  const [visibleEvents, setVisibleEvents] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  const dates = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date
  })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const events = [
    { date: dates[0], title: "🏁 Kickoff Day", color: "bg-blue-500/40", borderColor: "border-blue-500" },
    { date: dates[1], title: "🚧 Ideation and building", color: "bg-green-500/40", borderColor: "border-green-500" },
    { date: dates[2], title: "🕵️ Testing Day", color: "bg-yellow-500/40", borderColor: "border-yellow-500" },
    { date: dates[3], title: "🎉 Refine and decide!", color: "bg-purple-500/40", borderColor: "border-purple-500" },
  ]

  const currentMonth = monthNames[today.getMonth()]
  const currentYear = today.getFullYear()

  // IntersectionObserver to start animation when component is in view
  useEffect(() => {
    if (!containerRef.current || hasStarted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            // Show first event immediately
            setVisibleEvents(1)
            // Then show remaining events one by one
            let currentIndex = 1
            const interval = setInterval(() => {
              currentIndex++
              setVisibleEvents(currentIndex)
              if (currentIndex >= EVENT_COUNT) {
                clearInterval(interval)
              }
            }, EVENT_INTERVAL_MS)
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
    <div ref={containerRef} className="mt-4 rounded-lg border border-border bg-card shadow-sm overflow-hidden h-[270px] flex flex-col">
      {/* Calendar header */}
      <div className="border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src="/google-calendar-icon.png"
                alt="Google Calendar"
                width={40}
                height={40}
                className="rounded-lg w-full h-full object-cover"
                unoptimized
              />
            </div>
            <span className="font-semibold text-sm text-card-foreground">
              {currentMonth} {currentYear}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted rounded">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1 hover:bg-muted rounded">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar days */}
      <div className="divide-y divide-border flex-1 overflow-y-auto">
        {events.map((event, index) => {
          const dayLabel = dayNames[event.date.getDay()]
          const dayNumber = event.date.getDate()
          const isVisible = index < visibleEvents
          
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-1.5 hover:bg-muted/50 transition-colors"
            >
              {/* Day number */}
              <div className="flex flex-col items-center min-w-[2.5rem] pt-1">
                <span className="text-xs text-muted-foreground uppercase">{dayLabel}</span>
                <span className="text-lg font-medium text-card-foreground">{dayNumber}</span>
              </div>

              {/* Event block */}
              <div className="flex-1 min-w-0">
                <div
                  className={`${event.color} ${event.borderColor} border rounded px-2 py-1.5 text-white text-xs font-medium shadow-sm transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-95"
                  }`}
                >
                  {event.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
