import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    quote: "I've had the chance to work with Trevor across both consumer and enterprise-grade products, and he consistently delivers. On a recent consumer app, he quickly gathered the right inputs, translated them into thoughtful UX flows, and delivered a ready-to-use prototype in record time. When you don't have full headcount and need fast turnaround, that kind of speed and clarity is invaluable.",
    name: "Anna Grigoryan",
    title: "Director of Product Management",
    company: "Product Leader",
    avatar: "/anna-grigoryan.png",
  },
  {
    quote: "They helped us validate our core feature in 4 weeks instead of 3 months. Shipped almost directly to production.",
    name: "Sarah Chen",
    title: "VP of Product",
    company: "TechFlow Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Like having a senior product engineer join overnight. Understood our vision and executed flawlessly.",
    name: "Michael Rodriguez",
    title: "Founder & CEO",
    company: "DataVault",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "The strategic thinking they brought was invaluable. We thought we knew what to build, but they helped us see the bigger picture and pivot early. That early alignment saved us months of rework and gave the whole team confidence in the direction.",
    name: "Emily Watson",
    title: "Head of Design",
    company: "CloudSync",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Best $12k we ever spent. Production-ready in 5 weeks.",
    name: "James Park",
    title: "CTO",
    company: "ScaleUp Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Their AI-augmented approach meant we could iterate quickly without sacrificing quality. Every decision was thoughtful, every line of code was clean. We went from concept to user testing in half the time we'd budgeted, and the feedback from our beta users was overwhelmingly positive.",
    name: "Lisa Thompson",
    title: "Product Lead",
    company: "InnovateCo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
  },
]

export function WhyOffshootSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <span className="font-geist-mono text-[12px] text-left whitespace-nowrap">
            Our reputation
          </span>
        </div>
        <div className="text-left mb-12">
          <h2 className="text-section-title mt-6 mb-4 md:-mb-2">
            What Clients Say
          </h2>
        </div>
        <div className="relative">
          <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:0.75rem]">
            {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`flex flex-col bg-card break-inside-avoid mb-3 ${index >= 3 ? "hidden sm:flex" : ""}`}
            >
              <CardContent className="p-4 flex flex-col flex-1">
                <p className="text-foreground text-base leading-relaxed mb-4 flex-1">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
          <div
            aria-hidden
            className="hidden sm:block absolute -bottom-px -left-px -right-px h-16 z-10 pointer-events-none bg-gradient-to-t from-background via-background/80 to-transparent"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
