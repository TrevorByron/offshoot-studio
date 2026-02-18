import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { AboutHeroSection } from "@/components/sections/about-hero-section"
import { AboutProblemSection } from "@/components/sections/about-problem-section"
import { AboutVisionSection } from "@/components/sections/about-vision-section"
import { AboutMotivationSection } from "@/components/sections/about-motivation-section"
import { AboutCTASection } from "@/components/sections/about-cta-section"

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutHeroSection />
      <AboutProblemSection />
      <AboutVisionSection />
      <AboutMotivationSection />
      <AboutCTASection />
      <Footer />
    </main>
  )
}
