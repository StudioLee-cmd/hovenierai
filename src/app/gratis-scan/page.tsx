import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import GratisScanContent from "./GratisScanContent";

export const metadata: Metadata = {
  title: `Gratis AI- en SEO-scan voor ${siteDetails.niche.toLowerCase()} | ${siteDetails.siteName}`,
  description: `Vraag de gratis scan aan en zie in een rapport hoe je scoort tegenover andere ${siteDetails.niche.toLowerCase()}: waar je klanten misloopt en welke kansen je laat liggen.`,
  openGraph: {
    title: `Gratis AI- en SEO-scan | ${siteDetails.siteName}`,
    description: `Vraag de gratis scan aan en zie in een rapport hoe je scoort tegenover andere ${siteDetails.niche.toLowerCase()}: waar je klanten misloopt en welke kansen je laat liggen.`,
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
