import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import GratisScanContent from "./GratisScanContent";

export const metadata: Metadata = {
  title: `Gratis AI- en SEO-scan voor ${siteDetails.niche.toLowerCase()} | ${siteDetails.siteName}`,
  description: `Gratis scan voor ${siteDetails.niche.toLowerCase()}: een cijfer op SEO, conversie, AI-vindbaarheid en lokale signalen, plus de belangrijkste verbeterpunten in je inbox.`,
  openGraph: {
    title: `Gratis AI- en SEO-scan | ${siteDetails.siteName}`,
    description: `Gratis scan voor ${siteDetails.niche.toLowerCase()}: een cijfer op SEO, conversie, AI-vindbaarheid en lokale signalen, plus de belangrijkste verbeterpunten in je inbox.`,
    url: `${siteDetails.siteUrl}gratis-scan`,
    type: "website",
  },
  alternates: {
    canonical: `${siteDetails.siteUrl}gratis-scan`,
  },
};

export default function GratisScanPage() {
  return <GratisScanContent />;
}
