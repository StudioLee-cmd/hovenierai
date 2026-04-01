import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import VoiceAIContent from "./VoiceAIContent";

export const metadata: Metadata = {
  title: `Voice AI Telefonist voor ${siteDetails.niche} | Geen Oproep Meer Missen — ${siteDetails.siteName}`,
  description: `Een Voice AI telefonist voor ${siteDetails.niche?.toLowerCase()} beantwoordt elke oproep, plant afspraken en stuurt samenvattingen via WhatsApp. Verbeter je bereikbaarheid met ${siteDetails.siteName}.`,
  openGraph: {
    title: `Voice AI Telefonist voor ${siteDetails.niche} — ${siteDetails.siteName}`,
    description: `Een Voice AI telefonist voor ${siteDetails.niche?.toLowerCase()} beantwoordt elke oproep en plant afspraken — 24/7.`,
    url: `${siteDetails.siteUrl}voice-ai`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function VoiceAIPage() {
  return <VoiceAIContent />;
}
