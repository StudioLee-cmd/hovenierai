"use client";
import React, { useState } from 'react';


import { heroDetails } from '@/data/hero';
import Highlight from './Highlight';
import VoiceDemo from './VoiceDemo';
import FreeTrialModal from './FreeTrialModal';
import LightRays from './LightRays';
import { motion, useScroll, useTransform } from 'framer-motion';
import RotatingText from './RotatingText';

const Hero: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollY } = useScroll();

    // Scroll animations
    const xLeft = useTransform(scrollY, [0, 400], [0, -150]);
    const xRight = useTransform(scrollY, [0, 400], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5 overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>

            </div>

            <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#F59E0B"
                    raysSpeed={3}
                    lightSpread={0.15}
                    rayLength={0.6}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    pulsating={true}
                    fadeDistance={1}
                    saturation={1}
                    style={{ opacity: 0.1 }}
                />
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[var(--hero-gradient-via)] to-[var(--hero-gradient-to)]">
            </div>

            <div className="text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-7xl md:leading-tight font-extrabold font-heading text-foreground max-w-lg md:max-w-5xl mx-auto">
                        <motion.span
                            style={{ x: xLeft, opacity, display: 'inline-block' }}
                            className="mr-2"
                        >
                            De grootste kans voor&nbsp;<Highlight color="primary">hoveniers</Highlight>
                        </motion.span>
                        <br className="hidden md:block" />
                        <motion.span
                            style={{ x: xRight, opacity, display: 'inline-block' }}
                        >
                            sinds de uitvinding van de
                        </motion.span>
                        <br className="hidden md:block" />
                        <motion.span
                            style={{ x: xLeft, opacity, display: 'inline-block' }}
                        >
                            <Highlight color="secondary">grasmaaier</Highlight>.
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ opacity, scale }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-lg text-foreground/80 max-w-lg mx-auto font-medium"
                >
                    {heroDetails.subheading}
                </motion.p>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center mt-10"
                >
                    <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold">

                        <RotatingText
                            texts={[
                                'Meer Opdrachten 🌿',
                                'Alles-in-1 Systeem ✨',
                                'Nooit Meer Gemiste Oproepen 📞',
                                'Professionele Offertes 📋',
                                'Ondernemen Zonder Zorgen 🚀',
                                'Jouw Bedrijf in je Broekzak 📱',
                                'Jouw AI Receptioniste 🤖',
                                'Administratie op Orde 📂',
                                'Geen Gedoe Met Facturen 🧾',
                                'Alle Tools in 1 App 📱',
                                'Meer Vrijheid, Minder Stress 🧘',
                                'Klanten & AI in 1 Systeem 🤝',
                                'Volgeboekte Agenda 📈',
                                'Groei Zonder Gedoe 🚀',
                            ]}
                            mainClassName="px-2 sm:px-3 bg-[#0EA5E9] text-white overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg shadow-md"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={3000}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center min-w-[205px] px-8 h-14 rounded-full text-black bg-primary text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl hover:ring-4 ring-primary/20"
                        >
                            Start Gratis
                        </button>
                        <VoiceDemo />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    className="light-video-blend"
                >
                    <div className="relative mt-12 md:mt-16 mx-auto flex justify-center px-4">
                        <video
                            src="/videos/hero-left.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full max-w-[300px]"
                        />
                    </div>
                </motion.div>
            </div>

            <FreeTrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isAnnual={false} />
        </section >
    );
};

export default Hero;
