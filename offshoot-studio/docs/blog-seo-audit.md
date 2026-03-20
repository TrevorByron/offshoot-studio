# Full Site SEO Audit

**Date:** March 20, 2026  
**Scope:** tigerteamstudios.com — homepage, about, selected-work, play (blog), and all subpages

---

## Executive Summary

The site has a **strong technical foundation**: sitemap, robots.txt, canonicals, Organization/WebSite schema, Article schema with images, and per-route metadata. Many issues from the previous blog-focused audit have been fixed (OG images on posts, Article schema image, ItemList on blog index, card images). Remaining gaps are **minor on-page tweaks** (blog card alt text, Selected Work OG image) and **content strategy** (internal linking, query-param URL handling).

**Overall health:** Good — no critical crawlability or indexation issues.

**Top 5 priorities:**
1. Add descriptive alt text to blog card images (currently `alt=""`)
2. Add OG image to Selected Work layout (currently falls back to default)
3. Add CTA/internal links to more blog posts (only 1–2 have `[Book a call](/#cta)`)
4. Consider noindex or canonical for `?case=` and `?about=true` URL variants (low priority)
5. Run PageSpeed Insights on production and address any Core Web Vitals issues

---

## Technical SEO Findings

### ✅ Crawlability & Indexation

| Item | Status | Notes |
|------|--------|-------|
| robots.txt | ✅ | Allows all, references sitemap |
| Sitemap | ✅ | Includes `/`, `/about`, `/selected-work`, `/play`, all project slugs, all post slugs |
| Canonicals | ✅ | Root, about, selected-work, play, and all subpages have self-referencing canonicals |
| generateStaticParams | ✅ | Blog posts and project pages pre-rendered |
| Trailing slash | ✅ | Next.js default (no trailing slash) — consistent |

### ✅ Structured Data

| Page | Schema | Status |
|------|--------|--------|
| Root | Organization, WebSite, WebPage | ✅ |
| Blog index (`/play`) | ItemList of BlogPosting | ✅ |
| Blog posts | Article with image, author, publisher | ✅ |
| Selected work | Inherits root | ✅ |

### ⚠️ Open Graph & Social

| Issue | Impact | Evidence | Fix |
|-------|--------|----------|-----|
| Blog card images use `alt=""` | Medium | `app/play/page.tsx` line 149 | Use `alt={post.title}` or descriptive alt for each card image |
| Selected Work has no OG image | Low | Layout falls back to root default | Add `images: [{ url: \`${siteUrl}/og-image.png\`, ... }]` to selected-work layout (or a dedicated selected-work OG) |

### ✅ Blog Posts (since last audit)

- OG images: ✅ Fixed — `post.image` passed to `openGraph.images` and `twitter.images`
- Article schema image: ✅ Fixed — `post.image` included when present
- All 7 posts have `image` in frontmatter

---

## On-Page SEO Findings

### Title Tags

| Page/Post | Title | Chars | Status |
|-----------|-------|-------|--------|
| Home | Tiger Team Studios - Strategic Design Engineering | ~48 | ✅ |
| Play | Play – Tiger Team Studios Blog | ~32 | ✅ |
| Selected Work | Selected Work – Tiger Team Studios | ~38 | ✅ |
| PRC | What We Learned Building a PRC App Proof of Concept with Expo | ~55 | ✅ |
| Shipping | Shipping Multiple Projects: Analytics & Structured Data | ~52 | ✅ |
| Building prototype | Building a Prototype: Tailwind, shadcn, MapLibre | ~49 | ✅ |
| SEO | SEO for Design Engineers: Sitemaps, Canonicals, and Getting Found | ~61 | OK (slightly long) |
| Others | Various | 50–60 | ✅ |

**Recommendation:** Titles are generally within 50–60 chars. SEO post could be shortened to ~55 if desired.

### Meta Descriptions

| Post | Chars | Status |
|------|-------|--------|
| PRC | ~130 | ✅ |
| Shipping | ~114 | ✅ |
| Building prototype | ~109 | ✅ |
| SEO | ~127 | ✅ |
| Before/after | ~95 | ✅ |
| Building portfolio | ~95 | ✅ |
| How UX | ~90 | ✅ |

**Recommendation:** All descriptions within 150–160 chars. Good.

### Heading Structure

- ✅ One H1 per page
- ✅ Blog index H1: "Play – Design Engineering Blog" (keyword-rich)
- ✅ Logical H2/H3 hierarchy (What We Were Playing With, How We Prompted It, etc.)

### Image Optimization

| Issue | Impact | Fix |
|-------|--------|-----|
| Blog cards `alt=""` | Medium | `alt={post.title}` or `alt={post.title} blog post` |
| Case study blocks `alt=""` | Low | `case-study-block.tsx` lines 195, 208 — add descriptive alt |
| Hero carousel `alt=""` | Low | `hero-carousel.tsx` line 266 — add alt |
| Floating nav `alt=""` | Low | `floating-nav.tsx` line 96 — add alt |

---

## Site Architecture

### URLs

- `/` — Home
- `/about` — Redirects to `/?about=true` (modal)
- `/selected-work` — Case study list
- `/selected-work/[slug]` — Standalone project pages (procore, get-shit-done, open-joy)
- `/play` — Blog index
- `/play/[slug]` — Blog posts

### Query-param URLs

- `/selected-work?case=gsd` — Opens case study modal
- `/?about=true` — Opens about modal

**Note:** These are indexable. Google may see them as duplicate content. Consider:
- Adding `rel="canonical"` to the base URL when modal is open (client-side only)
- Or leaving as-is — impact is low for a small site

---

## Internal Linking

| Issue | Impact | Fix |
|-------|--------|-----|
| Only 1–2 posts have CTA link | Low | Add `[Book a call](/#cta)` to 2–3 more posts |
| Before/after post could link to GSD case study | Medium | Add contextual link: `/selected-work?case=gsd` |
| Posts could link to related case studies | Low | Add 1–2 cross-links per post where relevant |

---

## Content Quality

- ✅ E-E-A-T: First-hand experience, real examples, agency voice
- ✅ Content depth: 800–1500+ words per post
- ✅ Keywords in frontmatter
- ⚠️ Keyword overlap: "design engineer" in 4+ posts — ensure each post has a distinct primary keyword to avoid cannibalization

---

## Prioritized Action Plan

### Quick wins (do first)

1. **Blog card alt text** — Change `alt=""` to `alt={post.title}` in `app/play/page.tsx`
2. **Selected Work OG image** — Add explicit `images` to selected-work layout metadata

### High impact

3. **Internal links** — Add before/after post → Get Shit Done case study link
4. **CTA links** — Add `[Book a call](/#cta)` to 2–3 more posts (e.g. SEO, building portfolio, PRC)

### Low priority

5. **Query-param handling** — Document or implement noindex/canonical for `?case=` and `?about=true` if indexing becomes an issue
6. **SEO post title** — Shorten to ~55 chars if desired
7. **Empty alt fixes** — Audit case-study-block, hero-carousel, floating-nav for decorative vs. meaningful images

### Long-term

8. **PageSpeed Insights** — Run on production; address LCP, INP, CLS
9. **Keyword differentiation** — Audit for cannibalization as post count grows
10. **Category/topic structure** — When 15+ posts, consider `/play/category/[slug]`

---

## Summary Table

| Area | Status | Notes |
|------|--------|-------|
| Crawlability | ✅ | Sitemap, robots, canonicals |
| Indexation | ✅ | Static params, no blocks |
| Schema | ✅ | Org, WebSite, Article, ItemList |
| OG/Social | ⚠️ | Blog OK; Selected Work uses default |
| Titles | ✅ | Within range |
| Descriptions | ✅ | Within range |
| Image alt | ⚠️ | Blog cards empty |
| Internal links | ⚠️ | Minimal cross-linking |
| Content quality | ✅ | Strong, E-E-A-T |
