'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useMouseTracking } from '@/hooks/useMouse';
import Hero from './Hero';
import Car from './Car';
import Lights from './Lights';

export default function Scene() {
    // Initialize mouse tracking
    useMouseTracking();
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                camera={{
                    position: [0, 0, 8],
                    fov: 45,
                    near: 0.1,
                    far: 100,
                }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance (was unlimited)
                performance={{ min: 0.5 }} // Add performance mode
                gl={{
                    antialias: false, // Disabled for better performance
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false, // Disable stencil buffer
                    depth: true,
                }}
            >
                {/* Lights */}
                <Lights />

                {/* 3D Objects */}
                <Hero />
                <Car />

                {/* Environment */}
                <Environment preset="studio" />

                {/* Dev Controls (remove in production) */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
            </Canvas>
        </div>
    );
}
