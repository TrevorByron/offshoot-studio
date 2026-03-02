import Link from "next/link"
import { motion } from "framer-motion"
import { CaseStudyBadge } from "@/components/case-study/case-study-badge"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface CaseStudyCardProps {
  title: string
  /** Single badge (used when badges is not provided, e.g. non–case-study projects). */
  badge?: string
  /** All badges to show (e.g. from case study). When set, all are rendered; otherwise badge is used. */
  badges?: string[]
  description: string[]
  imageBackground: string
  imageScreenshot: string
  imagePosition?: "left" | "right"
  imageAlt?: string
  /** When true, image area shows only the cover image (no browser-chrome frame). */
  coverImageOnly?: boolean
  footerLinkHref?: string
  footerLinkLabel?: string
  /** When set, the card content uses layoutId for shared layout animation with the case study modal. */
  slug?: string
  /** When set with slug, footer "View more" opens the modal instead of linking to the page. */
  onFooterClick?: () => void
}

export function CaseStudyCard({
  title,
  badge,
  badges,
  description,
  imageBackground,
  imageScreenshot,
  imagePosition = "right",
  imageAlt,
  coverImageOnly = false,
  footerLinkHref,
  footerLinkLabel,
  slug,
  onFooterClick,
}: CaseStudyCardProps) {
  const isImageLeft = imagePosition === "left"
  const tags = badges?.length ? badges : badge ? [badge] : []

  // Content order: if image is left, content should be order-2, otherwise order-1
  const contentOrder = isImageLeft ? "order-2 md:order-2" : "order-1 md:order-1"
  // Image order: if image is left, image should be order-1, otherwise order-2
  const imageOrder = isImageLeft ? "order-1 md:order-1" : "order-2 md:order-2"
  // Grid columns: image always takes 65%, text always takes 35%
  // When image is left: [13fr_7fr] (65% image, 35% text)
  // When image is right: [7fr_13fr] (35% text, 65% image)
  const gridCols = isImageLeft ? "md:grid-cols-[13fr_7fr]" : "md:grid-cols-[7fr_13fr]"

  const badgesBlock = tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((label) => (
        <CaseStudyBadge key={label} label={label} />
      ))}
    </div>
  )

  const gridContent = (
    <div className={`flex flex-col md:grid ${gridCols} gap-8 md:gap-12 md:items-stretch`}>
        <div className={`max-w-3xl ${contentOrder} flex flex-col justify-center`}>
          <h2 className="text-2xl font-semibold md:text-3xl mb-2">
            {title}
          </h2>
          {badgesBlock}
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
            (footerLinkHref.startsWith("/") ? (
              <Link
                href={footerLinkHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
                onClick={(e) => e.stopPropagation()}
              >
                {footerLinkLabel ?? "See Prototype"}
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
              </Link>
            ) : (
              <a
                href={footerLinkHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
                onClick={(e) => e.stopPropagation()}
              >
                {footerLinkLabel ?? "See Prototype"}
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
              </a>
            ))
          )}
        </div>
        <div
          className={`relative p-2 md:p-6 w-full min-h-[70vh] md:h-full rounded-lg overflow-hidden bg-cover bg-center ${imageOrder}`}
          style={{ backgroundImage: `url(${imageBackground})`, paddingRight: "-24px" }}
        >
          {coverImageOnly ? (
            <div
              className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 rounded-lg overflow-hidden"
              style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
            >
              <Image
                src={imageScreenshot}
                alt={imageAlt || `${title} screenshot`}
                fill
                unoptimized
                className="object-cover object-left-top"
              />
            </div>
          ) : (
            <div
              className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 bg-background/95 dark:bg-card/90 rounded-lg shadow-lg flex flex-col"
              style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
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
          )}
        </div>
    </div>
  )

  return (
    <div className="mb-10 md:mb-14 bg-card rounded-lg p-4 md:p-6 ring-foreground/10 ring-1">
      {slug ? (
        <motion.div
          layoutId={`case-study-hero-${slug}`}
          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
          className={`flex flex-col md:grid ${gridCols} gap-8 md:gap-12 md:items-stretch`}
        >
          <div className={`max-w-3xl ${contentOrder} flex flex-col justify-center`}>
            <h2 className="text-2xl font-semibold md:text-3xl mb-2">
              {title}
            </h2>
            {badgesBlock}
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
            {(footerLinkHref || (slug && onFooterClick)) && (
              (slug && onFooterClick ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFooterClick()
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
                >
                  {footerLinkLabel ?? "See Prototype"}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
                </button>
              ) : footerLinkHref?.startsWith("/") ? (
                <Link
                  href={footerLinkHref}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
                  onClick={(e) => e.stopPropagation()}
                >
                  {footerLinkLabel ?? "See Prototype"}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
                </Link>
              ) : (
                <a
                  href={footerLinkHref!}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
                  onClick={(e) => e.stopPropagation()}
                >
                  {footerLinkLabel ?? "See Prototype"}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
                </a>
              ))
            )}
          </div>
          <div
            className={`relative p-2 md:p-6 w-full min-h-[70vh] md:h-full rounded-lg overflow-hidden bg-cover bg-center ${imageOrder}`}
            style={{ backgroundImage: `url(${imageBackground})`, paddingRight: "-24px" }}
          >
            {coverImageOnly ? (
              <div
                className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 rounded-lg overflow-hidden"
                style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
              >
                <Image
                  src={imageScreenshot}
                  alt={imageAlt || `${title} screenshot`}
                  fill
                  unoptimized
                  className="object-cover object-left-top"
                />
              </div>
            ) : (
              <div
                className="absolute top-2 left-2 right-0 bottom-2 md:top-6 md:left-6 md:right-0 md:bottom-6 bg-background/95 dark:bg-card/90 rounded-lg shadow-lg flex flex-col"
                style={{ width: "calc(100% + 48px)", marginRight: "-48px" }}
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
            )}
          </div>
        </motion.div>
      ) : (
        gridContent
      )}
    </div>
  )
}
