'use client';

import React from 'react';
import Link from 'next/link';
import { BsCheckCircleFill, BsEnvelope, BsArrowRight } from 'react-icons/bs';
import Container from '@/components/Container';

const AanmeldingGeluktPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Container className="flex-grow flex items-center justify-center py-24">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                            <BsCheckCircleFill className="text-green-500 text-5xl" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Aanmelding Geslaagd!
                    </h1>

                    <p className="text-xl text-gray-600 mb-12">
                        Gefeliciteerd! We zijn direct begonnen met het klaarmaken van jouw KapperAI account.
                    </p>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-12 text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <BsEnvelope className="text-blue-600" />
                            Wat gebeurt er nu?
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Check je e-mail</h3>
                                    <p className="text-gray-600">Je ontvangt een e-mail van <strong>AIreclamestudio</strong> met jouw inloggegevens. Check ook je <u>spamfolder</u>.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Log in op je dashboard</h3>
                                    <p className="text-gray-600">Gebruik de link in de e-mail om in te loggen. Je AI-assistenten staan al voor je klaar.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Start de rondleiding</h3>
                                    <p className="text-gray-600">Na het inloggen start er een korte rondleiding die je helpt om binnen 5 minuten je eerste AI-agent te activeren.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                            Terug naar Home
                        </Link>
                        <Link
                            href="https://app.kapperai.nl"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Naar Inloggen <BsArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AanmeldingGeluktPage;
