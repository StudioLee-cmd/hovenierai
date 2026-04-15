import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Managed Groei Basis',
        price: 79,
        priceMonthly: 79, // Direct monthly price
        ctaType: 'trial',
        features: [

            'SaaS Toolbox (Self-Service App)',
            '1x SEO Blog per week (beheerd)',
            '25 Credits Trial (14 dagen)',
            'Maandelijkse 15 min strategie call',
            'Daarna 50 Credits p/m',
            'Video & Photo AI (Basic)',
            'Voice AI (Basic)',
            'LazyAds & Social AI',
            'Social Media Planner',
            'Ad Manager',
            'On-site Chatbot',
        ],
        focus: 'Focus: Ideale start voor ZZP & Starters.',
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
            'Alles uit Basic',
            'Volledig up-to-date in 15 min per maand',
            'Managed Studio (Agency Power)',
            'UGC Product Video\'s (AI Modellen)',
            '1x SEO Blog + 4x Social Post p/w',
            'Managed Dashboard & Setup',
            'Onbeperkt Credits (Managed)',
            'Groei-Garantie',
        ],
        focus: 'Focus: MKB - Externe high-end software service.',
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
        price: 'Op maat', // Display as text, not number
        priceMonthly: 999,
        pricePrefix: '',
        ctaType: 'call',
        guarantee: true,
        features: [
            'Volledig op maat samengesteld',
            'Kies zelf je diensten en KPI\'s',
            'Custom strategie op jouw doelen',
            'Geen vast pakket — alles flexibel',
        ],
        focus: 'Focus: 100% custom — jij bepaalt wat erin zit.',
        savings: 'Bespaar 20%',
    },
]