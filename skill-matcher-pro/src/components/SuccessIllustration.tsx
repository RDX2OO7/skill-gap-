import React from 'react';

export const SuccessIllustration = ({ className = "w-full h-full" }: { className?: string }) => (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
            <linearGradient id="success-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <stop offset="0%" stopColor="#6366f1" opacity="0.3" />
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Background Shapes */}
        <circle cx="250" cy="250" r="180" fill="indigo" fillOpacity="0.05" />
        <circle cx="250" cy="250" r="140" fill="indigo" fillOpacity="0.08" />

        {/* Central Dashboard Elements */}
        <rect x="150" y="180" width="200" height="140" rx="12" fill="white" filter="url(#glow)" />
        <rect x="170" y="200" width="60" height="8" rx="4" fill="#E2E8F0" />
        <rect x="170" y="215" width="100" height="8" rx="4" fill="#F1F5F9" />

        {/* Growth Bars */}
        <rect x="170" y="240" width="20" height="50" rx="4" fill="url(#success-grad)" fillOpacity="0.4" />
        <rect x="200" y="230" width="20" height="60" rx="4" fill="url(#success-grad)" fillOpacity="0.6" />
        <rect x="230" y="210" width="20" height="80" rx="4" fill="url(#success-grad)" fillOpacity="0.8" />
        <rect x="260" y="190" width="20" height="100" rx="4" fill="url(#success-grad)" />

        {/* Floating Success Indicator */}
        <circle cx="340" cy="180" r="30" fill="white" filter="url(#glow)" />
        <path d="M330 180L338 188L350 172" stroke="url(#success-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Decorative Nodes */}
        <circle cx="120" cy="250" r="8" fill="#6366f1" opacity="0.5" />
        <circle cx="380" cy="250" r="8" fill="#a855f7" opacity="0.5" />
        <circle cx="250" cy="100" r="8" fill="#6366f1" opacity="0.3" />
        <circle cx="250" cy="400" r="8" fill="#a855f7" opacity="0.3" />

        {/* Connecting Lines */}
        <path d="M128 250H150" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M350 250H372" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
);
