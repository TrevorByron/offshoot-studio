import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"

const services = [
  {
    title: "Rapid Prototyping (AI-Augmented)",
    timeline: "3-6 weeks",
    pricing: "$8k-$15k",
    description: "Test your product ideas before committing your team.",
    perfectFor: [
      "Validating new features or product directions",
      "Showing investors or stakeholders a tangible concept",
      "Exploring ideas outside your current roadmap",
      "De-risking big bets before you allocate engineering resources",
    ],
    whatYouGet: [
      "Strategy session to refine the idea and define success",
      "Working coded prototype (React/TypeScript)",
      "User-testable with realistic interactions and data",
      "AI-accelerated development (what takes agencies weeks, we do faster)",
      "Documentation and handoff",
      "Iterations based on feedback",
    ],
    cta: "Start a Prototype Sprint",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
  },
  {
    title: "Embedded Design Engineering",
    timeline: "3+ weeks",
    pricing: "$8k-$15k per engagement",
    description: "Senior design-eng capacity without W2 overhead.",
    perfectFor: [
      "Critical feature builds that need design + engineering in one",
      "Scaling your team temporarily without hiring delays",
      "Short-term capacity needs (product launches, redesigns, sprints)",
      "Teams that need senior hybrid talent (design + code) fast",
    ],
    whatYouGet: [
      "Senior design engineer embedded with your team",
      "Feature design through production implementation",
      "Strategic product thinking + hands-on execution",
      "Daily collaboration via Slack/Linear/GitHub",
      "No hiring overhead, no onboarding lag, no employment commitment",
      "Flexible engagement structure",
    ],
    cta: "Discuss Embedding",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  },
  {
    title: "0-to-MVP Design Refinement",
    timeline: "3-8 weeks",
    pricing: "$10k-$15k",
    description: "You've launched. Now make it professional.",
    perfectFor: [
      "Startups that built a scrappy MVP and now you want to refine it",
      "Products that work but don't look/feel professional",
      "Teams moving upmarket and need polish to match",
      "Pre-fundraise companies that need their product to look credible",
    ],
    whatYouGet: [
      "Full product audit (UX, visual design, information architecture)",
      "Redesigned core flows with modern, professional UI",
      "Component-based design system for consistency",
      "Rebuilt with modern React architecture",
      "Smooth animations and polished interactions",
      "Documentation for your team to maintain it",
    ],
    cta: "Book a Design Audit",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
]

export function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-section-title mb-6">Services</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover flex flex-col pt-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-none">
                <Image
                  src={service.image}
                  alt={`Placeholder - ${service.title}`}
                  fill
                  className="object-cover placeholder-image rounded-none"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{service.timeline}</Badge>
                  <Badge variant="outline">{service.pricing}</Badge>
                </div>
                <CardDescription className="mt-4">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3">Perfect for:</h4>
                  <ul className="space-y-2">
                    {service.perfectFor.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-3">What you get:</h4>
                  <ul className="space-y-2">
                    {service.whatYouGet.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  {service.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
