import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { BackLink } from "@/components/back-link"
import { BookACallLink } from "@/components/book-a-call-link"
import { Footer } from "@/components/sections/footer"
import { getPost, getAllPosts, getAllPostSlugs } from "@/lib/blog"
import type { Metadata } from "next"

const baseUrl = "https://tigerteamstudios.com"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Post Not Found" }

  const title = `${post.title} – Tiger Team Studios`
  const url = `${baseUrl}/play/${post.slug}`

  const ogImage = post.image
    ? { url: `${baseUrl}${post.image}`, width: 1200, height: 630 }
    : undefined

  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: "Tiger Team Studios",
      type: "article",
      publishedTime: post.date,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      ...(ogImage && { images: [ogImage.url] }),
    },
    keywords: post.keywords,
  }
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

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const readingTime = estimateReadingTime(post.content)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.image && { image: `${baseUrl}${post.image}` }),
    author: {
      "@type": "Organization",
      name: "Tiger Team Studios",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tiger Team Studios",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/play/${post.slug}`,
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen">
        {/* Sticky back navigation — matches CaseStudyDetailModal (light mode) */}
        <div className="sticky top-0 z-20 flex justify-start p-4 bg-transparent pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3">
            <BackLink href="/play" label="Back to Play" variant="button" />
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border text-foreground shadow-sm hover:bg-muted transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Content — matches CaseStudyDetailModal margin/padding */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-18 lg:py-22">
          <div className="mx-auto max-w-3xl">
            <article>
              <header className="mb-10">
                <h1 className="text-hero mb-4">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 font-geist-mono text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
                </div>
              </header>

              <div className="blog-prose">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                  h2: ({ children }) => (
                    <h2 className="text-subsection-title mt-12 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-semibold text-lg mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => {
                    const isExternal = href?.startsWith("http")
                    if (isExternal) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-link hover:opacity-90 underline"
                        >
                          {children}
                        </a>
                      )
                    }
                    return (
                      <Link
                        href={href ?? "#"}
                        className="text-accent-link hover:opacity-90 underline"
                      >
                        {children}
                      </Link>
                    )
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className
                    if (isInline) {
                      return (
                        <code className="font-geist-mono text-sm bg-muted px-1.5 py-0.5 rounded">
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code
                        className={`font-geist-mono block text-sm bg-muted p-4 rounded-lg overflow-x-auto ${className ?? ""}`}
                      >
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="mb-4 overflow-x-auto">{children}</pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-border pl-4 my-4 text-muted-foreground italic">
                      {children}
                    </blockquote>
                  ),
                }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* CTA block */}
            <div className="mt-16 pt-10 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Ready to discuss your project? We&apos;d love to hear from you.
              </p>
              <BookACallLink className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Book a call
              </BookACallLink>
            </div>

            {/* Related posts */}
            {(() => {
              const allPosts = getAllPosts()
              const relatedPosts = allPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
              if (relatedPosts.length === 0) return null
              return (
                <div className="mt-16 pt-10 border-t border-border">
                  <h2 className="text-subsection-title mb-4">More from Play</h2>
                  <ul className="space-y-3">
                    {relatedPosts.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/play/${related.slug}`}
                          className="text-accent-link hover:opacity-90 underline font-medium"
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/play"
                    className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← All posts
                  </Link>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
