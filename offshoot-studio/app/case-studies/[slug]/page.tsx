import { notFound } from "next/navigation"
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies"
import { CaseStudyPageLayout } from "@/components/case-study/case-study-page-layout"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)
  if (!caseStudy) return { title: "Case Study Not Found" }
  const description =
    caseStudy.metaDescription ?? caseStudy.introBlurb.slice(0, 160)
  return {
    title: `${caseStudy.title} – Tiger Team Studios`,
    description,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)
  if (!caseStudy) notFound()
  return <CaseStudyPageLayout caseStudy={caseStudy} />
}
