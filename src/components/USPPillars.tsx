"use client";
import React from 'react';
import Link from 'next/link';
import { FiClock, FiGlobe, FiStar, FiTrendingUp } from 'react-icons/fi';
import Container from './Container';
import { motion } from 'framer-motion';

// ⚑ De `pillarLinks` per kaart zijn REDACTIONELE interne links naar de eigen product-pagina's.
// Ze staan hier en niet alleen in de nav/footer omdat een sitewide link op élke pagina staat en
// daarmee niets onderscheidt: gemeten 2026-08-05 droeg de homepage-body van alle 14 niche-sites
// NUL links naar de negen pillars, terwijl 85% van alle impressies op die homepage landde.
// De anchor-teksten komen uit de Anchor Text Library van de brand-MD (references/brands/<MERK>_BRAND.md)
// en worden gezet door alpha1/scripts/patch_niche_homepage_pillar_links.py — pas ze daar aan, niet hier.
// De vierde kaart is het vierde ding uit §PROPOSITIE-CONTRACT ① (niche-sites-upgrade-programma.md);
// een VIJFDE kaart zou ⛔3 zijn.
const pillars = [
    {
        title: "De Omzet Generator",
        subtitle: "(Capture)",
        description: "Mis nooit meer een klus van €500+ omdat je bezig was. Voice AI & SMS vangt elke lead, 24/7.",
        icon: <FiTrendingUp size={32} />,
        pillarLinks: [{ href: "/voice-ai", anchor: "ai telefonist voor hoveniers" }, { href: "/chatbot", anchor: "ai chatbot voor hoveniers" }],
    },
    {
        title: "De Reputatie Bouwer",
        subtitle: "(Authority)",
        description: "Rank beter in Google en AI met onze Content AI. Door slimme artikelen en reviews ben je altijd vindbaar voor nieuwe klanten.",
        icon: <FiStar size={32} />,
        pillarLinks: [{ href: "/seo", anchor: "seo voor hoveniers" }, { href: "/reviews", anchor: "review management voor hoveniers" }],
    },
    {
        title: "De Tijd Bespaarder",
        subtitle: "(Admin)",
        description: "Bespaar 10 uur per week én dure fotografen. De AI beantwoordt vragen, voorkomt no-shows en maakt professionele beelden zonder camera.",
        icon: <FiClock size={32} />,
        pillarLinks: [{ href: "/automatisering", anchor: "workflow automatisering voor hoveniers" }, { href: "/crm", anchor: "crm voor hoveniers" }],
    },
    {
        title: "Je website houdt zichzelf bij",
        subtitle: "(Website)",
        description: "Een echt mooie website die zichzelf bijwerkt. Staat er over een jaar nóg goed bij, zonder dat jij 'm bijhoudt.",
        icon: <FiGlobe size={32} />,
        pillarLinks: [{ href: "/gratis-website", anchor: "gratis website voor hoveniers" }],
    }
];

const USPPillars: React.FC = () => {
    return (
        <section className="py-12 md:py-20 border-b border-gray-100 dark:border-[var(--card-border)]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="flex flex-col items-start p-6 rounded-2xl border border-green-100 dark:border-green-700/30 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 h-full"
                        >
                            <div className="p-3 rounded-xl bg-white dark:bg-[var(--card-background)] shadow-sm mb-4 text-green-600 dark:text-green-500">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-[var(--foreground)] mb-1">
                                {pillar.title}
                            </h3>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[var(--foreground-accent)] mb-3">
                                {pillar.subtitle}
                            </span>
                            <p className="text-gray-700 dark:text-[var(--foreground-accent)] leading-relaxed font-medium">
                                {pillar.description}
                            </p>
                            {pillar.pillarLinks.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-green-200/70 dark:border-green-700/30 w-full flex flex-col gap-1.5">
                                    {pillar.pillarLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 hover:underline underline-offset-4 transition-colors"
                                        >
                                            {link.anchor} &rarr;
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default USPPillars;
