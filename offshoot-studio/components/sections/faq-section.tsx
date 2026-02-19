import { SectionWrapper } from "./section-wrapper"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const faqs = [
  {
    question: "How is this different from a design agency?",
    answer: "One senior design engineer, no account managers or junior designers. No bureaucracy, no handoff lag. We use AI to move 3-5x faster.",
  },
  {
    question: "How is this different from hiring?",
    answer: "Hiring takes 2-3 months plus payroll and employment risk. We start in 2-3 weeks, defined scope, fraction of a senior hire.",
  },
  {
    question: "Why not just use AI tools?",
    answer: "AI executes; it doesn't advise. We help you decide what to build, then use AI to build it fast.",
  },
  {
    question: "What if I need you for longer than the initial engagement?",
    answer: "We extend or start new engagements as needed. Many clients do multiple projects over time.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "We work best with teams that have traction and capacity to invest. If you're earlier stage, our pricing may not fit—happy to point you elsewhere.",
  },
  {
    question: "What's your availability?",
    answer: "2-3 projects per quarter. Lead time 2-3 weeks.",
  },
  {
    question: "What industries do you work in?",
    answer: "B2B SaaS, fintech, developer tools. Complex workflows, data viz, technical users. Not consumer social, e-commerce, or marketing sites.",
  },
  {
    question: "How do we get started?",
    answer: "Book a 30-minute call. We'll scope fit—prototyping, embedded work, or refinement.",
  },
]

export function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-section-title mb-6">
            FAQ
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  )
}
