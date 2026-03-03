import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Basic',
        price: 79, // Monthly price when paid yearly
        priceMonthly: 129, // Direct monthly price
        ctaType: 'trial',
        features: [

            'SaaS Toolbox (Self-Service App)',
            '25 Credits Trial (14 dagen)',
            'Maandelijkse 15 min strategie call',
            'Daarna 50 Credits p/m',
            'Video & Photo AI (Basic)',
            'Voice AI (Volledige Functies)',
            'LazyAds & Social AI',
            'Social Media Planner',
            'Ad Manager',
            'On-site Chatbot',
        ],
        focus: 'Focus: ZZP, Starters & MKB die zelf de controle willen houden.',
        savings: 'BTW Inclusief',
    },
    {
        name: 'Pro',
        price: 297, // Monthly price when paid yearly
        priceMonthly: 347, // Quarterly price converted to monthly
        ctaType: 'options',
        guarantee: true,
        stripeMonthly: 'https://buy.stripe.com/14AcN68ahdreb475p4bjW09',
        stripeYearly: 'https://buy.stripe.com/9B65kEeyF72Q8VZ6t8bjW0b',
        features: [
            'Alles uit Basic',
            'Volledig up-to-date in 15 min per maand',
            'Managed Studio (Agency Power)',
            'UGC Product Video\'s (AI Modellen)',
            '1x SEO Blog + 4x Social Post p/w',
            'Managed Dashboard & Setup',
            'Onbeperkt Credits (Managed)',
            'Groei-Garantie',
        ],
        focus: 'Focus: MKB die kiest voor professionele kwaliteit en maximaal online resultaat.',
        savings: 'Bespaar 20%',
    },
    {
        name: 'Elite',
        price: 497, // Monthly price when paid yearly
        priceMonthly: 597, // Quarterly price converted to monthly
        ctaType: 'options',
        guarantee: true,
        stripeMonthly: 'https://buy.stripe.com/bJe6oIaip86U6NR6t8bjW0a',
        stripeYearly: 'https://buy.stripe.com/8x2cN6bmtcna1tx8BgbjW0c',
        features: [
            'Alles uit Pro',
            'Growth Partner (Ambitieuze Bedrijven)',
            'Maandelijkse 1 uur diepe strategie sessie',
            'High-End UGC Video\'s (Reels/TikTok)',
            '2x SEO Blogs + 8x Social Posts p/w',
            'Deep-Level SEO Editor',
            'Ads Strategie (Meta/Google)',
            'Client App (Afspraken maken)',
            'Physical Review Solutions (NFC/QR)',
        ],
        focus: 'Focus: Best Value - Maximale inzet & dominantie.',
        savings: 'Bespaar 20%',
    },
    {
        name: 'Full Service',
        price: 799, // Monthly price when paid yearly
        priceMonthly: 999, // Quarterly price converted to monthly
        pricePrefix: 'Vanaf',
        ctaType: 'call',
        guarantee: true,
        features: [
            'Alles uit Elite',
            'Custom Maatwerk (High-End)',
            'Volledige Maatwerk Video-Producties',
            'Web Development & CRO',
            'Actieve Linkbuilding',
            'Fysieke Marketing (DM/Flyers)',
            'Custom AI Sales Machine',
            'Strategie op Locatie (Optioneel)',
        ],
        focus: 'Focus: Het complete pakket voor marketingsucces.',
        savings: 'Bespaar 20%',
    },
]