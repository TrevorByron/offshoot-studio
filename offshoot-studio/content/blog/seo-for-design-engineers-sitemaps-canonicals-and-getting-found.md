---
title: "SEO for Design Engineers: Sitemaps, Canonicals, and Getting Found"
description: "How we wired sitemap.xml, robots.txt, and per-route metadata so Tiger Team Studios can be found when people search for UX engineers who use AI."
date: "2025-03-20"
slug: "seo-for-design-engineers-sitemaps-canonicals-and-getting-found"
keywords: ["design engineer for hire", "design engineering agency", "UX engineer", "technical product designer", "Next.js", "sitemap"]
image: "/blog/seo-for-design-engineers-sitemaps-canonicals-and-getting-found.png"
---

Design engineers build things. But if no one can find them, it doesn't matter. This week we went deep on the plumbing: sitemap, robots, canonicals, and per-route metadata. The goal: when someone searches for "UX engineer who knows AI" or "design engineer Cursor," Tiger Team Studios shows up.

Here's what we shipped and what we're still figuring out.

## What We Were Playing With

The Tiger Team Studios site: Next.js 16, App Router, Vercel. We had pages; we didn't have a sitemap, robots.txt, or consistent metadata. We also added the Play blog—Markdown-based, at `/play`—which meant a new content type that needed to be in the sitemap and have proper meta tags.

We also fixed the Vercel build. The app lives in an `offshoot-studio` subfolder; we needed a root `package.json` and `vercel.json` to point to the right directory. A few iterations to get it right.

## What Was New

Next.js has built-in support for `sitemap.ts` and `robots.ts` in the app directory. You export a function; Next.js turns it into `/sitemap.xml` and `/robots.txt`. The sitemap pulls from `getAllProjects()` and `getAllPosts()`—dynamic, so new blog posts and project pages show up automatically.

Per-route metadata: each page (and `generateMetadata` for dynamic routes) sets `title`, `description`, `canonical`, `openGraph`, `twitter`. The blog posts get Article schema (JSON-LD) for rich results. The root layout has Organization and WebSite schema.

Vercel Analytics went into the layout. One line. Now we can see traffic when it starts to come.

## How We Prompted It

For the sitemap: "Create app/sitemap.ts. Include the base URL, /about, /selected-work, /play, and all project slugs from getAllProjects. Also include all blog post slugs from getAllPosts. Use the Next.js MetadataRoute.Sitemap type."

Cursor produced the structure; we adjusted the `lastModified` for blog posts to use the post's date instead of `new Date()`.

For the Play blog: "Add a blog at /play. Markdown files in content/blog/, gray-matter for frontmatter. Index page lists posts, [slug] page renders Markdown. generateMetadata for each post. Add to sitemap." That became the full blog implementation we shipped.

## What We Learned

SEO is mostly plumbing. Sitemap, robots, canonicals, meta tags—once they're in place, the rest is content. The Play blog is the content engine: each post targets keywords, has proper frontmatter, and gets picked up by the sitemap automatically.

The Vercel subfolder setup was a gotcha. Root `package.json` with `"build": "cd offshoot-studio && npm run build"` (or similar) plus `vercel.json` with `"rootDirectory": "offshoot-studio"`—took a couple of tries to get the right combination. Reverting to Root Directory in the Vercel dashboard was simpler than fighting with config files.

## What's Next to Play With

Monitoring Search Console once we have enough data. We also want to add more structured data for the case studies—maybe `CreativeWork` or `Article` for each. And the Play blog: more posts, more keywords, see what starts to rank.

[Book a call](/#cta) to chat about design engineering and how we can help you get found.
