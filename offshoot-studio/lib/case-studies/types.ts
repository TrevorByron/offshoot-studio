export interface CaseStudyHeroImage {
  /** Background image (e.g. textured surface), same as hero carousel card */
  background: string
  /** Inner image (e.g. app screens composite), shown contained in the card */
  inner: string
}

export interface CaseStudySection {
  /** Optional hero-style card (background + inner image) rendered first in the section, like hero carousel. If heroImages is set, it takes precedence. */
  heroImage?: CaseStudyHeroImage
  /** Optional array of hero cards (e.g. first = login, second = cover). Rendered in order above section images. */
  heroImages?: CaseStudyHeroImage[]
  images: string[]
  text: string
}

export interface CaseStudyBanner {
  heading: string
  ctaLabel?: string
  ctaHref?: string
}

/** One block of intro content: a paragraph or a bullet list */
export type CaseStudyIntroBlock =
  | { type: "paragraph"; text: string; font?: "mono"; /** Rendered on its own line in Geist Mono, then text below */ label?: string }
  | { type: "list"; items: string[] }

/** Allowed tag options for case studies (with optional icons). */
export const CASE_STUDY_TAG_OPTIONS = [
  "Design Sprints",
  "Team Expansion",
  "UI/UX Refinement",
  "Design systems",
] as const

export type CaseStudyTag = (typeof CASE_STUDY_TAG_OPTIONS)[number]

/** Optional card shown on recent-work and case-studies sections. When set, listing cards use this instead of deriving from intro/sections. */
export interface CaseStudyCardPreview {
  description: string[]
  imageBackground: string
  imageScreenshot: string
  imageAlt?: string
  imagePosition?: "left" | "right"
}

/**
 * Content shape for every case study page. The layout is fixed:
 * - Header (title + tags from badges)
 * - Columns: sections with 65% images / 35% text; first section gets introBlurb in the text column
 * - Optional banners
 *
 * No page-specific styles or animations—only title, tags, images, and supporting text.
 */
export interface CaseStudyContent {
  slug: string
  title: string
  subtitle?: string
  /** @deprecated Use badges instead */
  badge?: string
  /** Service/tag labels shown in the header (e.g. Design Sprints, UI/UX Refinement). Use CASE_STUDY_TAG_OPTIONS for icons. */
  badges?: string[]
  /** Short intro shown in first block when introBlocks is not used */
  introBlurb: string
  /** Optional rich intro for first block (paragraphs + list). When set, first block text column uses this instead of introBlurb + section text. */
  introBlocks?: CaseStudyIntroBlock[]
  sections: CaseStudySection[]
  banners?: CaseStudyBanner[]
  /** For generateMetadata */
  metaDescription?: string
  /** Optional: props for the listing card on recent-work / case-studies section. Omit to derive from introBlurb and first section images. */
  cardPreview?: CaseStudyCardPreview
}
