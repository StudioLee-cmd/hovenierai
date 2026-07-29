// ⚑ DE INVULBARE DEMO-SLOTS — de opgenomen gesprekken die de LIVE VAPI-lijn vervangen (29-07).
//
// Tot 29-07 stond er een knop "Test Live Demo" in de hero die een echte VAPI-call opzette. Twee
// problemen: (1) bij een lege wallet krijgt een bezoeker níets, precies op het moment dat 'ie het
// meest geïnteresseerd is, en (2) je weet nooit welk gesprek een prospect kreeg — een live agent
// kan een slecht gesprek geven op het moment dat het telt. Opgenomen demo's zijn altijd op hun
// best, kosten per bezoeker niets, en laten met MEERDERE gesprekken zien dat de agent écht
// luistert in plaats van één pad af te draaien.
//
// ⚠️ `src: null` = het slot is nog niet opgenomen. Dat is een GELDIGE staat, geen bug: zolang
// álle slots leeg zijn toont de hero géén kapotte speler maar meteen de aanvraag-knop. Vul een
// `src` (bv. '/audio/demo-afspraak.mp3' in `public/audio/`) en de speler verschijnt vanzelf —
// er hoeft geen component aangeraakt te worden.
//
// De DRIE STEMMEN zijn een bouw-eis, geen opname-keuze (project voice-demo-omzetting, build_step
// 4b): per merk bestaan er drie VAPI-stemvarianten, en de speler laat de bezoeker kiezen.

export interface VoiceDemoOpname {
    /** stabiele sleutel — ook het anker voor de asset-registry */
    id: string;
    /** wat de beller wil — de titel op de kaart */
    titel: string;
    /** de RICHTING van het gesprek: waarom deze demo iets anders bewijst dan de andere twee */
    richting: string;
    /** welke van de drie stemvarianten dit gesprek voert */
    stem: string;
    /** pad in `public/` — `null` zolang de opname nog niet bestaat */
    src: string | null;
    /** speelduur zoals getoond op de kaart — `null` tot de opname er is */
    duur: string | null;
}

/** Waar "vraag een live demo aan" heen gaat. Zelfde route als de CTA's op /voice-ai. */
export const demoAanvraagUrl = 'https://cal.com/studiolee';

export const voiceDemos: VoiceDemoOpname[] = [
    {
        id: 'afspraak-inplannen',
        titel: 'Een nieuwe afspraak inplannen',
        richting: 'Een klant wil een offerte voor een nieuwe tuin; de agent vraagt door op oppervlak en plant een bezoek.',
        stem: 'Thomas',
        src: null,
        duur: null,
    },
    {
        id: 'afspraak-verzetten',
        titel: 'Een afspraak verzetten',
        richting: 'Iemand wil het geplande snoeiwerk verzetten omdat er regen voorspeld staat.',
        stem: 'Sanne',
        src: null,
        duur: null,
    },
    {
        id: 'vraag-buiten-openingstijd',
        titel: 'Een vraag om half elf ’s avonds',
        richting: 'Een klant vraagt ’s avonds wat maandelijks tuinonderhoud kost.',
        stem: 'Eva',
        src: null,
        duur: null,
    },
];
