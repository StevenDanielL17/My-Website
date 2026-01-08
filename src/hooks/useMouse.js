'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

export const useMouseStore = create((set) => ({
    position: { x: 0, y: 0 },      // Normalized position (-1 to 1)
    positionRaw: { x: 0, y: 0 },   // Raw pixel position
    velocity: { x: 0, y: 0 },      // Mouse velocity
    setPosition: (position) => set({ position }),
    setPositionRaw: (positionRaw) => set({ positionRaw }),
    setVelocity: (velocity) => set({ velocity }),
}));

// Hook to initialize mouse tracking
export function useMouseTracking() {
    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let lastTime = Date.now();

        const handleMouseMove = (e) => {
            const now = Date.now();
            const dt = now - lastTime;

            // Normalized coordinates (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Calculate velocity
            const vx = (e.clientX - lastX) / dt;
            const vy = (e.clientY - lastY) / dt;

            useMouseStore.setState({
                position: { x, y },
                positionRaw: { x: e.clientX, y: e.clientY },
                velocity: { x: vx, y: vy },
            });

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = now;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
}
