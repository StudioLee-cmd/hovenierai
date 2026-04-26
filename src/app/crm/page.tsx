import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import CrmContent from "./CrmContent";

export const metadata: Metadata = {
  title: `CRM voor ${siteDetails.niche} — ${siteDetails.siteName}`,
  description: `Een CRM voor ${siteDetails.niche?.toLowerCase()} die klantgegevens, afspraken en follow-ups op één plek bundelt. Geen versnipperde Excel-bestanden, geen vergeten klanten.`,
  openGraph: {
    title: `CRM voor ${siteDetails.niche} — ${siteDetails.siteName}`,
    description: `Een CRM voor ${siteDetails.niche?.toLowerCase()} die klantgegevens, afspraken en follow-ups op één plek bundelt.`,
    url: `${siteDetails.siteUrl}crm`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function CrmPage() {
  return <CrmContent />;
}
