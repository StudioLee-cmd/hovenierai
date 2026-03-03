export interface IComparisonItem {
    role: string;
    cost: number;
    description: string;
}

export const comparisonData: IComparisonItem[] = [
    {
        role: "Social Media Manager",
        cost: 500,
        description: "Voor dagelijkse posts en engagement"
    },
    {
        role: "Marketing Strateeg",
        cost: 650,
        description: "Voor advertenties en strategie"
    },
    {
        role: "SEO Specialist",
        cost: 500,
        description: "Voor blogs en ranking onderhoud"
    },
    {
        role: "Professionele Fotograaf",
        cost: 550,
        description: "Voor 1 shoot per maand"
    },
    {
        role: "Video & Content Creator",
        cost: 550,
        description: "Voor video's en reels"
    },
    {
        role: "CRM & Email Marketing",
        cost: 200,
        description: "Vervangt HubSpot & Mailchimp"
    },
    {
        role: "Website & Funnel Builder",
        cost: 100,
        description: "Vervangt Wix, WordPress & Hosting"
    },
    {
        role: "Social Media Tools",
        cost: 100,
        description: "Vervangt Hootsuite, Buffer & Later"
    },
    {
        role: "Reserveringssysteem & Kassa",
        cost: 45,
        description: "Vervangt Salonized, Treatwell & BarberBooking"
    },
    {
        role: "Agenda & Planning Tools",
        cost: 25,
        description: "Vervangt Calendly, Acuity & team-agenda's"
    }
];

export const totalTraditionalCost = 3220;
export const kapperAICost = 297;
