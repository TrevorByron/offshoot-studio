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
    quote: "Trevor helped design foundational portions of the user experience and help us grow from 0 to $10M ARR. I'd recommend him for any early stage team looking for outstanding design and user experience.",
    name: "Michael Yang",
    title: "Founder & CEO",
    company: "Toro TMS",
    avatar: "/michael-yang.png",
  },
  {
    quote: "Trevor was my lead design partner on a big bet we made to bring a bidding network to life at Procore. He helped take a big idea to production at an incredibly fast pace. This helped us derisk the bet quickly and provided the validation we needed to double down. The Procore construction network wouldn't be what it is today without him!",
    name: "Tim Hey",
    title: "Head of Product Management",
    company: "Procore",
    avatar: "/tim-hey.png",
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
              className="flex flex-col bg-card break-inside-avoid mb-3"
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
