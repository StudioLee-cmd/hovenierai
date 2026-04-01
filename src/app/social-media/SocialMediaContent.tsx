"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsArrowRight, BsWhatsapp, BsCalendar3, BsBarChart, BsCamera, BsMegaphone, BsPalette, BsGraphUp, BsPeople } from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";
const nicheSingular = niche.endsWith("s") ? niche.slice(0, -1) : niche;
const brand = siteDetails.siteName;

const painPoints = [
  {
    title: "Geen tijd voor social media",
    desc: `Je bent de hele dag bezig met je werk als ${nicheSingular}. Social media erbij doen kost tijd die je niet hebt. Posts worden vergeten of gehaast geplaatst.`,
  },
  {
    title: "Posten zonder strategie",
    desc: "Je plaatst af en toe iets, maar het levert niks op. Geen plan, geen consistentie, geen resultaat. Je volgers groeien niet en klanten komen niet via social media.",
  },
  {
    title: "Geen idee welk platform werkt",
    desc: `Instagram, Facebook, LinkedIn, TikTok — welk platform werkt voor ${niche}? Zonder advies gooi je tijd en energie in het verkeerde kanaal.`,
  },
];

const features = [
  { icon: <BsMegaphone className="text-2xl" />, title: "Social media strategie op maat", desc: `We analyseren je markt, doelgroep en concurrenten en maken een strategie die werkt voor ${niche}. Welke platforms, welke content, hoe vaak — alles uitgedacht.` },
  { icon: <BsCalendar3 className="text-2xl" />, title: "Content planning & kalender", desc: "Een maandelijkse contentkalender met thema's, seizoensgebonden content en afwisseling. Je weet precies wat er wanneer gepost wordt." },
  { icon: <BsCamera className="text-2xl" />, title: "AI-gegenereerde content", desc: "Professionele posts, afbeeldingen en korte video's gegenereerd met AI. Aangevuld met jouw eigen projectfoto's voor een authentiek portfolio." },
  { icon: <BsPalette className="text-2xl" />, title: "Automatisch scheduling", desc: "Content wordt automatisch ingepland en gepost op al je platformen. Facebook, Instagram, LinkedIn — alles vanuit één systeem." },
  { icon: <BsBarChart className="text-2xl" />, title: "Maandelijkse analyse & rapportage", desc: "Elke maand een overzicht van wat werkt en wat niet. Bereik, engagement, groei — en concrete acties om te verbeteren." },
  { icon: <BsPeople className="text-2xl" />, title: "Platform-specifiek advies", desc: `Niet elk platform is hetzelfde. Wij adviseren welke platforms het meest opleveren voor ${niche} en hoe je ze optimaal inzet.` },
  { icon: <BsGraphUp className="text-2xl" />, title: "Portfolio-stijl content", desc: `Jouw afgeronde projecten worden omgezet naar professionele social media content. Van klusfoto naar portfolio-moment — zelfde moeite, dubbel het resultaat.` },
  { icon: <BsCheck2Circle className="text-2xl" />, title: "Brand consistentie", desc: "Elke post past bij je merk. Kleuren, tone of voice, logo — alles consistent. Geen losse flodders meer." },
];

const faqs = [
  { q: "Is het alleen automatisch posten?", a: `Nee. Social media bij ${brand} is veel meer dan automatisch posten. We beginnen met een complete strategie: welke platformen passen bij ${niche}, welke content werkt, hoe vaak posten, en voor welke doelgroep. Daarna voeren we het uit én automatiseren we het. Strategie en consulting zijn inbegrepen in het maandtarief.` },
  { q: "Welke platformen worden ondersteund?", a: "Facebook, Instagram en LinkedIn zijn standaard. TikTok en andere platformen op aanvraag. We adviseren welke platformen het meest opleveren voor jouw situatie — niet elk platform is voor elke branche relevant." },
  { q: "Moet ik zelf content aanleveren?", a: `Het liefst wel projectfoto's — die zijn het meest authentiek en presteren het best. Maar ook zonder eigen foto's kunnen we starten. Onze AI genereert professionele afbeeldingen en video's. Ideaal: jij stuurt af en toe een foto van een klus, wij maken er professionele content van.` },
  { q: "Wat kost social media management bij een bureau?", a: `Een traditioneel social media bureau rekent €600 tot €1.500 per maand voor strategie + uitvoering. Bij ${brand} zit social media management — inclusief strategie, content creatie en automatisch posten — inbegrepen in het platform vanaf €79/maand.` },
  { q: "Zit consulting echt in de prijs?", a: "Ja. Strategie, content planning, platform advies en maandelijkse evaluatie zitten inbegrepen. Geen verborgen uurtarieven, geen extra kosten voor advies. Je krijgt agency-kwaliteit voor een fractie van de prijs." },
];

export default function SocialMediaContent() {
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
            Strategie & Uitvoering
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 !leading-tight"
          >
            Social Media voor {niche}:<br />Strategie & Uitvoering in Één
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent max-w-2xl mx-auto mb-8"
          >
            Niet alleen automatisch posten — wij helpen met de complete social media strategie.
            Content planning, platform keuze, portfolio-content en consulting. Alles inbegrepen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/gratis-scan" className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all">
              Start Gratis
            </a>
            <a href="/tarieven" className="border border-foreground/20 px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all">
              Bekijk Tarieven
            </a>
          </motion.div>
        </div>
      </section>

      {/* What is this - SEO content */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Meer dan alleen automatisch posten</h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Social media voor {niche} draait niet om zo veel mogelijk posts de wereld in slingeren.
              Het draait om de juiste boodschap, op het juiste platform, op het juiste moment. Daar
              begint het: met een strategie die past bij jouw {nicheSingular}sbedrijf en je doelgroep.
            </p>
            <p>
              Bij {brand} krijg je niet alleen een tool die automatisch post. Je krijgt een team dat
              meedenkt over je content strategie, adviseert welke platformen het meest opleveren, en
              een contentkalender maakt die aansluit bij je seizoenen en diensten. De consulting en het
              strategisch advies zitten inbegrepen — geen extra uurtarieven, geen verborgen kosten.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Herken je dit?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            De meeste {niche} worstelen met social media. Niet omdat ze het niet willen, maar omdat het tijd en kennis kost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4 font-bold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-foreground-accent text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Hoe het werkt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Analyse & Strategie", desc: `We analyseren je huidige social media, je concurrenten en je doelgroep. Op basis daarvan maken we een strategie die werkt voor ${niche}.` },
              { step: "2", title: "Content & Planning", desc: "We maken een contentkalender, genereren posts met AI en gebruiken jouw projectfoto's voor authentieke portfolio-content." },
              { step: "3", title: "Uitvoering & Groei", desc: "Content wordt automatisch gepost. Elke maand evalueren we de resultaten en sturen we bij. Jij focust op je werk, wij op je zichtbaarheid." },
            ].map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-foreground-accent text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Wat krijg je?</h2>
          <p className="text-foreground-accent text-center mb-10 max-w-xl mx-auto">
            Strategie, uitvoering én automatisering — alles in één pakket.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-background)]"
              >
                <div className="text-primary flex-shrink-0 mt-1">{f.icon}</div>
                <div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-foreground-accent text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section - SEO body text */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Waarom social media voor {niche}?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              Je klanten zitten op social media. Ze scrollen door Instagram, bekijken Facebook en checken
              LinkedIn. Als jij daar niet zichtbaar bent, vinden ze je concurrent. Maar social media kost
              tijd — tijd die je als {nicheSingular} niet hebt. Je bent de hele dag aan het werk.
            </p>
            <p>
              Daarom nemen wij het over. Niet als een tool die willekeurig post, maar als een partner die
              meedenkt. We kennen de {nicheSingular}sbranche, weten welke content werkt en op welke platformen
              je moet zijn. De strategie en het advies zijn inbegrepen — geen extra kosten. Dat is het verschil
              met een traditioneel bureau dat €600 tot €1.500 per maand rekent voor alleen social media management.
              Bij ons zit het in het pakket.
            </p>
          </div>
        </div>
      </section>

      {/* Bureau Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Social media bureau vs. {brand}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider">Traditioneel bureau</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Social media strategie</span>
                    <span className="font-semibold">€600–1.500/mnd</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Content creatie</span>
                    <span className="font-semibold">€400–800/mnd</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Consulting & advies</span>
                    <span className="font-semibold">€150/uur extra</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-white font-bold">Totaal</span>
                    <span className="text-red-400 font-bold">€1.000–2.500/mnd</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-primary text-sm uppercase tracking-wider">{brand}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Social media strategie</span>
                    <span className="text-green-400 font-semibold">Inbegrepen</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">AI content creatie</span>
                    <span className="text-green-400 font-semibold">Inbegrepen</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">Consulting & advies</span>
                    <span className="text-green-400 font-semibold">Inbegrepen</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-white font-bold">Totaal</span>
                    <span className="text-primary font-bold">Vanaf €79/mnd</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Veelgestelde Vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-[var(--card-border)] rounded-xl">
                <summary className="cursor-pointer p-5 font-semibold flex justify-between items-center">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar voor een social media strategie die werkt?</h2>
          <p className="text-foreground-accent mb-8">
            Begin vandaag met een plan dat past bij jouw {nicheSingular}sbedrijf. Geen verplichtingen, geen druk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/gratis-scan" className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all">
              Start Gratis
            </a>
            <a href="https://calendly.com/tim-studiolee" className="border border-foreground/20 px-8 py-3 rounded-xl font-semibold hover:bg-foreground/5 transition-all inline-flex items-center justify-center gap-2">
              <BsCalendar3 /> Plan een Gesprek
            </a>
            <a href="https://wa.me/31611594862" className="border border-green-500/30 text-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/10 transition-all inline-flex items-center justify-center gap-2">
              <BsWhatsapp /> WhatsApp
            </a>
          </div>
          <p className="text-sm text-foreground-accent mt-6">
            <a href="/tarieven" className="text-primary hover:underline inline-flex items-center gap-1">
              Bekijk alle tarieven <BsArrowRight />
            </a>
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
