import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import AutomatiseringContent from "./AutomatiseringContent";

export const metadata: Metadata = {
  title: `Workflow automatisering voor ${siteDetails.niche} — ${siteDetails.siteName}`,
  description: `Workflow automatisering voor ${siteDetails.niche?.toLowerCase()}: automatische herinneringen, klantcommunicatie, lead-opvolging en review-verzoeken. Geen vergeten klanten, geen gemiste opvolging, geen handmatig werk.`,
  openGraph: {
    title: `Workflow automatisering voor ${siteDetails.niche} — ${siteDetails.siteName}`,
    description: `Automatische herinneringen, klantcommunicatie en review-verzoeken voor ${siteDetails.niche?.toLowerCase()} — laat het systeem het werk doen.`,
    url: `${siteDetails.siteUrl}automatisering`,
    type: "website",
    locale: "nl_NL",
    images: [
      {
        url: `${siteDetails.siteUrl}images/services/automatisering-hero.jpg`,
        width: 1672,
        height: 941,
        alt: `Workflow automatisering voor ${siteDetails.niche?.toLowerCase()}`,
      },
    ],
  },
  alternates: { canonical: `${siteDetails.siteUrl}automatisering` },
};

export default function AutomatiseringPage() {
  return <AutomatiseringContent />;
}
