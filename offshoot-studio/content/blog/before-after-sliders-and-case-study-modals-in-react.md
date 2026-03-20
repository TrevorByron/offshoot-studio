---
title: "Before/After Sliders and Case Study Modals in React"
description: "Interactive before/after sliders for a case study, plus a modal that keeps context. React, Framer Motion, and one TypeScript gotcha."
date: "2025-03-05"
slug: "before-after-sliders-and-case-study-modals-in-react"
keywords: ["design refinement for SaaS", "make MVP look professional", "case study", "before after slider", "Framer Motion", "React"]
image: "/blog/before-after-sliders-and-case-study-modals-in-react.png"
---

Case studies need to show transformation. Before and after screenshots are table stakes—but a static side-by-side doesn't land. We wanted sliders. Drag to reveal. Smooth. And we wanted them inside a modal so you could dive into a project without losing your place.

This week we shipped both: before/after sliders for the [Get Shit Done case study](/selected-work?case=gsd) and a case study modal that feels like a layer, not a new page.

## What We Were Playing With

The [GSD (Get Shit Done) case study](/selected-work?case=gsd): a productivity app redesign. We had before/after pairs for Login, Today's Tasks, and Menu. The ask: let users slide between before and after to see the transformation. We also needed a modal that could open from the Selected Work page, show the full case study (including those sliders), and close back to where you were.

Stack: React 19, Framer Motion, `react-before-after-slider-component`, Next.js App Router. The case study content lives in TypeScript modules (`lib/case-studies/`) with a typed section system—hero, quote, before/after, before/after group.

## What Was New

The before/after block was a custom wrapper around `react-before-after-slider-component`. The library gives you a slider; we needed custom styling (full-width bar, HugeIcons arrows), sliding "After/Before" labels that follow the handle, and support for both single sliders and grouped sliders (multiple in one section).

The modal used Framer Motion's `layoutId` for shared layout animation—the case study card on the list could morph into the modal. When you close, it morphs back. That took some tuning: the scroll container for the modal content needed a `scrollRootRef` so our reveal animations (which use `useInView`) knew where to measure from.

## How We Prompted It

For the before/after block, we gave Cursor: "Add a CaseStudyBeforeAfterBlock component. Use react-before-after-slider-component. Custom handle with arrow icons. Labels above the slider that slide with the handle. Support beforeImage, afterImage, and optional label. Match our case study section styling."

The key constraint was "match our case study section styling"—that pushed Cursor to look at `CaseStudyBlock` and the existing reveal config. It produced a component that fit the system.

For the TypeScript fix (`releasePointerCapture` on Element not Document), we hit a build error and pasted it: "Fix: use handle ref for releasePointerCapture. The handle is an Element, not Document." Cursor suggested the right ref type change.

## What We Learned

Pointer capture is tricky. When you're dragging a slider and the user releases outside the element, you need `releasePointerCapture` on the same element that called `setPointerCapture`. We had it on `document`; it needed to be on the handle ref. Small fix, but it blocked the build until we caught it.

The grouped before/after section type (`beforeAfterGroup`) was a nice extension—one section, multiple sliders, same label. It kept the content structure clean and let us add Login, Today's Tasks, and Menu sliders under one "Before and After" heading.

## What's Next to Play With

Considering a "grouped" variant for other section types—e.g., multiple quotes in one block. We also want to test the modal on mobile: does the shared layout animation hold up, or does it feel janky on smaller screens?

[Book a call](/#cta) if you're building case studies and want help with before/after sliders or modal patterns.
