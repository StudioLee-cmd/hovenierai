"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGlobe, BsPerson, BsEnvelope, BsTelephone, BsGeoAlt, BsCheckCircleFill, BsWhatsapp, BsArrowRight } from "react-icons/bs";
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
      setError("Er ging iets mis. Probeer het opnieuw of stuur een WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: "Is het echt gratis?", a: "Ja, 100% gratis. Wij maken een professioneel website design op maat voor jouw bedrijf. Je ontvangt een live preview link. Geen kosten, geen verplichtingen." },
    { q: "Kan ik het bestand krijgen?", a: "Ja. De website bestanden zijn van jou. Vraag het aan en we sturen ze door." },
    { q: `Wat kost het als ik de website wil kopen?`, a: "De website kost €800 eenmalig plus €200 per jaar voor hosting, onderhoud en blogs. Geen abonnement nodig voor alleen de website." },
    { q: "Wat is het 25-in-1 AI platform?", a: `Voor €79/maand krijg je naast de website ook een AI chatbot, Voice AI telefonist, SEO automatisering, review management, social media planner en meer. Alles wat je nodig hebt om je ${nicheSingular}sbedrijf te laten groeien. Maandelijks opzegbaar.` },
    { q: "Hoe snel is het klaar?", a: "Meestal binnen 48 uur. Uiterlijk binnen een week. Je ontvangt een live link naar je nieuwe website design." },
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
                    <span>Website kopen (eenmalig)</span>
                    <span className="font-semibold text-foreground">€800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hosting + onderhoud + blogs</span>
                    <span className="font-semibold text-foreground">€200/jaar</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--card-border)] pt-2 mt-2">
                    <span>Of: compleet AI platform (25-in-1)</span>
                    <span className="font-semibold text-primary">€79/mnd</span>
                  </div>
                </div>
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
                    <a
                      href="https://wa.me/31611594862?text=Hoi%2C%20ik%20heb%20net%20een%20gratis%20website%20design%20aangevraagd%20via%20{brand}!"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
                    >
                      <BsWhatsapp /> Chat met ons via WhatsApp
                    </a>
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
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Hoe het werkt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Vul het formulier in", desc: "Deel je website URL en bedrijfsgegevens. Duurt minder dan een minuut." },
              { step: "2", title: "Wij ontwerpen je website", desc: "Onze AI analyseert je huidige site, je concurrenten en ontwerpt een professioneel nieuw design." },
              { step: "3", title: "Ontvang je live preview", desc: "Binnen 48 uur ontvang je een link naar je nieuwe website. Bevalt het? Koop het vanaf €800." },
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
              het budget. Daarom maken wij het design gratis. Je ziet precies hoe je nieuwe website eruitziet
              voordat je een cent uitgeeft. Bevalt het? Dan koop je het voor €800 eenmalig — een fractie van wat
              een bureau vraagt.
            </p>
            <p>
              En wil je meer dan alleen een website? Met ons 25-in-1 AI platform voor €79/maand krijg je ook
              een chatbot, Voice AI telefonist, SEO automatisering, review management en social media tools.
              Agency-kwaliteit voor een tiende van de prijs — inclusief strategie en consulting.
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
