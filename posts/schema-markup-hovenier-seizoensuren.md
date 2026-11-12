---
title: "Schema markup hovenier: seizoensuren in het zoekresultaat"
slug: schema-markup-hovenier-seizoensuren
date: "2026-11-12"
excerpt: "Je werktijden schuiven mee met het seizoen, je website vaak niet. Zo leg je als hovenier je seizoensuren vast met schema markup en test je of het klopt."
image: "/images/blog/schema-markup-hovenier-seizoensuren.jpg"
authorSlug: "tim-van-der-lee"
tags: ["Schema markup"]
cluster: "vindbaarheid"
---

In maart wil iedereen tegelijk een hovenier. In december belt bijna niemand, en als er iemand belt, sta jij niet op kantoor maar bij een klant om een haag te snoeien of ben je even helemaal vrij. Je werktijden schuiven mee met het seizoen. Het probleem: je website weet dat vaak niet. Daar staat nog steeds "ma t/m vr 8:00 tot 17:00", het hele jaar door.

Met schema markup vertel je zoekmachines in een vaste, leesbare taal wie je bent, waar je werkt, wat je doet en wanneer je bereikbaar bent. Ook per seizoen. In dit artikel lees je wat schema markup voor een hovenier precies is, welk type je kiest, hoe je seizoensuren vastlegt en hoe je controleert of het klopt. Het hoort bij het bredere werk van [seo voor hoveniers](/seo), maar het is een eigen klus die je een keer goed opzet en daarna alleen bijhoudt.

## Wat schema markup is (en wat het niet is)

Schema markup is een stukje code op je website dat niet bedoeld is voor je bezoekers, maar voor zoekmachines. Een mens leest "Hoveniersbedrijf Jansen, open van maart tot oktober op zaterdag". Een zoekmachine moet dat raden. Met schema markup schrijf je het op in een vast formaat, zodat er niets te raden valt: dit is de bedrijfsnaam, dit is het adres, dit zijn de openingstijden, en die tijden gelden van deze datum tot die datum.

De woordenlijst daarvoor komt van schema.org, een gezamenlijke standaard die door de grote zoekmachines wordt gebruikt. Google leest het formaat JSON-LD het makkelijkst: een blok tekst in de code van je pagina, los van de opmaak.

Wat het niet is: een knop waarmee je hoger komt. Google zegt zelf in de documentatie dat het niet garandeert dat informatie uit structured data ook echt in de zoekresultaten verschijnt. Schema markup maakt je gegevens ondubbelzinnig. Of en hoe Google ze toont, beslist Google. Wie je iets anders belooft, verkoopt lucht.

En het is ook niet hetzelfde als je Google Bedrijfsprofiel. Dat profiel vul je in bij Google zelf, schema markup staat op je eigen site. Het beste resultaat krijg je als beide hetzelfde zeggen. Hoe je dat profiel invult, lees je in [je Google Bedrijfsprofiel goed invullen](/blog/google-bedrijfsprofiel-hovenier-invullen). Hier blijven we bij de code op je website.

## Welk type past bij een hoveniersbedrijf

Hier gaat het vaak mis, ook in handleidingen die je online vindt. Je ziet regelmatig het type "LandscapingBusiness" voorbijkomen. Dat type bestaat niet in de woordenlijst van schema.org. Wie het gebruikt, schrijft code die een zoekmachine niet herkent.

Wat wel bestaat:

- **LocalBusiness.** Het algemene type voor een bedrijf met een vaste plek of een vast werkgebied. Dit is voor een hovenier de veilige keuze.
- **HomeAndConstructionBusiness.** Een subtype van LocalBusiness, bedoeld voor bedrijven die aan huis en bouw werken, zoals elektriciens, loodgieters, schilders en dakdekkers. Een hoveniersbedrijf staat daar niet tussen. Doe je vooral bestrating en terrasaanleg, dan kun je het verdedigen. Voor tuinonderhoud en tuinontwerp is LocalBusiness zuiverder.

Wat je mist aan een specifiek type, maak je goed met de inhoud. In het veld `description` beschrijf je in gewone taal wat je doet: tuinaanleg, tuinonderhoud, bestrating, snoeiwerk. Je diensten zet je daarnaast op je eigen dienstenpagina's, die je met je markup verbindt. Zo weet een zoekmachine niet alleen dat je een lokaal bedrijf bent, maar ook waarin.

## De basis: wat er minimaal in moet

Google noemt voor een lokaal bedrijf twee verplichte velden: `name` en `address`. Zonder die twee kom je niet in aanmerking voor de weergave die structured data mogelijk maakt. Daarnaast raadt Google onder meer deze velden aan:

- `telephone`: het nummer waarop klanten je bereiken.
- `url`: de pagina van je bedrijf.
- `geo`: de coördinaten van je vestiging.
- `priceRange`: een indicatie van je prijsniveau.
- `openingHoursSpecification`: je openingstijden, met de mogelijkheid om ze per periode te laten gelden.

Vul alleen in wat klopt en wat ook op de pagina zelf staat. Google is daar streng in: structured data moet een eerlijke weergave zijn van wat bezoekers op de pagina zien. Zet je in de code dat je op zaterdag open bent, dan moet dat ook zichtbaar op de pagina staan. Code die iets anders zegt dan de pagina, kan ervoor zorgen dat Google de markup negeert.

## Seizoensuren vastleggen met openingHoursSpecification

Dit is het deel waar een hovenier echt iets aan heeft. Met `openingHoursSpecification` leg je niet alleen vast op welke dagen en tijden je open bent, maar ook in welke periode die tijden gelden. Daarvoor zijn twee velden: `validFrom` (vanaf wanneer) en `validThrough` (tot wanneer). Google zegt het letterlijk: gebruik ze allebei om seizoensuren te definiëren. Laat je ze weg, dan gelden de tijden het hele jaar.

Stel: in het hoogseizoen ben je ook op zaterdagochtend bereikbaar, in de winter alleen doordeweeks en korter. Dan ziet je markup er zo uit:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hoveniersbedrijf Jansen",
  "description": "Tuinaanleg, tuinonderhoud, bestrating en snoeiwerk in de regio.",
  "url": "https://www.voorbeeld-hovenier.nl/",
  "telephone": "+31-6-00000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Voorbeeldstraat 1",
    "postalCode": "1234 AB",
    "addressLocality": "Voorbeeldstad",
    "addressCountry": "NL"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30:00",
      "closes": "18:00:00",
      "validFrom": "2027-03-01",
      "validThrough": "2027-10-31"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00:00",
      "closes": "12:00:00",
      "validFrom": "2027-03-01",
      "validThrough": "2027-10-31"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30:00",
      "closes": "16:30:00",
      "validFrom": "2027-11-01",
      "validThrough": "2028-02-29"
    }
  ]
}
```

Alles in dit voorbeeld is verzonnen: naam, adres, nummer en tijden. Vervang ze door je eigen gegevens. Een paar dingen om op te letten:

- **Datums schrijf je als jaar-maand-dag.** Tijden als uren, minuten en seconden.
- **Een dag die niet in de lijst staat, ben je dicht.** Schema.org gaat ervan uit dat je open bent als er een openingstijd staat, en anders niet. Zondag staat er hier dus niet in.
- **Een seizoensblok loopt af.** Na de laatste datum gelden die uren niet meer. Zet in je agenda een moment om de datums voor het volgende jaar bij te werken, anders staat je markup na een tijd leeg.
- **Uitzonderingen gaan apart.** Voor feestdagen of een week bouwvak heeft schema.org `specialOpeningHoursSpecification`, dat de gewone uren voor een korte periode overschrijft.

Laat dezelfde seizoensuren ook zichtbaar op je contactpagina staan. Bijvoorbeeld als klein tabelletje "voorjaar en zomer" en "herfst en winter". Dan klopt de code met de pagina, en je klant ziet meteen wanneer hij je kan bereiken.

## Waar de markup op je site hoort

Je bedrijfsgegevens horen thuis op een vaste plek: je homepage of je contactpagina, waar naam, adres en openingstijden ook voor bezoekers staan. Zet het niet op elke pagina met andere gegevens, en zeker niet op je blogartikelen. Die krijgen op de meeste moderne sites al een eigen, automatisch gegenereerd artikelschema.

Werk je met een website op een bouwplatform, kijk dan eerst of dat platform al een lokaal-bedrijfsschema maakt. Soms staat er al iets, met verouderde tijden of zonder seizoensblokken. Twee blokken met verschillende tijden helpen niemand. Kies er één en houd die bij. Laat je site maken, vraag dan bij de oplevering expliciet naar de markup. Bij een [professionele website voor hoveniers](/gratis-website) hoort het gewoon bij de basis.

Werk je in meerdere plaatsen? Dan is het verleidelijk om per stadspagina een eigen adres in de markup te zetten. Doe dat alleen als je daar ook echt een vestiging hebt. Een werkgebied is iets anders dan een adres. Hoe je met plaatsnamen omgaat in de rest van je vindbaarheid, staat in het stuk over [lokale seo voor tuinklussen](/blog/lokale-seo-hovenier-tuinklussen).

## Controleren of het klopt

Code die je niet test, werkt vaak niet. Gelukkig is controleren gratis en snel.

1. **Rich Results Test van Google.** Plak de URL van je pagina of het codeblok erin. Google adviseert je markup hiermee te valideren en kritieke fouten te herstellen. Waarschuwingen over aanbevolen velden zijn optioneel, fouten niet.
2. **Schema Markup Validator** (validator.schema.org). Die controleert of je de woordenlijst van schema.org goed gebruikt. Hier zie je direct als een type niet bestaat, zoals dat "LandscapingBusiness".
3. **Search Console.** Na publicatie kun je in Search Console vragen om de pagina opnieuw te laten crawlen. In de rapporten zie je daarna of Google de markup oppikt en of er fouten zijn.

Doe de controle ook na elke wijziging aan je openingstijden. Een verkeerd geplaatste komma maakt het hele blok onleesbaar.

## Een vast moment per seizoen

![Een vast moment per seizoen](/images/blog/schema-markup-hovenier-seizoensuren-2.jpg)

Schema markup is geen klus van één keer, maar wel een kleine. Het werk zit vooral in de eerste keer: het juiste type, de juiste gegevens, de seizoensblokken. Daarna is het twee keer per jaar een kort klusje: datums vooruit zetten, tijden checken, testen.

Een handige vuistregel: koppel het aan momenten die je toch al hebt. Als je in februari je voorjaarsplanning maakt, zet je ook de zomeruren in je markup en op je contactpagina. Als je in oktober je winterplanning opstelt, doe je hetzelfde voor de winteruren. En controleer meteen of je Google Bedrijfsprofiel dezelfde tijden toont.

Weet je niet of jouw site al schema markup heeft, of wat erin staat? Met de [gratis ai scan voor hoveniers](/gratis-scan) zie je wat zoekmachines nu over je bedrijf lezen en waar het eerste gat zit. Jij maakt tuinen mooi, je website vertelt eerlijk wanneer je bereikbaar bent.
