# Case Study Card Modal

## Target behavior
- **Only the "Learn more" link** on each card opens the full-screen modal (no navigation). Clicking elsewhere on the card does nothing; the card is not one big click target.
- All cards that have a case study show the same footer link label: **"Learn more"**. Clicking it opens the modal.
- **Modal layout**: Hero = card visual (same background + screenshot). Below that: scrollable sections for additional context and imagery, then testimonial quote when present. Easy close via Escape, overlay click, and close button. "View full case study" link inside the modal for the full page.
- **Where**: This behavior is implemented on **both** the Case Studies section (homepage) and the **Recent Work page** for any card that has a case study (`caseStudySlug`).

## Implementation

### 1. Case study detail modal component
Add **`CaseStudyDetailModal`** (e.g. `components/case-study/case-study-detail-modal.tsx`).

- **Props**: `open: boolean`, `onClose: () => void`, `slug: string | null`. When `slug` is null or missing, don’t render content (or show nothing).
- **Pattern**: Same as existing modals ([CTAModal](offshoot-studio/components/cta-modal.tsx), [AboutModal](offshoot-studio/components/about-modal.tsx)): `createPortal(..., document.body)`, fixed overlay, body scroll lock when open, Escape to close, overlay click to close.
- **Content**:
  - **Hero**: Use `getCaseStudy(slug)` and `getCaseStudyCardProps(caseStudy)` for `imageBackground` and `imageScreenshot`. Full-width hero that mirrors the card (same background + screenshot in the same window-style frame).
  - **Sections**: Map `caseStudy.sections` and render with existing [CaseStudyBlock](offshoot-studio/components/case-study/case-study-block.tsx). Reuse as-is; optionally disable or simplify scroll-reveal inside the modal.
  - **Quote**: If `caseStudy.quote` exists, render [CaseStudyQuote](offshoot-studio/components/case-study/case-study-quote.tsx).
  - **Close button**: Sticky/fixed top-right with close icon, `aria-label="Close case study"`.
  - **Secondary CTA**: "View full case study" link to `/case-studies/[slug]`.
- **Accessibility**: `role="dialog"`, `aria-modal="true"`, focus close button on open, restore focus on close when possible.

### 2. Case Studies section — "Learn more" opens modal
- **CaseStudiesSection** becomes a client component (or uses a client wrapper) with state `openSlug: string | null`.
- **Do not wrap the card in a button.** Keep the card as a static layout.
- Pass `footerLinkLabel="Learn more"`, `slug={card.slug}`, and `onLearnMoreClick={(s) => setOpenSlug(s)}`. Do **not** pass `footerLinkHref` when using `onLearnMoreClick`.
- Render `CaseStudyDetailModal` with `open={openSlug !== null}`, `slug={openSlug}`, `onClose={() => setOpenSlug(null)}`.
- Result: only "Learn more" opens the modal; card body is not clickable.

### 3. CaseStudyCard component changes
- Add optional props: `slug?: string`, `onLearnMoreClick?: (slug: string) => void`.
- When `onLearnMoreClick` and `slug` are provided: render the footer as a **button** (or link with `preventDefault`) with label from `footerLinkLabel` ("Learn more") that calls `onLearnMoreClick(slug)`. No navigation.
- When `onLearnMoreClick` is not provided: keep current behavior — `Link` or `<a>` to `footerLinkHref` with `footerLinkLabel` (e.g. "View more", "See Prototype").

### 4. Recent Work page — required
- **Same behavior as Case Studies section**: Cards with a `caseStudySlug` must open the case study modal when "Learn more" is clicked.
- **Implementation**: Give the page access to modal state and the modal. Either (A) convert the page to a client component and hold `openSlug` there, rendering `CaseStudyDetailModal` and passing `onLearnMoreClick` to each case-study card, or (B) add a client wrapper that wraps the list and provides modal state + modal.
- For each project where `caseStudy` is defined: pass `slug={project.caseStudySlug}`, `footerLinkLabel="Learn more"`, and `onLearnMoreClick={(s) => setOpenSlug(s)}`. Omit `footerLinkHref` for those cards so the only footer action is "Learn more" → modal.
- For projects **without** a case study: keep current behavior — pass `footerLinkHref` and `footerLinkLabel` from the project; do not pass `onLearnMoreClick`; footer stays a normal link.
- **Remove** the outer `Link` wrapper around case-study cards (the one that links to `/case-studies/[slug]`). Only "Learn more" opens the modal; the modal provides "View full case study" to the full page.

## Files to add
- `offshoot-studio/components/case-study/case-study-detail-modal.tsx` — full-screen modal (hero, sections via CaseStudyBlock, CaseStudyQuote, close button, "View full case study" link).

## Files to change
- **CaseStudiesSection** — client state, render modal, pass slug + "Learn more" + onLearnMoreClick to each card (no footerLinkHref for modal).
- **CaseStudyCard** — optional `slug`, `onLearnMoreClick`; when set, footer is button "Learn more" that calls handler; otherwise existing Link/a behavior.
- **Recent Work page** — client component or client wrapper, modal + openSlug state, pass slug + onLearnMoreClick for case-study cards, remove outer Link wrapper around those cards.

## Summary
- **Trigger**: Only the "Learn more" link opens the modal (not the whole card).
- **Copy**: All cards with a case study use "Learn more" for the modal trigger.
- **Where**: Both **Case Studies section** (homepage) and **Recent Work page** implement this for cards with `caseStudySlug`.
