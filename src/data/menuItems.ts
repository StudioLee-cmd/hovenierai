import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Diensten",
        url: "#",
        children: [
            { text: "Chatbot voor Hoveniers", url: "/chatbot" },
            { text: "Voice AI voor Hoveniers", url: "/voice-ai" },
            { text: "SEO voor Hoveniers", url: "/seo" },
            { text: "Social Media voor Hoveniers", url: "/social-media" },
            { text: "Reviews voor Hoveniers", url: "/reviews" },
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
