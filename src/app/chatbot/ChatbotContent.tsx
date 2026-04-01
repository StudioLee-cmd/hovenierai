"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BsCheck2Circle,
  BsArrowRight,
  BsWhatsapp,
  BsCalendar3,
  BsChatDots,
  BsGlobe,
  BsLightning,
  BsPeople,
  BsClockHistory,
  BsQuestionCircle,
  BsXCircle,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const features = [
  {
    icon: BsClockHistory,
    title: "24/7 beschikbaar",
    desc: `Jouw chatbot slaapt nooit. Klanten krijgen direct antwoord, ook om 23:00 of op zondag.`,
  },
  {
    icon: BsChatDots,
    title: "Getraind op jouw diensten",
    desc: `De chatbot kent jouw prijzen, openingstijden en specialisaties — geen generieke antwoorden.`,
  },
  {
    icon: BsWhatsapp,
    title: "WhatsApp integratie",
    desc: `Leads en gesprekken worden automatisch doorgestuurd naar jouw WhatsApp, zodat je niets mist.`,
  },
  {
    icon: BsPeople,
    title: "Lead kwalificatie",
    desc: `De chatbot stelt slimme vragen en filtert serieuze klanten van vrijblijvende vragen.`,
  },
  {
    icon: BsCalendar3,
    title: "Afspraken boeken",
    desc: `Klanten plannen direct een afspraak via de chatbot — zonder dat jij hoeft te bellen of mailen.`,
  },
  {
    icon: BsGlobe,
    title: "Meertalig",
    desc: `De chatbot spreekt Nederlands, Engels, Duits en meer — perfect voor internationale klanten.`,
  },
];

const steps = [
  {
    number: "01",
    title: "Wij bouwen jouw chatbot",
    desc: `We trainen de AI op jouw bedrijf: diensten, prijzen, veelgestelde vragen en tone of voice. Jij hoeft niets te doen.`,
  },
  {
    number: "02",
    title: "Chatbot gaat live op je website",
    desc: `We plaatsen de chatbot op jouw website. Binnen een dag is hij actief en vangt hij klanten op.`,
  },
  {
    number: "03",
    title: "Jij ontvangt leads via WhatsApp",
    desc: `Elke lead, afspraak of vraag wordt direct naar jou doorgestuurd. Jij beslist wanneer je reageert.`,
  },
];

const painPoints = [
  {
    icon: BsXCircle,
    title: "Leads kwijt na sluitingstijd",
    desc: `Klanten bezoeken je website 's avonds, stellen een vraag en horen pas de volgende dag iets. Tegen die tijd hebben ze een concurrent gebeld.`,
  },
  {
    icon: BsClockHistory,
    title: "Trage reactietijd",
    desc: `Terwijl jij bezig bent met een klant of klus, lopen nieuwe aanvragen op. Hoe langer je wacht, hoe kleiner de kans dat ze klant worden.`,
  },
  {
    icon: BsQuestionCircle,
    title: "Steeds dezelfde vragen beantwoorden",
    desc: `"Wat kost het?", "Hebben jullie plek?", "Hoe kan ik een afspraak maken?" — dagelijks dezelfde vragen, maar jij hebt er geen tijd voor.`,
  },
];

const faqs = [
  {
    q: "Hoe snel is de chatbot actief?",
    a: "Binnen 1-2 werkdagen. Wij bouwen en trainen de chatbot, plaatsen hem op je website en testen alles voordat hij live gaat.",
  },
  {
    q: "Moet ik zelf de chatbot trainen of bijhouden?",
    a: "Nee, dat doen wij. Wij trainen de chatbot op jouw diensten, prijzen en veelgestelde vragen. Als er iets verandert, passen wij het aan — dat zit in de service.",
  },
  {
    q: "Wat als de chatbot een vraag niet kan beantwoorden?",
    a: "Dan stuurt hij de vraag direct door naar jou via WhatsApp of e-mail, zodat je zelf kunt reageren. De klant krijgt ondertussen een melding dat je zo snel mogelijk reageert.",
  },
  {
    q: "Werkt de chatbot ook op mobiel?",
    a: "Ja, de chatbot werkt perfect op telefoon, tablet en desktop. De meeste bezoekers komen via mobiel en de ervaring is daar volledig op geoptimaliseerd.",
  },
  {
    q: `Wat kost een AI chatbot bij ${brand}?`,
    a: `Een AI chatbot zit inbegrepen in ons maandelijkse pakket vanaf €79/maand. Geen opstartkosten, geen verborgen kosten. Bekijk onze tarieven voor alle details.`,
  },
];

export default function ChatbotContent() {
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
            AI Chatbot
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            AI Chatbot voor {siteDetails.niche}: 24/7 Klanten Opvangen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto mb-8"
          >
            Een slimme AI chatbot die jouw website bezoekers direct helpt,
            vragen beantwoordt en afspraken inplant — ook als jij niet
            beschikbaar bent. Geen gemiste leads meer.
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

      {/* Wat is een AI Chatbot? */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Wat is een AI chatbot?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Een AI chatbot is een slimme digitale assistent die op jouw
              website draait en bezoekers direct helpt — dag en nacht. Anders
              dan een simpel contactformulier voert de chatbot echte gesprekken,
              beantwoordt vragen over jouw diensten en kan zelfs afspraken
              inplannen.
            </p>
            <p>
              Voor {niche} betekent dit dat potentiele klanten die &apos;s avonds
              of in het weekend jouw website bezoeken, direct geholpen worden.
              Geen wachttijd, geen gemiste kansen. De chatbot is getraind op
              jouw specifieke diensten, prijzen en werkwijze, zodat klanten
              altijd relevante en accurate informatie krijgen. Elke lead wordt
              automatisch naar jou doorgestuurd via WhatsApp, zodat je altijd
              op de hoogte bent — zonder dat je continu achter je laptop hoeft
              te zitten.
            </p>
          </div>
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Herken je dit?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            De meeste {niche} lopen tegen dezelfde problemen aan. Herkenbaar?
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
            In 3 stappen naar een AI chatbot die dag en nacht klanten opvangt.
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
            Alles wat je nodig hebt om 24/7 klanten op te vangen — inbegrepen in je pakket.
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

      {/* Waarom kiezen voor een chatbot? */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Waarom {niche} kiezen voor een chatbot?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              In de {nicheSingular}sbranche draait alles om snelheid en vertrouwen. Een
              klant die via Google op jouw website landt, verwacht direct
              antwoord. Niet morgen, niet over een uur — nu. Uit onderzoek
              blijkt dat 78% van de leads kiest voor het bedrijf dat als
              eerste reageert. Met een AI chatbot ben jij dat bedrijf, altijd.
            </p>
            <p>
              Daarnaast bespaar je als ondernemer enorm veel tijd. Geen
              eindeloze telefoontjes meer met steeds dezelfde vragen over
              prijzen of beschikbaarheid. De chatbot handelt dat af, terwijl
              jij bezig bent met waar je goed in bent. En het mooiste? Elke
              serieuze lead komt netjes bij jou binnen via WhatsApp, inclusief
              alle relevante informatie. Zo mis je nooit meer een klant en
              groeit je bedrijf zonder extra personeel in te hoeven huren.
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
            <p className="text-sm text-gray-400 mb-4">Chatbot als losse add-on, beperkte support, strategie apart betaald</p>
            <div className="w-16 h-px bg-gray-600 mx-auto mb-4"></div>
            <p className="text-primary font-semibold text-lg">{brand}</p>
            <p className="text-3xl md:text-4xl font-bold">€79/maand — alles inbegrepen</p>
            <p className="text-sm text-gray-300 mt-2">AI chatbot standaard inbegrepen. Inclusief strategie & consulting.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditioneel bureau */}
            <div className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]">
              <h3 className="text-lg font-bold mb-4">Traditioneel Bureau</h3>
              <ul className="space-y-3">
                {[
                  "€1.500 - €3.000 per maand",
                  "Wekenlange oplevering",
                  "Chatbot als losse add-on (meerprijs)",
                  "Beperkte support buiten kantooruren",
                  "Strategie is apart betaald",
                  "Geen AI-kennis in huis",
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
                  "AI chatbot standaard inbegrepen",
                  "24/7 systeem, altijd bereikbaar",
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om 24/7 klanten op te vangen?</h2>
          <p className="text-foreground-accent mb-8">
            Plan een gratis strategiegesprek van 15 minuten. We laten zien hoe een AI chatbot
            jouw {nicheSingular}sbedrijf kan laten groeien — zonder extra personeel.
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
