"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FocusCTAProps {
    onClick: () => void;
}

const FocusCTA: React.FC<FocusCTAProps> = ({ onClick }) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-cycle focus every 2 seconds if not hovered
    useEffect(() => {
        if (hovered !== null) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [hovered]);

    const items = ["Start Nu", "Winst tot in de Puntjes", "Volgeboekte Agenda", "Knippen Zonder Zorgen"];

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(activeIndex)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center justify-center min-w-[220px] px-8 h-16 rounded-full bg-black text-white text-xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300 ring-4 ring-black/5 overflow-hidden group"
        >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-100" />

            {/* Glowing border effect/shine (optional) */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

            <div className="relative z-10 flex gap-6 items-center">
                {items.map((item, index) => {
                    const isActive = hovered !== null ? hovered === index : activeIndex === index;
                    return (
                        <motion.span
                            key={item}
                            animate={{
                                filter: isActive ? "blur(0px)" : "blur(3px)",
                                opacity: isActive ? 1 : 0.5,
                                scale: isActive ? 1.05 : 0.95,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                            className={`whitespace-nowrap transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400"}`}
                        >
                            {item}
                        </motion.span>
                    );
                })}
            </div>

            {/* Connector / Separator (Subtle) */}
            <div className="absolute z-0 w-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </button>
    );
};

export default FocusCTA;
