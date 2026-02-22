import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { ServicesAndProcessSection } from "@/components/sections/services-and-process-section"
import { WhyNotAISection } from "@/components/sections/why-not-ai-section"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { WhyOffshootSection } from "@/components/sections/why-offshoot-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemSection />
      <ServicesAndProcessSection />
      <CaseStudiesSection />
      <WhyOffshootSection />
      <WhyNotAISection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
