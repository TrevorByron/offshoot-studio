import type { CaseStudyContent } from "../types"

const PLACEHOLDER = (text: string) =>
  `https://placehold.co/1200x675/1a1a1a/71717a?text=${encodeURIComponent(text)}`

export const RECIBOOK_SLUG = "recibook"

const NOTION_DELIVERABLE =
  "https://furry-suggestion-fb5.notion.site/Onboarding-Flow-Audit-Redesign-304f942244b680ad9c78ca9fe209b9a3"

export const recibookCaseStudy: CaseStudyContent = {
  slug: RECIBOOK_SLUG,
  title: "Recibook – Onboarding Audit & Redesign",
  badges: ["UI/UX Refinement", "Design Sprints"],
  cardPreview: {
    description: [
      "Recipe app was losing users before they saw value. Audited onboarding, identified activation killers, built two prototypes in 11 hours: show value first, ask for commitment after.",
      "Also flagged generic branding and produced cookbook-inspired visual direction.",
    ],
    imageBackground: PLACEHOLDER("Recibook"),
    imageScreenshot: PLACEHOLDER("Recibook"),
    imageAlt: "Recibook onboarding redesign screenshot",
    imagePosition: "right",
  },
  introBlurb:
    "In 11 hours over two days we audited Recibook’s onboarding flow, identified why users were bouncing before seeing value, and built two redesign prototypes—each flipping the funnel to show value first and ask for commitment after. We also explored cookbook-inspired branding to move away from generic AI aesthetics.",
  introBlocks: [
    {
      type: "paragraph",
      text: "Recibook is a recipe app. Users were dropping off before they could experience what the product does. The brief: audit the onboarding, find the friction, and propose a better path.",
    },
    {
      type: "paragraph",
      text: "The challenge:",
      font: "mono",
    },
    {
      type: "paragraph",
      text: "There were way too many steps between landing on the page and actually getting to use the app. Every extra step delayed the “aha” moment and likely hurt activation and retention. Best practice is around three steps; the current journey had many more.",
    },
    {
      type: "paragraph",
      text: "Our approach:",
      font: "mono",
    },
    {
      type: "list",
      items: [
        "Audit: Mapped the user journey and identified where value was hidden behind signup and friction.",
        "Option 1 (In-app): Let people play with the app on the marketing page, then ask for signup after they’ve seen what it does. Prototype: try before you commit.",
        "Option 2 (WhatsApp): Same value-first idea but funnel users into the WhatsApp chatbot experience first. Prototype: value on the page, then into messaging.",
        "Branding: Explored cookbook-inspired color, type, and imagery so the product feels like cooking, not generic AI.",
      ],
    },
    {
      type: "paragraph",
      text: "The outcome:",
      font: "mono",
    },
    {
      type: "paragraph",
      text: "Two working prototypes and a clear recommendation: choose strategy first (full app vs. WhatsApp-led), then ship the prototype that matches. Full deliverable and prototype links are in the sections below.",
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
      images: [PLACEHOLDER("Audit + user journey")],
      text: "We mapped the current flow and found that too many steps stood between the visitor and the “aha” moment. The audit made it clear: value was buried behind signup and friction. The full journey and audit are in the Figma file and the Notion deliverable (link above).",
    },
    {
      images: [PLACEHOLDER("Option 1 – In-app")],
      text: "Option 1 prioritizes the in-app experience. People can try the product right on the marketing page—no signup wall—and only after they’ve seen what it does do we ask for signup. Best when the product shines when users explore the full web app. Prototype: recibook-sable.vercel.app",
    },
    {
      images: [PLACEHOLDER("Option 2 – WhatsApp")],
      text: "Option 2 uses the same value-first idea but funnels people into the WhatsApp chatbot. They still get to try things on the marketing page, but the flow is designed to get them into the messaging experience. Best when the magic is in WhatsApp and your users already live there. Prototype: recibook-whatsapp.vercel.app",
    },
    {
      images: [PLACEHOLDER("Branding exploration")],
      text: "The current branding felt like every other AI product—gradients and generic “AI slop.” We explored what it could look like if we pulled from real cookbooks: color palettes, typography, and that print-like warmth. The goal: bridge digital app and kitchen, and feel connected to what the product actually does.",
    },
  ],
}
