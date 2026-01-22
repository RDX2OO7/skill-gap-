import React from 'react';

export const NovonexLogo = ({ className = "w-8 h-8", ...props }: React.ComponentProps<'svg'>) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
        <defs>
            <linearGradient id="novo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
                <stop offset="50%" stopColor="#a855f7" /> {/* Purple-500 */}
                <stop offset="100%" stopColor="#ec4899" /> {/* Pink-500 */}
            </linearGradient>
        </defs>

        {/* Background Glow */}
        <path d="M25 80 V20 L75 80 V20" stroke="url(#novo-gradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" filter="blur(4px)" />

        {/* Main Shape: Stylized N with nodes */}
        <path d="M25 80 V20 L75 80 V20" stroke="url(#novo-gradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

        {/* Nodes */}
        <circle cx="25" cy="20" r="8" fill="white" stroke="url(#novo-gradient)" strokeWidth="4" />
        <circle cx="75" cy="80" r="8" fill="white" stroke="url(#novo-gradient)" strokeWidth="4" />

        {/* Connection Dots (Decorative) */}
        <circle cx="25" cy="80" r="6" fill="url(#novo-gradient)" />
        <circle cx="75" cy="20" r="6" fill="url(#novo-gradient)" />
    </svg>
);
