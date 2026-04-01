"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsArrowRight, BsWhatsapp, BsCalendar3 } from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const plans = [
  {
    name: "Gratis Website Design",
    price: "€0",
    period: "",
    description: `Wij maken een volledig nieuw website design voor jouw ${nicheSingular}sbedrijf. Gratis, geen verplichtingen.`,
    features: [
      "Professioneel website design op maat",
      "Live preview op eigen link",
      "Binnen 48 uur klaar",
      "SEO-geoptimaliseerd",
      "Bestanden zijn van jou",
    ],
    cta: "Vraag Gratis Design Aan",
    ctaLink: "/gratis-website",
    highlight: false,
    badge: "Gratis",
  },
  {
    name: "Website Kopen",
    price: "€800",
    period: "eenmalig",
    description: "Je eigen professionele website, volledig op maat gebouwd. Inclusief hosting en onderhoud.",
    features: [
      "Volledig op maat gebouwd",
      "SEO-geoptimaliseerd",
      "Mobiel-vriendelijk design",
      "€200/jaar hosting + onderhoud + blogs",
      "Geen abonnement nodig",
      "Eenmalige investering",
    ],
    cta: "Website Aanvragen",
    ctaLink: "/gratis-website",
    highlight: false,
    badge: "Populair",
  },
  {
    name: "AI Platform (25-in-1)",
    price: "€79",
    period: "/maand",
    description: `Het complete AI-systeem voor ${niche}. Chatbot, Voice AI, SEO, reviews, social media en meer — alles in één platform.`,
    features: [
      "25 tools in 1 platform",
      "AI Chatbot (24/7 leads opvangen)",
      "Voice AI Telefonist",
      "SEO & Blog Automatisering",
      "Review Management",
      "Social Media Planner & AI",
      "CRM & Klantbeheer",
      "Maandelijks opzegbaar",
    ],
    cta: "Start Gratis",
    ctaLink: "/gratis-scan",
    highlight: true,
    badge: "Beste Waarde",
  },
];

const customOptions = [
  {
    name: "One-Time Build",
    price: "Vanaf €1.000",
    description: "Volledig custom gebouwd. Eenmalige investering, geen maandelijkse kosten. Betaal alleen voor gebruik (Vapi/OpenAI).",
    cta: "Vraag Offerte Aan",
    ctaLink: "https://calendly.com/tim-studiolee",
  },
  {
    name: "Managed Service",
    price: "Op aanvraag",
    description: "Volledige ontzorging inclusief strategie, consulting en uitvoering. Agency-kwaliteit voor een fractie van de prijs.",
    cta: "Neem Contact Op",
    ctaLink: "https://calendly.com/tim-studiolee",
  },
];

const faqs = [
  {
    q: "Is het gratis website design echt gratis?",
    a: "Ja, 100% gratis en zonder verplichtingen. Wij maken een professioneel website design op maat voor jouw bedrijf. Je ontvangt een live preview link binnen 48 uur. Bevalt het? Dan kun je de website kopen voor €800. Niet tevreden? Geen kosten.",
  },
  {
    q: "Kan ik alleen de website kopen zonder abonnement?",
    a: "Absoluut. De website kost €800 eenmalig plus €200 per jaar voor hosting, onderhoud en blogs. Geen maandelijks abonnement nodig. Wil je later alsnog het AI-platform? Dan kun je dat altijd toevoegen.",
  },
  {
    q: "Wat zit er allemaal in het €79/maand platform?",
    a: `Het complete 25-in-1 AI-platform: AI chatbot, Voice AI telefonist, SEO automatisering, blog AI, social media planner en AI, review management, CRM, facturatie, werkplanning, e-mail automatisering en meer. Alles wat je nodig hebt om je ${nicheSingular}sbedrijf te laten groeien.`,
  },
  {
    q: "Hoe verschilt dit van een traditioneel bureau?",
    a: "Een traditioneel marketing bureau rekent €1.500 tot €3.000+ per maand en bedient vooral bedrijven met €1M+ omzet. Wij leveren dezelfde kwaliteit — strategie, consulting én uitvoering — maar voor een tiende van de prijs. Toegankelijk voor elk bedrijf vanaf €10K omzet.",
  },
  {
    q: "Is er een contract of opzegtermijn?",
    a: "Nee. Het AI platform is maandelijks opzegbaar. Geen contract, geen opzegtermijn, geen kleine lettertjes. Je blijft omdat het werkt, niet omdat je vastzit.",
  },
  {
    q: "Wat kost de managed service?",
    a: "De managed service is op maat. Prijs hangt af van je wensen en het pakket. Plan een gratis gesprek in via Calendly en we bespreken wat het beste bij jouw situatie past. Consulting en strategie zijn altijd inbegrepen — geen verborgen uurtarieven.",
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
            Transparante Prijzen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Tarieven — {brand}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto"
          >
            Van gratis website design tot volledige ontzorging. Geen verborgen kosten, geen verrassingen. Kies wat bij jouw {nicheSingular}sbedrijf past.
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
            <p className="text-sm text-gray-300 mt-2">Agency-kwaliteit. Inclusief strategie & consulting. Voor elk bedrijf.</p>
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
              href="https://calendly.com/tim-studiolee"
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
