"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

const IntroAnimation = ({ onComplete }) => {
    const animationRef = useRef(null);

    useEffect(() => {
        // 1. Set up the Timeline (optimized for faster load)
        const tl = anime.timeline({
            easing: "easeOutExpo",
            duration: 800, // Reduced from 1000ms
            complete: () => {
                // When animation finishes, wait 300ms then tell parent to remove this component
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 300); // Reduced from 500ms
            },
        });

        // 2. The Animation Sequence
        tl
            // Step A: Draw the colored lines (Stroke Offset)
            .add({
                targets: ".intro-line",
                strokeDashoffset: [anime.setDashoffset, 0], // From hidden to visible
                opacity: [0, 1],
                duration: 1000, // Reduced from 1200ms
                delay: anime.stagger(80), // Reduced from 100ms
                easing: "easeInOutSine",
            })
            // Step B: Rotate the entire SVG container while lines are drawing
            .add({
                targets: ".intro-svg",
                rotate: [0, 360],
                duration: 2000, // Reduced from 2500ms
                easing: "easeOutQuart", // Starts fast, slows down smoothly
            }, "-=800") // Adjusted timing
            // Step C: Pulse the center dot
            .add({
                targets: ".intro-dot",
                scale: [0, 1],
                opacity: [0, 1],
                duration: 600, // Reduced from 800ms
                easing: "easeOutQuad", // Changed from elastic for performance
            }, "-=1600"); // Adjusted timing

        return () => { };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black" ref={animationRef}>
            <svg className="intro-svg w-[300px] h-[300px]" viewBox="0 0 200 200">
                {/* Background Ring (Faint Grey) */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#333" strokeWidth="2" opacity="0.3" />

                {/* The 4 Colored Arcs (Red, Yellow, Green, Cyan) */}
                {/* We use 'path' with 'd' commands to draw partial circles */}
                <path
                    className="intro-line text-red-500"
                    d="M100 10 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    className="intro-line text-yellow-400"
                    d="M190 100 A 90 90 0 0 1 100 190"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    className="intro-line text-green-500"
                    d="M100 190 A 90 90 0 0 1 10 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    className="intro-line text-cyan-400"
                    d="M10 100 A 90 90 0 0 1 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Center Dot */}
                <circle className="intro-dot text-white" cx="100" cy="100" r="4" fill="currentColor" />
            </svg>
        </div>
    );
};

export default IntroAnimation;
