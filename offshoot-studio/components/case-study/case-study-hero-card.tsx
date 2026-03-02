import type { CaseStudyHeroImage } from "@/lib/case-studies"

interface CaseStudyHeroCardProps {
  heroImage: CaseStudyHeroImage
}

/**
 * Renders a single hero-style card: background image with an inner content image,
 * matching the structure used in the hero carousel (background + overlay + inner image).
 */
export function CaseStudyHeroCard({ heroImage }: CaseStudyHeroCardProps) {
  const { background, inner } = heroImage
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-border flex flex-col p-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label="Case study hero"
    >
      <div
        className="absolute inset-0 bg-black/30 pointer-events-none rounded-lg"
        aria-hidden
      />
      <div
        className="relative z-10 w-full flex-1 min-h-0 rounded-lg overflow-hidden flex items-start justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={inner}
          alt=""
          className="w-full h-auto block object-contain object-center"
        />
      </div>
    </div>
  )
}
