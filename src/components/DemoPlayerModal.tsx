"use client";
import React, { useEffect, useRef, useState } from 'react';
import type { VoiceDemoOpname } from '@/data/voice-demos';
import { demoAanvraagUrl } from '@/data/voice-demos';

interface DemoPlayerModalProps {
    demos: VoiceDemoOpname[];
    onClose: () => void;
}

// ⚑ De opgenomen gesprekken die de live VAPI-lijn vervangen (29-07). Meerdere demo's die
//    verschillende kanten op gaan is het hele punt: één demo toont één pad, meerdere laten zien
//    dat de agent écht luistert. De aanvraag-knop is de conversie-stap die de live lijn eerst was
//    en verschijnt zodra er iets gespeeld is.
const DemoPlayerModal: React.FC<DemoPlayerModalProps> = ({ demos, onClose }) => {
    const [actief, setActief] = useState<string | null>(null);
    const [gehoord, setGehoord] = useState(false);
    const refs = useRef<Record<string, HTMLAudioElement | null>>({});

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // Eén gesprek tegelijk — twee demo's door elkaar heen is geen demo meer.
    const speel = (id: string) => {
        const el = refs.current[id];
        if (!el) return;
        if (actief === id && !el.paused) {
            el.pause();
            setActief(null);
            return;
        }
        Object.entries(refs.current).forEach(([k, a]) => {
            if (a && k !== id) { a.pause(); a.currentTime = 0; }
        });
        void el.play();
        setActief(id);
        setGehoord(true);
    };

    return (
        <div
            className="fixed inset-0 z-[60] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Opgenomen demo-gesprekken"
        >
            <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative w-full max-w-lg rounded-2xl bg-background p-8 shadow-2xl ring-1 ring-foreground/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Sluiten"
                        className="absolute right-4 top-4 text-foreground/40 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="mb-6 pr-8">
                        <h2 className="text-2xl font-bold text-foreground">Hoor het zelf</h2>
                        <p className="mt-1 text-sm text-foreground-accent">
                            Echte gesprekken met onze AI-telefonist — elk gesprek gaat een andere kant op.
                        </p>
                    </div>

                    <ul className="flex flex-col gap-3">
                        {demos.map((d) => {
                            const speelt = actief === d.id;
                            return (
                                <li key={d.id}>
                                    <button
                                        type="button"
                                        onClick={() => speel(d.id)}
                                        aria-pressed={speelt}
                                        className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                                            speelt
                                                ? 'border-primary bg-primary/10'
                                                : 'border-foreground/10 hover:border-primary/60 hover:bg-primary/5'
                                        }`}
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-black">
                                            {speelt ? '❚❚' : '▶'}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block font-semibold text-foreground">{d.titel}</span>
                                            <span className="block text-sm text-foreground-accent">{d.richting}</span>
                                            <span className="mt-1 block text-xs text-foreground/50">
                                                stem {d.stem}{d.duur ? ` · ${d.duur}` : ''}
                                            </span>
                                        </span>
                                    </button>
                                    <audio
                                        ref={(el) => { refs.current[d.id] = el; }}
                                        src={d.src ?? undefined}
                                        preload="none"
                                        onEnded={() => setActief(null)}
                                    />
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-6 border-t border-foreground/10 pt-6">
                        <a
                            href={demoAanvraagUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-bold text-black shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                        >
                            Vraag een live demo aan
                        </a>
                        <p className="mt-3 text-center text-sm text-foreground-accent">
                            {gehoord
                                ? 'Wil je de agent op jouw eigen situatie horen? Plan een live demo in.'
                                : 'Liever direct met ons spreken? Plan een live demo in.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoPlayerModal;
