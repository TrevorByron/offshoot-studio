"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const PROCORE_OFFSET = 80
const speeds = { desktop: 0.05, laptop: 0.3, ipad: 1.1, phone: 1.5 } as const

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function RecentWorkDeviceStack() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  })

  const easedProgress = useTransform(scrollYProgress, (v) => easeOutCubic(v))

  const yIpad = useTransform(easedProgress, (v) => -v * PROCORE_OFFSET * speeds.ipad)
  const yDesktop = useTransform(easedProgress, (v) => -v * PROCORE_OFFSET * speeds.desktop)
  const yLaptop = useTransform(easedProgress, (v) => -v * PROCORE_OFFSET * speeds.laptop)
  const yPhone = useTransform(easedProgress, (v) => -v * PROCORE_OFFSET * speeds.phone)

  return (
    <div
      ref={containerRef}
      className="w-screen max-w-none ml-[calc(50%-50vw)] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center overflow-visible"
      style={{ minHeight: "min(420px, 50vh)" }}
    >
      <motion.div className="w-full h-full flex items-end justify-start gap-0 px-5 md:px-10 min-[1550px]:pl-[70px] min-[1620px]:pl-[120px] overflow-visible -mt-[120px]">
        {/* 1. iPad */}
        <motion.div
          className="flex items-end justify-center h-full flex-shrink-0 relative"
          style={{
            width: "clamp(260px, 24vw, 360px)",
            zIndex: 2,
            y: yIpad,
          }}
        >
          <div className="relative w-full h-[min(280px,60vh)]">
            <Image
              src="/procore-ipad.png"
              alt="Procore on iPad"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 260px, 24vw"
            />
          </div>
        </motion.div>

        {/* 2. Desktop */}
        <motion.div
          className="flex items-end justify-center h-full flex-shrink-0 relative max-md:min-w-[500px]"
          style={{
            width: "clamp(320px, 48vw, 700px)",
            marginLeft: "calc(clamp(-32px, -6vw, -64px) - 80px)",
            zIndex: 1,
            y: yDesktop,
          }}
        >
          <div className="relative w-full h-[min(320px,65vh)]">
            <Image
              src="/procore-desktop.png"
              alt="Procore on desktop"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 500px, 48vw"
            />
          </div>
        </motion.div>

        {/* 3. Laptop - hidden below md */}
        <motion.div
          className="hidden md:flex items-end justify-center h-full flex-shrink-0 relative"
          style={{
            width: "clamp(320px, 40vw, 600px)",
            marginLeft: "-145px",
            zIndex: 3,
            y: yLaptop,
          }}
        >
          <div className="relative w-full h-[min(300px,62vh)]">
            <Image
              src="/procore-laptop.png"
              alt="Procore on laptop"
              fill
              className="object-contain object-bottom"
              sizes="40vw"
            />
          </div>
        </motion.div>

        {/* 4. Phone - hidden below lg */}
        <motion.div
          className="hidden lg:flex items-end justify-center h-full flex-shrink-0 relative"
          style={{
            width: "clamp(72px, 10vw, 130px)",
            marginLeft: "-135px",
            zIndex: 4,
            y: yPhone,
          }}
        >
          <div className="relative w-full h-[min(200px,45vh)]">
            <Image
              src="/procore-phone.png"
              alt="Procore on phone"
              fill
              className="object-contain object-bottom"
              sizes="10vw"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
