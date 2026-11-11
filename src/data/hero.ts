// ⛔ BOUWSTEEN 1 VAN HET BOODSCHAP-FRAME — de hero beantwoordt WAT HET IS en VOOR WIE, verder niets.
// Volle wet: niche-sites-upgrade-programma.md §HET BOODSCHAP-FRAME (28-07). Wat hier tot 28-07 stond
// faalde op twee toon-regels tegelijk, en het was fleet-template-tekst (gemeten: 14 van de 14 live
// sites droegen exact dezelfde constructie, alleen het vak-woord verschilde):
//   · "De grootste kans voor hoveniers sinds de uitvinding van de schaar" — een superlatief over onszelf.
//     De diagnose van de site is GELOOFWAARDIGHEID, niet prijs (source-doc positionering-messaging-en-
//     site-2026-07-28.md): een grote belofte tegen een laag bedrag leest als te mooi om waar te zijn,
//     en dan werkt élke zin eronder tegen je in plaats van voor je.
//   · "regelt je agenda, telefoon en administratie volledig automatisch" — een absolute claim die we
//     niet waarmaken; de tarieven-tabel zelf vraagt een kwartier per maand van de klant.
// De as is Tims eigen (25-07, keur 78): wat het de klant OPLEVERT, productized. De hero doet dat door
// te zeggen wat er geleverd wordt en aan wie. De BELOFTE-zin ("je zaak werkt door terwijl jij in de tuin staat")
// hoort een blok lager, bij de vier dingen — twee blokken die dezelfde vraag beantwoorden is precies
// de boodschap-stapel-fout die het frame verbiedt.
//
// ⚑ `headingParts` DRIJFT DE H1 IN Hero.tsx — vóór 28-07 stond die kop dáár hardcoded en las niemand
// het `heading`-veld hieronder. Wijzig je de kop, wijzig 'm hier: dit is de enige bron (RULE 3).
// De drie delen zijn de drie animatie-spans; `accent` is het gekleurde woord (primary resp. secondary).
export const heroDetails = {
    heading: 'Je hele online zaak, draaiend opgeleverd.',
    headingParts: [
        { before: 'Je hele ', accent: 'online zaak', after: ',' },
        { before: 'draaiend', accent: '', after: '' },
        { before: '', accent: 'opgeleverd', after: '.' },
    ],
    subheading: 'Voor hoveniersbedrijven die geen tijd hebben om er zelf achteraan te zitten. Je website, je telefoon, je afspraken en je vindbaarheid staan aan vanaf de eerste dag, en blijven aan zonder dat jij eraan denkt.',
    centerImageSrc: '/images/hero-mockup.webp',
}
