"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Cal, { getCalApi } from "@calcom/embed-react"
import { SectionWrapper } from "./section-wrapper"

const CAL_EMBED_JS_URL = "https://app.cal.com/embed/embed.js"
const CAL_ORIGIN = "https://app.cal.com"
const CAL_LINK = "offshoot-studio/30min"

export function FinalCTASection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "30min", embedJsUrl: CAL_EMBED_JS_URL })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <SectionWrapper variant="spacious" id="cta" animateOnScroll={false}>
      <div className="mx-auto max-w-5xl text-left md:text-center">
        <h2 className="text-section-title mb-6">
          Book a call.
        </h2>
        <p className="font-pp-neue-montreal text-base text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto text-left md:text-center">
          Test an idea, scale capacity, or polish the product. We'll scope it in 30 minutes.
        </p>
        <motion.div
          ref={cardRef}
          className="mb-8 border border-border rounded-lg p-4 md:p-6 bg-card"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Cal
            namespace="30min"
            calLink={CAL_LINK}
            calOrigin={CAL_ORIGIN}
            embedJsUrl={CAL_EMBED_JS_URL}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
          />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
