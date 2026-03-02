import type { CaseStudyContent } from "../types"

export const PROCORE_SLUG = "procore"

const PROTOTYPE_URL = "https://trevorborden.github.io/GCN-prototype/index.html"

export const procoreCaseStudy: CaseStudyContent = {
  slug: PROCORE_SLUG,
  title: "Procore Construction Network",
  badges: ["Team Expansion", "UI/UX Refinement", "Design systems"],
  cardPreview: {
    description: [
      "Procore had talked about building a Construction Network for years, but couldn't commit resources to an abstract vision. We built a coded prototype that made the concept tangible—unlocking internal buy-in and full funding for a dedicated team.",
      "From catalyst to launch, we led discovery, design, and front-end implementation for a platform that continues to connect the construction industry.",
    ],
    imageBackground: "/procore-case-study.png",
    imageScreenshot: "/procore-screenshot.png",
    imageAlt: "Procore Construction Network screenshot",
    imagePosition: "right",
  },
  introBlurb:
    "Procore had talked about building a Construction Network for years, but couldn't commit resources to an abstract vision. We built a coded prototype that made the concept tangible—unlocking internal buy-in and full funding for a dedicated team. From catalyst to launch, we led discovery, design, and front-end implementation for a platform that continues to connect the construction industry.",
  introBlocks: [
    {
      type: "paragraph",
      text: "Procore had been talking about building a Construction Network for years. As a multi-billion dollar company with all the pieces in place—the data, the user base, the strategic vision—they still couldn't commit resources to actually build it. The risk felt too high. The vision too abstract.",
    },
    {
      type: "paragraph",
      label: "The challenge:",
      text: "How do you get a large organization to fund a major new product when it's only existed in slide decks?",
    },
    {
      type: "paragraph",
      label: "Our approach:",
      text: "We built a coded prototype that made the vision tangible. Not wireframes or mockups—a working experience stakeholders could click through, test, and feel. That prototype became the catalyst that unlocked internal resources and gave leadership the confidence to fully fund a dedicated team.",
    },
    {
      type: "paragraph",
      text: "From there, we led discovery and vision casting to define what the network should become: a free business directory connecting contractors, owners, architects, and vendors across the construction industry. We conducted marketplace audits to understand how modern networks operate, ran customer research to learn how companies find partners and position themselves for future work, and mapped high-level user workflows that would drive the platform.",
    },
    {
      type: "paragraph",
      text: "We owned the front-end implementation, using the RITE research method to iterate rapidly through direct user feedback—building, testing, and refining in real-time with actual users.",
    },
    {
      type: "paragraph",
      label: "The outcome:",
      text: "A mobile-responsive platform that proved the concept, secured organizational buy-in, and continues to connect the construction industry today.",
    },
    {
      type: "paragraph",
      text: "View Live Site →",
      font: "mono",
      href: "https://network.procore.com/",
    },
  ],
  metaDescription:
    "Case study: Procore Construction Network — discovery, prototype, and front-end implementation for a free business directory. Launched 2021.",
  quote: {
    quote:
      "Trevor was my lead design partner on a big bet we made to bring a bidding network to life at Procore. He helped take a big idea to production at an incredibly fast pace. This helped us derisk the bet quickly and provided the validation we needed to double down. The Procore construction network wouldn't be what it is today without him!",
    name: "Tim Hey",
    title: "Head of Product Management",
    company: "Procore",
    avatar: "/tim-hey.png",
  },
  banners: [
    {
      heading: "Explore the prototype",
      ctaLabel: "See Prototype",
      ctaHref: PROTOTYPE_URL,
    },
  ],
  sections: [
    {
      label: "Overview",
      heading: "Construction Network",
      heroImages: [
        {
          background: "/background-images/man-on-rock.png",
          inner: "/case-study-covers/procore-cover.png",
        },
      ],
      images: [],
      embedUrl: "https://www.youtube-nocookie.com/embed/O65PKRrNk1E?si=zcbNzIeXSMwPD4ic&controls=0",
      embedPosterImage: "/procore-screenshot.png",
      embedFallbackLabel: "Play on YouTube",
      text: "We started with discovery and vision casting to align on what the Construction Network could be—a free directory where contractors, owners, architects, and vendors find and connect with each other. This section can expand with more detail on the initial scope and goals.",
    },
    {
      label: "Ideate",
      heading: "Team Alignment & Wireframes",
      images: ["/case-studies/procore/wireframes.gif"],
      text: "Before prototyping in high fidelity, we aligned the team around the direction of the end product. In these early circumstances we find that a grey-scale wire frame focuses conversation on key features and flows and keeps momentum in the right direction without getting caught up in the visuals.",
      browserFrame: true,
    },
    {
      label: "Explore",
      heading: "Try the embedded prototype",
      embedUrl: "/case-studies/procore/prototype/index.html",
      images: [],
      text: "",
      browserFrame: true,
      fullWidth: true,
    },
  ],
}
