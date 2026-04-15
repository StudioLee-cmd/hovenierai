
import React, { useState } from 'react';
import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
    isAnnual: boolean;
    onStartTrial?: () => void;
    onShowOptions?: () => void;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight, isAnnual, onStartTrial, onShowOptions }: Props) => {
    const { name, price: basePrice, priceMonthly, features, focus, hasSlider, ctaType, pricePrefix } = tier;
    const [minutes, setMinutes] = useState(100);

    // Calculate dynamic price
    const calculatePrice = () => {
        const numericBase = typeof basePrice === 'number' ? basePrice : parseInt(basePrice as string);

        if (isNaN(numericBase)) {
            // Non-numeric price (e.g. "Op maat")
            return String(basePrice);
        }

        if (isAnnual) {
            // Eenmalige afkoop: only for Basis
            if (name === 'Managed Groei Basis') {
                return `€ ${numericBase * 12},-`;
            }
            return 'Neem contact op';
        }

        // Monthly: show base price
        return `€ ${numericBase},-`;
    };

    const currentPrice = calculatePrice();

    const calculateSavings = () => {
        if (tier.savings) return tier.savings;
        if (!priceMonthly) return 'Bespaar opties';
        return `Bespaar €${(priceMonthly * 12) - (typeof basePrice === 'number' ? basePrice * 12 : 0)}`;
    };

    const currentSavings = tier.savings; // Use the explicit savings string from data

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-[var(--card-background)] rounded-xl border border-[var(--card-border)] lg:max-w-full flex flex-col h-full", { "shadow-2xl border-primary ring-2 ring-primary/20": highlight })}>
            <div className="p-6 border-b border-[var(--card-border)] rounded-t-xl flex-grow">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">{name}</h3>
                <p className="text-3xl md:text-5xl font-bold mb-2">
                    <span className={clsx("text-[var(--foreground)]", { "text-secondary": highlight })}>
                        {pricePrefix && <span className="text-xl mr-2">{pricePrefix}</span>}
                        {currentPrice}
                    </span>
                    {!(isAnnual) && <span className="text-lg font-normal text-[var(--foreground-accent)]"> p/m</span>}
                    {isAnnual && name === 'Managed Groei Basis' && <span className="text-lg font-normal text-[var(--foreground-accent)]"> eenmalig</span>}
                    <span className="text-xs font-normal text-[var(--foreground-accent)] opacity-75 ml-1">
                        ({name === 'Managed Groei Basis' ? 'Incl BTW' : 'Excl BTW'})
                    </span>
                </p>
                <div className="mb-6 h-6">
                    {isAnnual ? (
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                            {name === 'Managed Groei Basis' ? `Eenmalig €${(typeof basePrice === 'number' ? basePrice : 0) * 12},- — nooit meer maandkosten` : `Eenmalig €${(typeof basePrice === 'number' ? basePrice : 0) * 12},- per jaar`}
                        </span>
                    ) : (
                        <span className="text-xs font-semibold text-[var(--foreground-accent)]">
                            {name === 'Managed Groei Basis' ? 'Maandelijks opzegbaar' : 'Maandelijks opzegbaar'}
                        </span>
                    )}
                </div>

                {hasSlider && (
                    <div className="mb-6">
                        {/* Slider implementation kept if needed */}
                        <label htmlFor="minutes-slider" className="block text-sm font-medium text-[var(--foreground-accent)] mb-2">
                            Aantal Belminuten: <span className="font-bold text-primary">{minutes}</span>
                        </label>
                        <input
                            type="range"
                            id="minutes-slider"
                            min="100"
                            max="2000"
                            step="100"
                            value={minutes}
                            onChange={(e) => setMinutes(parseInt(e.target.value))}
                            className="w-full h-2 bg-[var(--card-border)] rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                )}

                {/* Button Logic based on ctaType */}
                {ctaType === 'call' ? (
                    <div className="space-y-3">
                        <a
                            href="https://calendly.com/tim-studiolee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={clsx("w-full py-3 px-4 rounded-full transition-colors font-semibold block text-center",
                                { "bg-primary hover:bg-primary-accent text-black": highlight, "bg-gray-900 dark:bg-gray-700 text-white hover:opacity-80": !highlight }
                            )}
                        >
                            Boek een Demo
                        </a>
                        <p className="text-xs text-[var(--foreground-accent)] text-center">
                            Gratis strategie gesprek
                        </p>
                    </div>
                ) : ctaType === 'options' ? (
                    <div className="space-y-3">
                        <button
                            onClick={onShowOptions}
                            className={clsx("w-full py-3 px-4 rounded-full transition-colors font-semibold", { "bg-primary hover:bg-primary-accent text-black": highlight, "bg-gray-900 dark:bg-gray-700 text-white hover:opacity-80": !highlight })}
                        >
                            Bekijk Opties
                        </button>
                        <p className="text-xs text-[var(--foreground-accent)] text-center">
                            {isAnnual ? 'Eenmalige factuur (12 maanden)' : 'Maandelijkse factuur'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <button
                            onClick={onStartTrial}
                            className={clsx("w-full py-3 px-4 rounded-full transition-colors font-semibold", { "bg-primary hover:bg-primary-accent text-black": highlight, "bg-gray-900 dark:bg-gray-700 text-white hover:opacity-80": !highlight })}
                        >
                            Start Gratis
                        </button>
                        <p className="text-xs text-[var(--foreground-accent)] text-center">
                            14 dagen proefperiode
                        </p>
                    </div>
                )}
            </div>
            <div className="p-6 mt-1 bg-[var(--hero-background)] rounded-b-xl flex-grow">
                <p className="font-bold mb-0 text-[var(--foreground)]">WAT KRIJG JE:</p>
                <p className="text-foreground-accent mb-3">{focus}</p>
                <div className="mb-5 inline-block bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded border border-green-200">
                    {currentSavings}
                </div>
                <ul className="space-y-4 mb-8">
                    {(!isAnnual && name === 'Managed Groei Basis' ? ['Maandelijks opzegbaar', ...features] : features).map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
                            <span className="text-foreground-accent">
                                {hasSlider && index === 0 ? `${minutes} Min Voice AI (NL of EN)` : feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn