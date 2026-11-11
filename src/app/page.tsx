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
// BOUWSTEEN 8 — kop + subkop van het bewijs-blok komen uit dezelfde bron als de inhoud,
// zodat ze nooit iets anders kunnen beweren dan wat eronder staat (src/data/testimonials.ts).
import { proofBlock } from "@/data/testimonials";


import CostComparison from "@/components/CostComparison/CostComparison";
import FallingText from "@/components/FallingText";

import USPPillars from "@/components/USPPillars";
import SetupSupport from "@/components/SetupSupport";
import HomeLatestBlogs from "@/components/HomeLatestBlogs";

import type { Metadata } from 'next';

import SiteSchema from "@/components/SiteSchema";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};


const HomePage: React.FC = () => {
  return (
    <>
      <SiteSchema />
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

        {proofBlock.section && (
          <Section
            id="testimonials"
            title={proofBlock.section.title}
            description={proofBlock.section.description}
          >
            <Testimonials />
          </Section>
        )}

        <FAQ />


      </Container>
      <FallingText />
    <HomeLatestBlogs />
    </>
  );
};

export default HomePage;