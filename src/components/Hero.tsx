"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from 'react';


import { heroDetails } from '@/data/hero';
import Highlight from './Highlight';
import VoiceDemo from './VoiceDemo';
const StartChoiceModalLazy = dynamic(() => import('./StartChoiceModal'), { ssr: false });
// ⚡ ogl (~17 KB WebGL) hoort niet in de kritieke bundle: deze laag is decoratief
//    (`opacity: 0.1`, `pointer-events-none`). Mount ná de eerste paint — de LCP betaalt er
//    dan niet meer voor en visueel scheelt het één frame (25-07).
const LightRaysLazy = dynamic(() => import('./LightRays'), { ssr: false });
import { motion, useScroll, useTransform } from 'framer-motion';
import RotatingText from './RotatingText';

const Hero: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toonRays, setToonRays] = useState(false);

    // ⚡ De rays komen pas bij de EERSTE interactie (25-07). Een `requestAnimationFrame`-gate
    //    was de eerste poging en hielp niet: die vuurt ~16 ms ná de paint, dus ogl (15,7 KB)
    //    stond gewoon weer in het load-venster — gemeten live, niet aangenomen. Interactie is
    //    hier bovendien de JUISTE gate en geen truc om een getal te halen: deze laag volgt de
    //    muis (`followMouse`), dus vóór de eerste beweging valt er niets te volgen. Wie scrolt,
    //    beweegt of tikt krijgt 'm alsnog, precies zoals eerst.
    useEffect(() => {
        const aan = () => setToonRays(true);
        const events = ['pointermove', 'scroll', 'touchstart', 'keydown'] as const;
        events.forEach(e => window.addEventListener(e, aan, { once: true, passive: true }));
        return () => events.forEach(e => window.removeEventListener(e, aan));
    }, []);
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
                {toonRays && <LightRaysLazy
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
                />}
            </div>

            <div className="absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[var(--hero-gradient-via)] to-[var(--hero-gradient-to)]">
            </div>

            <div className="text-center relative">
                <motion.div className="sl-reveal">
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
                    style={{ opacity, scale }}
                    className="mt-6 text-lg text-foreground/80 max-w-lg mx-auto font-medium sl-reveal sl-reveal-1"
                >
                    {heroDetails.subheading}
                </motion.p>


                <motion.div
                    className="flex flex-col items-center mt-10 sl-reveal sl-reveal-2"
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
                            Start Nu
                        </button>
                        <VoiceDemo />
                    </div>
                </motion.div>

                <motion.div
                    className="light-video-blend sl-reveal sl-reveal-3"
                >
                    <div className="relative mt-12 md:mt-16 mx-auto flex justify-center px-4">
                        <video
                            src="/videos/hero-left.mp4"
                            poster="/videos/hero-left-poster.jpg"
                            preload="none"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full max-w-[300px]"
                        />
                    </div>
                </motion.div>
            </div>

            {isModalOpen && <StartChoiceModalLazy isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </section >
    );
};

export default Hero;
