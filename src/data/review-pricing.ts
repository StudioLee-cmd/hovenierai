export interface IReviewPackage {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    highlight?: boolean;
    buttonText: string;
    buttonLink: string;
}

export const reviewPackages: IReviewPackage[] = [
    {
        id: 'small',
        name: 'Start Pakket',
        price: 179,
        description: 'Alles om direct te starten met het verzamelen van reviews.',
        features: [
            '2x NFC Deurstickers (Dubbelzijdig)',
            '1x NFC Balie Display (Acryl)',
            '50x Review Visitekaartjes (QR)',
            'Toegang tot Review Dashboard',
            'Google Review Link Shortener'
        ],
        highlight: false,
        buttonText: 'Bestel Nu',
        buttonLink: '#'
    },
    {
        id: 'large',
        name: 'Dominantie Pakket',
        price: 279,
        description: 'Maximale zichtbaarheid voor jouw bedrijf.',
        features: [
            '5x NFC Deurstickers (Weerbestendig)',
            '3x NFC Balie Displays (Premium Wood/Acryl)',
            '250x Review Flyers (A5 formaat)',
            '10x NFC Review Cards (Personeel)',
            'Social Media Review Templates (Canva)',
            'Review Rapportages',
            'Prioriteit Support & Setup',
            'Gratis Design Consult'
        ],
        highlight: true,
        buttonText: 'Bestel Nu',
        buttonLink: '#'
    },
    {
        id: 'custom',
        name: 'Custom / Agency',
        price: 0,
        description: 'Voor franchises, ketens of specifieke whitelabel wensen.',
        features: [
            'Volledige Whitelabel Opties',
            'Bulk Hardware (100+ stuks)',
            'Dedicated Account Manager'
        ],
        highlight: false,
        buttonText: 'Plan Strategie Call',
        buttonLink: 'https://cal.com/studiolee'
    }
];
