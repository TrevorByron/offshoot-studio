import type { CaseStudyContent } from "../types"

const BASE = "/case-studies/gsd"

export const GSD_SLUG = "gsd"

export const gsdCaseStudy: CaseStudyContent = {
  slug: GSD_SLUG,
  title: "Get Sh*t Done",
  badges: ["Design Sprints", "UI/UX Refinement", "Design systems"],
  cardPreview: {
    description: [
      "Robert Hohman (co-founder of Glassdoor) had a vision for a productivity app based on GTD principles that transformed his workflow as a CEO—but needed to validate whether it would resonate beyond his own use case. He'd already started building, but the experience felt founder-designed and lacked the strategic foundation to move forward confidently.",
      "We established a design system, mapped the user journey, and built a polished V1 that gave Robert the clarity he needed.",
    ],
    imageBackground: "/background-images/rock.png",
    imageScreenshot: "/case-study-covers/gsd-cover.png",
    imageAlt: "Get Sh*t Done app screenshot",
    imagePosition: "left",
    coverImageOnly: true,
  },
  introBlurb:
    "Two-person strike team with Robert Hohman (Glassdoor cofounder) to validate a to-do app concept inspired by Getting Things Done. We defined the general structure of the app, laid out the groundwork for the design system, and built out a prototype together.",
  introBlocks: [
    {
      type: "paragraph",
      text: "Robert Hohman had a compelling vision: a task management app based on David Allen's Getting Things Done framework—the organizational system that transformed how he worked as a CEO. He'd already started building an experience, but it felt founder-designed. Before committing serious engineering resources or raising capital, he needed to answer a harder question: Would this resonate beyond his own workflow?",
    },
    {
      type: "paragraph",
      label: "The challenge:",
      text: "Take an early prototype and turn it into something testable—fast. We needed strategic clarity on positioning, a design foundation that could scale, and a polished V1 that would validate (or invalidate) core assumptions.",
    },
    {
      type: "paragraph",
      label: "Our approach:",
      text: "We started over from a design system standpoint, establishing baseline rules so we could move quickly without compromising quality. We journey-mapped at a high level to align on the outcome we were building toward, then assessed the crowded productivity app landscape to identify where a differentiated approach could win. We built a functional V1 that balanced speed with polish—designed for testing, built for learning.",
    },
    {
      type: "paragraph",
      label: "The outcome:",
      text: "After two months of strategic exploration and hands-on building, Robert had his answer. The market timing and differentiation weren't there to justify a full build.",
    },
    {
      type: "paragraph",
      label: "The value:",
      text: "By testing the idea thoroughly in 8 weeks, we saved months of engineering time and prevented a costly build that wouldn't have found product-market fit. Knowing when not to build is as valuable as knowing what to build.",
    },
  ],
  metaDescription:
    "Case study: Get Sh*t Done — strategy, design system, and prototype for a GTD-inspired to-do app with Robert Hohman (Glassdoor cofounder).",
  sections: [
    {
      label: "Overview",
      heroImages: [
        { background: "/background-images/rock.png", inner: "/case-study-covers/gsd-login.png" },
        { background: "/background-images/rock.png", inner: "/case-study-covers/gsd-cover.png" },
      ],
      images: [],
      text: "We started by defining the app’s structure and information architecture. The site map and user flows set a clear foundation for how tasks, projects, and contexts would connect—core to any GTD-inspired experience.",
    },
    {
      label: "Site Map and Design System",
      images: [
        `${BASE}/Site-Map.png`,
        `${BASE}/Colors.png`,
        `${BASE}/Themes.png`,
        `${BASE}/Typography.png`,
        `${BASE}/Buttons.png`,
        `${BASE}/Cards.png`,
        `${BASE}/Radio.png`,
        `${BASE}/Calendar.png`,
        `${BASE}/Nav-Bar.png`,
        `${BASE}/Drawer.png`,
        `${BASE}/Modal.png`,
        `${BASE}/To dos.png`,
      ],
      imagesHiddenOnMobile: [
        `${BASE}/Radio.png`,
        `${BASE}/Calendar.png`,
        `${BASE}/Nav-Bar.png`,
        `${BASE}/To dos.png`,
      ],
      text: "",
    },
    {
      type: "beforeAfter",
      label: "Login — Before & After",
      beforeImage: `${BASE}/login-before.png`,
      afterImage: `${BASE}/login-after.png`,
    },
    {
      type: "beforeAfter",
      label: "Today's Tasks — Before & After",
      beforeImage: `${BASE}/today-before.png`,
      afterImage: `${BASE}/today-after.png`,
    },
    {
      type: "beforeAfter",
      label: "Menu — Before & After",
      beforeImage: `${BASE}/menu2-before.png`,
      afterImage: `${BASE}/menu2-after.png`,
    },
  ],
}
