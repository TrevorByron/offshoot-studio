import Link from "next/link"
import type { CaseStudyBanner as CaseStudyBannerType } from "@/lib/case-studies"

interface CaseStudyBannerProps {
  banner: CaseStudyBannerType
}

export function CaseStudyBanner({ banner }: CaseStudyBannerProps) {
  const { heading, ctaLabel, ctaHref } = banner
  return (
    <section className="w-full py-14 md:py-18 text-center border-y border-border/60 bg-muted/10">
      <p className="text-xl md:text-2xl font-medium tracking-tight mb-6 text-foreground">
        {heading}
      </p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          target={ctaHref.startsWith("http") ? "_blank" : undefined}
          rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background/80 px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {ctaLabel}
        </Link>
      )}
    </section>
  )
}
