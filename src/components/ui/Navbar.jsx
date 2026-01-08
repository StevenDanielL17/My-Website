'use client';

import { useState } from 'react';
import anime from 'animejs';

export default function Navbar({ onNavigate }) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: 'HOME', id: 'hero' },
        { label: 'ABOUT', id: 'about' },
        { label: 'WORK', id: 'work' },
        { label: 'STACK', id: 'stack' },
        { label: 'CONTACT', id: 'contact' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            // Animate menu items in
            anime({
                targets: '.menu-item',
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(50),
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    const handleNavClick = (sectionId) => {
        // Trigger shred animation before navigating
        if (onNavigate) {
            onNavigate(sectionId);
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* DW Logo - Top Left */}
            <div className="fixed top-6 left-6 z-[100]">
                <button
                    onClick={() => handleNavClick('hero')}
                    className="text-2xl font-bold tracking-wider hover:text-gray-400 transition-colors cursor-pointer"
                >
                    DW
                </button>
            </div>

            {/* Hamburger Button - Circular, Top Right */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-[100] w-16 h-16 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                aria-label="Toggle menu"
            >
                <div className="flex flex-col gap-1.5 items-center justify-center w-6">
                    <span
                        className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'
                            }`}
                    />
                    <span
                        className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0 w-4' : 'opacity-100 w-4'
                            }`}
                    />
                    <span
                        className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'
                            }`}
                    />
                </div>
            </button>

            {/* Compact Menu Panel - Top Right */}
            <div
                className={`fixed top-24 right-6 z-[90] glass rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                style={{
                    minWidth: '280px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
            >
                <nav>
                    <ul className="space-y-4">
                        {menuItems.map((item, index) => (
                            <li key={item.id} className="menu-item opacity-0">
                                <button
                                    onClick={() => handleNavClick(item.id)}
                                    className="text-2xl font-bold tracking-wider hover:text-gray-400 transition-colors duration-300 w-full text-left relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
