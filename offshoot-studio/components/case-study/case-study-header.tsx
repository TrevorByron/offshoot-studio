/**
 * Case study header: title (h1) + tags (badges with icons, Geist Mono).
 * Shared by all case study pages; keep structure consistent for new case studies.
 */
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ZapIcon,
  UserGroupIcon,
  PaintBrush01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons"
import type { CaseStudyContent } from "@/lib/case-studies"

const BADGE_ICONS: Record<string, typeof ZapIcon> = {
  "Design Sprints": ZapIcon,
  "Team Expansion": UserGroupIcon,
  "UI/UX Refinement": PaintBrush01Icon,
  "Design systems": Layers01Icon,
}

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
            {tags.map((tag) => {
              const Icon = BADGE_ICONS[tag]
              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-geist-mono"
                >
                  {Icon && (
                    <HugeiconsIcon
                      icon={Icon}
                      className="size-3 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                  {tag}
                </Badge>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
