export interface CaseStudyHeroImage {
  /** Background image (e.g. textured surface), same as hero carousel card */
  background: string
  /** Inner image (e.g. app screens composite), shown contained in the card */
  inner: string
}

export interface CaseStudySection {
  /** Optional label shown above the section (e.g. "Discovery:", "Build:") */
  label?: string
  /** Optional section heading/title (e.g. "Unified Platform Experience Video"). Renders below label, above text. */
  heading?: string
  /** Optional hero-style card (background + inner image) rendered first in the section, like hero carousel. If heroImages is set, it takes precedence. */
  heroImage?: CaseStudyHeroImage
  /** Optional array of hero cards (e.g. first = login, second = cover). Rendered in order above section images. */
  heroImages?: CaseStudyHeroImage[]
  images: string[]
  text: string
  /** When set, the section shows a single embedded iframe (e.g. live prototype) instead of images. */
  embedUrl?: string
  /** Optional poster image for YouTube embed fallback when iframe is blocked (e.g. /case-study-covers/procore-cover.png). */
  embedPosterImage?: string
  /** Label for the embed fallback link (e.g. "Play on YouTube"). Default in component. */
  embedFallbackLabel?: string
  /** When true, section images are wrapped in a browser-window style frame (dark bezel, title bar with dots, rounded corners). */
  browserFrame?: boolean
  /** Background image for the browser frame bezel (e.g. /background-images/rock.png). Used when browserFrame is true. */
  browserFrameBackground?: string
  /** When true, use 80% media / 20% text column ratio instead of the default 65/35. */
  wideMedia?: boolean
  /** When true, show only the media column (no text column). Use for full-width embed or image sections. */
  fullWidth?: boolean
}

export interface CaseStudyBanner {
  heading: string
  ctaLabel?: string
  ctaHref?: string
}

/** Optional testimonial/quote for a case study. Rendered as a quote card on the page. */
export interface CaseStudyQuote {
  quote: string
  name: string
  title?: string
  company?: string
  /** Optional avatar image path (e.g. /tim-hey.png) */
  avatar?: string
}

/** One block of intro content: a paragraph or a bullet list */
export type CaseStudyIntroBlock =
  | { type: "paragraph"; text: string; font?: "mono"; /** Rendered on its own line in Geist Mono, then text below */ label?: string; /** When set, paragraph is rendered as a link */ href?: string }
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
  /** When true, card shows only the cover image (no browser-chrome frame). Use for app composite/mockup images. */
  coverImageOnly?: boolean
}

/**
 * Content shape for every case study page. The layout is fixed:
 * - Header (title + tags from badges)
 * - Single-column sections: Label → Heading → Text → Supporting imagery (first section gets introBlurb or introBlocks)
 * - Optional quote, banners
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
  /** Optional quote/testimonial shown after sections (e.g. client quote). */
  quote?: CaseStudyQuote
  /** For generateMetadata */
  metaDescription?: string
  /** Optional: props for the listing card on recent-work / case-studies section. Omit to derive from introBlurb and first section images. */
  cardPreview?: CaseStudyCardPreview
}
