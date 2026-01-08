'use client';

import { useEffect, useRef, useState } from 'react';

export default function Contact() {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Check if canvas context is available (Brave may block it)
        if (!ctx) {
            console.log('Canvas context unavailable - browser may be blocking fingerprinting');
            // Fallback: just show static grey background
            return;
        }

        let animationFrameId;
        let time = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse position
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            };
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        // Wave parameters
        const waveCount = 5;
        const waveSpeed = 0.02;
        const waveAmplitude = 30;

        // Render loop
        const render = () => {
            const { width, height } = canvas;
            time += waveSpeed;

            // Clear canvas with grey background
            ctx.fillStyle = '#2a2a2a';
            ctx.fillRect(0, 0, width, height);

            // Draw waves
            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();

                const offset = (i / waveCount) * Math.PI * 2;
                const yBase = height * 0.5 + (i - waveCount / 2) * 40;

                // Mouse influence
                const mouseInfluenceX = (mousePos.current.x - 0.5) * 100;
                const mouseInfluenceY = (mousePos.current.y - 0.5) * 50;

                for (let x = 0; x <= width; x += 5) {
                    const distanceToMouse = Math.abs(x - mousePos.current.x * width);
                    const ripple = Math.max(0, 1 - distanceToMouse / 200);

                    const y = yBase +
                        Math.sin(x * 0.01 + time + offset) * waveAmplitude +
                        mouseInfluenceY * ripple +
                        Math.sin(time * 2 + offset) * 10;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                // Gradient stroke
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, `rgba(100, 100, 100, ${0.2 + i * 0.1})`);
                gradient.addColorStop(0.5, `rgba(150, 150, 150, ${0.3 + i * 0.1})`);
                gradient.addColorStop(1, `rgba(100, 100, 100, ${0.2 + i * 0.1})`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Add subtle particles
            ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
            for (let i = 0; i < 30; i++) {
                const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
                const y = (Math.cos(time * 0.7 + i * 0.5) * 0.5 + 0.5) * height;
                const size = Math.sin(time + i) * 2 + 2;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted]);

    const contactInfo = [
        {
            label: 'Email',
            value: 'lstevendaniel43@gmail.com',
            href: 'mailto:lstevendaniel43@gmail.com',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: 'GitHub',
            value: 'github.com/StevenDanielL17',
            href: 'https://github.com/StevenDanielL17',
            icon: (
                <svg width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
            )
        },
        {
            label: 'LinkedIn',
            value: 'linkedin.com/in/stevendaniell',
            href: 'https://linkedin.com/in/stevendaniell',
            icon: (
                <svg width="24" height="24" fill="currentColor">
                    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative min-h-screen py-32 overflow-hidden">
            {/* Wave Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: '#2a2a2a' }}
            />

            {/* Contact Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <h2 className="text-5xl font-bold mb-16 text-center text-white drop-shadow-lg">
                    Get In Touch
                </h2>

                <div className="space-y-6">
                    {contactInfo.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block glass rounded-lg p-6 hover:bg-white/20 transition-all duration-300 group backdrop-blur-md"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-gray-300 group-hover:text-white transition-colors">
                                    {contact.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                                    <p className="text-xl font-light text-white group-hover:translate-x-2 transition-transform">
                                        {contact.value}
                                    </p>
                                </div>
                                <svg
                                    className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400 text-sm backdrop-blur-sm bg-black/20 rounded-full px-6 py-3 inline-block">
                        Open to quant research and engineering opportunities
                    </p>
                </div>
            </div>
        </section>
    );
}
