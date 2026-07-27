import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import FreeTrialContent from "./FreeTrialContent";

export const metadata: Metadata = {
  title: `14 dagen voor €1 voor ${siteDetails.niche.toLowerCase()} | ${siteDetails.siteName}`,
  description: `Probeer ${siteDetails.siteName} 14 dagen voor €1: de AI-assistent neemt de telefoon op, plant afspraken en doet de administratie van ${siteDetails.niche.toLowerCase()}. Eenmalig €1, daarna pas beslissen.`,
  openGraph: {
    title: `Start je proefperiode: 14 dagen voor €1 | ${siteDetails.siteName}`,
    description: `Probeer ${siteDetails.siteName} 14 dagen voor €1: de AI-assistent neemt de telefoon op, plant afspraken en doet de administratie van ${siteDetails.niche.toLowerCase()}. Eenmalig €1, daarna pas beslissen.`,
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
