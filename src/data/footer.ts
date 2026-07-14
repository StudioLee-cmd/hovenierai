import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    services: IMenuItem[];
    general: IMenuItem[];
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
    kvk: string;
    btw: string;
    address: string;
    legalName: string;
} = {
    subheading: "Focus op de tuinen, wij op de rest. Wij regelen je telefoontjes, planning en marketing, zodat jij kunt doen waar je goed in bent.",
    services: [
        { text: "Chatbot voor Hoveniers", url: "/chatbot" },
        { text: "Voice AI voor Hoveniers", url: "/voice-ai" },
        { text: "SEO voor Hoveniers", url: "/seo" },
        { text: "Social Media voor Hoveniers", url: "/social-media" },
        { text: "Reviews voor Hoveniers", url: "/reviews" },
        { text: "Review Pakket", url: "/review-pakket" },
        { text: "CRM voor Hoveniers", url: "/crm" },
        { text: "Automatisering voor Hoveniers", url: "/automatisering" },
    ],
    general: [
        { text: "Tarieven", url: "/tarieven" },
        { text: "Gratis Scan", url: "/gratis-scan" },
        { text: "14 Dagen Gratis Proberen", url: "/free-trial" },
        { text: "Gratis Website", url: "/gratis-website" },
        { text: "Blog", url: "/blog" },
    ],
    quickLinks: [
        { text: "Chatbot voor Hoveniers", url: "/chatbot" },
        { text: "Voice AI voor Hoveniers", url: "/voice-ai" },
        { text: "SEO voor Hoveniers", url: "/seo" },
        { text: "Social Media voor Hoveniers", url: "/social-media" },
        { text: "Reviews voor Hoveniers", url: "/reviews" },
        { text: "Review Pakket", url: "/review-pakket" },
        { text: "CRM voor Hoveniers", url: "/crm" },
        { text: "Automatisering voor Hoveniers", url: "/automatisering" },
        { text: "Tarieven", url: "/tarieven" },
        { text: "Gratis Scan", url: "/gratis-scan" },
        { text: "Gratis Website", url: "/gratis-website" },
        { text: "Blog", url: "/blog" },
    ],
    email: 'tim@hovenierai.nl',
    telephone: '+31612345678',
    socials: {
        youtube: 'https://www.youtube.com/@DIGITAL.STUDIOLEE',
    },
    kvk: '98933353',
    btw: 'NL005362803B09',
    address: 'De Donge 9, 3448CJ, Woerden',
    legalName: 'DigitalStudioLee'
}
