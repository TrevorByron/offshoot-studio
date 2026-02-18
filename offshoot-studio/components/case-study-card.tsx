import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface CaseStudyCardProps {
  title: string
  badge?: string
  description: string[]
  imageBackground: string
  imageScreenshot: string
  imagePosition?: "left" | "right"
  imageAlt?: string
  footerLinkHref?: string
  footerLinkLabel?: string
}

export function CaseStudyCard({
  title,
  badge,
  description,
  imageBackground,
  imageScreenshot,
  imagePosition = "right",
  imageAlt,
  footerLinkHref,
  footerLinkLabel,
}: CaseStudyCardProps) {
  const isImageLeft = imagePosition === "left"
  
  // Content order: if image is left, content should be order-2, otherwise order-1
  const contentOrder = isImageLeft ? "order-2 md:order-2" : "order-1 md:order-1"
  // Image order: if image is left, image should be order-1, otherwise order-2
  const imageOrder = isImageLeft ? "order-1 md:order-1" : "order-2 md:order-2"
  // Grid columns: image always takes 65%, text always takes 35%
  // When image is left: [13fr_7fr] (65% image, 35% text)
  // When image is right: [7fr_13fr] (35% text, 65% image)
  const gridCols = isImageLeft ? "md:grid-cols-[13fr_7fr]" : "md:grid-cols-[7fr_13fr]"

  return (
    <div className="mb-10 md:mb-14 bg-[#f0f0f0] md:bg-[#fafafa] dark:bg-card rounded-lg p-4 md:p-6">
      <div className={`flex flex-col md:grid ${gridCols} gap-8 md:gap-12 md:items-stretch`}>
        <div className={`max-w-3xl ${contentOrder} flex flex-col justify-center`}>
          <h2 className="text-2xl font-semibold md:text-3xl mb-2">
            {title}
          </h2>
          {badge && (
            <Badge variant="secondary" className="mb-4">
              {badge}
            </Badge>
          )}
          {description.map((paragraph, index) => (
            <p
              key={index}
              className={`text-muted-foreground text-sm leading-relaxed ${
                index < description.length - 1 ? "mb-4" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
          {footerLinkHref && (
            <a
              href={footerLinkHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              {footerLinkLabel ?? "See Prototype"}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
        <div
          className={`relative p-2 md:p-6 w-full min-h-[70vh] md:h-full rounded-lg overflow-hidden bg-cover bg-center ${imageOrder}`}
          style={{ backgroundImage: `url(${imageBackground})`, paddingRight: '-24px' }}
        >
          <div
            className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg flex flex-col"
            style={{ width: 'calc(100% + 48px)', marginRight: '-48px' }}
          >
            <div className="flex items-center p-4 pb-3 border-b border-border">
              <div className="flex items-center" style={{ gap: '8px' }}>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-b-lg">
              <Image
                src={imageScreenshot}
                alt={imageAlt || `${title} screenshot`}
                fill
                unoptimized
                className="object-cover object-left-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
