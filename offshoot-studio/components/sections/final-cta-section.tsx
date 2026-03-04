"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"

const CAL_EMBED_JS_URL = "https://app.cal.com/embed/embed.js"
const CAL_ORIGIN = "https://app.cal.com"
const CAL_LINK = "tigerteamstudios/callwithtrevor"

const DEFAULT_CAL_NAMESPACE = "30min"

export interface FinalCTAContentProps {
  calNamespace?: string
  /** Optional wrapper class for Cal embed (e.g. for modal CSS targeting) */
  embedWrapperClassName?: string
}

export function FinalCTAContent({
  calNamespace = DEFAULT_CAL_NAMESPACE,
  embedWrapperClassName,
}: FinalCTAContentProps) {
  const [calReady, setCalReady] = useState(false)

  useEffect(() => {
    getCalApi({ namespace: calNamespace, embedJsUrl: CAL_EMBED_JS_URL })
      .then(() => setCalReady(true))
      .catch(() => setCalReady(false))
  }, [calNamespace])

  return (
    <div className="max-w-7xl">
      <div className="mb-6 text-left">
        <span className="font-geist-mono text-[12px] whitespace-nowrap">
          Get in touch:
        </span>
      </div>
      <div className="max-w-6xl text-left mt-6">
        <div className="flex items-start gap-4 mb-8">
          <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full">
            <Image
              src="/trevor-driving.png"
              alt="Trevor"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-0">
            <h2 className="text-section-title mb-0 flex items-center justify-start gap-4">
              Book a call with Trevor
            </h2>
            <p className="font-pp-neue-montreal text-base text-muted-foreground leading-relaxed mb-0 max-w-4xl text-left">
              Test an idea, scale capacity, or polish the product. We'll scope it in 30 minutes.
            </p>
          </div>
        </div>
        <div
          className={
            embedWrapperClassName
              ? `mb-0 min-h-[600px] w-full flex justify-center ${embedWrapperClassName}`
              : "mb-0 min-h-[600px] w-full flex justify-center"
          }
        >
          {calReady ? (
            <Cal
              namespace={calNamespace}
              calLink={CAL_LINK}
              calOrigin={CAL_ORIGIN}
              embedJsUrl={CAL_EMBED_JS_URL}
              className="cal-embed-wrapper h-full min-h-[600px] w-full max-w-4xl"
              style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }}
              config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: "true",
                theme: "light",
              }}
            />
          ) : (
            <div
              className="cal-embed-wrapper h-full min-h-[600px] w-full max-w-4xl flex items-center justify-center rounded-lg border border-border bg-muted/30"
              aria-hidden
            >
              <span className="text-muted-foreground text-sm">Loading calendar…</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function FinalCTASection() {
  return (
    <SectionWrapper variant="spacious" id="cta" animateOnScroll={false}>
      <FinalCTAContent calNamespace={DEFAULT_CAL_NAMESPACE} />
    </SectionWrapper>
  )
}
