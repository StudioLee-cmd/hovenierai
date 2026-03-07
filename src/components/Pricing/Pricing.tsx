"use client";
import Link from "next/link";
import React, { useState } from 'react';
import { BsCheckCircleFill, BsStars } from "react-icons/bs";
import PricingColumn from "./PricingColumn";
import FreeTrialModal from "../FreeTrialModal";
import PurchaseOptionsModal from "../PurchaseOptionsModal";
import GuaranteeSection from "./GuaranteeSection";
import { tiers } from "@/data/pricing";
import { IPricing } from "@/types";

import { motion, useScroll, useTransform } from "framer-motion";

const UnlimitedOptionBlock = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to shine position (moves from left to right as you scroll down)
    const shineX = useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-12 cursor-pointer relative z-20"
        >
            <a href="/#credit-pricing" className="block relative group overflow-hidden rounded-3xl">
                {/* Scroll-Linked Shine */}
                <motion.div
                    style={{ left: shineX }}
                    className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] z-10 pointer-events-none"
                />

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1 rounded-3xl shadow-xl transition-transform hover:scale-[1.01] duration-300">
                    <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden h-full">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                        <div className="relative z-10 flex-1 text-center md:text-left">
                            <h3 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-2 flex items-center justify-center md:justify-start gap-3">
                                🚀 Unlimited Option
                            </h3>
                            <p className="text-gray-700 font-medium text-lg mb-2">
                                Upgrade naar onbeperkt gebruik van <strong>Voice AI en alle workflows</strong>.
                            </p>
                            <p className="text-xs text-gray-400 italic max-w-2xl leading-relaxed">
                                *Kan op elk moment wijzigen. Exclusief de premium-versies van de AI's (Credits). Bevat wel alle standaard tools voor dagelijks gebruik.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center md:items-end flex-shrink-0">
                            <div className="text-3xl lg:text-4xl font-extrabold text-blue-900">
                                € 197,-
                            </div>
                            <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">p/m extra</div>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};




import Cubes from "../Cubes";

const Pricing: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [selectedOptionTier, setSelectedOptionTier] = useState<IPricing | null>(null);

    const handleShowOptions = (tier: IPricing) => {
        setSelectedOptionTier(tier);
        setIsOptionsModalOpen(true);
    };

    // Full Service Tier (Index 3)
    const fullServiceTier = tiers[3];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Cubes Background - Full Width & Height of this section */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <Cubes
                    rows={12}
                    columns={20}
                    maxAngle={45}
                    radius={5}
                    borderStyle="1px solid #cbd5e1"
                    faceColor="rgba(30, 41, 59, 0.02)"
                    rippleColor="#3B82F6"
                    rippleSpeed={1.0}
                    autoAnimate={true}
                    rippleOnClick={true}
                    shadow={false}
                />
            </div>

            {/* Content Container - Centered and Constrained */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 space-y-12 py-12">

                {/* Toggle Switch */}
                <div className="flex justify-center items-center gap-4 mb-8">
                    <span className={`text-lg font-medium ${!isAnnual ? 'text-foreground' : 'text-gray-400'}`}>Kwartaal</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${isAnnual ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                        <motion.div
                            className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md"
                            animate={{ x: isAnnual ? 32 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-lg font-medium ${isAnnual ? 'text-foreground' : 'text-gray-400'}`}>
                        Jaarlijks
                        <span className="ml-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                            Beste Keus
                        </span>
                    </span>
                </div>

                {/* Signing Bonus Banner */}
                {isAnnual && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm max-w-2xl text-center">
                            <span className="text-xl">🎁</span>
                            <p className="font-medium">
                                <strong>Signing Bonus:</strong> 500 gratis bonus credits (1 jaar geldig) bij alle jaarplannen!
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Top 3 Tiers */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {tiers.slice(0, 3).map((tier, index) => (
                        <motion.div key={tier.name} variants={itemVariants} className="h-full">
                            <PricingColumn
                                tier={tier}
                                highlight={index === 2} // Highlight Elite
                                isAnnual={isAnnual}
                                onStartTrial={() => setIsModalOpen(true)}
                                onShowOptions={() => handleShowOptions(tier)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Unlimited Option Add-on */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    className="max-w-4xl mx-auto mt-8 cursor-pointer relative z-20"
                >
                    <a href="/#credit-pricing" className="block relative group">
                        {/* Shine Effect Container */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden z-10 pointer-events-none">
                            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--secondary)]/40 to-transparent skew-x-[-15deg] animate-[shine_3s_infinite]" />
                        </div>

                        <div className="bg-gradient-to-r from-[var(--secondary)] via-orange-500 to-[var(--secondary)] bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite] p-[2px] rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                            <div className="bg-[var(--card-background)] rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden h-full">

                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--secondary)]/20 rounded-full filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

                                <div className="relative z-10 flex-1 text-center md:text-left">
                                    <h3 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--secondary)] to-orange-400 mb-2 flex items-center justify-center md:justify-start gap-3">
                                        🚀 Unlimited Option
                                        <span className="hidden sm:inline-block text-xs font-bold text-white bg-[var(--secondary)] px-3 py-1 rounded-full shadow-md group-hover:bg-orange-500 transition-colors">
                                            Populair
                                        </span>
                                    </h3>
                                    <p className="text-[var(--foreground-accent)] font-medium text-lg mb-2">
                                        Upgrade naar onbeperkt gebruik van <strong className="text-[var(--foreground)]">Voice AI en alle workflows</strong>.
                                    </p>
                                    <p className="text-xs text-[var(--foreground-accent)] italic max-w-2xl leading-relaxed">
                                        *Kan op elk moment wijzigen. Exclusief de premium-versies van de AI's (Credits). Bevat wel alle standaard tools voor dagelijks gebruik.
                                    </p>
                                </div>

                                <div className="relative z-10 flex flex-col items-center md:items-end flex-shrink-0 bg-[var(--secondary)]/10 px-6 py-4 rounded-xl border border-[var(--secondary)]/30 group-hover:bg-[var(--secondary)]/20 transition-colors">
                                    <div className="text-3xl lg:text-4xl font-extrabold text-[var(--secondary)]">
                                        € 197,-
                                    </div>
                                    <div className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wide">p/m extra</div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <style jsx>{`
                    @keyframes shine {
                        0% { transform: translateX(0%); }
                        20% { transform: translateX(400%); }
                        100% { transform: translateX(400%); }
                    }
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>
                </motion.div>

                {/* Agency Tier */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 lg:p-12 border border-yellow-500/30 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/50 uppercase tracking-wider">
                                VIP Service
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <BsStars className="text-yellow-400" size={32} />
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white">{fullServiceTier.name}</h3>
                                </div>
                                <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                                    {fullServiceTier.focus}
                                </p>

                                <div className="mb-6 inline-block bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-3 py-1 rounded border border-yellow-500/20">
                                    Alles uit Elite + Maatwerk
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-8">
                                    {fullServiceTier.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-200">
                                            <BsCheckCircleFill className="text-yellow-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-gray-400 mb-2">Vanaf prijs</p>
                                <p className="text-4xl lg:text-5xl font-black text-white mb-6">
                                    € {fullServiceTier.priceMonthly},-
                                </p>
                                <p className="text-gray-500 text-sm mb-6">per maand (ex. btw)</p>
                                <Link href="https://calendly.com/tim-studiolee" target="_blank" className="inline-block w-full md:w-auto bg-yellow-500 text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20">
                                    Boek een Demo Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Guarantee Section */}
                <GuaranteeSection />

                <FreeTrialModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isAnnual={isAnnual}
                />

                <PurchaseOptionsModal
                    isOpen={isOptionsModalOpen}
                    onClose={() => setIsOptionsModalOpen(false)}
                    tier={selectedOptionTier}
                    isAnnual={isAnnual}
                />
            </div>
        </div>
    )
}

export default Pricing