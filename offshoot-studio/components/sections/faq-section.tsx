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
    answer: "Agencies have account managers, project managers, junior designers, and bloated processes. You get one senior design engineer who can think strategically and execute fast. No bureaucracy. No handoff lag.",
  },
  {
    question: "How is this different from hiring?",
    answer: "Hiring takes 2-3 months and comes with payroll, benefits, and employment risk. We start immediately, cost a fraction of a senior hire, and work on defined scopes. Perfect for projects with clear timelines or temporary capacity needs.",
  },
  {
    question: "Why not just use AI tools?",
    answer: "AI tools are great for execution if you know exactly what to build. We help you figure out what to build, then use AI to execute faster. The strategic thinking is the service. The speed is the bonus.",
  },
  {
    question: "What if I need you for longer than the initial engagement?",
    answer: "We can extend or start new engagements as needed. Many clients work with us on multiple projects over time—prototyping one quarter, embedded work the next.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "We focus on Series A+ companies and established teams. If you're pre-seed/seed, our pricing might not fit your budget. Happy to recommend other resources.",
  },
  {
    question: "What's your availability?",
    answer: "We take on 2-3 projects per quarter. Typical lead time is 2-3 weeks to start.",
  },
  {
    question: "What industries do you work in?",
    answer: "We're industry-agnostic but work primarily with B2B SaaS, fintech, and developer tools companies. If your product involves complex workflows, data visualization, or technical users, we're a great fit.",
  },
  {
    question: "How do we get started?",
    answer: "Book a 30-minute strategy call. We'll discuss your needs, see if there's a fit, and scope what makes sense—rapid prototyping, embedded work, or design refinement.",
  },
]

export function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
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
