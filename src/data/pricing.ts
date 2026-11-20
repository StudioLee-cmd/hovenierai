import { IPricing } from "@/types";

// PROPOSITIE-CONTRACT ⛔1 (niche-sites-upgrade-programma.md §PROPOSITIE-CONTRACT): GEEN tool-namen,
// niet extern en niet intern. Tot 24-07 stond elke feature-regel hier als de PRODUCTNAAM uit onze
// eigen gereedschapskist. Wie een merknaam leest gaat 'm googelen en zelf proberen; dan verkoop je
// je eigen concurrent. Elke regel is daarom de UITKOMST voor de ondernemer, niet het gereedschap.
// Zet ze niet terug: het contract is de bron, niet de smaak van de dag.
// Bedragen en betaallinks zijn bewust ONGEWIJZIGD — prijzen zijn een business-beslissing (RULE 5).

export const tiers: IPricing[] = [
    {
        name: "Ezida Start",
        price: 79,
        priceMonthly: 79,
        ctaType: 'trial',
        features: ["Website op maat, door ons opgezet", "Hosting en SSL", "AI-chatbot op je website, met beperkt gebruik", "Maandelijks opzegbaar", "14 dagen proberen voor €1"],
        focus: "Focus: je website met AI-chatbot, door ons opgezet, met beperkt gebruik",
        savings: 'Excl. btw',
    },
    {
        name: "Ezida Full",
        price: 'Vanaf € 179,-',
        priceMonthly: 179,
        ctaType: 'call',
        features: ["Alles uit Ezida Start", "AI-telefonist die opneemt en terugbelt", "De basis van het dashboard", "Koppelingen met je eigen software", "Gebruik bovenop het maandbedrag, op credits"],
        focus: "Focus: Start plus de AI-telefonist, de basis van het dashboard en de koppelingen met je eigen software; gebruik komt bovenop het maandbedrag",
        savings: 'Excl. btw',
    },
    {
        name: "Managed by StudioLee",
        price: 'Vanaf € 379,-',
        priceMonthly: 379,
        ctaType: 'call',
        features: ["Het volledige systeem, en wij doen het werk", "SEO-artikelen, social media en linkbuilding door ons", "Elke maand de keuzes voor je gemaakt", "De eerste maanden een kort gesprek, daarna updates per e-mail", "Wat erin zit bepaalt het eindbedrag; je ziet het vooraf"],
        focus: "Focus: wij doen het werk voor je; wat erin zit bepaalt het eindbedrag, en dat bedrag zie je voordat je start",
        savings: 'Excl. btw',
    },
    {
        name: 'Full Service',
        price: 'Vanaf € 379,-',
        priceMonthly: 379,
        pricePrefix: '',
        ctaType: 'call',
        guarantee: true,
        features: [
            'Volledig op maat samengesteld',
            'Kies zelf wat je wél en niet wilt',
            'Een plan op jouw doelen, niet op een pakket',
            'Alles flexibel',
        ],
        focus: 'Focus: 100% op maat, jij bepaalt wat erin zit.',
        savings: 'Bespaar 20%',
    },
]