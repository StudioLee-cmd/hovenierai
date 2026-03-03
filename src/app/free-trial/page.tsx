'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';

// N8N Webhook URL - Replace with your actual webhook URL
const N8N_WEBHOOK_URL = "JOUW_N8N_WEBHOOK_URL_HIER";

const NICHE_OPTIONS = [
    "Dakdekkers",
    "Aannemers",
    "Installateurs",
    "Schilders",
    "Stukadoors",
    "Glazenwassers",
    "Hoveniers",
    "Schoonmaakbedrijven",
    "Kappers",
    "Beauty & Nagel Salons",
    "Restaurants",
    "Overig"
];

const FreeTrialPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        businessName: '',
        niche: 'Dakdekkers',
        termsAccepted: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.businessName || !formData.niche) {
            setError('Vul alle verplichte velden in.');
            return;
        }

        if (!formData.termsAccepted) {
            setError('Je moet akkoord gaan met de voorwaarden om door te gaan.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    business_name: formData.businessName,
                    niche: formData.niche,
                    name: formData.businessName, // Fallback name
                    source: 'website_signup_page',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - redirect to success page/Stripe
                let redirectUrl = typeof data.data === 'string' ? data.data.trim() : '';
                if (redirectUrl.startsWith('"') && redirectUrl.endsWith('"')) {
                    redirectUrl = redirectUrl.slice(1, -1);
                }

                if (redirectUrl && redirectUrl.startsWith('http')) {
                    window.location.href = redirectUrl;
                } else {
                    router.push('/aanmelding-gelukt');
                }
            } else {
                throw new Error('Er is iets misgegaan bij het versturen van je aanmelding.');
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Er is een fout opgetreden. Probeer het later opnieuw.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Start Je Gratis Proefperiode
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Start gratis uitproberen. Geen creditcard vereist.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    E-mailadres <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                                    placeholder="jouw@email.nl"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Business Name Field */}
                            <div>
                                <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bedrijfsnaam <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    required
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                                    placeholder="Jouw Dakdekkersbedrijf"
                                    disabled={isLoading}
                                />
                            </div>


                            {/* Terms Checkbox */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5 mt-1">
                                    <input
                                        id="termsAccepted"
                                        name="termsAccepted"
                                        type="checkbox"
                                        required
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        disabled={isLoading}
                                    />
                                </div>
                                <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-700">
                                    Ik ga akkoord met de voorwaarden en de proefperiode van 14 dagen. <span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Bezig met verwerken...
                                    </span>
                                ) : (
                                    'Start Gratis Proefperiode'
                                )}
                            </button>
                        </form>

                        {/* Trust Badges */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Start Gratis
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Geen creditcard
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Heb je vragen? Neem contact met ons op via{' '}
                        <a href="mailto:Info@dakdekkerai.nl" className="text-blue-600 hover:text-blue-700 font-medium">
                            Info@dakdekkerai.nl
                        </a>
                    </p>
                </div>
            </Container>
        </div>
    );
};

export default FreeTrialPage;
