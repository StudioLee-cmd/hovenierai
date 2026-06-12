import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SEOContent from "./SEOContent";

const niche = 'hovenier';
const nichePlural = 'hoveniers';

export const metadata: Metadata = {
  title: `SEO voor ${nichePlural} — Beter in Google | ${siteDetails.siteName}`,
  description: `SEO voor ${nichePlural}: meer klanten via Google. Blogartikelen, lokale SEO en Google Business — vanaf ${"\u20AC"}79/maand.`,
  openGraph: {
    title: `SEO voor ${nichePlural} | ${siteDetails.siteName}`,
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
