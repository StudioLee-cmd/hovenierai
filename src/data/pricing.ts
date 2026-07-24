import { IPricing } from "@/types";

// PROPOSITIE-CONTRACT ⛔1 (niche-sites-upgrade-programma.md §PROPOSITIE-CONTRACT): GEEN tool-namen,
// niet extern en niet intern. Tot 24-07 stond elke feature-regel hier als de PRODUCTNAAM uit onze
// eigen gereedschapskist. Wie een merknaam leest gaat 'm googelen en zelf proberen; dan verkoop je
// je eigen concurrent. Elke regel is daarom de UITKOMST voor de ondernemer, niet het gereedschap.
// Zet ze niet terug: het contract is de bron, niet de smaak van de dag.
// Bedragen en betaallinks zijn bewust ONGEWIJZIGD — prijzen zijn een business-beslissing (RULE 5).

export const tiers: IPricing[] = [
    {
        name: 'Managed Groei Basis',
        price: 79,
        priceMonthly: 79, // Direct monthly price
        ctaType: 'trial',
        features: [

            'Je eigen dashboard: agenda, berichten en klanten op één plek',
            'Elke week een nieuw artikel op je site, zodat je gevonden wordt',
            'De eerste 14 dagen gratis uitproberen',
            'Elke maand een kwartier overleg over wat er beter kan',
            'Maandelijks tegoed voor gesprekken en beelden',
            'Beelden voor je social, automatisch klaargezet',
            'Telefoon die opneemt als jij je handen niet vrij hebt',
            'Posts en advertenties die vanzelf klaarstaan',
            'Chatbot op je site die vragen opvangt buiten openingstijden',
        ],
        focus: 'Focus: de instap. Zodat je site gaat draaien in plaats van stilstaan.',
        savings: 'BTW Inclusief',
    },
    {
        name: 'Managed Groei Pro',
        price: 297,
        priceMonthly: 297, // Quarterly price converted to monthly
        ctaType: 'options',
        guarantee: true,
        stripeMonthly: 'https://buy.stripe.com/14AcN68ahdreb475p4bjW09',
        stripeYearly: 'https://buy.stripe.com/9B65kEeyF72Q8VZ6t8bjW0b',
        features: [
            'Alles uit de instap',
            'Volledig bijgewerkt met een kwartier van jouw tijd per maand',
            'Wij doen het werk, jij doet je vak',
            'Video van je werk, gemaakt zonder shoot',
            'Wekelijks een artikel plus vier posts',
            'Wij richten alles voor je in en houden het bij',
            'Onbeperkt gebruik, door ons beheerd',
            'Groei-garantie',
        ],
        focus: 'Focus: groeien zonder er zelf tijd in te steken.',
        savings: 'Bespaar 20%',
    },
    {
        name: 'Managed Groei Elite',
        price: 497,
        priceMonthly: 497, // Quarterly price converted to monthly
        ctaType: 'options',
        guarantee: true,
        stripeMonthly: 'https://buy.stripe.com/bJe6oIaip86U6NR6t8bjW0a',
        stripeYearly: 'https://buy.stripe.com/8x2cN6bmtcna1tx8BgbjW0c',
        features: [
            'Alles uit Pro',
            'Een vaste partner die met je meedenkt over groei',
            'Elke maand een uur samen de cijfers en de planning door',
            'Korte video\'s voor Reels en TikTok, op niveau',
            'Twee artikelen plus acht posts per week',
            'Diepere optimalisatie van je vindbaarheid',
            'Advertenties op Google en social, door ons beheerd',
            'Eigen app waarin klanten zelf hun afspraak maken',
            'Kaartjes en stickers waarmee klanten je een review geven',
        ],
        focus: 'Focus: meerdere mensen of meerdere vestigingen.',
        savings: 'Bespaar 20%',
    },
    {
        name: 'Full Service',
        price: 'Op maat', // Display as text, not number
        priceMonthly: 999,
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