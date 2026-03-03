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
  /** When set, the project has a case study; card uses case study content and opens the modal on /selected-work. */
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
      "Procore had talked about building a Construction Network for years, but couldn't commit resources to an abstract vision. We built a coded prototype that made the concept tangible—unlocking internal buy-in and full funding for a dedicated team.",
      "From catalyst to launch, we led discovery, design, and front-end implementation for a platform that continues to connect the construction industry.",
    ],
    imageCount: 0,
    imageUrls: ["/procore-case-study.png", "/procore-screenshot.png"],
    imageBackground: "/procore-case-study.png",
    imageScreenshot: "/procore-screenshot.png",
    imageAlt: "Procore Construction Network screenshot",
    imagePosition: "right",
    footerLinkHref: "https://trevorborden.github.io/GCN-prototype/index.html",
    footerLinkLabel: "See Prototype",
    caseStudySlug: "procore",
  },
  {
    slug: "get-shit-done",
    title: "Get Sh*t Done",
    subtitle: "To do app - Validation",
    badge: "Rapid Prototype",
    shortDescription: "To-do app concept validation with Robert Hohman (Glassdoor cofounder).",
    description: [
      "Robert Hohman (co-founder of Glassdoor) had a vision for a productivity app based on GTD principles that transformed his workflow as a CEO—but needed to validate whether it would resonate beyond his own use case. He'd already started building, but the experience felt founder-designed and lacked the strategic foundation to move forward confidently.",
      "We established a design system, mapped the user journey, and built a polished V1 that gave Robert the clarity he needed.",
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
      "Open Joy needed help fast—their onboarding was broken and users were dropping off before experiencing the core product. We agreed to a 2-day strike mission: audit the existing flows, prototype two potential new directions, and provide strategic recommendations they could act on immediately.",
      "In 11 hours of focused work, we delivered two functional prototypes and branding nudges that gave their team clarity and momentum to move forward.",
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
