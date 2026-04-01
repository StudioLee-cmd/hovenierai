import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import GratisWebsiteContent from "./GratisWebsiteContent";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;

export const metadata: Metadata = {
  title: `Gratis Website Design voor ${niche} | ${siteDetails.siteName}`,
  description: `Ontvang een gratis professioneel website design voor jouw ${nicheSingular}sbedrijf. Live preview binnen 48 uur, SEO-geoptimaliseerd, geen verplichtingen. Website kopen vanaf €800.`,
  openGraph: {
    title: `Gratis Website Design voor ${niche} | ${siteDetails.siteName}`,
    description: `Gratis website design op maat. Live preview binnen 48 uur. Website kopen vanaf €800 of het complete AI platform vanaf €79/maand.`,
    url: `${siteDetails.siteUrl}gratis-website`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function GratisWebsitePage() {
  return <GratisWebsiteContent />;
}
