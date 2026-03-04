import React from "react";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import CreditPricing from "@/components/CreditPricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";


import CostComparison from "@/components/CostComparison/CostComparison";
import FallingText from "@/components/FallingText";

import USPPillars from "@/components/USPPillars";
import SetupSupport from "@/components/SetupSupport";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <USPPillars />
      <Container>
        <Benefits />

        <CostComparison />

        <SetupSupport />

      </Container>

      {/* Full Width Pricing Section */}
      <Section
        id="pricing"
        title="Tarieven"
        description="Eerlijke, transparante prijzen. Geen verrassingen."
      >
        <Pricing />
        <Container>
          <CreditPricing />
        </Container>
      </Section>

      <Container>

        <Section
          id="testimonials"
          title="Wat Onze Klanten Zeggen"
          description="Ervaringen van bedrijven die al werken met HovenierAI."
        >
          <Testimonials />
        </Section>

        <FAQ />


      </Container>
      <FallingText />
    </>
  );
};

export default HomePage;
