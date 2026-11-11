"use client";
import React from "react";
import Container from "@/components/Container";
import CallbackRequestPopup from "@/components/CallbackRequestPopup";
import { siteDetails } from "@/data/siteDetails";

export default function DemoContent() {
  return (
    <Container>
      <section className="pt-32 pb-24 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-foreground">De demo van {siteDetails.siteName}</h1>
        <p className="mt-6 mb-10 text-lg text-foreground/80">
          Laat je e-mailadres achter, dan sturen we je de demo. Daarna kies je zelf of je een gesprek plant.
        </p>
        <CallbackRequestPopup inline source="demo_page" onClose={() => undefined} onSent={() => undefined} />
      </section>
    </Container>
  );
}
