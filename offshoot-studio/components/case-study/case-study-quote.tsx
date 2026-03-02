import type { CaseStudyQuote as CaseStudyQuoteType } from "@/lib/case-studies"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CaseStudyQuoteProps {
  quote: CaseStudyQuoteType
}

export function CaseStudyQuote({ quote }: CaseStudyQuoteProps) {
  const { quote: text, name, title, company, avatar } = quote
  const attribution = [title, company].filter(Boolean).join(", ")

  return (
    <Card className="max-w-xl bg-white text-gray-900 ring-gray-200/80">
      <CardContent className="p-4 md:p-6 flex flex-col">
        <blockquote className="text-base md:text-lg leading-relaxed mb-4 flex-1">
          &ldquo;{text}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          {avatar && (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-sm text-gray-900">{name}</p>
            {attribution && (
              <p className="text-xs text-gray-500">{attribution}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
