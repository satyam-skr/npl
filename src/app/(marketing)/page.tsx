import { CTASection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
