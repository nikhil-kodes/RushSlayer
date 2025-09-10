import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { FeaturesSection } from "@/components/features-section"
import { ImpactSection } from "@/components/impact-section"
import { InnovationSection } from "@/components/innovation-section"
import { TechnicalSection } from "@/components/technical-section"
import { FeedbackCTASection } from "@/components/feedback-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OverviewSection />
      <FeaturesSection />
      <ImpactSection />
      <InnovationSection />
      <TechnicalSection />
      <FeedbackCTASection />
      <Footer />
    </main>
  )
}
