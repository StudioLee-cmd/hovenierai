import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import TarievenContent from "./TarievenContent";

export const metadata: Metadata = {
  title: `Tarieven — ${siteDetails.siteName} | Prijzen & Pakketten`,
  description: `Tarieven ${siteDetails.siteName}: gratis website design, website vanaf €800, AI platform vanaf €79/maand. Geen verborgen kosten.`,
  openGraph: {
    title: `Tarieven — ${siteDetails.siteName}`,
    description: `Gratis website design, website vanaf €800, of het complete AI platform vanaf €79/maand.`,
    url: `${siteDetails.siteUrl}tarieven`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function TarievenPage() {
  return <TarievenContent />;
}
