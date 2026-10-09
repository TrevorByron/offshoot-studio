import type { CaseStudyContent } from "../types"

const BASE = "/case-studies/scout-fuel"

export const SCOUT_FUEL_SLUG = "scout-fuel"

const PROTOTYPE_URL = "https://scout-fuel-redesign.vercel.app/"
const NOTION_DOC_EMBED =
  "https://north-element-ae1.notion.site/ebd//32cda057146d804f8d4bdbfc91e510ec"

/**
 * Scout Fuel case study — story and visuals ported from
 * TrevorBorden-portfolio-review-alkami (Scout Fuel section).
 */
export const scoutFuelCaseStudy: CaseStudyContent = {
  slug: SCOUT_FUEL_SLUG,
  title: "Scout Fuel — Product Design",
  badges: ["Design Sprints", "UI/UX Refinement", "Design systems"],
  cardPreview: {
    description: [
      "Scout Fuel is a fuel optimization tool for trucking companies. The founders have built a UI that is not scaling, and though their customers see value in the concept of fuel optimization, the product has yet to gain traction.",
      "My goal was to create a design foundation they could continue to build on, and redesign the experience from a system of record into a system of intelligence that drove action and fuel savings.",
    ],
    imageBackground: "/background-images/rock.png",
    imageScreenshot: "/case-study-covers/scout-fuel-cover.png",
    imageAlt: "Scout Fuel redesigned dashboard",
    imagePosition: "right",
    coverImageOnly: true,
  },
  introBlurb:
    "Scout Fuel is a fuel optimization tool for trucking companies. The founders have built a UI that is not scaling, and though their customers see value in the concept of fuel optimization, the product has yet to gain traction.",
  introBlocks: [
    {
      type: "paragraph",
      text: "Scout Fuel is a fuel optimization tool for trucking companies. The founders have built a UI that is not scaling, and though their customers see value in the concept of fuel optimization, the product has yet to gain traction. On paper, it makes sense; in practice, they are not leveraging the tool.",
    },
    {
      type: "paragraph",
      text: "The founders came to me asking for support. They are new to development, not fully sure of what they needed, but wanted to make sure what they were building felt modern and well thought out.",
    },
    {
      type: "paragraph",
      text: "My goal was to create, first, a design foundation from which they could continue to build the product, and second, redesign their customers' experience so it was more than a system of record, but instead a system of intelligence that drove action and ultimately increased customers' fuel savings.",
    },
    {
      type: "paragraph",
      label: "Role",
      text: "Solo Designer & Builder",
    },
    {
      type: "paragraph",
      label: "Timeline",
      text: "60 hours",
    },
    {
      type: "paragraph",
      label: "Output",
      text: "Coded prototype",
    },
    {
      type: "paragraph",
      label: "Stack",
      text: "Next.js · Tailwind CSS · shadcn/ui · Vercel",
    },
    {
      type: "paragraph",
      label: "Tools",
      text: "Claude · Tweak CN · Cursor",
    },
  ],
  metaDescription:
    "Case study: Scout Fuel product design — AI-assisted discovery, narrative vision, shadcn design system, subtractive refinement, and a coded fleet fuel dashboard prototype in 60 hours.",
  presentation: "immersiveDark",
  quoteLabel: "",
  quote: {
    quote:
      "It's not the big that beat the small. It's the fast that beat the slow.",
    name: "Posted in the kitchen at my first job, iodine software",
  },
  tags: [
    "Agentic workflow",
    "Claude",
    "Cursor",
    "Cursor skills",
    "Coded prototype",
    "Shadcn",
    "Tailwind CSS",
    "Tweak CN",
    "Narrative vision",
    "Subtractive UI",
    "Gamification",
    "Notion",
    "Living documentation",
    "B2B SaaS",
  ],
  sections: [
    {
      type: "sideBySide",
      before: {
        kicker: "Before",
        title: "Legacy UI shipped by engineering",
        image: `${BASE}/hero-before.png`,
        urlBar: "scoutfuel.app/dashboard",
      },
      after: {
        kicker: "After",
        title: "Systemized design with clearer hierarchy",
        image: `${BASE}/hero-after.png`,
        urlBar: "scoutfuel.app/dashboard",
      },
    },
    {
      label: "2020 vs today",
      heading: "An Update in Process",
      images: [`${BASE}/process-contrast.png`],
      browserFrame: true,
      browserFrameUrl: "Process — additive vs subtractive",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "On the Procore Construction Network (case study 01), I followed a very traditional arc: discovery, then **low-fidelity flows** that slowly, slowly became high-fidelity mocks. A huge share of calendar time lived in those early bands — sketching, grayscale, Figma hygiene — because that was how we de-risked structure before we invested in polish.",
        },
        {
          type: "paragraph",
          text: "In today's process, I believe design is about **steeping and soaking** in the problem and the problem space — so that **solutioning** can feel almost instinctual, with tools like **Claude** and **Cursor** handling so much of the generative work.",
        },
        {
          type: "paragraph",
          text: "Design is now more of a **subtractive** refinement process: we **strip away noise and distraction** until the simplest path through the problem is clear. **Taste and judgment** become two of our most important **superpowers**.",
        },
        {
          type: "paragraph",
          text: "In the past, design was a slow **additive** process. Today, once you are steeped in the problem and the user, it is often much more **subtractive**.",
        },
        {
          type: "paragraph",
          text: "I leveraged this in a recent project for Scout Fuel. The results and timeline astounded me.",
        },
        {
          type: "paragraph",
          font: "mono",
          text: '"If you like the design, take a line out. If you still like it, take another line out." — Gorden Wagener, head of design at Mercedes',
        },
      ],
      text: "",
    },
    {
      label: "01 — Discovery",
      heading: "AI to understand the problem space",
      images: [],
      customMedia: "scoutClaudeResearch",
      browserFrame: true,
      browserFrameUrl: "Research — discovery",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "For this project, I knew it was going to be a challenge to get on the phone with customers of Scout Fuel, so I leaned into AI to help get situated in the needs of the users I was designing for.",
        },
        {
          type: "paragraph",
          text: "My prompt was to get Claude to tell me the story of a Fuel Manager at a trucking company to help me understand their jobs-to-be-done and general challenges.",
        },
      ],
      text: "",
    },
    {
      label: "02 — Narrative vision",
      heading: "Vision First",
      images: [],
      customMedia: "scoutClaudeVision",
      browserFrame: true,
      browserFrameUrl: "Design vision — narrative",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "I then prompted a narrative vision of what an ideal product might unlock for a Fuel Manager. I did this in narrative form, as I have found that stories are often the best way to communicate and to capture the end result.",
        },
        {
          type: "paragraph",
          text: "From here, I set out to design and build a product that was supportive of this vision.",
        },
      ],
      text: "",
    },
    {
      label: "03 — Define",
      heading: "Building a Design Foundation",
      images: [`${BASE}/tweakcn.png`],
      browserFrame: true,
      browserFrameUrl: "www.tweakcn.com",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "Because my goal was to build a front-end prototype they could continue building on, I jumped straight into code and used the Shadcn component system as the base of the prototype.",
        },
        {
          type: "paragraph",
          text: "Shadcn gave me modern componentry, and then I used Tweak CN to customize three unique style directions for Scout Fuel to review and provide feedback on. That gave us a solid design foundation to start building out the actual experience.",
        },
        {
          type: "paragraph",
          text: "I also used Tailwind for layout and styling, so the stack stayed squarely in today's React ecosystem: composable UI primitives, utility-first CSS, and a codebase pattern product engineering already knows how to run with.",
        },
      ],
      text: "",
    },
    {
      label: "04 — Ideate",
      heading: "Prompting The First Version",
      images: [],
      customMedia: "scoutClaudeScaffold",
      browserFrame: true,
      browserFrameUrl: "Ideate — V1 prompt",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "With a clear vision set and the scaffolding of the design foundation in place, I used Claude to shape the first one-shot prompt and get a V1 on the canvas. From there, I moved into Cursor as my primary environment for both development and design, and the work of refining kicked in.",
        },
      ],
      text: "",
    },
    {
      label: "05 — Refine & Build",
      heading: "Refining Through Problem Solving Focus",
      images: [],
      customMedia: "scoutRefinement",
      browserFrame: true,
      browserFrameUrl: "Refinement — subtractive pass",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "Once AI put the first version on the canvas, the work shifted to **subtraction**. The first pass usually has too much: extra panels, extra lines, extra decoration.",
        },
        {
          type: "paragraph",
          text: "I start by moving things around, merging repeated blocks, and removing anything that doesn't carry real signal. It's less about polishing and more about reshaping the structure so the core workflow reads quickly.",
        },
        {
          type: "paragraph",
          text: "That phase feels more like carving than layering. Each pass strips away noise so the product gets closer to the rough shape I have in mind.",
        },
        {
          type: "paragraph",
          text: "At the core, this stage is about becoming incredibly clear about the problems you are solving, and checking whether you are solving them as directly and as simply as possible.",
        },
      ],
      text: "",
    },
    {
      label: "06 — Refine & Build",
      heading: "Adding once the shape is in place",
      images: [`${BASE}/panel-gamified.jpg`],
      browserFrame: true,
      browserFrameUrl: "Gamification",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "After the refinement phase removed distractions and clarified the core shape of the product, I started adding new features for all user problems that seemed poorly addressed.",
        },
        {
          type: "paragraph",
          text: "In this case I focused on simplifying the ability to see, at a glance, how your fleet was doing holistically and which of your drivers might need additional coaching.",
        },
        {
          type: "paragraph",
          text: "I introduced a dynamic **efficiency score** based on each trucking company's purchase history; the score moved up or down with fleet driver execution and became a prominent dashboard signal for quickly identifying which drivers needed attention. The goal was to bring a grounded sense of **gamification** into the workflow.",
        },
      ],
      text: "",
    },
    {
      label: "07 — Documentation",
      heading: "Leveraging Skills for Documentation",
      embedUrl: NOTION_DOC_EMBED,
      images: [],
      browserFrame: true,
      browserFrameUrl: "Notion — documentation",
      wideMedia: true,
      embedShowOnMobile: true,
      bodyBlocks: [
        {
          type: "paragraph",
          text: "I will admit that documentation is not something that really gets me excited and is often an area where I'll drag my feet.",
        },
        {
          type: "paragraph",
          text: "This is changing dramatically as I've started leveraging new workflows into my process.",
        },
        {
          type: "paragraph",
          text: 'In the repo I added a **Cursor skill** that summarizes every pull request and appends to that Notion doc. I told the agent to write in **customer-facing language** — what value landed for Scout Fuel, not just commit noise — and to **capture screenshots** of the work so the log stayed visual, not abstract.',
        },
        {
          type: "paragraph",
          text: 'After each session building the prototype, I would type **"summarize"** and let the skill run. It turned into one of the highest-leverage habits of the sprint: a lightweight audit trail that made it much easier to communicate design decisions back to stakeholders without rebuilding context from memory.',
        },
      ],
      text: "",
    },
    {
      label: "08 — Prototype",
      heading: "Front End Prototype",
      images: [`${BASE}/showcase-final.png`],
      browserFrameUrl: "Click to explore",
      fullWidth: true,
      showcaseBleed: true,
      linkHref: PROTOTYPE_URL,
      linkAriaLabel: "Open live Scout Fuel redesign demo",
      bodyBlocks: [
        {
          type: "paragraph",
          text: "Explore the prototype in its current state.",
        },
      ],
      text: "",
    },
    {
      label: "Going Forward",
      heading: "Next Steps",
      images: [],
      bodyBlocks: [
        {
          type: "paragraph",
          text: "The next step is getting this prototype in front of real users and validating it through usability testing and sentiment testing. Does it resonate? Are we surfacing the right signals for the operator? Does this interface actually drive action in the field? The value of a prototype like this is speed: we can put it in people's hands quickly, watch how they use it, see where they break it, and iterate from there. That is the goal of these faster design workflows.",
        },
      ],
      text: "",
    },
  ],
}
