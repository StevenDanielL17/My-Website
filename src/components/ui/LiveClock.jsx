'use client';

import { useState, useEffect } from 'react';

export default function LiveClock() {
    const [time, setTime] = useState(null); // Start as null to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Component is now client-side mounted

        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // Don't render until client-side to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="fixed bottom-6 left-6 z-20 glass rounded-lg px-4 py-2 backdrop-blur-xl border border-white/10">
            <div className="font-mono text-sm text-gray-300">
                {time || '00:00:00'}
            </div>
        </div>
    );
}
