"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsGlobe, BsPerson, BsEnvelope, BsTelephone, BsGeoAlt, BsCheckCircleFill, BsArrowRight } from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";

const niche = siteDetails.niche || "Bedrijven";
const nicheLower = niche.toLowerCase();
const nicheSingular = nicheLower.endsWith("s") ? nicheLower.slice(0, -1) : nicheLower;
const brand = siteDetails.siteName;

const WEBHOOK_URL = "https://n8n.aireclamestudio.nl/webhook/freewebsite";

export default function GratisWebsiteContent() {
  const [formData, setFormData] = useState({
    clientName: "", domain: "", contactName: "", email: "", phone: "", city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.clientName || !formData.domain || !formData.contactName || !formData.email) {
      setError("Vul alle verplichte velden in.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { ...formData, niche };
      const res = await fetch(WEBHOOK_URL, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Verzenden mislukt");
      setIsSubmitted(true);
    } catch {
      setError("Er ging iets mis. Mail tim@studiolee.nl en ik help je direct.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: "Is het echt gratis?", a: "Ja. Je krijgt het complete ontwerp met je eigen naam en plaats erin, plus een live preview op een eigen link. Geen kosten, geen voorwaarden, geen proefperiode die stiekem doorloopt." },
    { q: "Kan ik het bestand krijgen?", a: "Ja. De website bestanden zijn van jou. Vraag het aan en we sturen ze door." },
    { q: "Wat krijg ik dan níét gratis?", a: "Het draaiend krijgen en houden: live zetten, gevonden worden, teksten die blijven komen, iemand die opneemt. Dát is het werk, en dat zit in het abonnement vanaf €79 per maand. Een website die stilstaat levert niets op." },
    { q: "Wat kost het als ik het los zou regelen?", a: "Meer. Iemand voor je telefoon en je planning, iemand voor je marketing, iemand voor je vindbaarheid, plus de losse abonnementen: bij elkaar loopt dat flink op. Bij ons zit het in één rekening, en die is lager dan die onderdelen los bij elkaar. Vergelijk dus de rekening, niet de onderdelen." },
    { q: "Hoe snel is het klaar?", a: "Meestal binnen 48 uur, uiterlijk binnen een week. Je ontvangt een live link naar je ontwerp. Aanmelden zelf kost je minder dan een minuut: naam, plaats en hoe we je kunnen bereiken." },
    { q: "Moet ik al een website hebben?", a: "Nee, ook als je nog geen website hebt kunnen wij een design maken. We vragen alleen je bedrijfsnaam en wat informatie over je diensten." },
  ];

  return (
    <main className="pt-24 md:pt-32">
      {/* Hero + Form */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Copy */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-green-500/10 text-green-500 text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              >
                100% Gratis — Geen Verplichtingen
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 !leading-tight"
              >
                Gratis Website Design voor {niche}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-foreground-accent mb-6"
              >
                Wij maken een volledig nieuw website design op maat voor jouw {nicheSingular}sbedrijf.
                Met moderne animaties, SEO optimalisatie en een live preview link. Meestal binnen 48 uur klaar.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 mb-8"
              >
                {["Live preview op eigen link", "SEO-geoptimaliseerd", "Professioneel design op maat", "Bestanden zijn van jou"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <BsCheckCircleFill className="text-green-500 flex-shrink-0" />
                    <span className="text-foreground-accent">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Pricing after */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl p-5"
              >
                <p className="font-semibold mb-3">En daarna? Jij kiest:</p>
                <div className="space-y-2 text-sm text-foreground-accent">
                  <div className="flex justify-between">
                    <span>Laten draaien: live gezet, gevonden worden, telefoon die opneemt</span>
                    <span className="font-semibold text-primary">€79/mnd</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--card-border)] pt-2 mt-2">
                    <span>Of de site afkopen, en 'm daarna zelf stil laten staan</span>
                    <span className="font-semibold text-foreground">€800</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-accent mt-3">
                  Alles inbegrepen kost minder dan die onderdelen los bij elkaar.
                </p>
                <a href="/tarieven" className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-3 hover:underline">
                  Bekijk alle tarieven <BsArrowRight />
                </a>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <BsCheckCircleFill className="text-green-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Aanvraag ontvangen!</h3>
                    <p className="text-foreground-accent mb-6">
                      We gaan direct voor je aan de slag. Je ontvangt je website design binnen 48 uur.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold mb-1">Vraag je gratis design aan</h3>
                    <p className="text-sm text-foreground-accent mb-4">Duurt minder dan een minuut</p>

                    {error && <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg">{error}</div>}

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Bedrijfsnaam <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <BsPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                        <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder={`Bijv. ${niche === "Kappers" ? "Kapsalon Stijl" : "Jouw Bedrijf"}`} className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Website URL <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <BsGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                        <input name="domain" value={formData.domain} onChange={handleChange} placeholder="https://jouwwebsite.nl" type="url" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Jouw naam <span className="text-red-500">*</span></label>
                        <input name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Voornaam Achternaam" className="w-full px-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">E-mail <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="email" value={formData.email} onChange={handleChange} placeholder="jouw@email.nl" type="email" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Telefoon</label>
                        <div className="relative">
                          <BsTelephone className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12345678" type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Stad</label>
                        <div className="relative">
                          <BsGeoAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="city" value={formData.city} onChange={handleChange} placeholder="Bijv. Amsterdam" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-black py-3.5 rounded-xl font-bold hover:bg-primary-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Bezig met verzenden..." : "Vraag Gratis Design Aan"}
                    </button>

                    <p className="text-xs text-foreground-accent text-center">
                      100% gratis · Geen verplichtingen · Meestal binnen 48 uur
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-5xl mx-auto mt-16 px-4"
        >
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-2xl">
            <Image
              src="/images/services/gratis-website-hero.jpg"
              alt="Gratis website voor hoveniers — laptop met website design"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </motion.div>

      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Hoe het werkt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Naam, plaats, en hoe we je bereiken", desc: "Meer vragen we niet. Minder dan een minuut werk, geen account, geen betaalgegevens." },
              { step: "2", title: "Wij zetten jouw gegevens in het ontwerp", desc: "Je hoeft zelf niets in te richten. Wij kijken naar je huidige site en je omgeving en maken het ontwerp klaar." },
              { step: "3", title: "Je krijgt meteen een live link plus het bestand", desc: "Binnen 48 uur staat je ontwerp online op een eigen link en is het bestand van jou. Wil je 'm ook echt laten draaien, dan begint dat bij €79 per maand." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-foreground-accent text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 max-w-5xl mx-auto"
          >
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-xl">
              <Image
                src="/images/services/gratis-website-workflow.jpg"
                alt="Top-down flat-lay van hovenier website ontwerpproces met wireframe schetsen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <p className="text-center text-sm text-foreground-accent mt-3 max-w-2xl mx-auto">
              Eerst gratis preview — geen wireframe-fase, geen wekenlange offertes. Wij ontwerpen, jij beoordeelt.
            </p>
          </motion.div>

      </section>

      {/* Why free section - SEO content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Waarom bieden wij gratis website designs aan voor {niche}?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              De meeste {niche} hebben geen website, of een verouderde site die niet gevonden wordt in Google.
              Een traditioneel webbureau rekent al snel €3.000 tot €10.000 voor een nieuwe website — dat is voor
              veel {niche} simpelweg niet haalbaar.
            </p>
            <p>
              Wij geloven dat elk {nicheSingular}sbedrijf een professionele online aanwezigheid verdient, ongeacht
              het budget. Daarom is het ontwerp gratis en is het bestand van jou. Je ziet precies hoe je nieuwe
              website eruitziet voordat je een cent uitgeeft.
            </p>
            <p>
              Wat wij niet weggeven is het draaiend krijgen: live zetten, gevonden worden, teksten die blijven
              komen, en iemand die opneemt als jij je handen niet vrij hebt. Een website die stilstaat levert
              niets op. Dat werk zit in het abonnement vanaf €79 per maand, en dat is minder dan wat die
              onderdelen los bij elkaar kosten.
            </p>
          </div>
        </div>
      </section>

      
      {/* Section image + cross-links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-xl"
            >
              <Image
                src="/images/services/gratis-website-section.jpg"
                alt="Hoveniers eigenaar bekijkt nieuwe website preview op tablet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Een website die nieuwe klanten oplevert</h2>
              <p className="text-foreground-accent leading-relaxed">Voor hoveniers draait de website om één ding: een klant zoekt online, vindt je site, en boekt direct — of belt. Wij ontwerpen websites met duidelijke CTAs, werkgebied-vermelding en directe boekings-optie. Live preview binnen 48 uur, en het bestand is van jou. Laten draaien vanaf €79 per maand.</p>
            </motion.div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Combineer met andere AI-tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/chatbot" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">AI Chatbot</h3>
                <p className="text-foreground-accent text-sm mb-3">Vangt website-bezoekers op die liever typen dan bellen. Direct boekbaar via chat.</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
              </Link>
              <Link href="/seo" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">SEO voor Hoveniers</h3>
                <p className="text-foreground-accent text-sm mb-3">Een SEO-geoptimaliseerde site is alleen het begin — combineer met lokale SEO automatisering.</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
              </Link>
              <Link href="/voice-ai" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Voice AI Telefonist</h3>
                <p className="text-foreground-accent text-sm mb-3">Vangt telefoontjes op die via je nieuwe website binnenkomen. 24/7 bereikbaar.</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
              </Link>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Vraag nu je gratis design aan</h2>
          <p className="text-foreground-accent mb-8">
            Vul het formulier bovenaan in en ontvang je nieuwe website design binnen 48 uur. Gratis, vrijblijvend.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all inline-block"
          >
            Naar het formulier ↑
          </a>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question", name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
