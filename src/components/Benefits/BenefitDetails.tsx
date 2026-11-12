"use client"
import { useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

import BenefitBullet from "./BenefitBullet";
import { IBenefit } from "@/types";

// PROPOSITIE-CONTRACT §① — de homepage toont VIER dingen. De onderdelen waar zo'n ding uit bestaat zijn
// niet weg, ze vouwen hier open: de bezoeker die alleen de propositie wil ziet vier koppen, wie doorleest
// krijgt het volledige materiaal (bullets + beeld/video) van elk onderdeel te zien.

const tierLabel: Record<string, string> = { pro: "Pro", elite: "Volledig uit handen" };

const DetailRow: React.FC<{ detail: IBenefit; isOpen: boolean; onToggle: () => void }> = ({ detail, isOpen, onToggle }) => {
    const { title, description, bullets, imageSrc, videoSrc, tier } = detail;

    return (
        <div className="border-b border-black/10 dark:border-white/10 last:border-b-0">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 md:gap-4 py-4 text-left group"
            >
                <FiChevronDown
                    size={20}
                    className={`shrink-0 text-foreground-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
                <span className="flex-1">
                    <span className="block font-semibold text-foreground group-hover:text-secondary transition-colors">
                        {title}
                        {tier && tier !== "basis" && (
                            <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                                {tierLabel[tier] ?? tier}
                            </span>
                        )}
                    </span>
                    <span className="block mt-0.5 text-sm text-foreground-accent leading-snug">
                        {description}
                    </span>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 pb-8 pl-8 md:pl-9">
                            <div className="flex-1">
                                {bullets.map((item, index) => (
                                    <BenefitBullet key={index} title={item.title} icon={item.icon} description={item.description} />
                                ))}
                            </div>

                            {(imageSrc || videoSrc) && (
                                <div className="w-full max-w-[260px] mx-auto lg:mx-0 shrink-0">
                                    {videoSrc ? (
                                        <div className="relative w-full rounded-[24px] overflow-hidden">
                                            <video
                                                src={videoSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                                width="260"
                                                height="516"
                                            />
                                            <div className="absolute inset-0 shadow-[inset_0_0_20px_-5px_white] pointer-events-none rounded-[24px]" />
                                        </div>
                                    ) : (
                                        <Image src={imageSrc!} alt={title} width="260" height="516" quality={100} className="w-full h-auto" />
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BenefitDetails: React.FC<{ details: IBenefit[] }> = ({ details }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="max-w-4xl mx-auto w-full mt-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-foreground-accent mb-2">
                Wat hier allemaal onder valt
            </p>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 px-4 md:px-6 bg-background/60">
                {details.map((detail, index) => (
                    <DetailRow
                        key={detail.title}
                        detail={detail}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BenefitDetails;
