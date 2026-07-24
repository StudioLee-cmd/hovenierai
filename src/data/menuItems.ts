import { IMenuItem } from "@/types";

// PROPOSITIE-CONTRACT ⛔3 + §④ (niche-sites-upgrade-programma.md): de primaire nav toont DE VIER
// DINGEN, niet acht dienst-pagina's. Acht is dubbel zoveel als het contract toestaat en maakt van
// een duidelijke propositie een menukaart.
//
// ⚠️ De overige dienst-pagina's (/seo · /social-media · /reviews · /review-pakket · /crm) zijn NIET
// verwijderd en hun URL's veranderen niet: ze ranken en dragen interne links vanuit de blogbank.
// Ze vouwen onder "marketing die vanzelf loopt" (/automatisering) en blijven via de FOOTER op elke
// pagina bereikbaar (footer.ts services + quickLinks), dus geen orphan en geen rank-risico.
export const menuItems: IMenuItem[] = [
    {
        text: "Wat we doen",
        url: "#",
        children: [
            { text: "Chatbot op je site", url: "/chatbot" },
            { text: "Telefoon die opneemt", url: "/voice-ai" },
            { text: "Marketing die vanzelf loopt", url: "/automatisering" },
            { text: "Je website", url: "/gratis-website" },
        ]
    },
    {
        text: "Tarieven",
        url: "/tarieven"
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
