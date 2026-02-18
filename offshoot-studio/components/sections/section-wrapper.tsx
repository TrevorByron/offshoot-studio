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
    default: "py-16 md:py-24 lg:py-32",
    spacious: "py-24 md:py-32 lg:py-40",
    compact: "py-12 md:py-16 lg:py-20",
  }

  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl px-4",
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
