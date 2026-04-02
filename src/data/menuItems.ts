import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Diensten",
        url: "#",
        children: [
            { text: "AI Chatbot", url: "/chatbot" },
            { text: "Voice AI", url: "/voice-ai" },
            { text: "SEO", url: "/seo" },
            { text: "Social Media", url: "/social-media" },
            { text: "Reviews", url: "/reviews" },
            { text: "Review Pakket", url: "/review-pakket" },
        ]
    },
    {
        text: "Tarieven",
        url: "/tarieven"
    },
    {
        text: "Gratis Scan",
        url: "/gratis-scan"
    },
    {
        text: "Gratis Website",
        url: "/gratis-website"
    },
    {
        text: "Blog",
        url: "/blog"
    }
];
