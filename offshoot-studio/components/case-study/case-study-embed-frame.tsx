"use client"

import * as React from "react"

const DEFAULT_FRAME_BACKGROUND = "/background-images/two-on-rock.png"
const SCALE = 0.8

/**
 * Extract YouTube video ID from an embed URL and return the watch URL.
 * Handles both youtube.com and youtube-nocookie.com embed URLs.
 */
function getYoutubeWatchUrl(embedUrl: string): string | null {
  try {
    const url = new URL(embedUrl)
    const pathMatch = url.pathname.match(/^\/embed\/([^/?]+)/)
    const videoId = pathMatch?.[1] ?? url.searchParams.get("v")
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`
    }
  } catch {
    // ignore
  }
  return null
}

/**
 * Browser-window style frame for embedding a live URL (e.g. prototype) in a
 * case study. Reuses the same chrome as CaseStudyBrowserFrame; content area
 * renders an iframe inside a scaling wrapper so the page appears smaller.
 * When the embed is YouTube and a poster is provided, shows a fallback overlay
 * until the iframe loads; if the iframe is blocked, the poster stays visible
 * and links to the video on YouTube.
 */
interface CaseStudyEmbedFrameProps {
  embedUrl: string
  className?: string
  /** Background image for the outer frame/bezel. Defaults to /background-images/two-on-rock.png */
  backgroundImage?: string
  /** Optional poster image for YouTube fallback when iframe is blocked (e.g. /case-study-covers/procore-cover.png) */
  posterImage?: string
  /** Label for the fallback link (e.g. "Play on YouTube"). Default: "Play on YouTube" */
  fallbackLabel?: string
  /** Optional max-width in px for the container (e.g. 420 for phone-style prototype). */
  maxWidth?: number
}

export function CaseStudyEmbedFrame({
  embedUrl,
  className,
  backgroundImage = DEFAULT_FRAME_BACKGROUND,
  posterImage,
  fallbackLabel = "Play on YouTube",
  maxWidth,
}: CaseStudyEmbedFrameProps) {
  const isYoutube = embedUrl.includes("youtube.com") || embedUrl.includes("youtube-nocookie.com")
  const scale = isYoutube ? 1 : SCALE
  const innerSizePercent = scale < 1 ? Math.round((1 / scale) * 100) : 100

  const hasFallback = Boolean(isYoutube && posterImage)
  const [showFallback, setShowFallback] = React.useState(hasFallback)
  const watchUrl = React.useMemo(
    () => (isYoutube ? getYoutubeWatchUrl(embedUrl) : null),
    [isYoutube, embedUrl]
  )

  const handleIframeLoad = React.useCallback(() => {
    if (hasFallback) {
      setShowFallback(false)
    }
  }, [hasFallback])

  return (
    <div
      className={`relative p-2 md:p-6 w-full rounded-lg overflow-hidden bg-cover bg-center ${className ?? ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`relative w-full bg-white shadow-lg flex flex-col border border-gray-200/80 ${maxWidth != null ? "rounded-[2rem]" : "rounded-lg"}`}
        style={maxWidth != null ? { maxWidth: `${maxWidth}px`, marginLeft: "auto", marginRight: "auto", height: "80vh" } : undefined}
      >
        <div className="flex items-center p-4 pb-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>
        <div
          className={`relative w-full overflow-hidden ${maxWidth != null ? "flex-1 min-h-0 rounded-b-[2rem]" : "aspect-video rounded-b-lg"}`}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-0 origin-top-left overflow-hidden"
            style={
              maxWidth != null
                ? { width: "100%", height: "100%" }
                : {
                    width: `${innerSizePercent}%`,
                    height: `${innerSizePercent}%`,
                    transform: scale < 1 ? `scale(${scale})` : "none",
                  }
            }
          >
            <iframe
              src={embedUrl}
              title="Embedded video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </div>
          {hasFallback && showFallback && watchUrl && (
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center rounded-b-lg bg-black/20 transition-opacity hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-white"
              aria-label={fallbackLabel}
            >
              <span className="sr-only">{fallbackLabel}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterImage}
                alt=""
                className="absolute inset-0 h-full w-full object-contain rounded-b-lg pointer-events-none"
              />
              <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg ring-2 ring-white/50">
                <svg
                  className="ml-1 h-8 w-8 text-gray-900"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
