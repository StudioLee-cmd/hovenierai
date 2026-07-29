"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { voiceDemos, demoAanvraagUrl } from '@/data/voice-demos';

// ⚑ VERVANGT `VoiceDemo` (29-07, project voice-demo-omzetting). Die component zette een LIVE
//    VAPI-call op; die knop is hier weg. Zie src/data/voice-demos.ts voor het waarom.
//
// ⚡ De speler zelf komt pas bij de klik binnen — zelfde discipline als StartChoiceModal in de
//    hero: de <audio>-elementen en de modal-markup horen niet in de kritieke bundle van een
//    pagina waar de LCP op de hero valt.
const DemoPlayerModalLazy = dynamic(() => import('./DemoPlayerModal'), { ssr: false });

/** Zelfde footprint als de oude live-demo-knop, zodat de hero-rij niet verspringt. */
const KNOP =
    'flex items-center justify-center px-8 h-14 min-w-[205px] rounded-full text-lg font-semibold ' +
    'border-2 border-foreground/20 bg-background text-foreground shadow-lg ' +
    'transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:scale-105 ' +
    'hover:shadow-xl active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40';

const DemoPlayer: React.FC = () => {
    const [open, setOpen] = useState(false);

    // Alleen slots met een échte opname tellen. Staat er nog niets, dan toont de hero GEEN lege
    // speler maar meteen de conversie-stap — de aanvraag die de live lijn eerst was.
    const opgenomen = voiceDemos.filter((d) => d.src);

    if (opgenomen.length === 0) {
        return (
            <a
                href={demoAanvraagUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={KNOP}
            >
                <span aria-hidden="true" className="mr-2">📞</span>
                Vraag een live demo aan
            </a>
        );
    }

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={KNOP}>
                <span aria-hidden="true" className="mr-2">▶</span>
                Beluister de demo&apos;s
                <span className="ml-2 text-sm font-medium text-foreground/50">
                    {opgenomen.length}
                </span>
            </button>
            {open && <DemoPlayerModalLazy demos={opgenomen} onClose={() => setOpen(false)} />}
        </>
    );
};

export default DemoPlayer;
