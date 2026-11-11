import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import DemoContent from "./DemoContent";

// Every demo or call button on the site comes here: the e-mail address first, the booking only after
// the request is in (owner 30-10 09:34, cap-2026-10-30-093442-1). Not a page to rank: noindex, out of the sitemap.
export const metadata: Metadata = {
  title: `Vraag je demo aan — ${siteDetails.siteName}`,
  description: `Laat je e-mailadres achter en ontvang de demo van ${siteDetails.siteName}. Daarna kies je zelf of je een gesprek plant.`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteDetails.siteUrl}demo` },
};

export default function DemoPage() {
  return <DemoContent />;
}
