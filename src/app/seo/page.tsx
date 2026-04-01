import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SEOContent from "./SEOContent";

const niche = siteDetails.siteName.replace(/AI$/i, "").toLowerCase();

export const metadata: Metadata = {
  title: `SEO voor ${niche}s | Gevonden Worden in Google | ${siteDetails.siteName}`,
  description: `SEO voor ${niche}s: meer klanten via Google zonder dure advertenties. Automatische blogartikelen, lokale SEO en Google Business optimalisatie vanaf ${"\u20AC"}79/mo.`,
  openGraph: {
    title: `SEO voor ${niche}s | ${siteDetails.siteName}`,
    description: `Wil je als ${niche} beter gevonden worden in Google? ${siteDetails.siteName} regelt je SEO volledig: keyword research, content en technische optimalisatie.`,
    url: `${siteDetails.siteUrl}seo`,
    type: "website",
  },
  alternates: {
    canonical: `${siteDetails.siteUrl}seo`,
  },
};

export default function SEOPage() {
  return <SEOContent />;
}
