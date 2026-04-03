import type { Metadata } from "next";
import SpelContent from "./SpelContent";

export const metadata: Metadata = {
  title: "Tuinbaas - Hovenier Simulator | HovenierAI",
  description:
    "Word de ultieme tuinbaas! Loop rond in pixel-art tuinen, maai gras, snoei heggen, gebruik de hogedrukreiniger en verdien munten. 16 levels met toenemende moeilijkheid. Gratis online spel van HovenierAI.",
  openGraph: {
    title: "Tuinbaas - Hovenier Simulator | HovenierAI",
    description:
      "Word de ultieme tuinbaas! Loop rond, voltooi tuinklussen en koop upgrades in deze pixel-art hovenier simulator.",
    type: "website",
    url: "https://www.hovenierai.nl/spel",
    siteName: "HovenierAI",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.hovenierai.nl/spel" },
};

export default function SpelPage() {
  return <SpelContent />;
}
