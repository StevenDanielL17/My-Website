'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from '@/components/ui/IntroAnimation';
import Loader from '@/components/ui/Loader';
import Intro from '@/components/ui/Intro';
import Navbar from '@/components/ui/Navbar';
import ProjectList from '@/components/ui/ProjectList';
import About from '@/components/ui/About';
import TechStack from '@/components/ui/TechStack';
import Contact from '@/components/ui/Contact';
import ShredTransition from '@/components/ui/ShredTransition';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
    ssr: false,
    loading: () => null,
});

export default function Home() {
    const [introFinished, setIntroFinished] = useState(false);
    const [shredActive, setShredActive] = useState(false);

    // Initialize smooth scroll for fluid experience
    useSmoothScroll();

    // Scroll to top on page load/reload
    useEffect(() => {
        /* window.scrollTo(0, 0); */ // Removed - Lenis handles this
    }, []);

    // Handle navigation with shred transition
    const handleNavigate = (sectionId) => {
        setShredActive(true);

        // Scroll immediately when shred animation starts
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    };

    // When shred animation completes, just reset state
    const handleShredComplete = () => {
        setShredActive(false);
    };

    return (
        <main>
            {/* Shred Transition Overlay */}
            <ShredTransition isActive={shredActive} onComplete={handleShredComplete} />

            {/* 1. Show Intro Animation if it hasn't finished yet */}
            {!introFinished && (
                <IntroAnimation onComplete={() => setIntroFinished(true)} />
            )}

            {/* 2. Main Website Content (Fades in once intro is done) */}
            <div
                className={`transition-opacity duration-1000 ${introFinished ? "opacity-100" : "opacity-0"}`}
            >
                {/* 3D Canvas Background (Persistent) */}
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>

                {/* HTML Content Overlay */}
                <div className="relative z-10">
                    <Navbar onNavigate={handleNavigate} />

                    {/* Hero Section */}
                    <section id="hero" className="min-h-screen flex items-center justify-center">
                        <Intro />
                    </section>

                    {/* About Section */}
                    <div id="about">
                        <About />
                    </div>

                    {/* Projects Section */}
                    <section id="work" className="min-h-screen py-20">
                        <ProjectList />
                    </section>

                    {/* Tech Stack Section */}
                    <div id="stack">
                        <TechStack />
                    </div>

                    {/* Contact Section */}
                    <div id="contact">
                        <Contact />
                    </div>
                </div>
            </div>
        </main>
    );
}
