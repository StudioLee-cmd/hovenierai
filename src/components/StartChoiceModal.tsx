'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface StartChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartChoiceModal: React.FC<StartChoiceModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto pointer-events-auto">
            {/* Backdrop — click outside to close */}
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
                        aria-label="Sluiten"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Hoe wil je beginnen?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Kies hoe je kennismaakt met ons platform.
                        </p>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-4">
                        {/* Option 1: Gratis Scan */}
                        <Link
                            href="/gratis-scan"
                            onClick={onClose}
                            className="flex items-start gap-4 p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                        >
                            <span className="text-3xl">📊</span>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary transition-colors">
                                    Gratis Readiness Scan
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    Ontdek in 2 minuten wat AI voor jouw bedrijf kan betekenen. Gratis en vrijblijvend.
                                </p>
                            </div>
                        </Link>

                        {/* Option 2: Pricing / Free Trial */}
                        <a
                            href="/#pricing"
                            onClick={onClose}
                            className="flex items-start gap-4 p-5 border-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-all group"
                        >
                            <span className="text-3xl">🚀</span>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary transition-colors">
                                    Start Gratis — 14 Dagen
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    Direct starten, geen creditcard vereist. Bekijk onze pakketten en kies wat bij je past.
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartChoiceModal;
