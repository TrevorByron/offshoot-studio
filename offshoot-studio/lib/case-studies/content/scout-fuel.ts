import type { CaseStudyContent } from "../types"

const BASE = "/case-studies/scout-fuel"

export const SCOUT_FUEL_SLUG = "scout-fuel"

const PROTOTYPE_URL = "https://scout-fuel-redesign.vercel.app/"
const NOTION_DOC_EMBED =
  "https://north-element-ae1.notion.site/ebd//32cda057146d804f8d4bdbfc91e510ec"
const NOTION_DOC_URL =
  "https://north-element-ae1.notion.site/32cda057146d804f8d4bdbfc91e510ec"

export const scoutFuelCaseStudy: CaseStudyContent = {
  slug: SCOUT_FUEL_SLUG,
  title: "Scout Fuel — Product Design",
  badges: ["Design Sprints", "UI/UX Refinement", "Design systems"],
  cardPreview: {
    description: [
      "Scout Fuel helps trucking companies optimize fuel spend—but their UI wasn't scaling, and customers weren't forming a habit around the product. Founders new to development needed a modern foundation and a clearer experience.",
      "In 60 hours we rebuilt the design system in code, reframed the product as a system of intelligence, and shipped a coded prototype they could keep building on.",
    ],
    imageBackground: "/background-images/rock.png",
    imageScreenshot: "/case-study-covers/scout-fuel-cover.png",
    imageAlt: "Scout Fuel redesigned dashboard",
    imagePosition: "right",
    coverImageOnly: true,
  },
  introBlurb:
    "Scout Fuel is a fuel optimization tool for trucking companies. Their UI wasn't scaling, and though customers saw value in the concept, the product hadn't gained traction. In 60 hours we built a design foundation in code and redesigned the experience from a system of record into a system of intelligence.",
  introBlocks: [
    {
      type: "paragraph",
      text: "Scout Fuel helps trucking companies cut fuel spend. The founders had shipped a working product, but the UI was not scaling—and while customers understood the concept of fuel optimization, they were not forming a habit around the tool. On paper it made sense; in practice, fleets were not leveraging it.",
    },
    {
      type: "paragraph",
      label: "The challenge:",
      text: "Founders new to development were not fully sure what they needed, but they wanted what they were building to feel modern and well thought out—and they needed a foundation their team could keep shipping from.",
    },
    {
      type: "paragraph",
      label: "Our approach:",
      text: "Create a design foundation they could continue building on, then redesign the customer experience so it was more than a system of record—a system of intelligence that drove action and increased fuel savings. We steeped in the problem space with AI-assisted research, set a narrative vision, customized a shadcn/ui design system with Tweak CN, one-shot a V1 in Cursor, and refined through subtractive design.",
    },
    {
      type: "paragraph",
      label: "The outcome:",
      text: "A coded Next.js prototype—dark-mode fleet dashboard, route optimizer, driver performance, transactions, and alerts—with living Notion documentation generated from a Cursor skill after every session. Ready for usability testing with real operators.",
    },
    {
      type: "paragraph",
      label: "Role & timeline:",
      text: "Solo designer & builder · 60 hours · Next.js, Tailwind CSS, shadcn/ui, Vercel · Claude, Tweak CN, Cursor",
    },
    {
      type: "paragraph",
      text: "Explore the live prototype →",
      font: "mono",
      href: PROTOTYPE_URL,
    },
  ],
  metaDescription:
    "Case study: Scout Fuel product redesign — AI-assisted discovery, narrative vision, shadcn design system, and a coded fleet fuel dashboard prototype in 60 hours.",
  banners: [
    {
      heading: "Explore the coded prototype",
      ctaLabel: "Open live demo",
      ctaHref: PROTOTYPE_URL,
    },
    {
      heading: "View the living work log",
      ctaLabel: "Open Notion documentation",
      ctaHref: NOTION_DOC_URL,
    },
  ],
  sections: [
    {
      label: "Overview",
      heading: "From system of record to system of intelligence",
      heroImages: [
        {
          background: "/background-images/rock.png",
          inner: "/case-study-covers/scout-fuel-cover.png",
        },
      ],
      images: [],
      text: "The brief was not a visual polish pass. Customers needed clearer signals, faster decisions, and a product that felt like their command center—not a spreadsheet with a login. We used a modern AI-augmented workflow: steep in the problem, generate a runnable V1 quickly, then subtract until the core workflow reads in a glance.",
    },
    {
      type: "beforeAfter",
      label: "Dashboard — Before & After",
      beforeImage: `${BASE}/hero-before.png`,
      afterImage: `${BASE}/hero-after.png`,
    },
    {
      label: "Process",
      heading: "An update in how we design",
      images: [`${BASE}/process-contrast.png`],
      browserFrame: true,
      text: "On earlier engagements like Procore Construction Network, the arc was traditional: discovery, then low-fidelity flows that slowly became high-fidelity mocks—weeks spent in grayscale and Figma hygiene before polish. Today, design is about steeping in the problem space so solutioning can feel instinctual, with Claude and Cursor handling much of the generative work. Design becomes subtractive: strip noise until the simplest path is clear. Taste and judgment become the superpowers.",
    },
    {
      label: "01 — Discovery",
      heading: "AI to understand the problem space",
      images: [`${BASE}/login.png`, `${BASE}/dashboard.png`],
      browserFrame: true,
      text: "Getting fuel managers on the phone quickly was unlikely, so we leaned on AI to get situated in their jobs-to-be-done. We prompted Claude for the day-in-the-life of a fuel manager at a trucking company—the monitors of spreadsheets, exception hunting, vendor bids, idling costs, and the constant interrupt of drivers on the road. That story became the brief for everything that followed.",
    },
    {
      label: "02 — Narrative vision",
      heading: "Vision first, then build toward it",
      images: [`${BASE}/route-optimizer.png`, `${BASE}/fleet.png`],
      browserFrame: true,
      text: "Next we prompted a narrative vision of what an ideal product might unlock—still in story form. Stories communicate the end state better than feature lists. The vision described a single dashboard that ingested overnight transactions, flagged overspend, coached drivers, optimized fuel stops against live pricing, and turned the fuel manager from data archaeologist into strategic operator. That narrative became the north star for the prototype.",
    },
    {
      label: "03 — Define",
      heading: "Building a design foundation in code",
      images: [`${BASE}/tweakcn.png`],
      browserFrame: true,
      text: "Because the goal was a front-end prototype the founders could keep building on, we jumped straight into code with shadcn/ui as the base—modern componentry their engineers would already recognize. We used Tweak CN to customize three unique style directions for Scout Fuel to review, then locked a solid design foundation. Tailwind kept layout and styling in today's React ecosystem: composable primitives, utility-first CSS, and a codebase pattern product engineering knows how to run with.",
    },
    {
      label: "04 — Ideate",
      heading: "Prompting the first version",
      images: [`${BASE}/transactions.png`],
      browserFrame: true,
      text: "With the vision set and scaffolding in place, we used Claude to shape a one-shot Cursor prompt and get a V1 on the canvas—dashboard KPIs, fleet map, transactions, driver performance, route optimizer, budget forecasting, and alerts. From there Cursor became the primary environment for both development and design, and refinement kicked in.",
    },
    {
      label: "05 — Refine & build",
      heading: "Subtractive refinement",
      images: [`${BASE}/panel-subtractive.svg`, `${BASE}/showcase-final.png`],
      browserFrame: true,
      text: "Once AI put the first version on the canvas, the work shifted to subtraction. The first pass usually has too much: extra panels, extra lines, extra decoration. We moved things around, merged repeated blocks, and removed anything that didn't carry real signal—less polishing, more reshaping so the core workflow reads quickly. Each pass stripped noise until the product got closer to the rough shape we had in mind. At the core: become incredibly clear about the problems you are solving, and solve them as directly and simply as possible.",
    },
    {
      label: "06 — Refine & build",
      heading: "Adding once the shape is in place",
      images: [`${BASE}/panel-gamified.jpg`, `${BASE}/drivers.png`],
      browserFrame: true,
      text: "After refinement clarified the core shape, we added features for user problems that still felt poorly addressed—especially seeing at a glance how the fleet was doing and which drivers needed coaching. We introduced a dynamic efficiency score based on each company's purchase history; the score moves with driver execution and became a prominent dashboard signal. The goal: grounded gamification that pulls operators into action instead of another report to ignore.",
    },
    {
      label: "07 — Documentation",
      heading: "Living docs from a Cursor skill",
      embedUrl: NOTION_DOC_EMBED,
      images: [],
      text: "Documentation is easy to skip under deadline pressure. We added a Cursor skill in the repo that summarizes every pull request and appends to a Notion doc—in customer-facing language, with screenshots of the work. After each session, typing “summarize” produced a lightweight audit trail that made design decisions easy to communicate to stakeholders without rebuilding context from memory.",
      browserFrame: true,
      wideMedia: true,
    },
    {
      label: "08 — Prototype",
      heading: "Front-end prototype",
      embedUrl: PROTOTYPE_URL,
      embedPosterImage: `${BASE}/showcase-final.png`,
      embedFallbackLabel: "Open live prototype",
      images: [],
      text: "Explore the prototype in its current state—dashboard, fleet, drivers, transactions, route optimizer, and more. Built to be handed off and continued, not thrown away.",
      browserFrame: true,
      fullWidth: true,
      embedShowOnMobile: true,
    },
    {
      label: "Going forward",
      heading: "Next steps",
      images: [],
      text: "The next step is putting this prototype in front of real users—usability testing and sentiment testing. Does it resonate? Are we surfacing the right signals for the operator? Does the interface actually drive action in the field? The value of a prototype like this is speed: put it in people's hands quickly, watch how they use it, see where they break it, and iterate. That is the goal of these faster design workflows.",
    },
  ],
}
