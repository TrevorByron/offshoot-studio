# Case study page template

All case study pages use the same layout and shared components. **Do not add page-specific styles or animations**—only content (title, tags, images, supporting text) differs per case study.

## Page structure

1. **Header** — Centered title (h1) and tags (badges with icons, Geist Mono font).
2. **Tags** — Rendered in the header (and on cards/modal); use `badges` from `CaseStudyContent` (e.g. "Design Sprints", "Team Expansion", "UI/UX Refinement", "Design systems"). Icons are mapped in `case-study-badge.tsx`; use `CaseStudyBadge` everywhere for consistent icon + label.
3. **Columns with text** — One or more blocks. Each block:
   - **Left (65%)**: Images (optionally a hero card first), stacked vertically, shared width, natural height.
   - **Right (35%)**: Text. The first block also shows `introBlurb` or `introBlocks`.

Optional: full-width banners, then site footer.

## Adding a new case study

1. Add `lib/case-studies/content/[slug].ts` with `CaseStudyContent`:
   - **title**, **badges** (tags), **introBlurb** or **introBlocks**, **sections** (each: `images`, `text`, optional `heroImages`).
   - Optional **cardPreview** (description, imageBackground, imageScreenshot, imageAlt, imagePosition) for the card on recent-work and case-studies section; if omitted, it’s derived from intro and first section.
   - Optional **metaDescription** for SEO.
2. Register it in `lib/case-studies/index.ts` (add to `caseStudies`; `getAllCaseStudySlugs` stays in sync).
3. Case studies are viewed via the modal on `/selected-work` (and from hero carousel / case studies section links to `/selected-work?case=[slug]`).
