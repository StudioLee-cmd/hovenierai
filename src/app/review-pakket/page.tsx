"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header";
import ReviewPricing from "@/components/Review/ReviewPricing";
import { motion } from "framer-motion";
import { BsArrowRight, BsWhatsapp, BsCalendarCheck, BsPen, BsBoxSeam, BsSend } from 'react-icons/bs';

export default function ReviewPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#171717] transition-colors duration-500">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400"
                    >
                        Boost je Online Reputatie
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
                    >
                        Start met het verzamelen van 5-sterren reviews via onze slimme NFC-tools en software.
                        Professioneel ontworpen voor jouw merk.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10"
                >
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
                        <Image
                            src="/images/services/review-pakket-hero.jpg"
                            alt="Review pakket voor hoveniers — NFC kaartjes en software setup"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                    </div>
                </motion.div>

            </section>

            {/* Pricing Section */}
            <ReviewPricing />

            {/* Process Explanation Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 dark:text-[var(--secondary)] font-bold tracking-wider uppercase text-sm">Onze Werkwijze</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                            Van Bestelling tot Review-Magneet
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

                        {[
                            { icon: BsBoxSeam, title: "1. Bestel of Bel", desc: "Bestel direct of plan eerst een gratis adviesgesprek." },
                            { icon: BsSend, title: "2. Upload", desc: "Je ontvangt een mail om je logo en wensen te sturen." },
                            { icon: BsPen, title: "3. Design", desc: "Binnen 7 dagen ontvang je professionele ontwerpen." },
                            { icon: BsWhatsapp, title: "4. Feedback", desc: "Jij geeft akkoord of vraagt aanpassingen." },
                            { icon: BsCheckCircleFill, title: "5. Productie", desc: "Na akkoord starten we productie (+- 1 week)." }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:scale-110 transition-all">
                                    <step.icon size={32} className="text-blue-600 dark:text-[var(--secondary)]" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Workflow image */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
                            <Image
                                src="/images/services/review-pakket-workflow.jpg"
                                alt="Hoveniers eigenaar bekijkt review analytics dashboard"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                            />
                        </div>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                            Zie hoe je reviews-aantal groeit. Elke 5-sterren versterkt je positie in Google Maps en lokale search.
                        </p>
                    </motion.div>
                </div>
            </section>


            
            {/* Section image + cross-links */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-neutral-800/50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl"
                        >
                            <Image
                                src="/images/services/review-pakket-section.jpg"
                                alt="Google Maps search result met 5-sterren rating voor hoveniers"
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
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Waarom 5-sterren je instroom verdubbelen</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                In Google Maps lokale resultaten kiest 87% van de zoekers voor het hoveniers-bedrijf met de meeste en hoogste sterren. Onze NFC-kaartjes en software maken het voor je klanten dood-simpel om een 5-sterren review achter te laten — direct vanaf hun telefoon.
                            </p>
                        </motion.div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-center mb-6 dark:text-white">Combineer met andere AI-tools</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/reviews" className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-neutral-800 hover:border-blue-400 transition-all">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:text-white transition-colors">Reviews Software</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Combineer fysieke NFC-kaartjes met automatische digitale review-verzoeken.</p>
                            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
                        </Link>
                        <Link href="/seo" className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-neutral-800 hover:border-blue-400 transition-all">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:text-white transition-colors">SEO voor Hoveniers</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Reviews voeden je Google Maps ranking — combineer met lokale SEO automatisering.</p>
                            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
                        </Link>
                        <Link href="/automatisering" className="group border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-neutral-800 hover:border-blue-400 transition-all">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:text-white transition-colors">Workflow Automatisering</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Review-verzoek versturen 2u na elke klus, automatisch.</p>
                            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Free Consult CTA Section */}
            <section className="py-20 bg-white dark:bg-[#171717]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-orange-600 dark:to-orange-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Twijfel je welk pakket het beste is?
                            </h2>
                            <p className="text-lg text-blue-100 dark:text-orange-100 mb-8 max-w-2xl mx-auto">
                                Plan een gratis strategie gesprek van 15 minuten. We kijken samen wat voor jouw situatie de meeste reviews gaat opleveren.
                            </p>

                            <a
                                href="https://cal.com/studiolee"
                                target="_blank"
                                className="inline-flex items-center gap-3 bg-white text-blue-700 dark:text-orange-700 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg group"
                            >
                                <BsCalendarCheck size={20} />
                                Plan Gratis Consult
                                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

// Helper for icon import in map
import { BsCheckCircleFill } from 'react-icons/bs';
