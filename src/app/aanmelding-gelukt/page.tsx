import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import AanmeldingGeluktContent from "./AanmeldingGeluktContent";

export const metadata: Metadata = {
  title: `Aanmelding geslaagd | ${siteDetails.siteName}`,
  description: `Je aanmelding bij ${siteDetails.siteName} is gelukt. Je ontvangt een e-mail met je persoonlijke inlogcode en start daarna met de AI-assistent voor ${siteDetails.niche.toLowerCase()}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function AanmeldingGeluktPage() {
  return <AanmeldingGeluktContent />;
}
