'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth scroll hook using Lenis
 * Creates a fluid, weighted scroll experience
 * Syncs with GSAP ScrollTrigger for animations
 */
export function useSmoothScroll() {
    useEffect(() => {
        // Initialize Lenis with smooth scroll configuration
        const lenis = new Lenis({
            duration: 1.5, // Increased for "butter" feel (was 1.2)
            easing: (t) => 1 - Math.pow(1 - t, 4), // Ease Out Quartic (Super smooth)
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false, // Disable on touch devices for native feel
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Integrate with GSAP ticker for smooth animation frame updates
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Ensure ScrollTrigger uses Lenis for position calculations
        gsap.ticker.lagSmoothing(0);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);
}
