import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SocialMediaContent from "@/app/social-media/SocialMediaContent";

export const metadata: Metadata = {
    title: `SocialMedia voor Hoveniers | ${siteDetails.siteName}`,
    description: `Ontdek onze socialmedia oplossing speciaal voor hoveniers. ${siteDetails.siteName} helpt je groeien.`,
};

export default function Page() {
    return <SocialMediaContent />;
}
