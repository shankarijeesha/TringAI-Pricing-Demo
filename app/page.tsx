import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PricingSection from "@/components/pricing-section"
import EstimateSection from "@/components/estimate-section"
import CalculatorSection from "@/components/calculator-section"
import VoicebotCalculatorSection from "@/components/voicebot-calculator-section"
import { CalculatorProvider } from "@/components/calculator-toggle"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CalculatorProvider>
        <PricingSection />
        <EstimateSection />
        <CalculatorSections />
      </CalculatorProvider>
    </main>
  )
}

function CalculatorSections() {
  return (
    <>
      <CalculatorSection />
      <VoicebotCalculatorSection />
    </>
  )
}

