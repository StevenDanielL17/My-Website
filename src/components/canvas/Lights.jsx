'use client';

export default function Lights() {
    return (
        <>
            {/* Ambient Light - Base illumination */}
            <ambientLight intensity={0.3} />

            {/* Main Directional Light - Key light */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Fill Light - Soften shadows */}
            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.4}
                color="#4080ff"
            />

            {/* Rim Light - Edge definition */}
            <directionalLight
                position={[0, 5, -10]}
                intensity={0.5}
                color="#ff8040"
            />

            {/* Point Light - Accent */}
            <pointLight
                position={[0, 3, 0]}
                intensity={0.5}
                distance={10}
                decay={2}
                color="#ffffff"
            />
        </>
    );
}
