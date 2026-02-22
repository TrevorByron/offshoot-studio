import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.ComponentProps<"section"> {
  variant?: "default" | "spacious" | "compact"
  animateOnScroll?: boolean
  id?: string
}

export function SectionWrapper({
  className,
  variant = "default",
  animateOnScroll = true,
  id,
  children,
  ...props
}: SectionWrapperProps) {
  const paddingClasses = {
    default: "py-20 md:py-28 lg:py-36",
    spacious: "py-28 md:py-36 lg:py-44",
    compact: "py-12 md:py-16 lg:py-20",
  }

  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl px-4 md:px-6",
        paddingClasses[variant],
        animateOnScroll && "animate-on-scroll",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
