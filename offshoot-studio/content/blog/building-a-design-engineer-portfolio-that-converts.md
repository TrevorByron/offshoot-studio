---
title: "Building a Design Engineer Portfolio That Actually Converts"
description: "How we structured our site for conversion: hero, Cal.com embed, and a floating nav that appears when you're ready to act."
date: "2025-02-28"
slug: "building-a-design-engineer-portfolio-that-converts"
keywords: ["design engineer for hire", "design engineer portfolio", "fractional design engineer", "startup design partner", "Next.js", "Cal.com"]
image: "/blog/building-a-design-engineer-portfolio-that-converts.png"
---

We've built plenty of portfolios that looked good and went nowhere. This time we wanted the Tiger Team Studios site to do something: get people to book a call. That meant rethinking the hero, the CTA placement, and when the nav even shows up.

Here's what we were playing with, what worked, and what we're still tuning.

## What We Were Playing With

A Next.js 16 site for Tiger Team Studios—strategic design engineering for product teams. Stack: React 19, Tailwind 4, Framer Motion, shadcn-style components. The goal: a portfolio that feels like a design engineer built it (because one did) and makes it obvious how to take the next step.

Key pieces: a hero with real copy and a subtext that doesn't sound like every other agency; a footer with a CTA block and the NASA worm logo; a floating nav that only appears after you've scrolled halfway down the viewport; and a Cal.com embed for booking.

## What Was New

The floating nav behavior was the interesting part. Most portfolio navs are always visible. We wanted the opposite: let the content breathe, then bring the nav in when the user has seen enough to care. Framer Motion's `useInView` and `useReducedMotion` made it straightforward—animate `y` and `opacity` based on scroll position, respect `prefers-reduced-motion` for accessibility.

The Cal.com embed was another shift. Instead of "Contact us" or a generic form, we went straight to "Book a call." The CTA scrolls to the embed on the home page; on other pages it opens a modal. One action, one outcome.

## How We Prompted It

For the floating nav, we gave Cursor the constraint: "Nav should be hidden until user scrolls past 50% of the viewport height, then animate in from the bottom. Use Framer Motion. Respect reduced motion." The key was being explicit about the trigger (scroll position) and the accessibility requirement. Cursor produced a `useEffect` with a scroll listener and the right `animate` props.

For the hero and section structure, we referenced our existing `SectionWrapper` and `reveal-config` so new sections would match the scroll-reveal pattern. "Add a hero section that uses the same reveal config as the other sections" kept everything consistent.

## What We Learned

Conversion isn't about more CTAs—it's about the right CTA at the right moment. The floating nav appears when you've scrolled enough to have context. The footer CTA is there when you've read the whole page. And the hero doesn't bury the ask; it points to it.

We're still figuring out whether the Cal.com modal on non-home pages is the right pattern or if we should just deep-link to `/#cta`. A/B testing would help, but for now the modal keeps people on the page.

## What's Next to Play With

We're testing different hero copy and CTA placement. We're also curious about adding a simple "What happens when you book" section to reduce friction—people want to know what they're signing up for before they click.

[Book a call](/#cta) to see the portfolio in action.
