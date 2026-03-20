#!/usr/bin/env node
/**
 * Capture a screenshot for a blog post card.
 *
 * Usage:
 *   node screenshot-blog.mjs <url> <slug>
 *   node screenshot-blog.mjs <url> <slug> --scroll-container <selector> --scroll-y <px>
 *   node screenshot-blog.mjs <url> <slug> --selector <selector>   # screenshot just this element
 *
 * Options:
 *   --scroll-container <selector>  Scroll this element (e.g. modal scroll container)
 *   --scroll-y <px>                Pixels to scroll down (default: 0)
 *   --selector <selector>          Screenshot only this element (clips to element bounds)
 *   --wait <ms>                    Wait before screenshot (default: 1000 for modals)
 *
 * Example (before/after sliders in case study modal):
 *   node screenshot-blog.mjs "http://localhost:3000/selected-work?case=gsd" gsd-sliders \
 *     --scroll-container "[data-case-study-scroll]" --scroll-y 1400 --wait 2000
 *
 * Output: public/blog/<slug>.png (1200×630)
 * Requires: npx playwright install chromium (one-time)
 */
import { chromium } from "playwright"
import { mkdir } from "fs/promises"
import { join } from "path"

const args = process.argv.slice(2)
const url = args[0]
const slug = args[1]

const opt = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : null
}
const scrollContainer = opt("--scroll-container")
const scrollY = parseInt(opt("--scroll-y") || "0", 10)
const selector = opt("--selector")
const waitMs = parseInt(opt("--wait") || "1000", 10)

if (!url || !slug) {
  console.error("Usage: node screenshot-blog.mjs <url> <slug> [options]")
  console.error("Options: --scroll-container <sel> --scroll-y <px> --selector <sel> --wait <ms>")
  process.exit(1)
}

const outputDir = join(process.cwd(), "public", "blog")
const outputPath = join(outputDir, `${slug}.png`)

async function main() {
  await mkdir(outputDir, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  })

  await page.goto(url, { waitUntil: "networkidle" })
  await page.waitForTimeout(waitMs)

  if (scrollContainer && scrollY > 0) {
    await page.locator(scrollContainer).evaluate((el, y) => {
      el.scrollTop = y
    }, scrollY)
    await page.waitForTimeout(300)
  }

  if (selector) {
    const el = await page.locator(selector).first()
    await el.screenshot({ path: outputPath })
  } else {
    await page.screenshot({ path: outputPath })
  }

  await browser.close()

  console.log(`Screenshot saved: ${outputPath}`)
  console.log(`Frontmatter: image: "/blog/${slug}.png"`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
