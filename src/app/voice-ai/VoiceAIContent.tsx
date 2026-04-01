"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BsCheck2Circle,
  BsArrowRight,
  BsWhatsapp,
  BsCalendar3,
  BsTelephone,
  BsMic,
  BsGlobe,
  BsPersonCheck,
  BsClockHistory,
  BsXCircle,
  BsTelephoneX,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const features = [
  {
    icon: BsMic,
    title: "Beantwoordt in jouw bedrijfsnaam",
    desc: `De AI telefonist neemt op met jouw bedrijfsnaam en begroeting. Bellers merken geen verschil met een echte receptionist.`,
  },
  {
    icon: BsCalendar3,
    title: "Plant afspraken via Calendly",
    desc: `De telefonist checkt jouw beschikbaarheid en plant direct afspraken in — zonder dat jij iets hoeft te doen.`,
  },
  {
    icon: BsWhatsapp,
    title: "Stuurt samenvatting via WhatsApp",
    desc: `Na elk gesprek ontvang je een WhatsApp met wie er belde, wat ze wilden en wat er is afgesproken.`,
  },
  {
    icon: BsTelephone,
    title: "Schakelt urgente oproepen door",
    desc: `Spoedeisende zaken worden direct naar jou doorverbonden. Jij bepaalt welke situaties als urgent gelden.`,
  },
  {
    icon: BsGlobe,
    title: "Meertalig Nederlands",
    desc: `De telefonist spreekt vloeiend Nederlands, Engels, Duits en meer — perfect voor een diverse klantenkring.`,
  },
  {
    icon: BsPersonCheck,
    title: "Professionele begroeting",
    desc: `Altijd een vriendelijke, professionele eerste indruk. Geen voicemail, geen wachttijden, geen gemiste kansen.`,
  },
];

const steps = [
  {
    number: "01",
    title: "Wij richten jouw telefonist in",
    desc: `We configureren de AI met jouw bedrijfsnaam, diensten, openingstijden en begroeting. Jij keurt het af.`,
  },
  {
    number: "02",
    title: "Telefoonnummer koppelen",
    desc: `Je krijgt een eigen nummer of we schakelen jouw bestaande nummer door. Bellers merken geen verschil.`,
  },
  {
    number: "03",
    title: "Altijd bereikbaar, nooit meer missen",
    desc: `De AI neemt op, plant afspraken en stuurt samenvattingen. Jij focust op je werk.`,
  },
];

const painPoints = [
  {
    icon: BsTelephoneX,
    title: "Gemiste oproepen tijdens het werk",
    desc: `Je bent bezig met een klant of klus en kunt niet opnemen. De beller gaat naar de concurrent die wel direct bereikbaar is.`,
  },
  {
    icon: BsClockHistory,
    title: "Klanten bellen buiten kantooruren",
    desc: `'s Avonds en in het weekend wordt er het meest gezocht. Maar jij bent dan niet bereikbaar, en voicemail werkt niet meer.`,
  },
  {
    icon: BsXCircle,
    title: "Steeds dezelfde planningsvragen",
    desc: `"Kan ik morgen langskomen?", "Wat kost een afspraak?", "Hebben jullie plek?" — dagelijks dezelfde telefoontjes die jouw tijd kosten.`,
  },
];

const faqs = [
  {
    q: "Hoe klinkt de Voice AI telefonist?",
    a: "De AI klinkt natuurlijk en professioneel — vergelijkbaar met een echte receptionist. Je kunt de stem, toon en begroeting aanpassen aan jouw bedrijf. Bellers merken in de meeste gevallen geen verschil.",
  },
  {
    q: "Kan de telefonist ook afspraken inplannen?",
    a: "Ja, de telefonist is gekoppeld aan jouw Calendly-agenda. Beschikbare tijdsloten worden automatisch aangeboden en bevestigd. De beller krijgt direct een bevestiging.",
  },
  {
    q: "Wat gebeurt er bij een spoedgeval?",
    a: "Je stelt zelf in welke situaties als urgent gelden. Bij een spoedgeval wordt de beller direct naar jou doorverbonden. Alle andere oproepen worden netjes afgehandeld door de AI.",
  },
  {
    q: "Moet ik mijn telefoonnummer veranderen?",
    a: "Nee, je kunt je bestaande nummer behouden. We schakelen oproepen automatisch door naar de AI telefonist wanneer je niet opneemt. Je kunt ook een apart nummer krijgen als je dat prettiger vindt.",
  },
  {
    q: `Wat kost een Voice AI telefonist bij ${brand}?`,
    a: `De Voice AI telefonist zit inbegrepen in ons maandelijkse pakket vanaf €79/maand. Geen opstartkosten, geen verborgen kosten. Bekijk onze tarieven voor alle details.`,
  },
];

export default function VoiceAIContent() {
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
            Voice AI Telefonist
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Voice AI Telefonist voor {siteDetails.niche}: Geen Oproep Meer Missen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto mb-8"
          >
            Een AI telefonist die elke oproep opneemt in jouw bedrijfsnaam,
            afspraken inplant en samenvattingen stuurt via WhatsApp — ook als
            jij niet kunt opnemen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://calendly.com/tim-studiolee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all"
            >
              <BsCalendar3 /> Plan een Gratis Gesprek
            </a>
            <a
              href="https://wa.me/31611594862"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-green-500/30 text-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all"
            >
              <BsWhatsapp /> WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Wat is een Voice AI telefonist? */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Wat is een Voice AI telefonist?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Een Voice AI telefonist is een slimme AI die jouw telefoon
              opneemt wanneer jij niet beschikbaar bent. Geen voicemailbericht
              dat nooit wordt teruggebeld — de AI voert een echt gesprek,
              beantwoordt vragen over jouw diensten en plant indien gewenst
              direct een afspraak in.
            </p>
            <p>
              Voor {niche} is bereikbaarheid alles. Klanten bellen vaak
              terwijl jij midden in een klus of afspraak zit. Met een Voice AI
              telefonist wordt elke oproep professioneel beantwoord in jouw
              bedrijfsnaam. De AI kent jouw openingstijden, diensten en
              prijzen, en stuurt na elk gesprek een samenvatting via WhatsApp.
              Zo weet je precies wie er belde en wat ze nodig hadden — zonder
              dat je ook maar een seconde van je werk hoeft te onderbreken.
            </p>
          </div>
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Herken je dit?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            De meeste {niche} lopen tegen dezelfde bereikbaarheidsproblemen aan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]"
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="text-red-600 dark:text-red-400" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-foreground-accent text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Hoe het werkt</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            In 3 stappen naar een AI telefonist die jouw bedrijf 24/7 bereikbaar maakt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 dark:bg-neutral-700" />
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-neutral-900 relative z-10">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-foreground-accent text-sm max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat krijg je? */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Wat krijg je?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            Alles wat je nodig hebt om nooit meer een oproep te missen — inbegrepen in je pakket.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground-accent text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom kiezen voor Voice AI? */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Waarom {niche} kiezen voor Voice AI?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Bereikbaarheid is het verschil tussen een volle agenda en lege
              weken. In de {nicheSingular}sbranche bellen klanten het liefst direct
              — ze willen nu een afspraak, niet morgen. Onderzoek laat zien
              dat 80% van de bellers die op een voicemail uitkomen, niet
              terugbellen. Ze bellen simpelweg het volgende bedrijf in de
              Google-resultaten.
            </p>
            <p>
              Met een Voice AI telefonist ben je altijd bereikbaar, zonder
              dat je extra personeel hoeft aan te nemen. De AI neemt op in
              jouw bedrijfsnaam, voert een natuurlijk gesprek en handelt de
              meest voorkomende vragen zelfstandig af. Van het plannen van
              afspraken tot het beantwoorden van prijsvragen — alles
              automatisch. Na elk gesprek ontvang je een samenvatting via
              WhatsApp, zodat je precies weet wat er speelt. Het resultaat?
              Meer afspraken, tevreden klanten en nul gemiste oproepen.
            </p>
          </div>
        </div>
      </section>

      {/* Bureau Vergelijking */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Traditioneel bureau vs. {brand}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 md:p-8 text-white text-center mb-8"
          >
            <p className="text-sm text-gray-400 mb-2">Traditioneel bureau voor {niche}</p>
            <p className="text-2xl md:text-3xl font-bold mb-2">
              <span className="line-through text-gray-500">€1.500 – €3.000/mnd</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">Telefoonservice als losse add-on, alleen tijdens kantooruren</p>
            <div className="w-16 h-px bg-gray-600 mx-auto mb-4"></div>
            <p className="text-primary font-semibold text-lg">{brand}</p>
            <p className="text-3xl md:text-4xl font-bold">€79/maand — alles inbegrepen</p>
            <p className="text-sm text-gray-300 mt-2">Voice AI telefonist standaard inbegrepen. Inclusief strategie & consulting.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditioneel bureau */}
            <div className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]">
              <h3 className="text-lg font-bold mb-4">Traditioneel Bureau</h3>
              <ul className="space-y-3">
                {[
                  "€1.500 - €3.000 per maand",
                  "Weken opzet + trainingstijd",
                  "Telefoonservice als losse add-on (meerprijs)",
                  "Receptionist alleen tijdens kantooruren",
                  "Strategie apart betaald",
                  "Geen AI-technologie",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <BsXCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-accent">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div className="border-2 border-primary rounded-2xl p-6 bg-[var(--card-background)] relative">
              <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold bg-primary text-black">
                Aanbevolen
              </span>
              <h3 className="text-lg font-bold mb-4 mt-1">{brand}</h3>
              <ul className="space-y-3">
                {[
                  "€79 per maand — alles inbegrepen",
                  "Live binnen 1-2 werkdagen",
                  "Voice AI telefonist standaard inbegrepen",
                  "24/7 bereikbaar, ook buiten kantooruren",
                  "Strategie & consulting inbegrepen",
                  "Gebouwd met de nieuwste AI-technologie",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <BsCheck2Circle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Nooit meer een oproep missen?</h2>
          <p className="text-foreground-accent mb-8">
            Plan een gratis strategiegesprek van 15 minuten. We laten zien hoe een Voice AI telefonist
            jouw {nicheSingular}sbedrijf 24/7 bereikbaar maakt — zonder extra personeel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gratis-scan"
              className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all"
            >
              Gratis AI Scan
            </a>
            <a
              href="https://calendly.com/tim-studiolee"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all inline-flex items-center justify-center gap-2"
            >
              <BsCalendar3 /> Plan een Gesprek
            </a>
            <a
              href="https://wa.me/31611594862"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/30 text-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <BsWhatsapp /> WhatsApp
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
