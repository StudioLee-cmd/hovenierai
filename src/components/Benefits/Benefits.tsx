"use client";
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import BenefitSection from "./BenefitSection";
import { benefits, managedService } from "@/data/benefits";

// PROPOSITIE-CONTRACT §① (niche-sites-upgrade-programma.md): de homepage toont PRECIES VIER dingen.
// Tot 25-07 stond hier een tracking-bar met 20 tabs — een catalogus, geen propositie (⛔3). De onderdelen
// zijn niet weg: ze vouwen open ONDER het ding waar ze bij horen (BenefitDetails).
//
// ⛔ DE KOP GAAT OVER DE UITKOMST, NOOIT OVER ONZE BEPERKING (Tim 25-07, keur 78). Hier stond
// "Vier dingen. Meer doen we hier niet." — de LAYOUT keurde hij goed, die zin niet: *"it needs to WOW
// them. It is a very very good system and it does do a lot of things. It's productized, it's what it
// GETS them."* Een pagina die opent met wat je NIET doet verkleint een systeem dat juist veel kan.
// De vier zijn de STRUCTUUR van het blok; de kop zegt wat de kapper eraan overhoudt, en de uitklap
// eronder laat de diepte zien. Schrijf hier dus nooit een tel-, schaarste- of "meer-niet"-zin.

const Benefits: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handlePrev = () => setActiveTab(activeTab === 0 ? benefits.length - 1 : activeTab - 1);
    const handleNext = () => setActiveTab(activeTab === benefits.length - 1 ? 0 : activeTab + 1);

    // Swipe Interaction
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null) // otherwise the swipe is fired even when simply clicking
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            handleNext()
        }
        if (isRightSwipe) {
            handlePrev()
        }
    }

    return (
        <div id="features" className="relative pb-20">
            <div className="max-w-4xl mx-auto text-center px-4 pt-4 pb-6">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                    Je zaak werkt door terwijl jij in de tuin staat.
                </h2>
                <p className="mt-3 text-foreground-accent leading-normal">
                    De klant die &apos;s avonds op je site komt krijgt antwoord. De beller die jij niet kunt opnemen
                    wordt ingepland. Nieuwe klanten vinden je vanzelf, en je site staat er over een jaar nóg goed bij.
                    Klik een van de vier open — er draait meer onder dan je hier ziet.
                </p>
            </div>

            {/* Sticky Tracking Bar — de vier dingen */}
            <div className="sticky top-[calc(4rem-280px)] md:top-[-160px] z-40 bg-background/95 border-b border-black/10 dark:border-white/10 backdrop-blur-md transition-all duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 px-2 md:px-5 py-2 w-full max-w-7xl mx-auto">
                    {benefits.map((item, index) => (
                        <button
                            key={index}
                            id={`nav-item-${index}`}
                            onClick={() => setActiveTab(index)}
                            aria-current={activeTab === index}
                            className={`
                                relative h-full flex items-center justify-center text-center px-2 py-3 text-[11px] md:text-sm font-medium rounded-lg transition-all duration-300 leading-tight
                                ${activeTab === index
                                    ? 'bg-foreground text-background shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                }
                            `}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div
                className="max-w-7xl mx-auto min-h-[500px] relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:scale-110"
                    aria-label="Vorige"
                >
                    <FiChevronLeft size={24} />
                </button>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-lg transition-all text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:scale-110"
                    aria-label="Volgende"
                >
                    <FiChevronRight size={24} />
                </button>

                <div
                    key={activeTab} // Key forces re-render for animation
                    className="flex flex-col justify-center px-4 md:px-20 py-10 md:py-16"
                >
                    <BenefitSection benefit={benefits[activeTab]} imageAtRight={true} />
                </div>
            </div>

            {/* Het SERVICE-NIVEAU op dezelfde vier dingen — bewust geen vijfde tab (⛔3 "geen vijfde ding") */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/60 dark:bg-amber-900/20 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-heading font-semibold text-foreground">
                            Of je laat het helemaal uit handen nemen
                        </h3>
                        <p className="mt-2 text-foreground-accent leading-normal">
                            {managedService.description}
                        </p>
                    </div>
                    {managedService.buttonText && managedService.buttonUrl && (
                        <a
                            href={managedService.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full shadow-sm text-black bg-amber-400 hover:bg-amber-500 transition-colors"
                        >
                            {managedService.buttonText}
                            <FiArrowRight size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Benefits
