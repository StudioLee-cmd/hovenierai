"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsSearch,
  BsPencilSquare,
  BsGearWideConnected,
  BsFileEarmarkText,
  BsGeoAlt,
  BsGoogle,
  BsRobot,
  BsGraphUpArrow,
  BsLink45Deg,
  BsCheckCircleFill,
  BsArrowRight,
  BsWhatsapp,
  BsCalendarCheck,
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

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const painPoints = [
  {
    title: "Onzichtbaar in Google",
    description: `Je hebt een mooie website, maar niemand vindt je. Potentiele klanten zoeken naar "${niche} bij mij in de buurt" en vinden alleen je concurrenten.`,
  },
  {
    title: "Concurrenten staan boven jou",
    description: `Andere ${niche}s in jouw regio pakken alle clicks. Ze staan hoger in Google, hebben meer reviews en trekken de klanten weg die eigenlijk bij jou zouden passen.`,
  },
  {
    title: "Te veel betalen voor Google Ads",
    description: `Je gooit elke maand honderden euro's in Google Ads om zichtbaar te blijven. Zodra je stopt met betalen, verdwijn je weer compleet uit de zoekresultaten.`,
  },
];

const steps = [
  {
    icon: BsSearch,
    title: "Keyword Research",
    description: `We onderzoeken waar jouw ideale klanten op zoeken. Van "${niche} [stad]" tot specifieke diensten - we brengen alle kansen in kaart.`,
  },
  {
    icon: BsPencilSquare,
    title: "Content Creatie",
    description: `Onze AI schrijft professionele, SEO-geoptimaliseerde blogartikelen die Google waardeert. Elke maand nieuwe content, automatisch gepubliceerd.`,
  },
  {
    icon: BsGearWideConnected,
    title: "Technische Optimalisatie",
    description: `We zorgen dat je website technisch perfect is: snelle laadtijden, mobile-first, structured data en interne linking voor maximale rankings.`,
  },
];

const features = [
  {
    icon: BsFileEarmarkText,
    title: "Automatische blogartikelen",
    description: `Elke maand verse, relevante content over ${niche}-onderwerpen. Geschreven door AI, gecontroleerd op kwaliteit.`,
  },
  {
    icon: BsGeoAlt,
    title: "Lokale SEO",
    description: `Gevonden worden in jouw regio. We optimaliseren voor lokale zoektermen zodat klanten bij jou in de buurt je vinden.`,
  },
  {
    icon: BsGoogle,
    title: "Google Business optimalisatie",
    description: `Je Google Bedrijfsprofiel volledig geoptimaliseerd voor maximale zichtbaarheid in Google Maps en lokale zoekresultaten.`,
  },
  {
    icon: BsRobot,
    title: "AI-zoekmachine zichtbaarheid",
    description: `Niet alleen Google: ook zichtbaar in ChatGPT, Gemini en andere AI-zoekmachines die steeds vaker worden gebruikt.`,
  },
  {
    icon: BsGraphUpArrow,
    title: "Maandelijkse rapportages",
    description: `Duidelijke rapporten over je rankings, verkeer en groei. Je ziet precies wat er gebeurt en waar de kansen liggen.`,
  },
  {
    icon: BsLink45Deg,
    title: "Interne linking strategie",
    description: `Slimme koppelingen tussen je pagina's zorgen ervoor dat Google je site beter begrijpt en hoger rankt.`,
  },
];

const faqs = [
  {
    question: `Hoe lang duurt het voordat ik resultaat zie van SEO?`,
    answer: `SEO is een investering op de middellange termijn. De eerste verbeteringen zie je meestal na 4-8 weken. Na 3-6 maanden merk je een duidelijke stijging in je Google-posities en het aantal bezoekers. Het mooie is: eenmaal opgebouwde posities blijven lang staan, in tegenstelling tot advertenties die stoppen zodra je stopt met betalen.`,
  },
  {
    question: `Wat kost SEO voor een ${niche}?`,
    answer: `Bij een traditioneel SEO-bureau betaal je al snel \u20AC1.500 tot \u20AC3.000 per maand. Bij ${siteDetails.siteName} zit SEO inbegrepen in je abonnement vanaf \u20AC79 per maand - inclusief blogartikelen, lokale SEO en technische optimalisatie. Geen verborgen kosten.`,
  },
  {
    question: `Moet ik zelf content schrijven?`,
    answer: `Nee, dat hoef je niet. Onze AI schrijft professionele blogartikelen die geoptimaliseerd zijn voor de zoekwoorden waar jouw klanten op zoeken. Je hoeft er zelf niks voor te doen. Wil je zelf ook content aanleveren? Dat kan natuurlijk ook - we verwerken het graag.`,
  },
  {
    question: `Werkt SEO ook voor AI-zoekmachines zoals ChatGPT?`,
    answer: `Ja! Steeds meer mensen gebruiken ChatGPT, Google Gemini en andere AI-tools om een ${niche} te vinden. Onze content is zo geschreven dat je ook in deze AI-antwoorden verschijnt. Zo ben je niet alleen vindbaar in Google, maar ook in de zoekmachines van de toekomst.`,
  },
  {
    question: `Kan ik SEO ook los afnemen?`,
    answer: `SEO zit standaard inbegrepen in onze pakketten. Bekijk onze tarieven op de tarieven-pagina voor alle mogelijkheden. Heb je een specifieke vraag? Plan een gratis adviesgesprek en we kijken samen wat het beste bij jouw situatie past.`,
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

export default function SEOContent() {
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
          >
            SEO voor {niche}s: Gevonden Worden in Google
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Meer klanten via Google, zonder dure advertenties. {siteDetails.siteName} regelt je
            volledige SEO-strategie: van keyword research tot publicatie.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/gratis-scan"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Gratis SEO Scan
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

      {/* Wat is SEO? */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              De basis
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
              Wat is SEO?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                SEO staat voor Search Engine Optimization, oftewel zoekmachineoptimalisatie. Het
                is de kunst en techniek om je website hoger te laten verschijnen in Google wanneer
                potentiele klanten zoeken naar een {niche}. Denk aan zoektermen als &ldquo;{niche}{" "}
                Amsterdam&rdquo; of &ldquo;beste {niche} bij mij in de buurt&rdquo;.
              </p>
              <p>
                In tegenstelling tot Google Ads betaal je bij SEO niet per klik. Je bouwt een
                duurzame online positie op die maanden- tot jarenlang verkeer naar je website
                stuurt. Voor {niche}s is lokale SEO extra belangrijk: de meeste klanten zoeken
                namelijk een {niche} in hun eigen regio. Met de juiste SEO-strategie verschijn
                je bovenaan wanneer het ertoe doet - precies op het moment dat iemand jouw dienst
                nodig heeft.
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
                  {index === 0 ? "👻" : index === 1 ? "📉" : "💸"}
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
              Ons proces
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

      {/* Waarom SEO voor [niche]? */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              Waarom nu starten
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
              Waarom SEO voor {niche}s?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                De meeste klanten beginnen hun zoektocht naar een {niche} in Google. Ze typen
                &ldquo;{niche} [stad]&rdquo; of &ldquo;goede {niche} bij mij in de buurt&rdquo; en
                kiezen uit de eerste resultaten. Als jij daar niet tussen staat, mis je elke dag
                potentiele klanten - klanten die vervolgens naar je concurrent gaan.
              </p>
              <p>
                Het goede nieuws: de meeste {niche}s doen nog geen SEO. Dat betekent dat er
                enorme kansen liggen om jezelf te positioneren als de go-to {niche} in jouw regio.
                Met consistente, kwalitatieve content en lokale optimalisatie kun je binnen enkele
                maanden bovenaan in Google staan. En het mooiste? Eenmaal opgebouwde posities
                blijven lang staan. In tegenstelling tot advertenties is SEO een investering die
                zichzelf blijft terugverdienen, maand na maand.
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
              SEO Bureau vs. {siteDetails.siteName}
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
                Traditioneel SEO Bureau
              </h3>
              <p className="text-4xl font-black text-gray-400 line-through decoration-red-500 decoration-4 mb-6">
                {"\u20AC"}1.500/mo
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Lange contracten (6-12 maanden)",
                  "Maandelijks een handvol blogposts",
                  "Alleen Google, geen AI-zoekmachines",
                  "Rapportages vol jargon",
                  "Extra kosten voor wijzigingen",
                  "Aparte factuur voor lokale SEO",
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
                  "Geen contract, maandelijks opzegbaar",
                  "Automatische blogartikelen elke maand",
                  "Zichtbaar in Google + ChatGPT + Gemini",
                  "Duidelijke, begrijpelijke rapportages",
                  "Alles inbegrepen, geen verborgen kosten",
                  "Lokale SEO standaard inbegrepen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BsCheckCircleFill className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 relative z-10">
                <p className="text-green-400 font-bold bg-green-400/10 inline-block px-4 py-2 rounded-full text-sm">
                  Bespaar meer dan {"\u20AC"}1.400 per maand
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
              Veelgestelde vragen over SEO
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
            className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Klaar om gevonden te worden in Google?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Plan een gratis adviesgesprek van 15 minuten. We analyseren je huidige
                vindbaarheid en laten zien waar de kansen liggen.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://calendly.com/tim-studiolee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg group"
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
