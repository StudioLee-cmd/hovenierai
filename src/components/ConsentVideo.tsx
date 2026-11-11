"use client";
import { useState } from "react";

// Laadt de YouTube-video pas als de bezoeker zelf op afspelen klikt. Daarvoor gaat er geen
// enkel verzoek naar YouTube of Google: geen iframe, geen thumbnail, geen script.
// Na de klik via youtube-nocookie.com (privacy-enhanced mode).
export default function ConsentVideo({ videoId, title }: { videoId: string; title: string }) {
    const [load, setLoad] = useState(false);

    if (load) {
        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    }

    return (
        <button
            type="button"
            data-consent-video
            onClick={() => setLoad(true)}
            className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center text-white bg-black hover:bg-gray-900 transition-colors"
        >
            <span aria-hidden="true" className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-3xl">▶</span>
            <span className="font-semibold">Video afspelen</span>
            <span className="text-xs text-white/60 max-w-sm">
                Deze video staat op YouTube. Pas als je op afspelen klikt, laden we YouTube; YouTube kan dan cookies plaatsen.
            </span>
        </button>
    );
}
