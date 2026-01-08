'use client';

import { create } from 'zustand';

export const useScrollStore = create((set) => ({
    scroll: 0,         // Normalized scroll position (0-1)
    scrollRaw: 0,      // Raw scroll position in pixels
    direction: 1,      // 1 for down, -1 for up
    velocity: 0,       // Scroll velocity
    setScroll: (scroll) => set({ scroll }),
    setScrollRaw: (scrollRaw) => set({ scrollRaw }),
    setDirection: (direction) => set({ direction }),
    setVelocity: (velocity) => set({ velocity }),
}));
