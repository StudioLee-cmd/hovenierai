import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SpelContent from "./SpelContent";

export const metadata: Metadata = {
  title: `TuinBaas - Hovenier Simulatie | ${siteDetails.siteName}`,
  description:
    "Bouw je hoveniersbedrijf op in deze isometrische pixelwereld! Maai gazons, snoei heggen en verdien munten. Een retro pixel-art simulatiegame van HovenierAI.",
  openGraph: {
    title: `TuinBaas - Hovenier Simulatie | ${siteDetails.siteName}`,
    description:
      "Bouw je hoveniersbedrijf op in deze isometrische pixelwereld! Maai gazons, snoei heggen en verdien munten.",
    url: `${siteDetails.siteUrl}spel`,
    type: "website",
    locale: "nl_NL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SpelPage() {
  return <SpelContent />;
}
