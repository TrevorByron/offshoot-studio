import type { CaseStudyContent } from "../types"

const BASE = "/case-studies/gsd"

export const GSD_SLUG = "gsd"

export const gsdCaseStudy: CaseStudyContent = {
  slug: GSD_SLUG,
  title: "Get Sh*t Done",
  badges: ["Design Sprints", "UI/UX Refinement", "Design systems"],
  cardPreview: {
    description: [
      "Two-person strike team with Robert Hohman (Glassdoor cofounder) to validate a to-do app concept inspired by Getting Things Done.",
      "Defined core problems, mapped user journeys and IA, assessed the market for differentiated positioning. 2-week sprint.",
    ],
    imageBackground: "/case-study-background.png",
    imageScreenshot: "/get-shit-done-screenshot.png",
    imageAlt: "Get Sh*t Done app screenshot",
    imagePosition: "left",
  },
  introBlurb:
    "Two-person strike team with Robert Hohman (Glassdoor cofounder) to validate a to-do app concept inspired by Getting Things Done. We defined the general structure of the app, laid out the groundwork for the design system, and built out a prototype together.",
  introBlocks: [
    {
      type: "paragraph",
      text: "We partnered directly with Robert Hohman (co-founder of Glassdoor) to explore and validate a productivity app concept inspired by David Allen's Getting Things Done.",
    },
    {
      type: "paragraph",
      label: "The challenge:",
      text: "Robert had a vision for a task management app based on organizational principles that transformed how he worked as a CEO. Before committing engineering resources or raising capital, he needed to answer: Would this resonate beyond his own workflow?",
    },
    {
      type: "paragraph",
      text: "Our approach:",
      font: "mono",
    },
    {
      type: "list",
      items: [
        "Strategic foundation: Deep-dive into the GTD framework to identify which principles translated to software and which didn't",
        "Market positioning: Assessed the crowded to-do app landscape to find where a differentiated approach could win",
        "Information architecture: Mapped user journeys and defined the minimum testable version that would validate core assumptions",
        "Design system: Established guidelines that balanced speed with polish—designed for testing, built for learning",
      ],
    },
    {
      type: "paragraph",
      label: "The outcome:",
      text: "After 1 month and a half of strategic exploration and hands-on building, we delivered a functional V1 and the clarity Robert needed: the market timing and differentiation weren't there to justify a full build.",
    },
    {
      type: "paragraph",
      label: "The value:",
      text: "By testing the idea thoroughly in 6 weeks, we saved months of engineering time and prevented a costly build that wouldn't have found product-market fit. Knowing when not to build is as valuable as knowing what to build.",
    },
  ],
  metaDescription:
    "Case study: Get Sh*t Done — strategy, design system, and prototype for a GTD-inspired to-do app with Robert Hohman (Glassdoor cofounder).",
  sections: [
    {
      heroImages: [
        { background: "/background-images/rock.png", inner: "/case-study-covers/gsd-login.png" },
        { background: "/background-images/rock.png", inner: "/case-study-covers/gsd-cover.png" },
      ],
      images: [],
      text: "We started by defining the app’s structure and information architecture. The site map and user flows set a clear foundation for how tasks, projects, and contexts would connect—core to any GTD-inspired experience.",
    },
    {
      images: [`${BASE}/Site-Map.png`, `${BASE}/Colors.png`, `${BASE}/Themes.png`, `${BASE}/Typography.png`],
      text: "The design system began with color and type. A restrained palette and consistent typography scale give the product a calm, focused feel so the interface stays out of the way of getting things done.",
    },
    {
      images: [`${BASE}/Buttons.png`, `${BASE}/Cards.png`, `${BASE}/Radio.png`, `${BASE}/Calendar.png`],
      text: "Reusable components—buttons, cards, controls like radio groups, and calendar—were specified so we could move fast in the prototype while keeping the UI consistent and easy to extend later.",
    },
    {
      images: [`${BASE}/Nav-Bar.png`, `${BASE}/Drawer.png`, `${BASE}/Modal.png`],
      text: "Navigation, drawer, and modal patterns were designed to support quick capture, project switching, and focused task editing without leaving the main flow.",
    },
    {
      images: [`${BASE}/To dos.png`],
      text: "The to-do experience is the heart of the app. We focused on clear lists, minimal friction for capture and completion, and a layout that scales from a few items to many without feeling noisy.",
    },
  ],
}
