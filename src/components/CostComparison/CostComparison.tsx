"use client";
import React from 'react';
import Link from 'next/link';
import Section from '../Section';
import Container from '../Container';
import ComparisonTable from './ComparisonTable';
import { comparisonData, totalTraditionalCost, kapperAICost } from '@/data/comparison';
import { BsCheckCircleFill } from 'react-icons/bs';
import Highlight from '../Highlight';
import { motion } from 'framer-motion';
import { siteDetails } from '@/data/siteDetails';

const CostComparison: React.FC = () => {
    return (
        <Section
            id="comparison"
            title="Waarom teveel betalen?"
            description={`Stop met het verspillen van geld aan dure kantoorpersoneel. ${siteDetails.siteName} doet het beter, sneller en goedkoper.`}
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Traditional Way */}
                    <div className="relative">
                        <ComparisonTable items={comparisonData} />
                        <div className="mt-4 text-center lg:text-right">
                            <p className="text-gray-500 font-medium">Totaal per maand:</p>
                            <p className="text-3xl font-bold text-gray-400 line-through decoration-red-500 decoration-4">€ {totalTraditionalCost},-</p>
                        </div>
                    </div>

                    {/* KapperAI Way */}
                    <Link href="/#pricing" className="block w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-900 dark:bg-gray-800 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl cursor-pointer hover:scale-[1.01] transition-transform"
                        >
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary opacity-20 rounded-full blur-3xl"></div>

                            <h3 className="text-2xl lg:text-3xl font-bold mb-2 relative z-10">
                                De <Highlight color="primary" className="text-3xl lg:text-4xl">{siteDetails.siteName}</Highlight> Manier
                            </h3>
                            <p className="text-gray-300 mb-8 relative z-10">Alles-in-één oplossing voor marktdominantie.</p>

                            <div className="space-y-4 mb-10 relative z-10">
                                <div className="flex items-center gap-3">
                                    <BsCheckCircleFill className="text-green-400 flex-shrink-0" size={24} />
                                    <span className="text-lg">Top Google Maps rankings dankzij <strong>Review AI</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCheckCircleFill className="text-green-400 flex-shrink-0" size={24} />
                                    <span className="text-lg">Dominantie in ChatGPT & Google AI met <strong>SEO Blog AI</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCheckCircleFill className="text-green-400 flex-shrink-0" size={24} />
                                    <span className="text-lg">Altijd een frisse, actuele uitstraling met <strong>Photo & Social AI</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BsCheckCircleFill className="text-green-400 flex-shrink-0" size={24} />
                                    <span className="text-lg">Eenvoudig zelf te beheren op je eigen website</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-8 relative z-10">
                                <p className="text-gray-400 font-medium mb-1">Jouw investering:</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl lg:text-6xl font-black text-primary">€ {kapperAICost},-</span>
                                    <span className="text-xl text-gray-400">/ maand</span>
                                </div>
                                <motion.p
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="mt-4 text-green-400 font-bold bg-green-400/10 inline-block px-4 py-2 rounded-full"
                                >
                                    Je bespaart € {totalTraditionalCost - kapperAICost} per maand!
                                </motion.p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default CostComparison;
