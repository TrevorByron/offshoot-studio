"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
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
      cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme: "light" })
    })()
  }, [])

  return (
    <SectionWrapper variant="spacious" id="cta" animateOnScroll={false}>
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
          <motion.div
            ref={cardRef}
            className="mb-0 min-h-[600px] w-full flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Cal
              namespace="30min"
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
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
