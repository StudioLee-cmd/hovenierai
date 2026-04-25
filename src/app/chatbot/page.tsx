import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import ChatbotContent from "./ChatbotContent";

export const metadata: Metadata = {
  title: `AI Chatbot voor ${siteDetails.niche} — ${siteDetails.siteName}`,
  description: `AI chatbot voor ${siteDetails.niche?.toLowerCase()} vangt klanten op, beantwoordt vragen en boekt afspraken — 24/7, ook buiten kantooruren.`,
  openGraph: {
    title: `AI Chatbot voor ${siteDetails.niche} — ${siteDetails.siteName}`,
    description: `Een AI chatbot voor ${siteDetails.niche?.toLowerCase()} vangt klanten op, beantwoordt vragen en boekt afspraken — 24/7.`,
    url: `${siteDetails.siteUrl}chatbot`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function ChatbotPage() {
  return <ChatbotContent />;
}
