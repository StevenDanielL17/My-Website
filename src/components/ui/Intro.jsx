'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useTextFly } from '@/components/animations/useTextFly';

export default function Intro() {
    const circleRef = useRef(null);
    const dasherRef = useRef(null);
    const textRef = useRef(null);
    const videoRef = useRef(null);

    useTextFly(textRef, {
        duration: 1000,
        delay: 800,
    });

    useEffect(() => {
        // Base Circle Expansion
        anime({
            targets: circleRef.current,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 900,
            easing: 'easeOutQuad',
            delay: 300,
        });

        // Rotating Dashed Ring Animation
        anime({
            targets: dasherRef.current,
            rotate: 360,
            duration: 20000, // Slow constant rotation
            loop: true,
            easing: 'linear',
        });

        // Ensure video plays - with better browser compatibility
        if (videoRef.current) {
            videoRef.current.onerror = () => {
                if (videoRef.current) {
                    videoRef.current.style.display = 'none';
                }
            };

            const playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    // Silent catch for autoplay blocks
                });
            }
        }

        const handleUserInteraction = () => {
            if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => { });
            }
        };

        document.addEventListener('click', handleUserInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    return (
        <div className="relative text-center px-4">
            {/* Background Video */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-20"
                >
                    <source src="/videos/hero-background.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Quant HUD / Focus Ring */}
            <div className="relative mx-auto mb-8 w-[200px] h-[200px] flex items-center justify-center">
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 200"
                >
                    {/* 1. Static Outer Ring with Opacity */}
                    <circle
                        ref={circleRef}
                        cx="100"
                        cy="100"
                        r="95"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.2"
                    />

                    {/* 2. Rotating Dashed Data Ring */}
                    <g ref={dasherRef} transform-origin="100 100">
                        <circle
                            cx="100"
                            cy="100"
                            r="85"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 6" // Dashed pattern
                            opacity="0.4"
                        />
                        {/* Cardinal Lines on the Dashed Ring */}
                        <path d="M100 10 v10 M100 180 v10 M10 100 h10 M180 100 h10" stroke="white" strokeWidth="2" opacity="0.6" />
                    </g>

                    {/* 3. Inner Focus Bracket */}
                    <circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                        opacity="0.3"
                    />

                    {/* 4. Center Dot */}
                    <circle cx="100" cy="100" r="2" fill="white" opacity="0.8" />
                </svg>
            </div>

            {/* Hero Text */}
            <h1
                ref={textRef}
                className="text-7xl md:text-9xl font-bold tracking-tight"
                data-text="DANSWORLD"
            >
                DANSWORLD
            </h1>

            {/* Technical Role Statement */}
            <div className="mt-8 space-y-2">
                <p className="text-2xl md:text-3xl font-light tracking-wider text-gray-200">
                    Quant Engineering · Numerical Methods · Systems Reliability
                </p>
                <p className="text-lg md:text-xl text-gray-400 tracking-wide max-w-3xl mx-auto">
                    Numerical PDEs, Optimization, Stochastic Modeling, Backtesting Systems
                </p>
            </div>

            <p className="mt-6 text-xl md:text-2xl text-gray-400 tracking-wide">
                Where Precision Meets Imagination
            </p>
        </div>
    );
}
