import { ITestimonial } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────────────
// BOUWSTEEN 8 — HET BEWIJS-BLOK. Toon-regel 3 van het boodschap-frame: bewijs is echt,
// of het staat er niet (alpha1/ventures/studiolee/projects/niche-sites-upgrade-programma.md
// §HET BOODSCHAP-FRAME).
//
// Tim, keur 173 (01-08): de tien verzonnen klant-quotes gaan eraf en er komt GEEN
// vervangende constructie voor in de plaats. Het blok bestaat alleen zolang er ECHTE
// klant-quotes zijn; is die lijst leeg, dan staat de sectie niet op de pagina.
//
// ⭐ ÉÉN ECHTE QUOTE TOEVOEGEN IS GENOEG. Zet 'm in `testimonials` hieronder en de sectie
//    verschijnt vanzelf, kop en al. Er is geen tweede plek om te bewerken:
//    `Testimonials.tsx` en `page.tsx` lezen allebei uit `proofBlock`.
// ─────────────────────────────────────────────────────────────────────────────────────

/**
 * ECHTE klant-quotes van dit merk. Leeg = er is er vandaag nog geen.
 * Vullen = het blok toont ze meteen, zonder dat er iets anders aangepast hoeft te worden.
 * Illustratieve, gegenereerde of "voorbeeld"-quotes horen hier NIET in — dat is precies
 * wat keur 173 eraf haalde.
 */
export const testimonials: ITestimonial[] = [];

/** Kop + subkop van de sectie; `null` laat de hele sectie van de pagina verdwijnen. */
export interface IProofSection {
    title: string;
    description: string;
}

export interface IProofBlock {
    /** `null` = de sectie wordt niet gerenderd (page.tsx laat 'm dan weg). */
    section: IProofSection | null;
    /** De quotes die getoond worden. Leeg/afwezig = geen marquee. */
    quotes?: ITestimonial[];
}

/**
 * DE KOP BOVEN HET BLOK. Eén constante, want tot 31-07 stond deze zin twee keer letterlijk
 * in deze file — mét de merknaam erin. Dat is de dubbele hardcode die RULE 3 verbiedt: bij
 * de rollout naar de andere merken volgt een agent de gedocumenteerde "één regel" en laat
 * de tweede staan. Eén constante = één string per repo om te vervangen.
 */
const echteQuotesSection: IProofSection = {
    title: 'Wat Onze Klanten Zeggen',
    description: 'Ervaringen van bedrijven die al werken met HovenierAI.',
};

/**
 * DE ENIGE BRON DIE DE PAGINA LEEST. Geen echte quotes = geen sectie; zodra er één echte
 * quote in `testimonials` staat is de kop waar en verschijnt het blok.
 */
export const proofBlock: IProofBlock =
    testimonials.length > 0
        ? { section: echteQuotesSection, quotes: testimonials }
        : { section: null };
