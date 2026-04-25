import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import ReviewsContent from "./ReviewsContent";

const niche = siteDetails.siteName.replace(/AI$/i, "").toLowerCase();

export const metadata: Metadata = {
  title: `Review Management voor ${niche}s | ${siteDetails.siteName}`,
  description: `Google reviews verzamelen als ${niche}? Automatische review requests via WhatsApp, NFC-kaarten en slimme software. Meer sterren, meer klanten.`,
  openGraph: {
    title: `Review Management voor ${niche}s | ${siteDetails.siteName}`,
    description: `Automatisch 5-sterren reviews verzamelen als ${niche}. WhatsApp requests, NFC-kaarten en Google Business integratie.`,
    url: `${siteDetails.siteUrl}reviews`,
    type: "website",
  },
  alternates: {
    canonical: `${siteDetails.siteUrl}reviews`,
  },
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
