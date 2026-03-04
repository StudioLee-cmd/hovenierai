'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



interface FreeTrialModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAnnual: boolean;
}

const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose, isAnnual }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '+31 ',
        businessName: '',
        niche: 'Hovenier',
        termsAccepted: false,
        newsletter: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
        if (!formData.fullName || !formData.email || !formData.businessName) {
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
            // Use local API proxy to avoid CORS issues
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    business_name: formData.businessName,
                    niche: formData.niche,
                    source: 'website_signup',
                    newsletter_subscribed: formData.newsletter,
                    interval: isAnnual ? 'Yearly' : 'Monthly'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - show success message in modal
                setShowSuccess(true);

                // Redirect to Stripe (URL returned from webhook)
                setTimeout(() => {
                    // The webhook returns the URL in data.data
                    // We fallback to hardcoded if nothing valid is returned, just in case
                    let redirectUrl = typeof data.data === 'string' ? data.data.trim() : '';

                    // Check if there are quotes around it (common w/ some text responses)
                    if (redirectUrl.startsWith('"') && redirectUrl.endsWith('"')) {
                        redirectUrl = redirectUrl.slice(1, -1);
                    }

                    // Basic validation to check if it's a URL
                    if (!redirectUrl || !redirectUrl.startsWith('http')) {
                        console.warn("Invalid or empty redirect URL from webhook, using fallback. Received:", data.data);
                        redirectUrl = isAnnual
                            ? "https://buy.stripe.com/28E14o0HPdregor18ObjW07"
                            : "https://buy.stripe.com/28E14ocqx3QE7RV18ObjW06";
                    }

                    window.location.href = redirectUrl;
                }, 1500);
            } else {
                throw new Error('Er is iets misgegaan bij het versturen van je aanmelding.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Er is een fout opgetreden. Probeer het later opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto pointer-events-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        disabled={isLoading}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {showSuccess ? (
                        <div className="text-center py-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-6">
                                <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check je email!</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Bedankt voor je aanmelding. Je ontvangt binnen enkele minuten een e-mail van <strong>AIreclamestudio</strong> met je inloggegevens.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
                                <strong>Let op:</strong> Check ook je <u>spamfolder</u> als je hem niet direct ziet. Je kunt daarna direct inloggen en starten met testen!
                            </p>
                            <a
                                href="https://calendly.com/tim-studiolee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary-accent transition-colors shadow-lg"
                            >
                                Plan direct een belafspraak
                            </a>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Start Je Gratis Proefperiode
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Start gratis uitproberen. Geen creditcard vereist.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name Field */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Volledige Naam <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                                        placeholder="Jan de Vries"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        E-mailadres <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                                        placeholder="jouw@email.nl"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Telefoonnummer <span className="text-gray-400 font-normal">(Optioneel)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                                        placeholder="+31 6 12345678"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Business Name Field */}
                                <div>
                                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        Bedrijfsnaam <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="businessName"
                                        name="businessName"
                                        required
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                                        placeholder="Jouw Hoveniersbedrijf"
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
                                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                        Ik ga akkoord met de voorwaarden en de proefperiode van 14 dagen. <span className="text-red-500">*</span>
                                    </label>
                                </div>

                                {/* Newsletter Checkbox */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            id="newsletter"
                                            name="newsletter"
                                            type="checkbox"
                                            checked={formData.newsletter}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 cursor-pointer"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                        Meld je aan voor de nieuwsbrief. We spammen niet, we mailen alleen als we iets te melden hebben waarvan we denken dat je het leuk vindt.
                                    </label>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
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
                                            Even geduld, je account wordt aangemaakt...
                                        </span>
                                    ) : (
                                        'Start Mijn Gratis Proefperiode'
                                    )}
                                </button>
                            </form>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
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
                        </>
                    )}
                </div>
            </div >
        </div >
    );
};

export default FreeTrialModal;
