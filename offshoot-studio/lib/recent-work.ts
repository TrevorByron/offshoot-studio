export interface RecentWorkProject {
  slug: string
  title: string
  /** Optional subtitle shown under the title on the listing page */
  subtitle?: string
  badge?: string
  shortDescription?: string
  description: string[]
  imageCount: number
  /** Optional: real image paths for detail page (e.g. from public folder) */
  imageUrls?: string[]
  /** Card background image (or derived from imageUrls[0]) */
  imageBackground?: string
  /** Card screenshot/foreground image (or derived from imageUrls[1] or imageUrls[0]) */
  imageScreenshot?: string
  /** Alt text for card screenshot */
  imageAlt?: string
  /** Card layout: image left or right */
  imagePosition?: "left" | "right"
  footerLinkHref?: string
  footerLinkLabel?: string
  /** When set, the project has a full case study at /case-studies/[caseStudySlug]; card uses case study content. */
  caseStudySlug?: string
}

export const recentWorkProjects: RecentWorkProject[] = [
  {
    slug: "procore",
    title: "Procore Construction Network",
    subtitle: "Construction Network - Prototype and Validation",
    badge: "Embedded Design",
    shortDescription: "Strategic design and prototyping for Procore.",
    description: [
      "Discovery, vision casting, and internal alignment for a free business directory connecting contractors, owners, architects, and vendors.",
      "RITE research, HTML/CSS prototype for rapid iteration, then final polish and front-end implementation in their production repo. Launched 2021.",
    ],
    imageCount: 0,
    imageUrls: ["/procore-case-study.png", "/procore-screenshot.png"],
    imageBackground: "/procore-case-study.png",
    imageScreenshot: "/procore-screenshot.png",
    imageAlt: "Procore Construction Network screenshot",
    imagePosition: "right",
    footerLinkHref: "https://trevorborden.github.io/GCN-prototype/index.html",
    footerLinkLabel: "See Prototype",
  },
  {
    slug: "get-shit-done",
    title: "Get Sh*t Done",
    subtitle: "To do app - Validation",
    badge: "Rapid Prototype",
    shortDescription: "To-do app concept validation with Robert Hohman (Glassdoor cofounder).",
    description: [
      "Two-person strike team with Robert Hohman (Glassdoor cofounder) to validate a to-do app concept inspired by Getting Things Done.",
      "Defined core problems, mapped user journeys and IA, assessed the market for differentiated positioning. 2-week sprint.",
    ],
    imageCount: 3,
    imageUrls: ["/case-study-background.png", "/get-shit-done-screenshot.png"],
    caseStudySlug: "gsd",
    // Card content comes from case study (gsd.ts cardPreview)
  },
  {
    slug: "open-joy",
    title: "Recibook – Onboarding Audit & Redesign",
    subtitle: "Recibook - Onboarding",
    badge: "Rapid Prototype • 11 hours | 2 days",
    shortDescription: "Design and engineering for Open Joy.",
    description: [
      "Recipe app was losing users before they saw value. Audited onboarding, identified activation killers, built two prototypes in 11 hours: show value first, ask for commitment after.",
      "Also flagged generic branding and produced cookbook-inspired visual direction.",
    ],
    imageCount: 0,
    imageBackground: "/recibook-background.png",
    imageScreenshot: "/recibook-screenshot.png",
    imageAlt: "Recibook onboarding redesign screenshot",
    imagePosition: "right",
    footerLinkHref:
      "https://furry-suggestion-fb5.notion.site/Onboarding-Flow-Audit-Redesign-304f942244b680ad9c78ca9fe209b9a3",
    footerLinkLabel: "View 11hr deliverable",
    caseStudySlug: "recibook",
  },
]

export function getAllProjects(): RecentWorkProject[] {
  return recentWorkProjects
}

export function getProject(slug: string): RecentWorkProject | undefined {
  return recentWorkProjects.find((p) => p.slug === slug)
}
