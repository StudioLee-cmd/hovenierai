"use client";
import React, { useState, useEffect, useRef } from 'react';

// ⚡ De SDK wordt pas bij de EERSTE KLIK opgehaald (25-07, niche-homepage-395kb-js-blokkeert-lcp).
//    Dit was `import Vapi from '@vapi-ai/web'` + `new Vapi(key)` op module-scope: de volledige
//    WebRTC-stack (daily-js) werd bij élke pageview gedownload én opgestart voor een knop die
//    vrijwel geen bezoeker aanraakt — veruit de zwaarste post van de 395 KB homepage-JS.

const assistantId = "9c03abc4-56f3-4134-abad-661734908c92"; // Assistant ID from Dakdekker AI

const VoiceDemo: React.FC = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [status, setStatus] = useState("Status: Stand-by");

    const vapiRef = useRef<any>(null);
    const levendRef = useRef(true);

    // Bewaakt alleen nog dat een callback ná unmount geen state meer zet en een lopend gesprek stopt.
    useEffect(() => {
        levendRef.current = true;
        return () => {
            levendRef.current = false;
            try {
                vapiRef.current?.stop();
            } catch {
                /* er liep geen gesprek */
            }
        };
    }, []);

    const laadVapi = async () => {
        if (vapiRef.current) return vapiRef.current;
        const { default: Vapi } = await import('@vapi-ai/web');
        const vapi = new Vapi("5cf7462d-30fe-4d70-9ea1-89ce0bd65ec5");

        vapi.on('call-start', () => {
            if (!levendRef.current) return;
            setStatus("Status: Verbonden (Spreek nu)");
            setIsCalling(true);
        });
        vapi.on('call-end', () => {
            if (!levendRef.current) return;
            setStatus("Status: Gesprek beëindigd");
            setIsCalling(false);
        });
        vapi.on('error', (e: any) => {
            console.error('Vapi Error:', e);
            if (!levendRef.current) return;
            setStatus("Status: Fout opgetreden");
            setIsCalling(false);
        });

        vapiRef.current = vapi;
        return vapi;
    };

    const handleClick = async () => {
        if (isCalling) {
            vapiRef.current?.stop();
        } else {
            // Cookie consent required before VAPI
            const consent = localStorage.getItem('cookie_consent');
            if (consent !== 'accepted') {
                setStatus('Status: Accepteer eerst cookies');
                return;
            }
            setStatus("Status: Verbinden...");
            try {
                const vapi = await laadVapi();
                vapi.start(assistantId);
            } catch (err) {
                console.error("Vapi Start Error:", err);
                setStatus("Status: Start mislukt");
                setIsCalling(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <style jsx>{`
                @keyframes shine {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    15% { transform: translateX(100%) skewX(-15deg); }
                    100% { transform: translateX(100%) skewX(-15deg); }
                }
                .btn-shine {
                    position: relative;
                    overflow: hidden;
                }
                .btn-shine::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-15deg);
                    animation: shine 3s infinite;
                }
            `}</style>
            <button
                onClick={handleClick}
                className={`
                    btn-shine flex items-center justify-center px-8 h-14 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                    ${isCalling ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#007bff] hover:bg-blue-600 text-white'}
                `}
                style={{ minWidth: '205px' }}
            >
                {isCalling ? "Ophangen" : "Test Live Demo"}
            </button>
            <p className="text-sm text-foreground/60 font-medium">
                {status}
            </p>
        </div>
    );
};

export default VoiceDemo;
