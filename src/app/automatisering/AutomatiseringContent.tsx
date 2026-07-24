"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsCheck2Circle,
  BsArrowRight,
  BsWhatsapp,
  BsCalendar3,
  BsBellFill,
  BsLightning,
  BsChatDots,
  BsClockHistory,
  BsGearFill,
  BsArrowRepeat,
  BsXCircle,
  BsBoxSeam,
  BsTelephone,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "hoveniers";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const workflows = [
  {
    icon: BsBellFill,
    title: "Automatische herinneringen",
    desc: `24 uur en 2 uur voor elke afspraak gaat er automatisch een WhatsApp- of SMS-herinnering uit. Bevestigen kan met één tik. Minder no-shows, minder vergeefse moeite.`,
  },
  {
    icon: BsLightning,
    title: "Lead-opvolging",
    desc: `Nieuwe website-aanvraag of gemiste oproep? Klant krijgt binnen 60 seconden automatisch een bevestiging via WhatsApp of e-mail. Jij belt later terug, de lead is al opgevangen.`,
  },
  {
    icon: BsChatDots,
    title: "Klantcommunicatie",
    desc: `Statusupdates, "ik kom over 15 minuten", factuur-volgop, betaling-herinnering — alles geautomatiseerd op het juiste moment. Geen verraste klant.`,
  },
  {
    icon: BsCalendar3,
    title: "Agenda + planning sync",
    desc: `Nieuwe boekingen vanuit chatbot, Voice AI of de website landen automatisch in Google Calendar of Outlook. Routes en team-planning worden mee bijgewerkt.`,
  },
  {
    icon: BsCheck2Circle,
    title: "Review-verzoek na elke klus",
    desc: `Twee uur na afgerond werk gaat er automatisch een WhatsApp uit met directe Google-review link. Meer reviews, hogere ranking, meer instroom — zonder dat jij er aan hoeft te denken.`,
  },
  {
    icon: BsArrowRepeat,
    title: "Cyclus-automatisering",
    desc: `Klantspecifieke onderhoud- of opvolg-cycli automatisch beheerd. Voor Hoveniers: seizoens-onderhoudsherinneringen (voorjaar/najaar), automatische offerte na bezichtiging, review-verzoek na opleveren tuinproject — terugkerende omzet zonder dat jij eraan hoeft te denken.`,
  },
];

const reminderExamples = [
  "Bevestigings-bericht direct na boeking via Voice AI of chatbot",
  '"Wij zien je morgen om 09:30" — 24u van tevoren',
  '"Ik vertrek over 15 minuten" — wanneer je in onderweg gaat',
  "Factuur-volgop 3 dagen na klus (betaling-herinnering, vriendelijk)",
  "Cyclus-onderhoud-uitnodiging op het juiste moment",
  "Reactiveer-bericht voor klanten die 6 maanden niets gehoord hebben",
];

const integrations = [
  { icon: BsWhatsapp, title: "WhatsApp Business", desc: "Het hoofdkanaal — 90% van hoveniers-klanten checkt WhatsApp sneller dan e-mail." },
  { icon: BsTelephone, title: "SMS / Telefoon", desc: "Voor klanten die geen WhatsApp gebruiken — gewoon een SMS. Werkt op elke telefoon." },
  { icon: BsCalendar3, title: "Google Calendar + Outlook", desc: "Afspraken sync je agenda automatisch. Geen dubbel-boekingen tussen jou en je collega's." },
  { icon: BsBoxSeam, title: "Boekingssystemen", desc: "Custom boekingsformulier, online afsprakenboeker en Voice AI vullen dezelfde agenda." },
];

const steps = [
  {
    number: "01",
    title: "Wij brengen je flows in kaart",
    desc: `In een 30-min gesprek mappen we welke 3-5 flows direct waarde opleveren: gemiste oproepen, no-shows, review-verzoeken, cyclus-opvolging. Geen overkill, alleen wat oplevert.`,
  },
  {
    number: "02",
    title: "Wij bouwen de automatiseringen",
    desc: `Wij koppelen alles aan WhatsApp, je agenda, je boekingsformulier en je facturatie. Bestaande systemen blijven, ze gaan alleen automatisch samenwerken.`,
  },
  {
    number: "03",
    title: "Live binnen een week",
    desc: `Binnen 5-7 werkdagen draaien je flows. Wij testen elke route. Daarna pas je het zelf aan via een simpele dashboard — geen tech-kennis nodig.`,
  },
];

const painPoints = [
  {
    icon: BsXCircle,
    title: "Seizoensgebonden drukte — in het voorjaar veel aanvragen, in winter stil",
    desc: `Wat had niemand opgevolgd. Een automatisch follow-up bericht had het opgelost.`,
  },
  {
    icon: BsClockHistory,
    title: "Telefoontjes tijdens het werken in de tuin",
    desc: `Tegen de tijd dat je terugbelt heeft de klant al een collega gebeld. Zonder automatische opvolging is het over.`,
  },
  {
    icon: BsGearFill,
    title: "Offertes maken kost te veel tijd",
    desc: `Je hebt klanten die periodiek service nodig hebben. Zonder cyclus-systeem vergeet je een groot deel van die terugkerende omzet.`,
  },
];

const faqs = [
  {
    q: `Wat is workflow automatisering voor ${niche}?`,
    a: `Het is het automatisch versturen van berichten, follow-ups, herinneringen en review-verzoeken op het juiste moment in de klant-flow. Voor ${niche}: bevestiging na boeking, status-updates tijdens de klus, review-vraag na afronding, cyclus-uitnodigingen op het juiste tijdstip. Het systeem doet het werk, jij focust op je vak.`,
  },
  {
    q: "Werkt het samen met mijn huidige boekingssysteem en agenda?",
    a: "Ja. We koppelen aan Google Calendar, Outlook, en de gangbare boekings- en facturatie-tools. Je hoeft niets te vervangen — bestaande systemen blijven werken, ze gaan automatisch met elkaar communiceren.",
  },
  {
    q: "Worden alle berichten via WhatsApp verstuurd?",
    a: `WhatsApp is het hoofdkanaal omdat ${niche}-klanten daar het snelst reageren. Maar SMS, e-mail en zelfs telefoontjes (via de Voice AI) zijn ook mogelijk. Het systeem kiest het kanaal dat het beste werkt per klant.`,
  },
  {
    q: "Wat kost workflow automatisering?",
    a: `Alle automatiseringen zitten inbegrepen in het maandelijkse pakket vanaf €79/maand. Geen opstartkosten, geen kosten per bericht. Bekijk de tarieven voor alle details.`,
  },
  {
    q: "Krijg ik mijn data terug als ik stop?",
    a: "Ja. Klantdata, gesprekgeschiedenis, agenda en review-data zijn altijd van jou — exporteerbaar als CSV op elk moment. Geen lock-in.",
  },
  {
    q: "Kan ik later flows zelf aanpassen?",
    a: "Ja. Via een simpele drag-and-drop dashboard kun je triggers, timing en berichten aanpassen. Geen developer nodig.",
  },
];

export default function AutomatiseringContent() {
  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Workflow Automatisering
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Workflow automatisering voor {siteDetails.niche}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto mb-8"
          >
            Automatische herinneringen, lead-opvolging, klantcommunicatie en
            cyclus-flows — voor {niche} die geen tijd hebben voor admin
            maar wel volle agendas willen. Jij maakt tuinen mooi, wij regelen de rest.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://cal.com/studiolee"
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

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-5xl mx-auto mt-12 px-4"
        >
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-2xl">
            <Image
              src="/images/services/automatisering-hero.jpg"
              alt={`Workflow automatisering voor ${niche} — herinneringen, klus-updates, review-verzoeken automatisch`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </motion.div>
      </section>

      {/* Wat is workflow automatisering? */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Wat is workflow automatisering?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Workflow automatisering betekent dat berichten, follow-ups, herinneringen,
              review-verzoeken en cyclus-uitnodigingen automatisch op het juiste moment
              uitgaan. Geen handmatig &quot;even een appje sturen&quot;, geen vergeten
              terugbel-actie, geen gemiste cyclus.
            </p>
            <p>
              Voor {niche} betekent dit dat de klant-flow van eerste contact tot review
              vanzelf draait: een klant doet &apos;s avonds een aanvraag, de chatbot vangt
              op, een bevestiging gaat uit, een herinnering 24u voor de afspraak gaat uit,
              status-updates gaan automatisch, en een review-verzoek gaat uit 2u na
              afgerond werk. Jij hoeft alleen het werk te doen — de communicatie loopt vanzelf.
            </p>
          </div>
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Herken je dit?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            De meeste {niche} lopen tegen dezelfde admin-problemen aan.
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
            In 3 stappen draaien jouw automatiseringen — zonder tech-kennis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
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

          {/* Workflow image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14"
          >
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-xl">
              <Image
                src="/images/services/automatisering-workflow.jpg"
                alt={`Flat-lay automatisering tools voor ${niche}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <p className="text-center text-sm text-foreground-accent mt-3 max-w-2xl mx-auto">
              Bevestiging na boeking, herinnering 24u + 2u van tevoren, status-updates, review-verzoek 2u na klus — alles automatisch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6 Workflow categorieen */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Welke flows automatiseren we?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            Zes categorieen die voor {niche} de meeste tijd én omzet opleveren.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((w, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <w.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{w.title}</h3>
                <p className="text-foreground-accent text-sm">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: automatische herinneringen */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">In de spotlight</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Automatische herinneringen — de quickest win</h2>
            <p className="text-foreground-accent max-w-2xl mx-auto">
              Van alle workflows leveren herinneringen + status-updates de snelste ROI: minder no-shows, minder telefoontjes, meer 5-sterren reviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-bold mb-4">Voorbeelden van automatische berichten</h3>
              {reminderExamples.map((ex, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <BsCheck2Circle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-foreground-accent">{ex}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-xl"
            >
              <Image
                src="/images/services/automatisering-section.jpg"
                alt={`Workflow-builder canvas voor ${niche}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp-eerst */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">WhatsApp-eerst, niet email-eerst</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-2xl mx-auto">
            Klanten van {niche} checken WhatsApp 4x sneller dan email. We bouwen alle flows daarom WhatsApp-first, met SMS/e-mail als backup.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((i, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)]"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-base font-bold mb-2">{i.title}</h3>
                <p className="text-foreground-accent text-sm">{i.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combinatie met andere services */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Combineer met andere AI-tools</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            Automatisering werkt het beste als onderdeel van het complete platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/voice-ai", title: "Voice AI Telefonist", desc: "Vangt oproepen op die buiten kantooruren binnenkomen en triggert automatisch een lead-opvolg-flow." },
              { href: "/chatbot", title: "AI Chatbot", desc: "Vangt website-aanvragen op en start direct de bevestigings-flow zonder dat jij iets hoeft te doen." },
              { href: "/crm", title: `CRM voor ${siteDetails.niche}`, desc: "Elke geautomatiseerde flow logt naar het juiste klantprofiel — volledige geschiedenis op een plek." },
              { href: "/reviews", title: "Reviews", desc: "Automatisch review-verzoek 2u na elke klus — meer 5-sterren, hogere Google ranking." },
              { href: "/seo", title: `SEO voor ${siteDetails.niche}`, desc: "Reviews + automatisering versterken lokale SEO. Combineer voor maximaal effect in Google Maps." },
              { href: "/gratis-scan", title: "Gratis AI-scan", desc: "Niet zeker waar je moet beginnen? We maken een gratis automatisering-scan voor jouw situatie." },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-foreground-accent text-sm mb-3">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                  Bekijk <BsArrowRight size={14} />
                </span>
              </Link>
            ))}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om automatisch te draaien?</h2>
          <p className="text-foreground-accent mb-8">
            Plan een gratis strategiegesprek van 15 minuten. We laten zien welke 3-5 flows direct waarde opleveren in jouw situatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gratis-scan"
              className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all"
            >
              Gratis AI Scan
            </Link>
            <a
              href="https://cal.com/studiolee"
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
            <Link href="/tarieven" className="text-primary hover:underline">tarieven</Link>
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
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
