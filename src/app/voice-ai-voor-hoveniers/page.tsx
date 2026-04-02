import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import VoiceAIContent from "@/app/voice-ai/VoiceAIContent";

export const metadata: Metadata = {
    title: `VoiceAI voor Hoveniers | ${siteDetails.siteName}`,
    description: `Ontdek onze voiceai oplossing speciaal voor hoveniers. ${siteDetails.siteName} helpt je groeien.`,
};

export default function Page() {
    return <VoiceAIContent />;
}
