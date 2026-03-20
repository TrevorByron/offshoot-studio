---
title: "Building a Prototype: Tailwind, shadcn, MapLibre"
description: "How we built a fleet dashboard prototype with multiple themes, a reusable Map component, and MapLibre—no Mapbox key required."
date: "2025-03-21"
slug: "building-a-prototype-tailwind-shadcn-multi-themes-maplibre"
keywords: ["rapid prototyping service", "strategic product prototyping", "make figma prototype functional", "Tailwind", "shadcn", "MapLibre"]
image: "/blog/building-a-prototype-tailwind-shadcn-multi-themes-maplibre.png"
---

We recently built a fleet management dashboard prototype—lots of maps, tables, charts, and forms. The interesting part wasn't the domain; it was how we put the stack together: Tailwind, shadcn, multiple style themes, and MapLibre for maps. Here's the approach and what we'd steal for the next one.

## What We Were Playing With

A Next.js 16 app with a dashboard layout: sidebar, multiple routes, and a mix of data-heavy screens (tables, charts, maps). We wanted:

- **Fast UI iteration** — shadcn components, Tailwind utilities, no custom design system from scratch
- **Theme flexibility** — Let the client (or us) switch between visual styles without touching component code
- **Maps that fit** — Vector maps that respect light/dark mode and don't require a Mapbox key
- **Open-source routing** — Geocoding and route polylines without paid APIs

## What Was New

**Multi-style themes via CSS variables.** Instead of one theme, we added five: blue/violet default, warm amber, teal/green, a glass variant, and an Uber Base–inspired style (system font, square controls, Base Web–like tokens). Each lives in its own file (`style-1.css` through `style-5.css`). The app sets `data-style` on `<html>`; each file defines `html[data-style="N"] { --primary: ...; --radius: ...; }`. Tailwind's `@theme` maps those variables to utilities, so `bg-primary` and `rounded-lg` automatically follow the active style. A floating style switcher persists the choice in localStorage. No theme provider, no JS-driven CSS—just CSS and one attribute.

**MapLibre instead of Mapbox.** MapLibre is the open-source fork of Mapbox GL. Same API, no API key, self-hosted or free tile providers. We wrapped it in a React component with a `Map` context, `Marker`, `Popup`, `GeoJSONLayer`, and `FitBounds`. The map picks light/dark style URLs based on `document.documentElement.classList.contains("dark")` and a `MutationObserver` so it stays in sync with next-themes. One gotcha: MapLibre paint properties don't resolve CSS variables. For circle colors and the like, you pass hex or oklch literals, not `var(--primary)`.

**OSRM + Nominatim for routing.** For the route optimizer, we used OSRM's public demo API for route geometry (origin → destination → polyline) and Nominatim for geocoding addresses to coordinates. Both are free, no keys. Long routes can take 30–60 seconds; we added a 60s timeout and a fallback to a straight line. Good enough for a prototype.

## How We Prompted It

For the multi-style setup, we gave Cursor: "We want multiple visual themes. Each theme is a CSS file that sets CSS variables when `html[data-style='N']` is active. Tailwind should use those variables. Add a style switcher that sets the attribute and persists to localStorage." The key constraint was "CSS variables + data attribute"—that kept the solution simple and avoidable of a theme context.

For the Map component, we said: "Create a MapLibre wrapper with Map, Marker, Popup, and GeoJSONLayer. It should detect light/dark from the document and switch the map style URL. MapLibre paint doesn't support CSS variables; use literal colors for circle-color etc." Cursor produced the structure; we filled in the theme detection and the OSRM integration.

## What We Learned

**CSS variables + data attributes scale.** Five themes, zero component changes. Add a new `style-6.css`, import it, add a button to the switcher—done. The shadcn components (Button, Card, Input) all use `var(--primary)`, `var(--border)`, etc., so they inherit the theme automatically.

**MapLibre is a drop-in for Mapbox.** If you've used Mapbox GL, MapLibre feels identical. The main difference is tile URLs: we used CARTO dark matter and Versatiles for light. No key, no billing.

**Prototype vs. production.** OSRM's public API is rate-limited and slow for long routes. For production you'd self-host OSRM or use a commercial routing API. For a prototype, it's perfect—you get real routes and real geocoding without signing up for anything.

## What's Next to Play With

We're trying the same multi-style pattern on another project to see if it holds up. We're also curious about MapLibre's `projection` option for non-Mercator views and whether a shared Map component could live in a small package for reuse.

[Book a call](/#cta) if you're building prototypes with maps, multi-themes, or design systems.
