"use client"

import * as React from "react"

/**
 * Browser-window style frame for case study screenshots. Matches the container
 * used in CaseStudyCard: outer bezel uses a background image (from
 * public/background-images), inner rounded panel with title bar and content area.
 */
interface CaseStudyBrowserFrameProps {
  src?: string
  alt?: string
  className?: string
  /** Background image for the outer frame/bezel. Defaults to /background-images/two-on-rock.png */
  backgroundImage?: string
  /** Optional URL bar label in the chrome */
  urlLabel?: string
  /** Interactive / custom media instead of an image */
  children?: React.ReactNode
  /** Fixed height for interactive children that fill the frame (absolute inset). */
  mediaHeightClassName?: string
}

const DEFAULT_FRAME_BACKGROUND = "/background-images/two-on-rock.png"

export function CaseStudyBrowserFrame({
  src,
  alt = "",
  className,
  backgroundImage = DEFAULT_FRAME_BACKGROUND,
  urlLabel,
  children,
  mediaHeightClassName = "h-[min(70vh,560px)]",
}: CaseStudyBrowserFrameProps) {
  const hasChildren = Boolean(children)

  return (
    <div
      className={`relative p-2 md:p-6 w-full rounded-lg overflow-hidden bg-cover bg-center ${className ?? ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative w-full bg-white rounded-lg shadow-lg flex flex-col border border-gray-200/80">
        <div className="flex items-center gap-3 p-4 pb-3 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          {urlLabel ? (
            <div className="flex-1 min-w-0 rounded-md bg-gray-100 px-2.5 py-1 text-[11px] text-gray-500 truncate font-geist-mono">
              {urlLabel}
            </div>
          ) : null}
        </div>
        <div
          className={`relative w-full overflow-hidden rounded-b-lg ${
            hasChildren ? mediaHeightClassName : ""
          }`}
        >
          {hasChildren ? (
            <div className="absolute inset-0">{children}</div>
          ) : src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="w-full h-auto block" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
