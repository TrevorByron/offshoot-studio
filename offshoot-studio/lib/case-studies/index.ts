import type { CaseStudyContent } from "./types"
import { gsdCaseStudy, GSD_SLUG } from "./content/gsd"
import { recibookCaseStudy, RECIBOOK_SLUG } from "./content/recibook"

const caseStudies: Record<string, CaseStudyContent> = {
  [GSD_SLUG]: gsdCaseStudy,
  [RECIBOOK_SLUG]: recibookCaseStudy,
}

/** Slugs of case studies to show on the homepage Work section. Add new slugs here when you add a case study. */
export const FEATURED_CASE_STUDY_SLUGS: string[] = [GSD_SLUG, RECIBOOK_SLUG]

export type {
  CaseStudyContent,
  CaseStudySection,
  CaseStudyHeroImage,
  CaseStudyBanner,
  CaseStudyTag,
  CaseStudyIntroBlock,
  CaseStudyCardPreview,
} from "./types"
export { CASE_STUDY_TAG_OPTIONS } from "./types"

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug]
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies)
}

/** Props for CaseStudyCard when used on recent-work or case-studies section. Use when project.caseStudySlug is set. */
export function getCaseStudyCardProps(caseStudy: CaseStudyContent): {
  title: string
  badge: string
  description: string[]
  imageBackground: string
  imageScreenshot: string
  imageAlt: string
  imagePosition: "left" | "right"
} {
  const card = caseStudy.cardPreview
  const badge = caseStudy.badges?.[0] ?? caseStudy.badge ?? ""
  if (card) {
    return {
      title: caseStudy.title,
      badge,
      description: card.description,
      imageBackground: card.imageBackground,
      imageScreenshot: card.imageScreenshot,
      imageAlt: card.imageAlt ?? `${caseStudy.title} screenshot`,
      imagePosition: card.imagePosition ?? "right",
    }
  }
  const firstSection = caseStudy.sections[0]
  const hero = firstSection?.heroImages?.[0] ?? firstSection?.heroImage
  const imageScreenshot = hero?.inner ?? firstSection?.images?.[0] ?? ""
  const imageBackground = hero?.background ?? firstSection?.images?.[0] ?? ""
  const desc = caseStudy.introBlurb.slice(0, 320).trim()
  const description =
    desc.length < caseStudy.introBlurb.length
      ? [desc + "…", caseStudy.introBlurb.slice(320, 520).trim()].filter(Boolean)
      : [caseStudy.introBlurb]
  return {
    title: caseStudy.title,
    badge,
    description,
    imageBackground,
    imageScreenshot: imageScreenshot || imageBackground,
    imageAlt: `${caseStudy.title} screenshot`,
    imagePosition: "right",
  }
}
