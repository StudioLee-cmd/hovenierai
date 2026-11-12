import { IFAQ } from "@/types";

// Hoveniers-FAQ. Tot 24-07 stond hier de loodgieter-tekst van de bron-template ("terwijl je onder de
// vloer zit", "kun je LoodgieterAI gebruiken", installateurs-software) — de template-kopieerlek uit
// TEMPLATING-STRATEGIE §6. Herschreven naar het vak, en per het PROPOSITIE-CONTRACT zonder tool-namen:
// we verkopen de uitkomst, niet de gereedschapskist.
export const faqs: IFAQ[] = [
    {
        question: "Hoe zit het met de veiligheid van mijn klantgegevens?",
        answer: "Veiligheid is onze topprioriteit. Wij gebruiken hoogwaardige encryptie en voldoen aan strikte Europese AVG/GDPR-richtlijnen. Je klantenbestand blijft van jou en wordt nooit gebruikt om publieke AI-modellen te trainen zonder jouw expliciete toestemming.",
    },
    {
        question: "Wat levert het mij concreet op?",
        answer: "Je mist geen telefoontjes meer terwijl je in een tuin aan het werk bent, en gaten in je planning door afzeggingen worden zeldzaam omdat herinneringen vanzelf gaan. Daarnaast bespaar je de tijd die nu opgaat aan appjes en administratie.",
    },
    {
        question: "Heb ik technische kennis nodig om dit te beheren?",
        answer: "Nee, absoluut niet. Het dashboard is gemaakt voor gebruiksgemak: als je WhatsApp kunt gebruiken, kun je hier ook mee overweg. Wil je er zelf helemaal niet naar omkijken, dan doen wij het beheer.",
    },
    {
        question: "Kan ik dit koppelen aan mijn agenda en boekingssysteem?",
        answer: "Ja. We sluiten aan op de agenda en het boekingssysteem waar je al mee werkt, zodat afspraken die de AI maakt gewoon in jouw planning verschijnen. Werk je nog met een papieren afsprakenboek, dan zetten we de online agenda voor je op.",
    },
    {
        question: "Wat als de AI het antwoord niet weet?",
        answer: "De AI is getraind om eerlijk te zijn. Weet hij iets niet, of is de vraag te specifiek — een advies over een specifieke beplanting bijvoorbeeld — dan verwijst hij netjes naar jou of noteert hij een terugbelverzoek. Je raakt dus nooit een klant kwijt.",
    },
    {
        question: "Is dit geschikt voor een eenmanszaak of alleen voor grote hoveniersbedrijven?",
        answer: "Juist als je alleen staat is het waardevol: de telefoon gaat door terwijl jij in een tuin aan het werk bent. Werk je met meerdere hoveniers, dan helpt het bij het verdelen van afspraken over de agenda's en het opvullen van gaten.",
    },
    {
        question: "Kan ik buiten openingstijden andere instellingen gebruiken?",
        answer: "Zeker. Je stelt in wat er buiten openingstijden gebeurt. Bijvoorbeeld: alleen een afspraak inplannen voor de eerstvolgende dag dat je open bent, en spoed doorverbinden. Zo heb je ook écht vrij.",
    },
    {
        question: "Wat krijg ik precies gratis?",
        answer: "Het website-ontwerp, en het bestand. Je kiest een van onze ontwerpen, ziet 'm meteen met je eigen bedrijfsnaam erin, en het ontwerpbestand mag je houden. Geen bedenktijd, geen voorwaarden. Wat níét gratis is, is het draaiend krijgen en houden: live zetten, gevonden worden, teksten die blijven komen en iemand die opneemt. Dat zit in het abonnement.",
    },
    {
        question: "Is de strategie-call echt gratis?",
        answer: "Honderd procent. Geen addertjes. We denken graag met je mee hoe je dit het beste inzet voor jouw hoveniersbedrijf. Of je daarna klant wordt of niet, je krijgt altijd eerlijk advies waar je direct mee verder kunt.",
    },
    {
        question: "Waarom is de managed service niet volledig geautomatiseerd?",
        answer: "Omdat de techniek nog niet betrouwbaar genoeg is om dit helemaal zonder mens te doen. AI kan fouten maken, en juist bij een hoveniersbedrijf telt hoe iets klinkt. Een expert die meekijkt zorgt voor een merk dat klopt in plaats van iets dat spammerig overkomt.",
    },
    {
        question: "Hoe snel is het inzetbaar?",
        answer: "De basis staat binnen enkele minuten. Wil je dat de AI je prijzen, diensten en werkwijze écht kent, dan vul je één keer je bedrijfsprofiel in en ben je met onze hulp vaak binnen een werkdag volledig operationeel.",
    },
    {
        question: "Wat moet ik zelf nog doen?",
        answer: "Dat bepaal je zelf. Je kunt alles zelf beheren via het dashboard, of ons het laten doen. Bij de managed variant bel je ongeveer een kwartier per maand met je vaste contactpersoon voor updates en afstemming. De rest doen wij.",
    }
];
