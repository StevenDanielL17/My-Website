'use client';

import { useRef, useState, useEffect } from 'react';
import { projects } from '@/data/projectsData';
import anime from 'animejs';

export default function ProjectList() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const projectRefs = useRef([]);

    useEffect(() => {
        // Scroll to current project with smooth animation
        if (projectRefs.current[currentIndex]) {
            const container = containerRef.current;
            const project = projectRefs.current[currentIndex];
            const scrollPosition = project.offsetLeft - (container.offsetWidth / 2) + (project.offsetWidth / 2);

            anime({
                targets: container,
                scrollLeft: scrollPosition,
                duration: 800,
                easing: 'easeInOutQuad'
            });
        }
    }, [currentIndex]);

    const handlePrevious = () => {
        setCurrentIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-16 text-center">Selected Works</h2>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handlePrevious}
                    className="glass rounded-full p-4 hover:bg-white/10 transition-smooth z-10"
                    aria-label="Previous project"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="text-center flex-1 mx-8">
                    <p className="text-gray-400 font-mono">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </p>
                </div>

                <button
                    onClick={handleNext}
                    className="glass rounded-full p-4 hover:bg-white/10 transition-smooth z-10"
                    aria-label="Next project"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex gap-8 overflow-x-hidden pb-8 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={el => projectRefs.current[index] = el}
                        className={`glass rounded-lg p-8 flex-shrink-0 w-[600px] transition-all duration-500 ${index === currentIndex
                                ? 'scale-100 opacity-100'
                                : 'scale-95 opacity-50'
                            }`}
                    >
                        {/* Video Demo Box */}
                        <div className="relative w-full h-64 bg-black/30 rounded-lg overflow-hidden mb-6">
                            <video
                                className="w-full h-full object-cover"
                                loop
                                muted
                                playsInline
                                onMouseEnter={(e) => e.target.play()}
                                onMouseLeave={(e) => e.target.pause()}
                            >
                                <source src={project.videoPath} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-gray-500 text-sm">
                                    Hover to preview
                                </div>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-3">
                                        {project.summary}
                                    </p>
                                </div>
                                <span className="text-gray-500 text-sm ml-4">{project.year}</span>
                            </div>

                            {/* Method Tag */}
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-300 border border-white/10">
                                    {project.method}
                                </span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                                    {project.category}
                                </span>
                            </div>

                            {/* Link to Case File */}
                            <button className="mt-4 w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-smooth text-sm">
                                View Full Case File →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS to hide scrollbar */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
