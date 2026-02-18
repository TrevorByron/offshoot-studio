"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"

export function AboutCTASection() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <SectionWrapper variant="spacious" id="cta">
      <div className="mx-auto max-w-5xl">
        <div className="text-left md:text-center mb-8">
          <h2 className="text-section-title mb-6">
            Let's work together
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Offshoot currently takes on 2-3 projects per quarter. Typical lead time is 2-3 weeks.
          </p>
        </div>
        <div className="mb-8 border border-border rounded-lg p-4 bg-muted/50">
          <Cal
            namespace="30min"
            calLink="offshoot-studio/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
        <Card className="bg-[#f7f7f7] dark:bg-card">
          <CardContent className="p-4 md:p-6 text-left md:text-center">
            <h3 className="text-lg font-semibold mb-2">
              Interested in joining Offshoot Studio?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're building a network of exceptional design engineers.
            </p>
            <a
              href="mailto:hello@offshootstudio.com"
              className="text-primary hover:underline font-medium"
            >
              hello@offshootstudio.com
            </a>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
