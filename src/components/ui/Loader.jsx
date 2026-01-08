'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function Loader() {
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Bee particles
        const particles = [];
        const numParticles = 100;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                char: String.fromCharCode(48 + Math.floor(Math.random() * 10)), // 0-9
            });
        }

        // Animate progress
        anime({
            targets: { value: 0 },
            value: 100,
            duration: 2800,
            easing: 'easeInOutQuad',
            update: (anim) => {
                setProgress(Math.floor(anim.animations[0].currentValue));
            },
        });

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw character
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '14px monospace';
                ctx.fillText(p.char, p.x, p.y);
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="relative z-10 text-center">
                <h1 className="text-8xl font-bold font-mono">{progress}%</h1>
                <p className="mt-4 text-sm tracking-wider opacity-60">LOADING EXPERIENCE</p>
            </div>
        </div>
    );
}
