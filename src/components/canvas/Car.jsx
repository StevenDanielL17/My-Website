'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useScrollStore } from '@/hooks/useScroll';
import { mapRange } from '@/utils/math';
import * as THREE from 'three';

export default function Car() {
    const groupRef = useRef();
    const mixerRef = useRef();
    const [model, setModel] = useState(null);
    const scroll = useScrollStore((state) => state.scroll);

    // Load GLTF model (placeholder path)
    // Note: useGLTF must be called at the top level, not in useEffect.
    // Since the file is currently missing in public/models, we keep this commented out.
    // const { scene, animations } = useGLTF('/models/porsche-exploded.glb');

    // Setup animation mixer if model was loaded
    /*
    useEffect(() => {
        if (scene && animations?.length) {
            const mixer = new THREE.AnimationMixer(scene);
            mixerRef.current = mixer;
            const action = mixer.clipAction(animations[0]);
            action.play();
            action.paused = true;
            setModel(scene);
        }
    }, [scene, animations]);
    */

    // THE BAKER STRATEGY: Bind scroll to animation time
    useFrame(() => {
        // Map scroll progress (0-1) to animation duration
        // This section is visible from scroll position 0.33 to 0.66
        const scrollStart = 0.33;
        const scrollEnd = 0.66;

        const isVisible = scroll >= scrollStart && scroll <= scrollEnd;

        // Update visibility
        if (groupRef.current) {
            groupRef.current.visible = isVisible;
        }

        if (isVisible && mixerRef.current) {
            const localProgress = mapRange(scroll, scrollStart, scrollEnd, 0, 1);

            // Get animation clip duration
            const clip = mixerRef.current._actions[0]._clip;
            const duration = clip.duration;

            // Set animation time directly based on scroll
            mixerRef.current.setTime(localProgress * duration);
        }
    });

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {/* Model will be loaded here */}
            {model && <primitive object={model} />}

            {/* Placeholder cube until model is added */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#666666" wireframe />
            </mesh>
        </group>
    );
}

// Preload the model (uncomment when model is available)
// useGLTF.preload('/models/porsche-exploded.glb');
