import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SocialMediaContent from "./SocialMediaContent";

const niche = 'hovenier';
const nichePlural = 'hoveniers';

export const metadata: Metadata = {
  title: `Social Media voor ${nichePlural} | ${siteDetails.siteName}`,
  description: `Social media voor ${nichePlural}: content planning, AI-posts en automatische scheduling. Inclusief consulting en analyse.`,
  openGraph: {
    title: `Social Media voor ${nichePlural} | ${siteDetails.siteName}`,
    description: `Volledige social media strategie + uitvoering voor ${nichePlural}. Van content planning tot automatisch posten. Consulting inbegrepen.`,
    url: `${siteDetails.siteUrl}social-media`,
    type: "website",
  },
  alternates: {
    canonical: `${siteDetails.siteUrl}social-media`,
  },
};

export default function SocialMediaPage() {
  return <SocialMediaContent />;
}
