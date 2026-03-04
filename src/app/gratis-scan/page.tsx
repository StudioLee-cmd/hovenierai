"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/Header";
import { siteDetails } from '@/data/siteDetails';
import { motion, AnimatePresence } from "framer-motion";
import { BsGlobe, BsPerson, BsEnvelope, BsCheckCircleFill } from "react-icons/bs";

// Separate component to handle search params securely within Suspense
const ScanForm = ({ onStartScan }: { onStartScan: (data: any) => void }) => {
    const searchParams = useSearchParams();

    // State for form fields
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [email, setEmail] = useState('');
    const [struggles, setStruggles] = useState('');
    const [error, setError] = useState('');

    // Pre-fill effect
    useEffect(() => {
        if (searchParams) {
            const pName = searchParams.get('firstName');
            const pWebsite = searchParams.get('website');
            const pEmail = searchParams.get('email');

            if (pName) setName(pName);
            if (pWebsite) setWebsite(pWebsite);
            if (pEmail) setEmail(pEmail);
        }
    }, [searchParams]);

    const handleSurpriseMe = () => {
        setStruggles("Ik weet niet precies wat ik nodig heb, maar ik wil graag zien waar de kansen liggen en hoe jullie mij kunnen helpen.");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!name || !website || !email) {
            setError("Vul alle verplichte velden in.");
            return;
        }

        // Website validation (must have a dot)
        if (!website.includes('.') || website.length < 4) {
            setError("Voer een geldige website URL in (bijv. jouwbedrijf.nl).");
            return;
        }

        onStartScan({ name, website, email, struggles });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Naam <span className="text-red-500">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BsPerson className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        required
                        placeholder="Hoe wil je genoemd worden?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website URL <span className="text-red-500">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BsGlobe className="text-gray-400" />
                    </div>
                    <input
                        type="url"
                        required
                        placeholder="https://jouwwebsite.nl"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    *Controleer of dit de juiste website is voor de analyse.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail <span className="text-red-500">*</span></label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BsEnvelope className="text-gray-400" />
                    </div>
                    <input
                        type="email"
                        required
                        placeholder="jouw@email.nl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Waar loop je nu tegenaan?
                </label>
                <textarea
                    rows={3}
                    placeholder="Ik heb te weinig tijd voor..."
                    value={struggles}
                    onChange={(e) => setStruggles(e.target.value)}
                    className="block w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button
                    type="button"
                    onClick={handleSurpriseMe}
                    className="text-sm text-blue-600 dark:text-[var(--secondary)] hover:text-blue-800 dark:hover:text-orange-400 mt-2 font-medium flex items-center gap-1"
                >
                    ✨ Ik weet het niet, verras mij maar
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-[var(--secondary)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-blue-500 dark:hover:bg-orange-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
            >
                🚀 START SCAN & STUUR RAPPORT
            </button>
        </form>
    );
};


export default function GratisScanPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const startScan = async (data: any) => {
        setIsModalOpen(true);
        try {
            await fetch('https://n8n.aireclamestudio.nl/webhook/free-scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, niche: siteDetails.siteName }),
            });
        } catch (err) {
            console.error('Webhook error:', err);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#171717] transition-colors duration-500">
            <Header />

            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Gratis AI & SEO Scan
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We brengen in kaart hoe je scoort ten opzichte van concurrenten, waar je kansen laat liggen en hoe ons systeem je direct vooruit helpt.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                        <Suspense fallback={<div className="text-center py-10">Laden...</div>}>
                            <ScanForm onStartScan={startScan} />
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* Waiting Room Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
                        >
                            {/* Header */}
                            <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        AI is je website aan het analyseren...
                                    </h3>
                                    <p className="text-blue-100 text-sm mt-1">Dit duurt ongeveer 1 minuut. Bekijk ondertussen de video.</p>
                                </div>
                            </div>

                            {/* Video Container */}
                            <div className="aspect-video bg-black relative">
                                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                                    {/* Placeholder for Video */}
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/3RaBKCJdLMA?autoplay=1&mute=1"
                                        title="Waiting Room Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                                <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                                    "Terwijl de AI je site analyseert: Hoe dit systeem werkt."
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-sm underline"
                                >
                                    Sluiten (Dev Only)
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main >
    );
}
