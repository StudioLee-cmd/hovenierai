import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import TerugbellenContent from "./TerugbellenContent";

const niche = siteDetails.niche?.toLowerCase();

export const metadata: Metadata = {
  title: `Terugbelagent voor ${siteDetails.niche} — ${siteDetails.siteName}`,
  description: `Hoor hoe de terugbelagent voor ${niche} een gemiste oproep opvolgt. Laat je e-mail achter en ontvang de voorbeelden en een demo.`,
  openGraph: {
    title: `Terugbelagent voor ${siteDetails.niche} — ${siteDetails.siteName}`,
    description: `Hoe de terugbelagent voor ${niche} een gemiste oproep opvolgt.`,
    url: `${siteDetails.siteUrl}terugbellen`,
    type: "website",
    locale: "nl_NL",
  },
  alternates: { canonical: `${siteDetails.siteUrl}terugbellen` },
};

export default function TerugbellenPage() {
  return <TerugbellenContent />;
}
