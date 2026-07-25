import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import FreeTrialContent from "./FreeTrialContent";

export const metadata: Metadata = {
  title: `Gratis proefperiode voor ${siteDetails.niche.toLowerCase()} | ${siteDetails.siteName}`,
  description: `Probeer ${siteDetails.siteName} gratis uit: de AI-assistent neemt de telefoon op, plant afspraken en doet de administratie van ${siteDetails.niche.toLowerCase()}. Geen creditcard nodig.`,
  openGraph: {
    title: `Start je gratis proefperiode | ${siteDetails.siteName}`,
    description: `Probeer ${siteDetails.siteName} gratis uit: de AI-assistent neemt de telefoon op, plant afspraken en doet de administratie van ${siteDetails.niche.toLowerCase()}. Geen creditcard nodig.`,
    url: `${siteDetails.siteUrl}free-trial`,
    type: "website",
  },
  alternates: {
    canonical: `${siteDetails.siteUrl}free-trial`,
  },
};

export default function FreeTrialPage() {
  return <FreeTrialContent />;
}
