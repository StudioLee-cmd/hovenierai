"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsArrowRight, BsWhatsapp, BsCalendar3 } from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";
import { totalTraditionalCost } from "@/data/comparison";

// Deze pagina volgt het PROPOSITIE-CONTRACT (niche-sites-upgrade-programma.md §PROPOSITIE-CONTRACT):
//   ⛔1 geen tool-namen  ⛔2 geen tel-claims  ⛔3 geen vijfde ding
//   ② gratis = het ONTWERP + het bestand · betaald = het draaiend krijgen en houden
//   ⑤ vergelijk de REKENING (los bij elkaar vs alles inbegrepen), nooit de onderdelen
// Bedragen zijn ONGEWIJZIGD: prijzen zijn business (RULE 5). Het los-bij-elkaar-bedrag komt uit
// de bestaande bron comparison.ts, zodat er geen tweede waarheid op deze pagina staat.

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const plans = [
  {
    name: "Het ontwerp",
    price: "€0",
    period: "",
    description: `Je krijgt het complete ontwerp met je eigen naam erin, en het bestand mag je houden. Geen voorwaarden, geen bedenktijd.`,
    features: [
      "Het complete ontwerp",
      "Je eigen naam en plaats erin",
      "Een live preview op een eigen link",
      "Het bestand, om te houden",
      "Geen proefperiode die stiekem doorloopt",
    ],
    cta: "Vraag je ontwerp aan",
    ctaLink: "/gratis-website",
    highlight: false,
    badge: "Gratis",
  },
  {
    name: "Laten draaien",
    price: "€79",
    period: "/maand",
    description: "Een website die stilstaat levert niets op. Dit is wat 'm laat wérken: live gezet, gevonden worden, en iemand die opneemt als jij bezig bent.",
    features: [
      "Je site live gezet en bijgehouden",
      "Elke week een nieuw artikel, zodat je gevonden wordt",
      "Chatbot die vragen opvangt buiten openingstijden",
      "Telefoon die opneemt als jij je handen niet vrij hebt",
      "Herinneringen en opvolging die vanzelf gaan",
      "Maandelijks opzegbaar",
    ],
    cta: "Zo wil ik het",
    ctaLink: "/gratis-scan",
    highlight: true,
    badge: "Meest gekozen",
  },
  {
    name: "De site afkopen",
    price: "€800",
    period: "eenmalig",
    description: "Liever geen maandbedrag? Dan koop je de site af. Eerlijk erbij: zonder abonnement staat 'ie stil, dus geen nieuwe teksten, geen chatbot, geen telefoon die opneemt.",
    features: [
      "De volledige website, eenmalig afgekocht",
      "Gebouwd op het ontwerp dat jij koos",
      "Je kunt later alsnog laten draaien",
      "Losse hulp op aanvraag",
    ],
    cta: "Vraag het aan",
    ctaLink: "/gratis-website",
    highlight: false,
    badge: "Eenmalig",
  },
];

const customOptions = [
  {
    name: "Eenmalig laten bouwen",
    price: "Vanaf €1.000",
    description: "Volledig custom gebouwd. Eenmalige investering, geen maandbedrag. Je betaalt daarnaast alleen wat je écht verbruikt.",
    cta: "Vraag offerte aan",
    ctaLink: "https://cal.com/studiolee",
  },
  {
    name: "Volledig uit handen",
    price: "Op maat",
    description: "Wij doen alles: de teksten, de vindbaarheid, de social, de opvolging. Jij doet je vak. Wat het kost hangt af van wat je nodig hebt, dat rekenen we samen door.",
    cta: "Plan een gesprek",
    ctaLink: "https://cal.com/studiolee",
  },
];

const faqs = [
  {
    q: "Is het ontwerp echt gratis?",
    a: "Ja. Je krijgt het complete ontwerp met je eigen naam en plaats erin, plus een live preview op een eigen link. Het bestand mag je houden. Geen bedenktijd, geen voorwaarden, geen proefperiode die stiekem doorloopt.",
  },
  {
    q: "Wat krijg ik dan níét gratis?",
    a: "Het draaiend krijgen en houden. Live zetten, gevonden worden, teksten die blijven komen, iemand die opneemt. Dát is het werk, en dat zit in het abonnement. Een website die stilstaat levert niets op, en daarom geven we het ontwerp weg en niet het draaien.",
  },
  {
    q: "Kan ik de website ook gewoon kopen?",
    a: "Dat kan, voor €800 eenmalig. Wees je er dan wel van bewust dat 'ie daarna stilstaat: geen nieuwe artikelen, geen chatbot, geen telefoon die opneemt. Dat zeggen we liever vooraf dan achteraf. Je kunt altijd later alsnog laten draaien.",
  },
  {
    q: "Wat kost het als ik het los zou regelen?",
    a: `Meer. Iemand voor je telefoon en je planning, iemand voor je marketing, iemand voor je vindbaarheid, plus de losse abonnementen: bij elkaar loopt dat op tot ongeveer €${totalTraditionalCost} per maand. Bij ons zit het in één rekening, en die is lager dan die onderdelen los bij elkaar. Vergelijk dus de rekening, niet de onderdelen.`,
  },
  {
    q: "Hoe verschilt dit van een traditioneel bureau?",
    a: "Een marketingbureau rekent €1.500 tot €3.000 per maand en bedient vooral grotere bedrijven. Wij leveren dezelfde kwaliteit, dus strategie, advies én uitvoering, voor een fractie daarvan, omdat we de uitvoering slim geautomatiseerd hebben.",
  },
  {
    q: "Is er een contract of opzegtermijn?",
    a: "Nee. Maandelijks opzegbaar. Geen contract, geen opzegtermijn, geen kleine lettertjes. Je blijft omdat het werkt, niet omdat je vastzit.",
  },
  {
    q: "En als ik mijn blogs en vindbaarheid niet zelf ga doen?",
    a: "Dan is de instap niet genoeg, en dat zeggen we liever nu dan straks. Wie het schrijven en de vindbaarheid uit handen wil geven zit goed bij het pakket waarin wij het werk doen. Wat dat kost hangt af van wat je nodig hebt. Advies en strategie zitten er altijd in, zonder verborgen uurtarieven.",
  },
];

export default function TarievenContent() {
  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Eerlijk verhaal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Het ontwerp is gratis. Het draaien niet.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto"
          >
            Je krijgt het ontwerp én het bestand, zonder voorwaarden. Wat je daarna betaalt is voor het werk dat een website pas iets laat opleveren. Hieronder staat precies wat wat kost.
          </motion.p>
        </div>
      </section>

      {/* Bureau Comparison Banner */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 md:p-8 text-white text-center"
          >
            <p className="text-sm text-gray-400 mb-2">Traditioneel bureau voor {niche}</p>
            <p className="text-2xl md:text-3xl font-bold mb-2">
              <span className="line-through text-gray-500">€1.500 – €3.000/mnd</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">Alleen toegankelijk voor bedrijven met €1M+ omzet</p>
            <div className="w-16 h-px bg-gray-600 mx-auto mb-4"></div>
            <p className="text-primary font-semibold text-lg">{brand}</p>
            <p className="text-3xl md:text-4xl font-bold">Vanaf €79/maand</p>
            <p className="text-sm text-gray-300 mt-2">Alles inbegrepen, en dat is minder dan die onderdelen los bij elkaar.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`relative rounded-2xl p-6 md:p-8 border ${
                plan.highlight
                  ? "border-primary bg-[var(--card-background)] shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-[var(--card-border)] bg-[var(--card-background)]"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold ${
                    plan.highlight
                      ? "bg-primary text-black"
                      : "bg-foreground-accent/20 text-foreground-accent"
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold mt-2 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-foreground-accent text-sm">{plan.period}</span>}
              </div>
              <p className="text-foreground-accent text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <BsCheck2Circle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaLink}
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.highlight
                    ? "bg-primary text-black hover:bg-primary-accent"
                    : "bg-foreground/10 hover:bg-foreground/20 text-foreground"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Options */}
      <section className="py-12 px-4 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Liever op maat?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            Niet elk bedrijf past in een standaardpakket. Daarom bieden we ook maatwerkoplossingen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customOptions.map((opt) => (
              <div key={opt.name} className="border border-[var(--card-border)] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-1">{opt.name}</h3>
                <p className="text-2xl font-bold text-primary mb-3">{opt.price}</p>
                <p className="text-foreground-accent text-sm mb-6">{opt.description}</p>
                <a
                  href={opt.ctaLink}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  {opt.cta} <BsArrowRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why cheaper than agency */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Hoe kan dit zo betaalbaar zijn?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Traditionele bureaus werken met grote teams, dure kantoren en lange trajecten. Ze rekenen €150+ per uur
              en bedienen vooral grote bedrijven. Dat maakt hun diensten onbetaalbaar voor de meeste {niche}.
            </p>
            <p>
              Wij werken anders. Door AI-technologie slim in te zetten leveren we dezelfde kwaliteit — strategie,
              consulting én uitvoering — maar zonder de overhead. Geen grote teams, geen dure kantoren, geen
              eindeloze vergaderingen. Wel: directe lijnen, snelle resultaten en persoonlijke aandacht.
            </p>
            <p>
              Het resultaat? Agency-kwaliteit voor een tiende van de prijs. Toegankelijk voor elk {nicheSingular}sbedrijf,
              ook als je net begint. Inclusief consulting en strategisch advies — dat zit gewoon in het pakket.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Veelgestelde Vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-[var(--card-border)] rounded-xl">
                <summary className="cursor-pointer p-5 font-semibold text-lg flex justify-between items-center">
                  {faq.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <div className="px-5 pb-5 text-foreground-accent">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om te starten?</h2>
          <p className="text-foreground-accent mb-8">
            Begin met een gratis website design of plan een vrijblijvend gesprek. Geen verplichtingen, geen druk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gratis-website"
              className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all"
            >
              Gratis Website Design
            </a>
            <a
              href="https://cal.com/studiolee"
              className="border border-foreground/20 px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all inline-flex items-center justify-center gap-2"
            >
              <BsCalendar3 /> Plan een Gesprek
            </a>
            <a
              href="https://wa.me/31611594862"
              className="border border-green-500/30 text-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <BsWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Schema.org FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
