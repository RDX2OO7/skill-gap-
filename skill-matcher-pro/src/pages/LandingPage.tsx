import { useState, useEffect, MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Target, BarChart3, BookOpen, Hexagon, CheckCircle, Building2 } from 'lucide-react';
const features = [
    {
        icon: Target,
        title: 'Choose Your Target',
        description: 'Select company type and role to get personalized alignment analysis',
    },
    {
        icon: BarChart3,
        title: 'Visual Gap Analysis',
        description: 'See exactly where you stand with intuitive charts and progress bars',
    },
    {
        icon: BookOpen,
        title: 'Smart Recommendations',
        description: 'Get actionable suggestions to close skill gaps efficiently',
    },
    {
        icon: Hexagon,
        title: 'What-If Simulator',
        description: 'See how completing specific tasks improves your alignment score',
    },
    {
        icon: Building2,
        title: 'Company Analyzer',
        description: 'Get AI-powered insights on any company and role requirements',
    },
];

const steps = [
    'Select company type & target role',
    'Add your current skills',
    'View alignment dashboard',
    'Get improvement plan',
];

// Typing animation component
function TypingText({
    fullText,
    speed = 100,
    waitTime = 3000
}: {
    fullText: string;
    speed?: number;
    waitTime?: number;
}) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (!isTyping) {
            // Wait before restarting
            const waitTimer = setTimeout(() => {
                setDisplayedText('');
                setCurrentIndex(0);
                setIsTyping(true);
            }, waitTime);
            return () => clearTimeout(waitTimer);
        }

        if (currentIndex < fullText.length) {
            const timer = setTimeout(() => {
                setDisplayedText(fullText.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            // Finished typing, wait before restarting
            setIsTyping(false);
        }
    }, [currentIndex, fullText, speed, waitTime, isTyping]);

    // Blinking cursor animation
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // Split text to apply gradient to "What to Learn"
    const beforeGradient = "Stop Guessing ";

    const isBeforeGradient = displayedText.length <= beforeGradient.length;
    const gradientPart = displayedText.slice(beforeGradient.length);

    return (
        <span>
            {isBeforeGradient ? (
                <span className="text-foreground">{displayedText}</span>
            ) : (
                <>
                    <span className="text-foreground">{beforeGradient}</span>
                    <span className="text-gradient">{gradientPart}</span>
                </>
            )}
            <motion.span
                className="inline-block w-1 h-[1em] align-bottom ml-1 bg-primary"
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </span>
    );
}

import { HeroBackground } from '@/components/HeroBackground';

// ... existing imports

import { NovonexLogo } from '@/components/NovonexLogo';

export default function LandingPage() {
    const { demoMode } = useApp();
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ clientX, clientY }: MouseEvent) {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section
                className="relative pt-32 pb-20 px-6 overflow-hidden group"
                onMouseMove={handleMouseMove}
            >
                {/* Purple Arc Background - Brighter */}
                <div
                    ref={containerRef}
                    className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[140%] h-[700px] md:h-[800px] bg-background rounded-b-[50%] border-b border-purple-400/50 shadow-[0_20px_120px_rgba(168,85,247,0.4)] z-0 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-700/20 to-transparent" />

                    {/* Mouse following gradient - constrained inside the arc */}
                    <motion.div
                        className="absolute inset-0 opacity-100 will-change-transform"
                        style={{
                            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(168,85,247,0.5), transparent 70%)`
                        }}
                    />

                    {/* Glowing bottom edge effect */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                    <div className="absolute bottom-[-1px] left-0 w-full h-[80px] bg-purple-500/40 blur-[40px]" />
                </div>

                <div className="container mx-auto max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
                        >
                            <Hexagon className="w-4 h-4" fill="currentColor" />
                            Internship Readiness Made Clear
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-6xl font-bold leading-tight mb-6 relative min-h-[4rem] md:min-h-[6rem] flex items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <TypingText
                                fullText="Stop Guessing What to Learn"
                                speed={80}
                                waitTime={4000}
                            />
                        </motion.h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                            Align your skills with real company expectations. See your gaps visually,
                            understand what matters most, and get a clear path to internship readiness.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="outline" size="xl" asChild>
                                <Link to="/select">
                                    Check Your Readiness
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="xl" asChild>
                                <Link to="/analyzer">
                                    <Building2 className="w-5 h-5 mr-1" />
                                    Company Analyzer
                                </Link>
                            </Button>
                            <Button variant="outline" size="xl" asChild>
                                <Link to="/simulator">
                                    <Target className="w-5 h-5 mr-1" />
                                    Interview Practice
                                </Link>
                            </Button>
                            {demoMode && (
                                <Button variant="outline" size="xl" asChild>
                                    <Link to="/dashboard">
                                        View Demo Dashboard
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </motion.div>

                    {/* Ambient Hero Illustration - Replaced by HeroBackground */}
                    {/* Handled mobile view separately if needed, but keeping it simple for now as per "right or left" on home page */}

                    {/* How it works */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-20"
                    >
                        <div className="flex flex-wrap justify-center gap-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
                                >
                                    <span className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center text-xs font-bold text-primary-foreground">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium">{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Features Section */}
            < section className="py-20 px-6 bg-muted/50" >
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">How NOVONEX Helps You</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Get clarity on where you stand and what you need to do next
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-20 px-6" >
                <div className="container mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to Align Your Skills?</h2>
                        <p className="text-muted-foreground mb-8">
                            Takes less than 5 minutes to see where you stand
                        </p>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/select">
                                Get Started Now
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section >

            {/* Footer */}
            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border bg-background/50 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <NovonexLogo className="w-6 h-6" />
                        <span className="font-semibold tracking-tight">NOVONEX</span>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm font-bold text-foreground/90">
                            &copy; {new Date().getFullYear()} All rights reserved by <span className="text-primary">RITESH(RDX)</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                            Designed to bridge the gap between academic learning and industry expectations.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
