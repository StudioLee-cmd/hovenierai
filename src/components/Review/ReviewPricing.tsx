"use client";
import React from 'react';
import { reviewPackages } from "@/data/review-pricing";
import { BsCheckCircleFill, BsStars } from "react-icons/bs";
import Link from 'next/link';

const ReviewPricing = () => {
    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                        Kies jouw Review Pakket
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                        Verzamel meer reviews en groei online met onze complete pakketten.
                    </p>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto italic">
                        * De genoemde inhoud is een voorbeeld. Stel zelf je ideale mix samen van stickers, kaartjes en displays.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {reviewPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl 
                            ${pkg.highlight
                                    ? 'bg-white dark:bg-gray-900 border-2 border-indigo-500 shadow-xl scale-105 z-10'
                                    : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'}`}
                        >
                            {pkg.highlight && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                        <BsStars /> Beste Keuze
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 min-h-[50px]">{pkg.description}</p>

                            <div className="mb-8">
                                {pkg.price > 0 ? (
                                    <>
                                        <span className="text-4xl font-black text-gray-900 dark:text-white">€{pkg.price}</span>
                                        <span className="text-gray-500 dark:text-gray-400"> / eenmalig</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-black text-gray-900 dark:text-white">Maatwerk</span>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <BsCheckCircleFill className={`mt-1 flex-shrink-0 ${pkg.highlight ? 'text-indigo-600' : 'text-blue-500'}`} />
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={pkg.buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full py-4 px-6 rounded-xl text-center font-bold transition-all duration-200
                                ${pkg.highlight
                                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                            >
                                {pkg.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewPricing;
