---
title: "What We Learned Building a PRC App Proof of Concept with Expo"
description: "We built a proof-of-concept app for The Public Run Club—Expo Router, NativeWind, expo-av, and what we learned. Not their real app; a prototype to explore the idea."
date: "2025-03-21"
slug: "prc-expo-what-we-learned-building-a-run-club-app"
keywords: ["prototype before committing engineering", "fast product validation", "3 week prototype development", "Expo", "React Native", "design help for funded startups"]
image: "/blog/prc-expo-what-we-learned-building-a-run-club-app.png"
---

We built a proof-of-concept app for The Public Run Club (PRC)—an audio-guided run companion for people rebuilding their relationship with running. Not their real app; a prototype to explore the idea. Library of collections, run notes, pep talks, and a Listen flow with progress tracking. The stack: Expo 54, Expo Router, NativeWind (Tailwind for React Native), and expo-av for audio. Here's what we learned.

## What We Were Building

The Public Run Club helps people with a *complicated* relationship with running—caught between "too much" and "not enough." Our proof of concept explored what an app could support:

- **Library** — Collections of audio-guided runs (First Run, Kind & Consistent). Tap to play, track progress, unlock later collections.
- **Run Notes** — Reflections after runs, linked to recordings. Stored in AsyncStorage for the prototype.
- **Pep Talks** — Short situational boosts (rainy day, tired, first run back) with search.

CHANI-inspired visual direction: collage-y, feminine, warm. Custom fonts (Editors Note, Oswald, IBM Plex), grain overlay, and a design system that had to feel distinct from our web work.

## What We Learned About Expo

### Expo Router is a game-changer

File-based routing like Next.js, but for mobile. `app/(tabs)/library/index.tsx`, `app/(tabs)/library/[id]/play.tsx`—the mental model maps directly. Typed routes with `experiments.typedRoutes` meant full type safety when navigating. No manual navigator setup. We gave Cursor the app.json and a few screens; "Add a library section with these content types. Use Expo Router. Match the existing screen structure." It produced routes that fit.

### NativeWind + CSS variables = one design system, two platforms

We use Tailwind in our web work. NativeWind lets us use the same utility classes in React Native. The trick: on native, `:root` from global.css doesn't exist. We had to inject design tokens via `vars(nativeWindVars)` in the root layout so colors and typography rendered. One `global.css` for web, one `nativeWindVars` object for iOS/Android—kept in sync manually. Worth it: `className="font-card-title text-card-title text-primary"` works everywhere.

### expo-av for audio: simple until it isn't

Play/pause, progress bar, "Finish" → "Add reflection" flow. expo-av handles the basics. We hit two things: (1) progress persistence—saving position every 800ms to AsyncStorage so users don't lose their place; (2) web vs. native behavior—expo-av works on web, but autoplay policies differ. We added a small `useAudioDuration` hook to get duration before render for progress display. Straightforward once we knew the API.

### Web export: phone frame on desktop

The proof of concept has a web build (`expo export --platform web`). On desktop, we render a 420px phone frame with black letterboxing so it looks like a device. `Platform.OS === 'web' && windowWidth > 420` triggers the frame. Deployed to Vercel with a simple rewrite for SPA routing. One codebase, three platforms.

### Font loading: graceful fallback

Custom fonts (Editors Note, Oswald, IBM Plex) load via `expo-font`. If they fail—e.g. in some Expo Go environments—we fall back to system fonts and log a warning. No white screen. `useNativeFontStyle` applies the custom font only when loaded; otherwise we use platform defaults. Small detail, big UX win.

## What Surprised Us

**Context switching is real.** Going from Next.js + Tailwind + Vercel to Expo + NativeWind + EAS in the same week meant keeping a "PRC patterns" scratch file. Things that work on web (e.g. `boxShadow`) need `Platform.select` for native (`shadowColor`, `shadowOffset`, etc.). We batched: web work in one block, mobile in another.

**AsyncStorage for prototype data.** No backend. Notes and listen progress live in AsyncStorage. Keys like `@prc/listen_progress` and `@prc/diary_entries`. For a proof of concept with a few testers, it's enough. If they were to ship a real app, they'd move to a proper backend.

**Unlock flow.** "Complete First Run to unlock Kind & Consistent." We track completion in AsyncStorage and gate the locked collections. Simple modal when you tap a locked card. The pattern—complete X to unlock Y—is common in audio apps; Expo Router made the flow easy to wire.

## How We Prompted It

For the Library structure: "Add a library section with these content types. Use Expo Router. Match the existing screen structure." The constraint "match the existing screen structure" pushed Cursor to look at our tabs layout and card components. Output was consistent.

For the Listen screen: "Create an audio playback screen with expo-av. Play/pause, progress bar, Finish button. On Finish, navigate to Add reflection. Persist progress to AsyncStorage." We iterated on the progress persistence logic—the 800ms debounce and the 95% listened threshold for "complete."

For design tokens: "We have global.css with :root variables. On native, :root doesn't exist. Create a nativeWindVars object that mirrors the CSS variables so we can use vars() in the root View." That unblocked styling on iOS/Android.

## What We'd Do Again

- **Expo Router** — File-based routing, typed routes, minimal config. We'd use it on the next React Native project without hesitation.
- **NativeWind** — Same mental model as web. The vars() bridge for native is a bit manual but pays off.
- **expo-av** — Solid for audio. We'd add error handling and offline support next time.
- **Phone frame on web** — Makes the web build feel like a real app. Good for demos and testing.

## What's Next

EAS Build for TestFlight and Play Store—if they wanted to take the proof of concept further. We're curious about the deployment story for prototypes: build profiles, OTA updates, and how smooth the path from concept to production is. That's a different blog post.

[Book a call](/#cta) if you're building a mobile app and want help shipping faster with Expo.
