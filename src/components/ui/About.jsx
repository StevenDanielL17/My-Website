'use client';

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarbonFiberBackground from './CarbonFiberBackground';
import LiveClock from './LiveClock';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const sectionRef = useRef(null);
    const portraitRef = useRef(null);
    const lettersContainerRef = useRef(null);
    const lettersRef = useRef([]);
    const contentRef = useRef(null);

    const sentence = "HI, I'M DAN – A CREATIVE QUANT DEVELOPER";
    const line1 = "HI, I'M DAN –";
    const line2 = "A CREATIVE QUANT DEVELOPER";

    const scatteredLetters = useMemo(() => {
        const usedLetters = sentence.split('');
        const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // Use deterministic selection to prevent hydration mismatch
        // Instead of random, use a pattern based on index
        for (let i = 0; i < 20; i++) {
            const index = (i * 7) % extraLetters.length; // Deterministic pattern
            usedLetters.push(extraLetters[index]);
        }

        return usedLetters.map((letter, index) => ({
            char: letter,
            isUsed: index < sentence.length,
            index: index
        }));
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // PIN the section - EXPANDED for more room
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=150%', // EXPANDED - more room to see methodology
                pin: true,
                pinSpacing: true,
                scrub: 1,
            });

            // Set initial random positions for letters
            lettersRef.current.forEach((letter) => {
                if (!letter) return;

                const angle = Math.random() * Math.PI * 2;
                const distance = 250 + Math.random() * 300;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                gsap.set(letter, {
                    x: x,
                    y: y,
                    rotation: Math.random() * 360 - 180,
                    opacity: 0.6
                });
            });

            // FLIP animation for portrait + zoom
            gsap.fromTo(portraitRef.current,
                {
                    rotateY: 180,
                    scale: 1,
                },
                {
                    rotateY: 0,
                    scale: 1.05,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    },
                }
            );

            // Animate USED letters to form sentence (20-30px below portrait)
            scatteredLetters.forEach((letterData, idx) => {
                const letter = lettersRef.current[idx];
                if (!letter || !letterData.isUsed) return;

                const charInSentence = sentence[idx];
                const isSpace = charInSentence === ' ';

                let targetX = 0;
                let targetY = 0;

                // Position for compact layout - text directly below portrait
                if (idx < line1.length) {
                    targetX = (idx - line1.length / 2) * 32;
                    targetY = 80; // Very close to image
                } else {
                    const posInLine = idx - line1.length;
                    targetX = (posInLine - line2.length / 2) * 32;
                    targetY = 120; // Second line close to first
                }

                gsap.to(letter, {
                    x: targetX,
                    y: targetY,
                    rotation: 0,
                    opacity: isSpace ? 0 : 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    },
                    ease: 'power2.out'
                });
            });

            // Drift away UNUSED letters
            scatteredLetters.forEach((letterData, idx) => {
                if (letterData.isUsed) return;

                const letter = lettersRef.current[idx];
                if (!letter) return;

                gsap.to(letter, {
                    y: '+=500',
                    opacity: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    },
                });
            });

            // Fade in content - MORE TIME to read
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: '+=100%', // Start later
                        end: '+=150%', // End at section release
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [scatteredLetters]);

    return (
        <section ref={sectionRef} className="relative min-h-screen">
            {/* Carbon Fiber Background - z-0 (bottom layer) */}
            <CarbonFiberBackground />

            {/* Version Label - Top Right - Fixed */}
            <div className="fixed top-6 right-24 z-20 font-mono text-sm text-gray-400 tracking-wider">
                DW 1.0
            </div>

            {/* Live Clock - Bottom Left - Fixed */}
            <LiveClock />

            {/* CENTERED layout with TOP PADDING - z-10 (content layer) */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                {/* Portrait - CENTERED at top with minimal bottom margin */}
                <div
                    ref={portraitRef}
                    className="relative w-80 h-[28rem] rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl grayscale bg-gray-900 mb-2"
                    style={{ perspective: '1000px' }}
                >
                    <img
                        src="/images/portrait.jpg"
                        alt="Dan"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl text-gray-700">D</div>';
                        }}
                    />
                </div>

                {/* Letters scattered around portrait - CENTERED */}
                <div
                    ref={lettersContainerRef}
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                >
                    {scatteredLetters.map((letterData, idx) => (
                        <span
                            key={idx}
                            ref={(el) => (lettersRef.current[idx] = el)}
                            className="absolute text-3xl font-bold text-white select-none"
                        >
                            {letterData.char}
                        </span>
                    ))}
                </div>

                <div ref={contentRef} className="w-full max-w-4xl mx-auto mt-16 mb-20 opacity-0 relative">
                    <div className="glass rounded-lg p-8 pb-32 space-y-6 backdrop-blur-md border border-white/10 relative overflow-hidden">

                        {/* QUANT DECORATION: Brownian Motion Background (Inside Glass) */}
                        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                            <BrownianChart />
                        </div>

                        {/* QUANT DECORATION: Metrics Card (Top Right of Card) */}
                        <div className="absolute top-4 right-4 z-20 opacity-80 scale-90 sm:scale-100">
                            <FloatingMetrics />
                        </div>

                        {/* Content Container (z-10 to sit above chart) */}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold">Methodology</h3>

                            <div className="space-y-4 text-gray-300 leading-relaxed max-w-2xl">
                                <p>
                                    I approach engineering problems by first formalizing assumptions,
                                    then selecting methods that favor stability and interpretability.
                                </p>

                                <p>
                                    Correctness and validation precede performance or novelty.
                                    Every model is treated as an approximation whose limits must be understood before deployment.
                                </p>
                            </div>

                            <blockquote className="border-l-4 border-white/20 pl-6 py-4 my-8 italic text-gray-400">
                                <p className="text-lg">"A model is only useful within the domain where its assumptions hold."</p>
                                <footer className="text-sm text-gray-500 not-italic">— Dan</footer>
                            </blockquote>

                            <div className="text-gray-300">
                                <p className="font-semibold mb-3">My work focuses on:</p>
                                <ul className="space-y-2 ml-6 list-disc text-gray-400">
                                    <li>Making assumptions explicit and testable</li>
                                    <li>Prioritizing numerical stability over optimization tricks</li>
                                    <li>Benchmarking against meaningful baselines</li>
                                    <li>Understanding failure modes before deployment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -----------------------------------------------------------------------------
// Sub-components for Quant Decoration
// -----------------------------------------------------------------------------

function FloatingMetrics() {
    // Simple mock metrics that "live update" could be added here
    return (
        <div className="glass p-4 rounded-xl border border-white/10 w-48 font-mono text-xs text-gray-400 select-none transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                <span>MODEL_PERF</span>
                <span className="text-green-400">● LIVE</span>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>SHARPE</span>
                    <span className="text-white">2.41</span>
                </div>
                <div className="flex justify-between">
                    <span>ALPHA</span>
                    <span className="text-white">+0.08%</span>
                </div>
                <div className="flex justify-between">
                    <span>VOL_30D</span>
                    <span className="text-yellow-400">14.2%</span>
                </div>
                <div className="flex justify-between">
                    <span>LATENCY</span>
                    <span className="text-white">82μs</span>
                </div>
            </div>
        </div>
    );
}

function BrownianChart() {
    // A simple SVG path that looks like a random walk
    // We can animate this if we want, but even static looks cool as a watermark
    const points = useMemo(() => {
        let path = "M 0 100";
        let y = 100;
        for (let x = 0; x <= 800; x += 10) {
            y += (Math.random() - 0.5) * 30; // Random walk step
            y = Math.max(20, Math.min(180, y)); // Clamp
            path += ` L ${x} ${y}`;
        }
        return path;
    }, []);

    return (
        <svg className="w-full h-full" preserveAspectRatio="none">
            <path
                d={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/10"
                vectorEffect="non-scaling-stroke"
            />
            {/* Gradient fill optionally */}
            <path
                d={`${points} L 800 200 L 0 200 Z`}
                fill="url(#chartGradient)"
                opacity="0.1"
            />
            <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    );
}
