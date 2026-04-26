"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BsCheck2Circle,
  BsArrowRight,
  BsWhatsapp,
  BsPeople,
  BsClockHistory,
  BsQuestionCircle,
  BsXCircle,
  BsBox,
  BsLink45Deg,
  BsShieldCheck,
  BsLightning,
  BsCalendar3,
  BsBookmark,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const features = [
  {
    icon: BsPeople,
    title: "Alle klanten op één plek",
    desc: `Eén centraal klantenbestand met alle contactgegevens, voorkeuren en historie. Geen losse Excel-bestanden of vergeten WhatsApp-chats meer.`,
  },
  {
    icon: BsClockHistory,
    title: "Volledige klanthistorie",
    desc: `Welke afspraken, welke producten, welke klachten, welke voorkeuren. Alles per klant in één tijdlijn die je in 5 seconden overziet.`,
  },
  {
    icon: BsCalendar3,
    title: "Geautomatiseerde follow-ups",
    desc: `Automatische herinneringen voor onderhoud, herhaalafspraken, verjaardagen en winback-momenten. Geen klant valt nog tussen wal en schip.`,
  },
  {
    icon: BsBookmark,
    title: "Slimme segmentatie",
    desc: `Splits je klantenbestand in groepen: vaste klanten, eenmalige klanten, klanten met openstaande offertes. Stuur gerichte berichten in plaats van massa-mails.`,
  },
  {
    icon: BsLink45Deg,
    title: "Koppelt aan je tools",
    desc: `Integratie met WhatsApp, e-mail, Google Agenda, je boekingssysteem en je facturatie. De CRM is de hub die alles samenbrengt.`,
  },
  {
    icon: BsShieldCheck,
    title: "AVG-compliant",
    desc: `Alle data binnen de EU, expliciete toestemming per klant, audit-trail voor inzage- en verwijderverzoeken. Geen juridische zorgen.`,
  },
];

const steps = [
  {
    number: "01",
    title: "We importeren je huidige klantenbestand",
    desc: `Excel, Outlook, WhatsApp-contacten, oude software: wat je ook hebt, wij zetten het over naar de CRM. Geen handmatig overtypen.`,
  },
  {
    number: "02",
    title: "We koppelen je systemen",
    desc: `WhatsApp, agenda, e-mail en boekingssysteem worden gekoppeld zodat elke nieuwe afspraak en elk gesprek automatisch in de CRM verschijnt.`,
  },
  {
    number: "03",
    title: "Automatische opvolging gaat live",
    desc: `Herinneringen voor onderhoud, herhaalafspraken en winback gaan automatisch uit. Jij ziet het overzicht en stuurt bij waar nodig.`,
  },
];

const painPoints = [
  {
    icon: BsXCircle,
    title: "Klantgegevens versnipperd over 4 plekken",
    desc: `Een naam in WhatsApp, het adres in Outlook, de afspraakhistorie in een agenda en de factuur in een Excel. Niemand kan in 30 seconden zien wat je weet over een klant.`,
  },
  {
    icon: BsClockHistory,
    title: "Vergeten klanten = verloren omzet",
    desc: `Klanten die een jaar geleden onderhoud nodig hadden zijn niet meer in beeld. Ze gaan naar de concurrent omdat niemand ze actief opvolgde.`,
  },
  {
    icon: BsQuestionCircle,
    title: "Geen idee wie je vaste klanten zijn",
    desc: `Je hebt 800 klantnamen op papier maar geen idee welke 80 daarvan 80 procent van je omzet leveren. Zonder die kennis stuur je willekeurig.`,
  },
];

const faqs = [
  {
    q: `Wat is een CRM voor ${niche}?`,
    a: `Een CRM (Customer Relationship Management) systeem is een centraal systeem waarin alle klantgegevens, afspraken, communicatie en historie staan. Voor ${niche} betekent dat één plek waar je per klant ziet wanneer ze voor het laatst kwamen, welke diensten ze afnamen, wat hun voorkeuren zijn en wanneer ze weer aan de beurt zijn.`,
  },
  {
    q: "Moet ik mijn huidige klantenbestand zelf overzetten?",
    a: "Nee, dat doen wij. Lever je huidige Excel, contactenlijst of oude software-export aan en wij importeren alles netjes in de CRM. Dubbele records worden samengevoegd, ontbrekende velden worden waar mogelijk aangevuld.",
  },
  {
    q: "Werkt de CRM samen met mijn boekingssysteem en WhatsApp?",
    a: "Ja, dat is juist de kern. We koppelen WhatsApp Business, je boekingssysteem, Google Agenda, je e-mail en je facturatie. Elke nieuwe afspraak of elk gesprek verschijnt automatisch in de CRM zonder dat je iets dubbel hoeft in te voeren.",
  },
  {
    q: "Hoe zit het met privacy en AVG?",
    a: "Alle data wordt binnen de EU verwerkt en opgeslagen. We hebben verwerkersovereenkomsten met onderliggende leveranciers. Klanten kunnen op elk moment hun gegevens inzien of laten verwijderen, en het systeem bewaart een audit-trail van wat wanneer is aangepast.",
  },
  {
    q: `Wat kost een CRM bij ${brand}?`,
    a: `De CRM zit standaard in ons maandelijkse pakket vanaf €79 per maand (excl. BTW). Geen opstartkosten, geen aparte licenties. Bekijk onze tarieven voor alle details over wat er nog meer in dat pakket zit.`,
  },
  {
    q: "Kan ik later weer overstappen naar een ander systeem?",
    a: "Ja. Je data is altijd van jou. Op elk moment kun je een volledige export aanvragen (CSV of vergelijkbaar formaat) zodat je naar een ander systeem kunt overstappen zonder data-verlies.",
  },
];

export default function CrmContent() {
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
            CRM voor {siteDetails.niche}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Eén klantenbestand. Volledige historie. Nul gemiste klanten.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground-accent mb-8 max-w-2xl mx-auto"
          >
            Een CRM die jouw {nicheSingular}-bedrijf op één plek bundelt: klantgegevens, afspraken, communicatie en automatische follow-ups. Geen versnipperde Excel-bestanden, geen vergeten klanten, geen omzet die wegloopt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/gratis-scan"
              className="bg-primary text-background px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
            >
              Gratis CRM-scan <BsArrowRight />
            </a>
            <a
              href="/tarieven"
              className="border border-foreground/20 text-foreground px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all inline-flex items-center justify-center"
            >
              Bekijk tarieven
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-12 md:py-16 px-4 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Herken je dit als {nicheSingular}?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((pp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6"
              >
                <pp.icon className="text-3xl text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{pp.title}</h3>
                <p className="text-foreground-accent">{pp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Wat de CRM voor je doet
          </h2>
          <p className="text-center text-foreground-accent mb-12 max-w-2xl mx-auto">
            Zes functies die elke {nicheSingular} nodig heeft om geen klant meer te verliezen aan slechte administratie.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-foreground/10 rounded-2xl p-6 hover:border-primary/40 transition-all"
              >
                <f.icon className="text-3xl text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-foreground-accent">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-20 px-4 bg-foreground/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Zo werken we samen
          </h2>
          <p className="text-center text-foreground-accent mb-12">
            In drie stappen draait jouw CRM.
          </p>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 bg-background rounded-2xl p-6 md:p-8"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary flex-shrink-0">
                  {s.number}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{s.title}</h3>
                  <p className="text-foreground-accent">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="border border-foreground/10 rounded-xl p-5 group"
              >
                <summary className="font-semibold cursor-pointer flex justify-between items-center">
                  {f.q}
                  <BsArrowRight className="group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-foreground-accent">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-4 bg-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop met klanten verliezen
          </h2>
          <p className="text-lg text-foreground-accent mb-8">
            Vraag een gratis scan aan en we kijken samen welk gedeelte van jouw {nicheSingular}-administratie het meest oplevert om als eerste in een CRM te zetten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gratis-scan"
              className="bg-primary text-background px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
            >
              Gratis CRM-scan <BsArrowRight />
            </a>
            <a
              href="https://calendly.com/tim-studiolee"
              target="_blank"
              rel="nofollow noopener"
              className="border border-foreground/20 text-foreground px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all inline-flex items-center justify-center"
            >
              Plan een gesprek
            </a>
          </div>
          <p className="text-sm text-foreground-accent mt-6">
            Of bekijk eerst onze{" "}
            <a href="/tarieven" className="text-primary hover:underline">tarieven</a>
          </p>
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
