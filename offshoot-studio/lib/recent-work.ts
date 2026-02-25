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
  footerLinkHref?: string
  footerLinkLabel?: string
}

export const recentWorkProjects: RecentWorkProject[] = [
  {
    slug: "procore",
    title: "Procore",
    subtitle: "Construction Network - Prototype and Validation",
    badge: "Embedded Design",
    shortDescription: "Strategic design and prototyping for Procore.",
    description: [
      "Discovery, vision casting, and internal alignment for Procore initiatives.",
      "RITE research, HTML/CSS prototype for rapid iteration, then final polish and front-end implementation.",
    ],
    imageCount: 0,
    imageUrls: ["/procore-case-study.png", "/procore-screenshot.png"],
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
  },
  {
    slug: "open-joy",
    title: "Open Joy",
    subtitle: "Recibook - Onboarding",
    shortDescription: "Design and engineering for Open Joy.",
    description: [
      "Strategic design engineering and prototyping for Open Joy. More context to come.",
    ],
    imageCount: 0,
  },
]

export function getAllProjects(): RecentWorkProject[] {
  return recentWorkProjects
}

export function getProject(slug: string): RecentWorkProject | undefined {
  return recentWorkProjects.find((p) => p.slug === slug)
}
