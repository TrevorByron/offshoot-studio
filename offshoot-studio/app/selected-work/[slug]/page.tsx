import { notFound } from "next/navigation"
import Image from "next/image"
import { BackLink } from "@/components/back-link"
import { SectionWrapper } from "@/components/sections/section-wrapper"
import { Footer } from "@/components/sections/footer"
import { CaseStudyBadge } from "@/components/case-study/case-study-badge"
import { getProject, getAllProjects } from "@/lib/recent-work"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Project Not Found" }
  const firstLine = project.description[0]?.slice(0, 160) ?? ""
  const title = `${project.title} – Tiger Team Studios`
  const ogImage =
    project.imageUrls?.[0] ?? project.imageBackground ?? project.imageScreenshot ?? "/og-image.png"
  return {
    title,
    description: firstLine,
    alternates: {
      canonical: `/selected-work/${slug}`,
    },
    openGraph: {
      title,
      description: firstLine,
      url: `/selected-work/${slug}`,
      siteName: "Tiger Team Studios",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: firstLine,
      images: [ogImage],
    },
  }
}

export default async function SelectedWorkProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const imageUrls = project.imageUrls?.length
    ? project.imageUrls
    : Array.from({ length: Math.min(project.imageCount, 3) }).map(
        (_, i) => `https://placehold.co/1200x675/f4f4f5/71717a?text=Image+${i + 1}`
      )

  return (
    <main>
      <SectionWrapper
        variant="spacious"
        className="overflow-visible !pt-44 !pb-0"
        animateOnScroll={false}
      >
        <div className="mx-auto max-w-7xl">
          <BackLink />

          <header className="mb-8 md:mb-12">
            <h1 className="text-2xl font-semibold md:text-3xl mb-2">
              {project.title}
            </h1>
            {project.badge && (
              <CaseStudyBadge label={project.badge} className="mb-4" />
            )}
            <div className="space-y-4">
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {project.footerLinkHref && (
              <a
                href={project.footerLinkHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-link hover:opacity-90"
              >
                {project.footerLinkLabel ?? "See Prototype"}
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden />
              </a>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {imageUrls.map((src, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden border border-border bg-muted/50"
              >
                {src.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${project.title} – image ${i + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={src}
                      alt={`${project.title} – image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  )
}
