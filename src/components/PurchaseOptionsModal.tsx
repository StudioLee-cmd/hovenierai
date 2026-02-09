'use client';

import React, { useEffect } from 'react';
import { IPricing } from "@/types";

interface PurchaseOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tier: IPricing | null;
    isAnnual: boolean;
}

const PurchaseOptionsModal: React.FC<PurchaseOptionsModalProps> = ({ isOpen, onClose, tier, isAnnual }) => {
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

    if (!isOpen || !tier) return null;

    const stripeUrl = (isAnnual ? tier.stripeYearly : tier.stripeMonthly) || '#';
    // Default to the generic calendly link if not specified (though tiers focusing on this usually have one)
    const bookingUrl = "https://calendly.com/tim-studiolee";

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Kies hoe je wilt starten met {tier.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Wil je eerst even sparren of direct aan de slag?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Option 1: Book Demo */}
                        <a
                            href={bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary/50 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all group cursor-pointer text-center"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Boek een Demo</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gratis strategie gesprek van 15-30 min.</p>
                        </a>

                        {/* Option 2: Direct Pay */}
                        <a
                            href={stripeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center p-6 border-2 border-primary rounded-xl bg-primary hover:bg-primary-accent transition-all group cursor-pointer text-center shadow-lg transform hover:-translate-y-1 ${stripeUrl === '#' ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center mb-4 text-black group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-black mb-1">Direct Starten</h3>
                            <p className="text-sm text-gray-800">
                                {isAnnual ? 'Jaarlijks abonnement' : 'Maandelijks (Kwartaal)'}
                            </p>
                        </a>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default PurchaseOptionsModal;
