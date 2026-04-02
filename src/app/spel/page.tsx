import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import SpelContent from "./SpelContent";

export const metadata: Metadata = {
  title: `Tuinontwerper - Het Tuinontwerp Puzzelspel | ${siteDetails.siteName}`,
  description:
    "Speel Tuinontwerper: ontwerp de mooiste tuin door slimme plaatsing van planten, paden en waterpartijen. Een retro pixel-art puzzelgame van HovenierAI.",
  openGraph: {
    title: `Tuinontwerper - Het Tuinontwerp Puzzelspel | ${siteDetails.siteName}`,
    description:
      "Speel Tuinontwerper: ontwerp de mooiste tuin door slimme plaatsing van planten, paden en waterpartijen.",
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
