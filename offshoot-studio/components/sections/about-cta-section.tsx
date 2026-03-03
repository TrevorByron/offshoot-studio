"use client"

import { useEffect, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"

const CAL_EMBED_JS_URL = "https://app.cal.com/embed/embed.js"
const CAL_ORIGIN = "https://app.cal.com"
const CAL_LINK = "offshoot-studio/30min"
const CAL_NAMESPACE = "30min-about"

export function AboutCTASection() {
  const [calReady, setCalReady] = useState(false)

  useEffect(() => {
    getCalApi({ namespace: CAL_NAMESPACE, embedJsUrl: CAL_EMBED_JS_URL })
      .then(() => setCalReady(true))
      .catch(() => setCalReady(false))
  }, [])

  return (
    <SectionWrapper variant="spacious" id="cta">
      <div className="mx-auto max-w-5xl">
        <div className="text-left md:text-center mb-8">
          <h2 className="text-section-title mb-6">
            Let's work together
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Tiger Team Studios currently takes on 2-3 projects per quarter. Typical lead time is 2-3 weeks.
          </p>
        </div>
        <div className="mb-8 border border-border rounded-lg p-4 bg-card min-h-[600px] w-full flex justify-center">
          {calReady ? (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              calOrigin={CAL_ORIGIN}
              embedJsUrl={CAL_EMBED_JS_URL}
              className="cal-embed-wrapper h-full min-h-[600px] w-full"
              style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }}
              config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: "true",
                theme: "light",
              }}
            />
          ) : (
            <div
              className="cal-embed-wrapper h-full min-h-[600px] w-full flex items-center justify-center rounded-lg border border-border bg-muted/30"
              aria-hidden
            >
              <span className="text-muted-foreground text-sm">Loading calendar…</span>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
