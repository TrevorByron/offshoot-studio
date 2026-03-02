/**
 * Shared case study badge: secondary Badge with optional icon to the left.
 * Icons are mapped per CASE_STUDY_TAG_OPTIONS (Design Sprints, Team Expansion, etc.).
 * Use everywhere case study tags are shown (header, cards, modal, recent-work).
 */
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ZapIcon,
  UserGroupIcon,
  PaintBrush01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const BADGE_ICONS: Record<string, typeof ZapIcon> = {
  "Design Sprints": ZapIcon,
  "Team Expansion": UserGroupIcon,
  "UI/UX Refinement": PaintBrush01Icon,
  "Design systems": Layers01Icon,
}

export { BADGE_ICONS }

interface CaseStudyBadgeProps {
  label: string
  className?: string
}

export function CaseStudyBadge({ label, className }: CaseStudyBadgeProps) {
  const Icon = BADGE_ICONS[label]
  return (
    <Badge variant="secondary" className={cn("font-geist-mono", className)}>
      {Icon && (
        <HugeiconsIcon
          icon={Icon}
          className="size-3 shrink-0"
          strokeWidth={2}
          aria-hidden
        />
      )}
      {label}
    </Badge>
  )
}
