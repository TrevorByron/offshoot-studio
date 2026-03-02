/**
 * Case study header: title (h1) + tags (badges with icons, Geist Mono).
 * Shared by all case study pages; keep structure consistent for new case studies.
 */
import { CaseStudyBadge } from "./case-study-badge"
import type { CaseStudyContent } from "@/lib/case-studies"

interface CaseStudyHeaderProps {
  caseStudy: Pick<CaseStudyContent, "title" | "badge" | "badges">
}

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const { title, badge, badges } = caseStudy
  const tags = badges?.length ? badges : badge ? [badge] : []
  return (
    <header>
      <div>
        <h1 className="text-[40px] md:text-[56px] font-normal leading-tight tracking-tight mb-10 text-center">
          {title}
        </h1>
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {tags.map((tag) => (
              <CaseStudyBadge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
