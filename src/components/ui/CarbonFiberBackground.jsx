'use client';

export default function CarbonFiberBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Base lighter black background */}
            <div className="absolute inset-0 bg-[#0f0f0f]" />

            {/* Carbon fiber texture overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 2px,
                            rgba(255, 255, 255, 0.02) 2px,
                            rgba(255, 255, 255, 0.02) 4px
                        ),
                        repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 2px,
                            rgba(255, 255, 255, 0.03) 2px,
                            rgba(255, 255, 255, 0.03) 4px
                        )
                    `,
                    backgroundSize: '8px 8px',
                }}
            />

            {/* Subtle metallic shine overlay */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background: `
                        radial-gradient(
                            ellipse at 20% 30%,
                            rgba(255, 255, 255, 0.08) 0%,
                            transparent 50%
                        ),
                        radial-gradient(
                            ellipse at 80% 70%,
                            rgba(255, 255, 255, 0.05) 0%,
                            transparent 50%
                        )
                    `
                }}
            />

            {/* Diagonal shimmer effect */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
                        linear-gradient(
                            135deg,
                            transparent 40%,
                            rgba(255, 255, 255, 0.03) 45%,
                            rgba(255, 255, 255, 0.06) 50%,
                            rgba(255, 255, 255, 0.03) 55%,
                            transparent 60%
                        )
                    `,
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 8s ease-in-out infinite',
                }}
            />

            {/* Add keyframe animation in style tag */}
            <style jsx>{`
                @keyframes shimmer {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </div>
    );
}
