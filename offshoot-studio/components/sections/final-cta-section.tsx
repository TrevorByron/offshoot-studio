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
          Book a call.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto text-left md:text-center">
          Test an idea, scale capacity, or polish the product. We'll scope it in 30 minutes.
        </p>
        <div className="mb-8 border border-border rounded-lg p-4 md:p-6 bg-card">
          <Cal
            namespace="30min"
            calLink="ht-creative/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
