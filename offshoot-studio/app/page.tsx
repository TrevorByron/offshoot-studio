import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { TheWhySection } from "@/components/sections/the-why-section"
import { ServicesAndProcessSection } from "@/components/sections/services-and-process-section"
import { WhyNotAISection } from "@/components/sections/why-not-ai-section"
import { WhyOffshootSection } from "@/components/sections/why-offshoot-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { MightUseLaterSection } from "@/components/sections/might-use-later-section"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <TheWhySection />
      <ServicesAndProcessSection />
      <WhyOffshootSection />
      <FinalCTASection />
      <FAQSection />
      <WhyNotAISection />
      <MightUseLaterSection />
      <Footer />
    </main>
  )
}
