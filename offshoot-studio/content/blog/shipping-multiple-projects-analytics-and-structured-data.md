---
title: "Shipping Multiple Projects: Analytics & Structured Data"
description: "How we juggled PGY1-Photo, PRC, and Tiger Team Studios in one month—analytics, JSON-LD, and switching stacks without losing flow."
date: "2025-03-12"
slug: "shipping-multiple-projects-analytics-and-structured-data"
keywords: ["fractional design engineer", "design engineering agency", "contract product designer", "Next.js", "analytics", "structured data"]
image: "/blog/shipping-multiple-projects-analytics-and-structured-data.png"
---

Last month we had three different projects in flight: a residency photo site (PGY1-Photo), a run club app (PRC), and the Tiger Team Studios portfolio. Each had different stacks, different clients, and different "what does done look like" definitions. The throughline: analytics, structured data, and making sure each project could be found.

Here's what we were playing with and how we kept context without losing our minds.

## What We Were Playing With

**PGY1-Photo**: A Next.js site for a medical residency program's photo gallery. Added Google Analytics, Facebook Pixel, JSON-LD structured data, a floating CTA, and a referral page. The client wanted to track conversions and look good in search.

**PRC (Public Run Club)**: An Expo/React Native app—library, run notes, pep talks, reflection prompts. Different stack entirely: mobile-first, different component patterns, different deployment (Expo → app stores vs. Vercel).

**Tiger Team Studios**: The portfolio site. Case studies, testimonials, Cal.com, floating nav. The one we were also using to document what we were learning.

## What Was New

For PGY1-Photo, the new thing was wiring analytics and structured data in a way that didn't break the build. `dataLayer` and `_fbq` needed to be on the `Window` type for TypeScript. We added a declaration:

```ts
declare global {
  interface Window {
    dataLayer?: unknown[]
    _fbq?: unknown
  }
}
```

Simple, but it unblocked the Vercel build. Structured data (JSON-LD for the site and key pages) went into the layout and page metadata. Same pattern we'd use later for the Tiger Team Studios sitemap and metadata.

For PRC, the new thing was the app itself—library with content, run notes with input, pep talks, reflection prompts. Expo Router, global styles, and a design system that had to feel different from the web work. Context switching between React (web) and React Native (Expo) is real; we kept a small scratch file of "PRC patterns" so we didn't cargo-cult web patterns into mobile.

## How We Prompted It

For the analytics TypeScript fix, we pasted the error: "Property 'dataLayer' does not exist on type 'Window'." Cursor suggested the `declare global` block. Fast.

For the PRC structure, we gave Cursor the app.json and a few existing screens: "Add a library section with these content types. Use Expo Router. Match the existing screen structure." The constraint "match the existing screen structure" kept the output consistent with what was already there.

## What We Learned

Multi-project work benefits from shared patterns. Analytics, structured data, metadata—once you've done it once, the second and third times are copy-paste-adapt. We're building a mental checklist: sitemap, robots, canonicals, JSON-LD, analytics type declarations.

Context switching between web and mobile is still the hard part. We try to batch: web work in one block, mobile in another. Mixing them in the same session costs more than the sum of the tasks.

## What's Next to Play With

We're consolidating the analytics/SEO setup into a reusable template or starter—so the next client project gets sitemap, robots, and structured data by default. We're also curious about Expo's deployment story for PRC: EAS Build, TestFlight, Play Store. That's a different blog post.

[Book a call](/#cta) if you're juggling multiple projects and want help shipping faster.
