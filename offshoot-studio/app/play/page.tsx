import Image from "next/image"
import Link from "next/link"
import { SectionWrapper } from "@/components/sections/section-wrapper"
import { HeroLogoStack } from "@/components/sections/hero-logo-stack"
import { Footer } from "@/components/sections/footer"
import { BookACallLink } from "@/components/book-a-call-link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { getAllPosts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Play – Tiger Team Studios Blog",
  description:
    "What we're exploring and learning. Insights on UX engineering, modern design tools, AI-assisted development, and strategic design from Tiger Team Studios.",
  alternates: {
    canonical: "https://tigerteamstudios.com/play",
  },
  openGraph: {
    title: "Play – Tiger Team Studios Blog",
    description:
      "What we're exploring and learning. Insights on UX engineering, modern design tools, AI-assisted development, and strategic design from Tiger Team Studios.",
    url: "https://tigerteamstudios.com/play",
    siteName: "Tiger Team Studios",
    type: "website",
    images: [{ url: "https://tigerteamstudios.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play – Tiger Team Studios Blog",
    description:
      "What we're exploring and learning. Insights on UX engineering, modern design tools, AI-assisted development, and strategic design from Tiger Team Studios.",
    images: ["https://tigerteamstudios.com/og-image.png"],
  },
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  catch {
    return dateStr
  }
}

const baseUrl = "https://tigerteamstudios.com"

/** Placeholder gradient when no post image is set */
function getPlaceholderGradient(slug: string): string {
  const hues = [220, 280, 340, 40, 160]
  const index = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hues[index % hues.length]
  return `linear-gradient(135deg, oklch(0.75 0.15 ${hue} / 0.4), oklch(0.55 0.2 ${hue} / 0.6))`
}

export default function PlayPage() {
  const posts = getAllPosts()

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Play – Tiger Team Studios Blog",
    description:
      "What we're exploring and learning. Insights on UX engineering, modern design tools, AI-assisted development, and strategic design from Tiger Team Studios.",
    url: `${baseUrl}/play`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `${baseUrl}/play/${post.slug}`,
        datePublished: post.date,
        ...(post.image && { image: `${baseUrl}${post.image}` }),
      },
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SectionWrapper
        variant="spacious"
        className="overflow-visible !pt-44 !pb-14 md:!pb-18 lg:!pb-22"
        animateOnScroll={false}
      >
        <HeroLogoStack />
        <div className="mx-auto max-w-7xl">
          {/* Blog7-style header: badge, headline, description, CTA */}
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                Blog
              </Badge>
              <h1 className="text-[40px] md:text-[56px] font-normal leading-tight tracking-tight mb-4">
                Play – Design Engineering Blog
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                AI-generated posts about real work we&apos;ve shipped. We&apos;re
                here for the SEO—we&apos;ll call it what it is.
              </p>
            </div>
            <BookACallLink className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0">
              Book a call
            </BookACallLink>
          </div>

          {/* 3-column grid of post cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/play/${post.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                  <div
                    className="relative w-full aspect-video shrink-0 -mt-4 rounded-t-lg overflow-hidden"
                    style={
                      post.image
                        ? undefined
                        : { background: getPlaceholderGradient(post.slug) }
                    }
                  >
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        aria-hidden
                      >
                        <span className="font-geist-mono text-4xl font-bold text-white/30">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardHeader className="px-4 pt-4 pb-2">
                    <time
                      dateTime={post.date}
                      className="font-geist-mono text-[12px] text-muted-foreground block mb-1"
                    >
                      {formatDate(post.date)}
                    </time>
                    <CardTitle className="text-lg font-semibold leading-tight group-hover:text-accent-link transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 py-2 flex-1">
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="px-4 py-4 pt-2 border-t-0 flex items-center gap-1 text-sm font-medium text-accent-link group-hover:underline">
                    Read more
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}
