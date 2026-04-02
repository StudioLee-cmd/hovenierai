import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Diensten",
        url: "#",
        children: [
            { text: "Chatbot voor Hoveniers", url: "/chatbot-voor-hoveniers" },
            { text: "Voice AI voor Hoveniers", url: "/voice-ai-voor-hoveniers" },
            { text: "SEO voor Hoveniers", url: "/seo-voor-hoveniers" },
            { text: "Social Media voor Hoveniers", url: "/social-media-voor-hoveniers" },
            { text: "Reviews voor Hoveniers", url: "/reviews-voor-hoveniers" },
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
