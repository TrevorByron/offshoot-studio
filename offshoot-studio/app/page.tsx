import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { TheWhySection } from "@/components/sections/the-why-section"
import { ServicesAndProcessSection } from "@/components/sections/services-and-process-section"
import { WhyOffshootSection } from "@/components/sections/why-offshoot-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
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
      <Footer />
    </main>
  )
}
