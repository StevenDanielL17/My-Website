'use client';

import { useEffect } from 'react';
import anime from 'animejs';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export function useTextFly(ref, options = {}) {
    const {
        duration = 800,
        delay = 0,
        decodeIterations = 10,
    } = options;

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const originalText = element.getAttribute('data-text') || element.textContent;
        const textLength = originalText.length;

        // Decoding animation
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iteration += 1 / decodeIterations;

            if (iteration >= textLength) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, duration / textLength / decodeIterations);

        // Entrance animation
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [20, 0],
            duration,
            delay,
            easing: 'easeOutQuad',
        });

        return () => clearInterval(interval);
    }, [ref, duration, delay, decodeIterations]);
}
