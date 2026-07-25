"use client";
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Color, Vec2 } from 'ogl';

interface LightRaysProps {
    raysOrigin?: 'center' | 'top' | 'top-center' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    className?: string;
    style?: React.CSSProperties;
}

const vert = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

const frag = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uSpread;
uniform float uLength;
uniform float uNoise;
uniform float uDistortion;
uniform float uFade;
uniform bool uPulsating;
uniform vec2 uOrigin;
uniform float uMouseInfluence;

// Simple pseudo-random noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 p = vUv;
    
    // Calculate direction to origin
    vec2 dir = p - uOrigin;
    float dist = length(dir);
    float angle = atan(dir.y, dir.x);

    // Mouse influence
    vec2 mouseOffset = (uMouse / uResolution) - 0.5;
    angle += mouseOffset.x * uMouseInfluence * 0.5;
    
    // Ray pattern based on angle + noise
    float ray = noise(vec2(angle * (10.0 + uSpread * 10.0), uTime * uSpeed * 0.1));
    
    // Sharpen rays
    ray = smoothstep(0.4, 0.6 + uNoise * 0.2, ray);
    
    // Radial fade (length)
    float fade = 1.0 - smoothstep(0.0, uLength, dist);
    
    // Additional fade out at edges if requested
    fade *= (1.0 - smoothstep(uFade, 1.0, dist));
    
    // Pulsating effect
    if (uPulsating) {
        fade *= (0.8 + 0.2 * sin(uTime * 2.0));
    }

    vec3 color = uColor * ray * fade;
    
    // Apply contrast / saturation adjustment implicitly by mixing
    gl_FragColor = vec4(color, ray * fade); // Premultiplied alpha-ish
}
`;

const LightRays: React.FC<LightRaysProps> = ({
    raysOrigin = 'top-center',
    raysColor = '#ffffff',
    raysSpeed = 1,
    lightSpread = 0.5,
    rayLength = 3,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0,
    distortion = 0,
    pulsating = false,
    fadeDistance = 1,
    saturation = 1,
    className,
    style
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const programRef = useRef<Program | null>(null);
    const mouseRef = useRef<Vec2>(new Vec2(0, 0));

    useEffect(() => {
        if (!containerRef.current) return;

        // ⚠️ `new Renderer()` THROWT als de browser geen WebGL-context geeft (oude/zuinige
        //    Androids, geblokkeerde GPU, iOS Lockdown Mode, headless zonder GPU). Een throw in
        //    een effect klapt de hele React-tree naar Next's "Application error: a client-side
        //    exception has occurred" — gemeten 25-07 kreeg headless Chrome zónder GPU dus niet de
        //    site maar die foutpagina te zien, en de CWV-meting mat een foutscherm. Deze laag
        //    staat op opacity 0.1: geen WebGL = geen rays, en de site draait gewoon door.
        try {

            const renderer = new Renderer({
                alpha: true,
                premultipliedAlpha: false,
                dpr: window.devicePixelRatio
            });

            const gl = renderer.gl;
            containerRef.current.appendChild(gl.canvas);
            rendererRef.current = renderer;

            const geometry = new Triangle(gl);

            // Determine Origin Coordinate
            let originX = 0.5;
            let originY = 0.5;

            if (raysOrigin.includes('top')) originY = 1.0; // In standard UV, 1 is top usually? Wait, OGL might vary.
            // Normalized coords: 0,0 is bottom-left usually in WebGL. 
            // Let's assume UVs: (0,0) bottom-left, (1,1) top-right.
            // So 'top' means Y=1. 'bottom' means Y=0.

            if (raysOrigin.includes('top')) originY = 1.2; // Slightly offscreen
            if (raysOrigin.includes('bottom')) originY = -0.2;
            if (raysOrigin.includes('left')) originX = -0.2;
            if (raysOrigin.includes('right')) originX = 1.2;
            if (raysOrigin === 'center') { originX = 0.5; originY = 0.5; }

            // Correct logic for named positions
            if (raysOrigin === 'top-center') { originX = 0.5; originY = 1.1; }

            const color = new Color(raysColor);

            const programInstance = new Program(gl, {
                vertex: vert,
                fragment: frag,
                uniforms: {
                    uTime: { value: 0 },
                    uMouse: { value: mouseRef.current },
                    uResolution: { value: new Vec2(gl.canvas.width, gl.canvas.height) },
                    uColor: { value: new Color(raysColor) }, // OGL Color automatically handles hex
                    uSpeed: { value: raysSpeed },
                    uSpread: { value: lightSpread },
                    uLength: { value: rayLength },
                    uNoise: { value: noiseAmount },
                    uDistortion: { value: distortion },
                    uFade: { value: fadeDistance },
                    uPulsating: { value: pulsating ? 1 : 0 },
                    uOrigin: { value: new Vec2(originX, originY) },
                    uMouseInfluence: { value: mouseInfluence }
                },
                transparent: true,
            });

            programRef.current = programInstance;

            const mesh = new Mesh(gl, { geometry, program: programInstance });

            let animationId: number;

            const update = (t: number) => {
                animationId = requestAnimationFrame(update);
                const time = t * 0.001;

                programInstance.uniforms.uTime.value = time;
                programInstance.uniforms.uMouse.value = mouseRef.current;

                renderer.render({ scene: mesh });
            };

            animationId = requestAnimationFrame(update);

            const handleResize = () => {
                renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
                programInstance.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            const handleMouseMove = (e: MouseEvent) => {
                if (!followMouse) return;
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    mouseRef.current.set(e.clientX - rect.left, rect.height - (e.clientY - rect.top)); // Flip Y for WebGL
                }
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
                if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
                    containerRef.current.removeChild(gl.canvas);
                }
            };
        } catch {
            return;   // geen WebGL — de rays vervallen stil, de rest van de pagina niet
        }
    }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion, pulsating, fadeDistance, saturation]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ ...style, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
        />
    );
};

export default LightRays;
