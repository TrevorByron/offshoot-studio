import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    quote: "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor.",
    name: "Diana Hu",
    title: "General Partner",
    company: "Y Combinator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "They helped us validate our core feature in 4 weeks instead of 3 months. The prototype was so polished that we shipped it almost directly to production.",
    name: "Sarah Chen",
    title: "VP of Product",
    company: "TechFlow Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Working with Offshoot was like having a senior product engineer join our team overnight. They understood our vision immediately and executed flawlessly.",
    name: "Michael Rodriguez",
    title: "Founder & CEO",
    company: "DataVault",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "The strategic thinking they brought to the table was invaluable. We thought we knew what to build, but they helped us see the bigger picture and pivot early.",
    name: "Emily Watson",
    title: "Head of Design",
    company: "CloudSync",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Best $12k we ever spent. They delivered a production-ready feature in 5 weeks that would have taken our team 3 months. The code quality was exceptional.",
    name: "James Park",
    title: "CTO",
    company: "ScaleUp Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    quote: "Their AI-augmented approach meant we could iterate quickly without sacrificing quality. Every decision was thoughtful, every line of code was clean.",
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
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            From founders to product leaders—here's what working with Offshoot looks like.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col bg-[#f7f7f7] dark:bg-card">
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
      </div>
    </SectionWrapper>
  )
}
