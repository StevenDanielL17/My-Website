'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useScrollStore } from '@/hooks/useScroll';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function RootLayout({ children }) {
    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Update scroll store on scroll
        lenis.on('scroll', ({ scroll, limit, velocity, direction }) => {
            const normalizedScroll = scroll / limit;
            useScrollStore.setState({
                scroll: normalizedScroll,
                scrollRaw: scroll,
                direction,
                velocity,
            });
        });

        // Animation loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}

