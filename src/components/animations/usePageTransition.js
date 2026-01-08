'use client';

import { useEffect } from 'react';
import anime from 'animejs';

export function usePageTransition(trigger, options = {}) {
    const {
        duration = 600,
        easing = 'easeInOutQuad',
        onComplete,
    } = options;

    useEffect(() => {
        if (!trigger) return;

        // Page exit animation
        const exitTimeline = anime.timeline({
            easing,
            complete: onComplete,
        });

        exitTimeline
            .add({
                targets: '.page-content',
                opacity: [1, 0],
                translateY: [0, -20],
                duration: duration / 2,
            })
            .add({
                targets: '.page-overlay',
                scaleY: [0, 1],
                duration: duration / 2,
            });

        // Page enter animation
        const enterTimeline = anime.timeline({
            easing,
            delay: duration,
        });

        enterTimeline
            .add({
                targets: '.page-overlay',
                scaleY: [1, 0],
                duration: duration / 2,
            })
            .add({
                targets: '.page-content',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: duration / 2,
            });

    }, [trigger, duration, easing, onComplete]);
}
