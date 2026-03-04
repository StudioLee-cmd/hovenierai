"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useTheme } from "next-themes";

const FallingText = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasStarted, setHasStarted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // Immediate check in case already visible
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !hasStarted) {
            setHasStarted(true);
        }

        // Scroll Trigger
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 } // Lower threshold for earlier trigger
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted || !containerRef.current || !canvasRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Runner = Matter.Runner;

        const engine = Engine.create();
        const world = engine.world;

        const width = containerRef.current.clientWidth;
        const isMobileInit = width < 768;
        const height = isMobileInit ? 200 : 400;

        const render = Render.create({
            element: containerRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio,
            },
        });

        const allWords = [
            // HERO USPs (HOVENIER EDITION)
            "Meer Winst per Tuin 🌳",
            "Alles-in-1 Systeem 🌿",
            "Nooit Meer Gemiste Aanvragen 📅",
            "Je Werkrooster op Orde 🗓️",
            "Ondernemen Zonder Zorgen 🚀",
            "Je Bedrijf in je Broekzak 📱",
            "Jouw AI Receptioniste 🤖",
            "Stop Omzetlekkages 💸",
            "Geen Gedoe Met Facturen 🧾",
            "Alle Tools in 1 App 📱",
            "Meer Vrijheid, Minder Stress 🧘",
            "100% Jouw Eigen Stijl 🎨",
            "Klanten & AI in 1 Systeem 🤝",
            "Volgeboekte Agenda 📈",
            "Klanten die terugkomen als een boemerang 🪃",
            "Slapende klanten wakker schudden ⏰",

            // HOVENIER PUNS & FUN
            "Minder wieden, meer verdienen 🌿",
            "Tijd voor koffie & je kruiwagen ☕",
            "Laat de telefoon maar rinkelen (AI pakt op) 📞",
            "Laat de AI je agenda vullen 🤖",
            "Snoeien, niet telefoneren ✂️",
            "Geen onkruid in je planning 🌱",
            "Jij de schop, AI de rest 🤖",
            "Van hovenier naar top-ondernemer 🚀",
            "Handen vol modder? AI helpt 🌱",
            "Meer tuinen in minder tijd ⏳",
            "Altijd groen, net als je gras 🌿",
            "Strakke borders, strakke planning 🌸",
            "Zaai nu, oogst later 💰",
            "Eindelijk rustig lunchen onder de boom 🌳"
        ];

        // Pick random 10 unique words
        const shuffledWords = allWords.sort(() => 0.5 - Math.random());
        const selectedWords = shuffledWords.slice(0, 10);

        // SHAPE DISTRIBUTION LOGIC
        // Ensure at least 1 of each shape type is present.
        // 0 = WavySquare
        // 1 = WavyBadge
        // 2 = Cloud (6 Lobes - "More Blobs")
        // 3 = Blob
        // 4 = Pill
        // 5 = Cross

        const baseShapes = [0, 1, 2, 3, 4, 5];
        const extraShapes = Array(4).fill(0).map(() => Math.floor(Math.random() * 6));
        const combinedShapes = [...baseShapes, ...extraShapes].sort(() => 0.5 - Math.random());

        const colors = [
            "#60A5FA", // Blue
            "#F472B6", // Pink
            "#34D399", // Green
            "#FBBF24", // Yellow
            "#818CF8", // Indigo
            "#FB923C", // Orange
            "#A78BFA", // Purple
            "#F87171", // Red
        ];

        const bodies: Matter.Body[] = [];

        selectedWords.forEach((text, i) => {
            const x = Math.random() * (width - 100) + 50;
            const y = Math.random() * -1000 - 100;

            const color = colors[Math.floor(Math.random() * colors.length)];
            const shapeType = combinedShapes[i];

            // Mobile check
            const isMobile = width < 768;
            const mobileScaleMultiplier = isMobile ? 0.5 : 1;

            // Randomize Size with mobile adjustment
            const scale = (0.8 + Math.random() * 0.4) * mobileScaleMultiplier; // 0.8x to 1.2x (halved on mobile)

            let body;
            const label = text;
            const len = text.length;

            if (shapeType === 0) {
                // WAVY SQUARE
                const side = (110 + len * 2.5) * scale;
                body = Bodies.rectangle(x, y, side, side, {
                    chamfer: { radius: 20 * scale },
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'wavySquare', width: side, height: side, color }
                });

            } else if (shapeType === 1) {
                // WAVY BADGE
                const radius = (60 + len * 2) * scale;
                body = Bodies.circle(x, y, radius, {
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'wavyBadge', radius: radius, color }
                });

            } else if (shapeType === 2) {
                // CLOUD (6 Lobes)
                const radius = (65 + len * 2) * scale;
                body = Bodies.circle(x, y, radius, {
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'cloud', radius: radius, color }
                });

            } else if (shapeType === 3) {
                // BLOB
                const radius = (60 + len * 2) * scale;
                body = Bodies.circle(x, y, radius, {
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'blob', radius: radius, color }
                });

            } else if (shapeType === 4) {
                // PILL
                const boxWidth = (len * 10 + 60) * scale;
                const boxHeight = 60 * scale;
                body = Bodies.rectangle(x, y, boxWidth, boxHeight, {
                    chamfer: { radius: boxHeight / 2 },
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'pill', width: boxWidth, height: boxHeight, color }
                });

            } else {
                // CROSS
                const size = (100 + len * 2) * scale;
                body = Bodies.rectangle(x, y, size, size, {
                    chamfer: { radius: 20 },
                    render: { visible: false },
                    label: label,
                    plugin: { type: 'cross', width: size, height: size, color }
                });
            }

            body.restitution = 0.5;
            body.friction = 0.05;
            Matter.Body.rotate(body, Math.random() * Math.PI * 2);

            bodies.push(body);
        });

        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 100, width * 2, 200, wallOptions);
        const leftWall = Bodies.rectangle(-50, height * 2, 100, height * 10, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height * 2, 100, height * 10, wallOptions);

        World.add(world, [...bodies, ground, leftWall, rightWall]);

        // Intercept addEventListener to prevent Matter.js from hijacking the scroll wheel
        const originalAdd = render.canvas.addEventListener;
        // @ts-ignore
        render.canvas.addEventListener = (type: string, listener: any, options: any) => {
            if (type === 'wheel' || type === 'mousewheel' || type === 'DOMMouseScroll') return;
            originalAdd.call(render.canvas, type, listener, options);
        };

        const mouse = Mouse.create(render.canvas);

        // Restore original addEventListener
        render.canvas.addEventListener = originalAdd;

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // CUSTOM RENDER LOOP
        Matter.Events.on(render, "afterRender", () => {
            const ctx = render.context;
            const isMobile = width < 768;
            ctx.font = isMobile ? "bold 10px Inter, sans-serif" : "bold 15px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            bodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;
                // @ts-ignore
                const { type, color, width: w, height: h, radius: r } = body.plugin;
                // @ts-ignore
                const text = body.label;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillStyle = color;

                if (type === 'wavySquare') {
                    ctx.beginPath();
                    const halfW = w / 2;
                    const halfH = h / 2;
                    ctx.moveTo(-halfW, -halfH + 20);
                    ctx.bezierCurveTo(-halfW / 3, -halfH - 10, halfW / 3, -halfH + 10, halfW, -halfH + 20);
                    ctx.bezierCurveTo(halfW + 10, -halfH / 3, halfW - 10, halfH / 3, halfW, halfH - 20);
                    ctx.bezierCurveTo(halfW / 3, halfH + 10, -halfW / 3, halfH - 10, -halfW, halfH - 20);
                    ctx.bezierCurveTo(-halfW - 10, halfH / 3, -halfW + 10, -halfH / 3, -halfW, -halfH + 20);
                    ctx.fill();

                } else if (type === 'wavyBadge') {
                    ctx.beginPath();
                    const spikes = 12;
                    const outer = r;
                    const inner = r - 10;
                    for (let i = 0; i < spikes * 2; i++) {
                        const r_val = i % 2 === 0 ? outer : inner;
                        const a_val = (Math.PI / spikes) * i;
                        ctx.lineTo(Math.cos(a_val) * r_val, Math.sin(a_val) * r_val);
                    }
                    ctx.closePath();
                    ctx.fill();

                } else if (type === 'cloud') {
                    // 6-LOBED CLOUD (More Blobs!)
                    ctx.beginPath();
                    const lobes = 6;
                    const offset = r * 0.55;
                    const lobeRadius = r * 0.55;

                    // Draw central filler
                    ctx.arc(0, 0, r * 0.5, 0, 2 * Math.PI);

                    // Draw lobes around
                    for (let i = 0; i < lobes; i++) {
                        const theta = (Math.PI * 2 / lobes) * i;
                        const lx = Math.cos(theta) * offset;
                        const ly = Math.sin(theta) * offset;
                        ctx.moveTo(lx + lobeRadius, ly);
                        ctx.arc(lx, ly, lobeRadius, 0, 2 * Math.PI);
                    }
                    ctx.fill();

                } else if (type === 'blob') {
                    ctx.beginPath();
                    ctx.arc(0, 0, r, 0, 2 * Math.PI);
                    ctx.fill();

                } else if (type === 'pill') {
                    ctx.beginPath();
                    // @ts-ignore
                    ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
                    ctx.fill();

                } else if (type === 'cross') {
                    const thick = w / 2.5;
                    const len = w;
                    ctx.beginPath();
                    // @ts-ignore
                    ctx.roundRect(-len / 2, -thick / 2, len, thick, thick / 2);
                    // @ts-ignore
                    ctx.roundRect(-thick / 2, -len / 2, thick, len, thick / 2);
                    ctx.fill();
                }

                // --- TEXT DRAWING (TIGHT WRAP) ---
                // Use very light blue for dark mode, dark for light mode
                ctx.fillStyle = resolvedTheme === 'dark' ? "#e0e7ff" : "#1a1a1a";

                // Determine Safe Max Width - STRICTER
                let maxWidth = 0;
                if (type === 'pill') maxWidth = w * 0.8;
                else if (type === 'cross') maxWidth = w * 0.8;
                else if (type === 'wavySquare') maxWidth = w * 0.65; // Very strict for square rotation safety
                else if (type === 'wavyBadge' || type === 'blob') maxWidth = r * 1.2; // 60% of diameter
                else if (type === 'cloud') maxWidth = r * 1.3;

                const words = (text || "").split(' ');
                let lines = [];
                let currentLine = words[0];

                for (let i = 1; i < words.length; i++) {
                    const word = words[i];
                    const width = ctx.measureText(currentLine + " " + word).width;
                    if (width < maxWidth) {
                        currentLine += " " + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                }
                lines.push(currentLine);

                // Draw Lines Centered
                const lineHeight = isMobile ? 12 : 18;
                const totalHeight = lines.length * lineHeight;
                let startY = -(totalHeight / 2) + (lineHeight / 2);

                lines.forEach((line, i) => {
                    ctx.fillText(line, 0, startY + (i * lineHeight));
                });

                ctx.restore();
            });
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const handleResize = () => {
            if (!containerRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newIsMobile = newWidth < 768;
            const newHeight = newIsMobile ? 200 : 400;

            const pixelRatio = render.options.pixelRatio || 1;

            render.canvas.width = newWidth * pixelRatio;
            render.canvas.height = newHeight * pixelRatio;

            // Matter.js Render doesn't auto-update style on resizing manually usually, ensure it matches
            render.canvas.style.width = `${newWidth}px`;
            render.canvas.style.height = `${newHeight}px`;

            render.options.width = newWidth;
            render.options.height = newHeight;

            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 100 });
            Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight });
            Matter.Body.setPosition(leftWall, { x: -50, y: newHeight });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            window.removeEventListener("resize", handleResize);
        };
    }, [hasStarted, resolvedTheme]);

    return (
        <div ref={containerRef} className="w-full h-[200px] md:h-[400px] bg-white dark:bg-[var(--background)] overflow-hidden relative cursor-grab active:cursor-grabbing border-t border-gray-100 dark:border-[var(--card-border)] flex items-center justify-center">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default FallingText;

