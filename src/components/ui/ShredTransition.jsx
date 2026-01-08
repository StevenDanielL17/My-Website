'use client';

import { useRef, useEffect } from 'react';
import anime from 'animejs';

export default function ShredTransition({ isActive, onComplete }) {
    const containerRef = useRef(null);
    const shredCount = 25; // Number of vertical shreds (reduced for performance)

    useEffect(() => {
        if (isActive && containerRef.current) {
            const shreds = containerRef.current.querySelectorAll('.shred');

            // Animate shreds with GPU acceleration
            anime({
                targets: shreds,
                translateY: [0, () => anime.random(-2000, 2000)],
                translateX: [0, () => anime.random(-500, 500)],
                rotate: [0, () => anime.random(-180, 180)],
                opacity: [1, 0],
                duration: 900, // Reduced from 1200ms for faster transition
                delay: anime.stagger(15, { start: 0 }), // Reduced stagger delay
                easing: 'easeInExpo',
                complete: () => {
                    if (onComplete) onComplete();
                }
            });
        }
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] pointer-events-none"
            style={{ perspective: '1000px' }}
        >
            {Array.from({ length: shredCount }).map((_, index) => (
                <div
                    key={index}
                    className="shred absolute top-0 bottom-0 bg-black"
                    style={{
                        left: `${(index / shredCount) * 100}%`,
                        width: `${100 / shredCount}%`,
                        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 100%)',
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)', // Reduced shadow for performance
                        willChange: 'transform, opacity', // GPU acceleration hint
                        transform: 'translateZ(0)', // Force GPU layer
                    }}
                />
            ))}
        </div>
    );
}
