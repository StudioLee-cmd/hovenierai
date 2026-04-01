"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsWhatsapp,
  BsPhone,
  BsStar,
  BsStarFill,
  BsGoogle,
  BsCheckCircleFill,
  BsArrowRight,
  BsCalendarCheck,
  BsChatDots,
  BsQrCode,
  BsBellFill,
  BsGraphUpArrow,
  BsShieldCheck,
  BsQuestionCircle,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.siteName.replace(/AI$/i, "").toLowerCase();

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5 },
};

const painPoints = [
  {
    title: "Vergeten om reviews te vragen",
    description: `Na een klus of afspraak ben je alweer bezig met de volgende klant. Reviews vragen schiet er steeds bij in, terwijl je weet hoe belangrijk ze zijn.`,
  },
  {
    title: "Concurrenten hebben meer sterren",
    description: `Je ziet dat andere ${niche}s in jouw regio 4.8 sterren hebben met honderden reviews. Klanten kiezen automatisch voor degene met de meeste en beste beoordelingen.`,
  },
  {
    title: "Negatieve review zonder reactie",
    description: `Er staat een negatieve review online die je reputatie schaadt. Je weet niet hoe je moet reageren, of je hebt het simpelweg niet gezien.`,
  },
];

const steps = [
  {
    icon: BsPhone,
    title: "Automatisch verzoek",
    description: `Na elke afspraak of klus ontvangt je klant automatisch een vriendelijk review-verzoek via WhatsApp of SMS. Geen extra werk voor jou.`,
  },
  {
    icon: BsStar,
    title: "Klant laat review achter",
    description: `Je klant klikt op de link en wordt direct naar Google geleid. Binnen 30 seconden staat de review online. Makkelijker kan niet.`,
  },
  {
    icon: BsGoogle,
    title: "Reviews verschijnen op Google",
    description: `De review verschijnt direct op je Google Bedrijfsprofiel. Meer sterren betekent hogere rankings en meer vertrouwen bij nieuwe klanten.`,
  },
];

const features = [
  {
    icon: BsWhatsapp,
    title: "Automatische review requests",
    description: `Via WhatsApp en SMS worden klanten automatisch gevraagd een review achter te laten. Persoonlijk, op het juiste moment.`,
  },
  {
    icon: BsQrCode,
    title: "NFC & QR kaarten",
    description: `Professionele kaarten met NFC-chip en QR-code. Klanten tikken of scannen en laten direct een Google review achter.`,
  },
  {
    icon: BsGoogle,
    title: "Google Business integratie",
    description: `Direct gekoppeld aan je Google Bedrijfsprofiel. Reviews verschijnen meteen waar potentiele klanten ze zien.`,
  },
  {
    icon: BsChatDots,
    title: "Review response templates",
    description: `Kant-en-klare reactietemplates voor positieve en negatieve reviews. Professioneel reageren in seconden.`,
  },
  {
    icon: BsGraphUpArrow,
    title: "Maandelijks review rapport",
    description: `Overzichtelijk rapport met je review-score, groei en vergelijking met concurrenten. Je ziet precies je voortgang.`,
  },
  {
    icon: BsBellFill,
    title: "Negatieve review alerts",
    description: `Direct een melding bij een negatieve review. Zo kun je snel en professioneel reageren voordat het escaleert.`,
  },
];

const faqs = [
  {
    question: "Hoe werken de automatische review requests?",
    answer: `Na een afspraak of klus sturen we automatisch een vriendelijk bericht via WhatsApp of SMS naar je klant. Dit bericht bevat een directe link naar je Google Reviews pagina. De timing is perfect: vlak na een positieve ervaring, wanneer de klant het meest geneigd is om een review te schrijven.`,
  },
  {
    question: "Wat zijn NFC & QR review kaarten?",
    answer: `Dit zijn professionele kaartjes in jouw huisstijl met een ingebouwde NFC-chip en QR-code. Je klant houdt zijn telefoon tegen de kaart (NFC) of scant de QR-code, en wordt direct naar je Google Reviews pagina geleid. Ideaal om aan het eind van een afspraak mee te geven.`,
  },
  {
    question: `Hoeveel reviews kan ik verwachten per maand?`,
    answer: `Dit hangt af van het aantal klanten dat je bedient. Gemiddeld zien we dat 30-40% van de klanten die een review-verzoek ontvangen ook daadwerkelijk een review achterlaat. Bij 20 klanten per week kun je dus rekenen op 6-8 nieuwe reviews per week. Dat loopt snel op.`,
  },
  {
    question: "Wat doe ik met een negatieve review?",
    answer: `Negatieve reviews zijn niet het einde van de wereld - het gaat erom hoe je reageert. We sturen je direct een alert bij een negatieve review en bieden kant-en-klare response templates. Een professionele reactie laat zien dat je klantgericht bent. Vaak veranderen klanten hun review zelfs na een goed gesprek.`,
  },
  {
    question: `Kan ik review management ook los afnemen?`,
    answer: `Review management zit standaard inbegrepen in onze pakketten. Bekijk de tarieven-pagina voor alle mogelijkheden. NFC & QR kaarten kun je los bestellen via onze review-pakket pagina. Wil je advies over de beste aanpak? Plan een gratis adviesgesprek.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ReviewsContent() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-100 dark:bg-yellow-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100 dark:bg-orange-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} size={28} className="text-yellow-400" />
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
          >
            Review Management voor {niche}s: Automatisch 5 Sterren Verzamelen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Laat je klanten automatisch reviews achterlaten via WhatsApp, NFC-kaarten en
            slimme software. Meer sterren, meer vertrouwen, meer klanten.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/gratis-scan"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Gratis Reputatie Scan
              <BsArrowRight />
            </Link>
            <a
              href="https://wa.me/31611594862"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition-colors shadow-lg"
            >
              <BsWhatsapp size={20} />
              WhatsApp ons
            </a>
          </motion.div>
        </div>
      </section>

      {/* Waarom zijn reviews belangrijk? */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              De impact van reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
              Waarom zijn reviews belangrijk?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                93% van de consumenten leest online reviews voordat ze een {niche} kiezen. Google
                Reviews zijn het digitale equivalent van mond-tot-mondreclame - en ze zijn
                zichtbaar voor iedereen. Meer en betere reviews betekent niet alleen meer
                vertrouwen, maar ook hogere rankings in Google Maps.
              </p>
              <p>
                Voor {niche}s zijn reviews extra belangrijk. Klanten vertrouwen op de ervaringen
                van anderen wanneer ze iemand in hun huis of bedrijf binnenlaten. Een {niche} met
                4.8 sterren en 200+ reviews wint het altijd van een concurrent met 4.2 sterren
                en 15 reviews. Het verschil? Een slim review-systeem dat automatisch om
                beoordelingen vraagt op precies het juiste moment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Herken je dit? */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-red-500 font-bold tracking-wider uppercase text-sm">
              Herkenbaar?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Herken je dit?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-8"
              >
                <div className="text-3xl mb-4">
                  {index === 0 ? "🤦" : index === 1 ? "⭐" : "😰"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Simpel en effectief
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Hoe het werkt
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gray-200 dark:bg-gray-700" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-32 h-32 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-neutral-700 mb-6 hover:scale-110 transition-transform">
                  <step.icon size={40} className="text-primary" />
                </div>
                <span className="text-sm font-bold text-primary mb-2">
                  Stap {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat krijg je? */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Alles inbegrepen
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Wat krijg je?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom review management voor [niche]? */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Waarom nu starten
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
              Waarom review management voor {niche}s?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Als {niche} leef je van vertrouwen. Klanten laten iemand in hun huis of bedrijf
                komen en willen zeker weten dat ze een goede keuze maken. Google Reviews zijn
                daarbij de belangrijkste vertrouwensfactor: 88% van de consumenten vertrouwt
                online reviews net zoveel als persoonlijke aanbevelingen.
              </p>
              <p>
                Maar reviews vragen kost tijd en voelt ongemakkelijk. Met een automatisch systeem
                gebeurt het zonder dat je erover na hoeft te denken. Na elke klus of afspraak
                krijgt je klant een persoonlijk bericht, precies wanneer de tevredenheid het
                hoogst is. Het resultaat: een constante stroom van positieve reviews die je
                Google-ranking omhoog duwen en nieuwe klanten overtuigen om voor jou te kiezen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bureau Comparison */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Vergelijk en bespaar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Reputatie Bureau vs. {siteDetails.siteName}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Bureau */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Traditioneel Reputatie Bureau
              </h3>
              <p className="text-4xl font-black text-gray-400 line-through decoration-red-500 decoration-4 mb-6">
                {"\u20AC"}500+/mo
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Handmatige review follow-ups",
                  "NFC-kaarten apart bestellen en instellen",
                  "Basis Google Business beheer",
                  "Reacties schrijven kost extra",
                  "Geen automatisering",
                  "Aparte tool voor rapportages",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1 flex-shrink-0">&#10007;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-foreground dark:bg-neutral-800 text-white rounded-2xl p-8 relative overflow-hidden shadow-2xl border-2 border-primary"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-2 relative z-10">
                {siteDetails.siteName}
              </h3>
              <p className="text-4xl font-black text-primary mb-6 relative z-10">
                {"\u20AC"}79/mo
              </p>
              <ul className="space-y-3 relative z-10">
                {[
                  "Volledig automatische review requests",
                  "NFC & QR kaarten in jouw huisstijl",
                  "Google Business volledig geoptimaliseerd",
                  "Review response templates inbegrepen",
                  "Alles automatisch, geen extra werk",
                  "Maandelijkse rapportage inbegrepen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 relative z-10">
                <p className="text-green-400 font-bold bg-green-400/10 inline-block px-4 py-2 rounded-full text-sm">
                  Review management inbegrepen in elk pakket
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <BsQuestionCircle size={32} className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Veelgestelde vragen over reviews
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <details className="group bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="text-primary ml-4 flex-shrink-0 group-open:rotate-45 transition-transform duration-200 text-2xl">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-800 dark:to-orange-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <BsStarFill key={i} size={24} className="text-white" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Klaar om meer 5-sterren reviews te verzamelen?
              </h2>
              <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                Plan een gratis adviesgesprek van 15 minuten. We bekijken je huidige
                Google-score en laten zien hoeveel reviews je kunt verwachten.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://calendly.com/tim-studiolee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-orange-700 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg group"
                >
                  <BsCalendarCheck size={20} />
                  Plan Gratis Adviesgesprek
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/tarieven"
                  className="inline-flex items-center gap-2 text-white font-semibold py-4 px-8 rounded-full border-2 border-white/30 hover:border-white/60 transition-colors"
                >
                  Bekijk tarieven
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
