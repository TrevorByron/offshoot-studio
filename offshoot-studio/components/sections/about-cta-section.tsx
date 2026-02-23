"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"

const CAL_EMBED_JS_URL = "https://app.cal.com/embed/embed.js"
const CAL_ORIGIN = "https://app.cal.com"
const CAL_LINK = "offshoot-studio/30min"

export function AboutCTASection() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "30min", embedJsUrl: CAL_EMBED_JS_URL })
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
            Tiger Team Studios currently takes on 2-3 projects per quarter. Typical lead time is 2-3 weeks.
          </p>
        </div>
        <div className="mb-8 border border-border rounded-lg p-4 bg-card">
          <Cal
            namespace="30min"
            calLink={CAL_LINK}
            calOrigin={CAL_ORIGIN}
            embedJsUrl={CAL_EMBED_JS_URL}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </div>
        <Card className="bg-card">
          <CardContent className="p-4 md:p-6 text-left md:text-center">
            <h3 className="text-lg font-semibold mb-2">
              Interested in joining Tiger Team Studios?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're building a network of exceptional design engineers.
            </p>
            <a
              href="mailto:hello@htcreative.com"
              className="text-primary hover:underline font-medium"
            >
              hello@htcreative.com
            </a>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
