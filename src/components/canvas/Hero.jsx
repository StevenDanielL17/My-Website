'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMouseStore } from '@/hooks/useMouse';
import { useScrollStore } from '@/hooks/useScroll';
import * as THREE from 'three';

export default function Hero() {
    const pointsRef = useRef();
    const mouse = useMouseStore((state) => state.position);
    const scroll = useScrollStore((state) => state.scroll);

    // Number of particles
    const COUNT = 4000;

    // Generate random positions for particles within a sphere/cloud
    const [positions, finalPositions] = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        const finalPos = new Float32Array(COUNT * 3);

        for (let i = 0; i < COUNT; i++) {
            // Spherical distribution
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const r = 2 + Math.random() * 3; // Radius between 2 and 5

            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            // We can use the same array for start/end if we want static shape,
            // or different for morphing. Let's keep it simple for now.
            finalPos[i * 3] = x;
            finalPos[i * 3 + 1] = y;
            finalPos[i * 3 + 2] = z;
        }
        return [pos, finalPos];
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        // 1. Continuous slow rotation
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += delta * 0.02;

        // 2. Mouse Parallax (Smooth lerp)
        // We move the entire cloud slightly based on mouse
        pointsRef.current.position.x = THREE.MathUtils.lerp(
            pointsRef.current.position.x,
            mouse.x * 0.5,
            delta * 2 // Smoothness factor
        );
        pointsRef.current.position.y = THREE.MathUtils.lerp(
            pointsRef.current.position.y,
            mouse.y * 0.5,
            delta * 2
        );

        // 3. Scroll opacity fade out
        // As user scrolls down, cloud fades out
        const opacity = THREE.MathUtils.clamp(1 - scroll * 4, 0, 1);
        if (pointsRef.current.material) {
            pointsRef.current.material.opacity = opacity;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={COUNT}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
