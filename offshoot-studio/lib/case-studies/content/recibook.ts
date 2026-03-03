import type { CaseStudyContent } from "../types"

export const RECIBOOK_SLUG = "recibook"

const NOTION_DELIVERABLE =
  "https://furry-suggestion-fb5.notion.site/Onboarding-Flow-Audit-Redesign-304f942244b680ad9c78ca9fe209b9a3"

export const recibookCaseStudy: CaseStudyContent = {
  slug: RECIBOOK_SLUG,
  title: "Recibook – Onboarding Audit & Redesign",
  badges: ["UI/UX Refinement", "Design Sprints"],
  cardPreview: {
    description: [
      "Open Joy needed help fast—their onboarding was broken and users were dropping off before experiencing the core product. We agreed to a 2-day strike mission: audit the existing flows, prototype two potential new directions, and provide strategic recommendations they could act on immediately.",
      "In 11 hours of focused work, we delivered two functional prototypes and branding nudges that gave their team clarity and momentum to move forward.",
    ],
    imageBackground: "/background-images/man-on-rock.png",
    imageScreenshot: "/case-studies/recibook/recibook-cover.png",
    imageAlt: "Recibook onboarding redesign screenshot",
    imagePosition: "right",
    coverImageOnly: true,
  },
  introBlurb:
    "Open Joy's onboarding was broken and the team needed help now. We agreed to a 2-day strike mission: audit flows, build two prototypes, and deliver strategic recommendations. In 11 hours we gave them options, clarity, and momentum to move forward.",
  introBlocks: [
    {
      type: "paragraph",
      text: "This wasn't a normal engagement. Open Joy's onboarding was broken—users were dropping off before they could experience the core product, and the team needed help now. Not in two weeks. Not after a discovery phase. Now.",
    },
    {
      type: "paragraph",
      label: "The challenge:",
      text: "Diagnose what wasn't working, explore new directions, and give the team something concrete they could act on—all within 2 days.",
    },
    {
      type: "paragraph",
      label: "Our approach:",
      text: "We agreed to a strike mission. We audited their existing flows to identify where users were getting stuck, built two functional prototypes exploring different onboarding approaches, and provided strategic recommendations on branding and positioning that would help them stand out in a crowded loyalty app market.",
    },
    {
      type: "paragraph",
      label: "The outcome:",
      text: "In 11 hours of focused work, we delivered working prototypes and clear direction. The team had options, clarity, and the momentum to move forward immediately.",
    },
    {
      type: "paragraph",
      label: "The value:",
      text: "Sometimes you don't need a month-long engagement. You need someone who can parachute in, diagnose fast, and give you something you can ship. When speed matters more than process, we move.",
    },
  ],
  metaDescription:
    "Case study: Recibook onboarding audit and redesign — 11-hour audit, two value-first prototypes (in-app and WhatsApp), and cookbook-inspired branding exploration.",
  banners: [
    {
      heading: "View the full 11-hour deliverable and both prototypes",
      ctaLabel: "Open Notion deliverable",
      ctaHref: NOTION_DELIVERABLE,
    },
  ],
  sections: [
    {
      label: "Overview",
      heading: "A true strike mission",
      images: [],
      text: "We mapped the current flow and found that too many steps stood between the visitor and the “aha” moment. The audit made it clear: value was buried behind signup and friction. The full journey and audit are in the Figma file and the Notion deliverable (link above).",
    },
    {
      label: "Audit",
      images: ["/case-studies/recibook/audit.png"],
      text: "We mapped the current experience from app store landing through onboarding, sharing, and in-app actions. The audit surfaced a large drop-off after onboarding, friction in sharing from external apps, and a signup wall that hurt retention—plus inconsistent UI and unclear next steps once users viewed a recipe.",
    },
    {
      label: "Explore",
      heading: "Try the embedded prototype",
      embedUrl: "/case-studies/recibook/prototype/index.html",
      images: [],
      text: "",
      browserFrame: true,
      fullWidth: true,
      embedMaxWidth: 360,
      embedShowOnMobile: true,
    },
    {
      images: ["/case-studies/recibook/branding.png"],
      text: "The current branding felt like every other AI product—gradients and generic “AI slop.” We explored what it could look like if we pulled from real cookbooks: color palettes, typography, and that print-like warmth. The goal: bridge digital app and kitchen, and feel connected to what the product actually does.",
    },
  ],
}
