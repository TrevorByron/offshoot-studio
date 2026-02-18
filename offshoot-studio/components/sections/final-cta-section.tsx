"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"

export function FinalCTASection() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <SectionWrapper variant="spacious" id="cta">
      <div className="mx-auto max-w-5xl text-left md:text-center">
        <h2 className="text-section-title mb-6">
          Book a call
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto text-left md:text-center">
          Whether you need to test an idea, scale your team, or polish your product—let's talk.
        </p>
        <div className="mb-8 border border-border rounded-lg p-4 md:p-6 bg-muted/50">
          <Cal
            namespace="30min"
            calLink="offshoot-studio/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-6 text-left md:text-center">
          No sales pitch. Just an honest conversation about your needs and how we might help.
        </p>
      </div>
    </SectionWrapper>
  )
}
