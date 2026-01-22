import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Zap, Target, BarChart, ShieldCheck, Sparkles, Trophy, Database, Cpu, Layout, FileCode } from 'lucide-react';

export const AbstractCollage = () => {
    return (
        <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/4 left-3/4 w-[150px] h-[150px] bg-purple-200/20 rounded-full blur-[80px]" />

            {/* Main Container for Floating Elements */}
            <div className="relative w-[380px] h-[380px]">

                {/* Career Roadmap Path (SVG) */}
                <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-20 translate-x-5 translate-y-5">
                        <motion.path
                            d="M 40 320 Q 140 280 90 180 T 320 40"
                            fill="none"
                            stroke="url(#pathGradient)"
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            animate={{ strokeDashoffset: [-100, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Orbiting Skill Badges */}
                <SkillOrbit radius={140} speed={25}>
                    <div className="p-1.5 bg-blue-50 rounded-lg shadow-sm border border-blue-100 scale-90"><Layout className="w-4 h-4 text-blue-500" /></div>
                    <div className="p-1.5 bg-yellow-50 rounded-lg shadow-sm border border-yellow-100 scale-90"><FileCode className="w-4 h-4 text-yellow-500" /></div>
                    <div className="p-1.5 bg-orange-50 rounded-lg shadow-sm border border-orange-100 scale-90"><Database className="w-4 h-4 text-orange-500" /></div>
                    <div className="p-1.5 bg-emerald-50 rounded-lg shadow-sm border border-emerald-100 scale-90"><Cpu className="w-4 h-4 text-emerald-500" /></div>
                </SkillOrbit>

                {/* Floating Card 1 - Analytics (Enhanced) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute top-4 left-4 z-20 p-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 w-48 group"
                    style={{ rotate: '-6deg' }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Skill Match</span>
                        </div>
                        <BarChart className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex gap-2 items-end h-12">
                            {[40, 70, 50, 90, 60].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-sm"
                                />
                            ))}
                        </div>
                        <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold">
                            <span className="text-emerald-600">82.4% Ready</span>
                            <span className="text-gray-400">Target: SDE 1</span>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Card 2 - Profile (Enhanced with Level) */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 -right-6 z-20 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-44 overflow-hidden"
                    style={{ rotate: '4deg' }}
                >
                    <div className="absolute top-0 right-0 p-2"><Sparkles className="w-4 h-4 text-yellow-400" /></div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                                        <Brain className="w-8 h-8 opacity-40" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full border border-white">Lvl 24</div>
                        </div>
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-500"
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ duration: 2, delay: 1 }}
                            />
                        </div>
                        <div className="flex gap-1 w-full justify-center">
                            {['Python', 'React', 'DSA'].map((s, i) => (
                                <div key={i} className="px-2 py-0.5 bg-indigo-50 rounded-full text-[8px] font-bold text-indigo-400">{s}</div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Floating Card 3 - Roadmap/Achievement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute bottom-8 left-6 z-30 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 w-48"
                    style={{ rotate: '-2deg' }}
                >
                    <div className="flex gap-3 items-center mb-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-yellow-600 animate-bounce" style={{ animationDuration: '3s' }} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Milestone Unlocked</p>
                            <div className="h-2 w-20 bg-emerald-100 rounded-full" />
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-500 italic">"Problem Solving rank increased!"</div>
                </motion.div>

                {/* Floating Icons */}
                <FloatingIcon Icon={Code} className="top-1/4 left-1/4 text-indigo-400" delay={0.1} />
                <FloatingIcon Icon={Zap} className="bottom-1/3 right-1/4 text-yellow-400 scale-125" delay={0.8} />

                {/* Abstract Connection Web */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
                    <svg width="100%" height="100%" viewBox="0 0 400 400">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <circle cx="200" cy="200" r="100" stroke="indigo" strokeWidth="0.5" strokeDasharray="10 5" fill="none" />
                        <motion.circle
                            cx="200" cy="200" r="140" stroke="#6366f1" strokeWidth="0.3" fill="none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Interactive Nodes */}
                        {[0, 90, 180, 270].map(angle => (
                            <motion.circle
                                key={angle}
                                cx={200 + 100 * Math.cos(angle * Math.PI / 180)}
                                cy={200 + 100 * Math.sin(angle * Math.PI / 180)}
                                r="4"
                                fill="indigo"
                                filter="url(#glow)"
                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, delay: angle / 100 }}
                            />
                        ))}
                    </svg>
                </div>
            </div>

        </div>
    );
};

const FloatingIcon = ({ Icon, className, delay }: { Icon: any, className: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
        }}
        transition={{
            opacity: { duration: 1, delay },
            y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`absolute z-10 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm ${className}`}
    >
        <Icon className="w-5 h-5" />
    </motion.div>
);

const SkillOrbit = ({ children, radius, speed }: { children: React.ReactNode[], radius: number, speed: number }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none z-10">
            {React.Children.map(children, (child, index) => {
                const angle = (index / children.length) * 360;
                return (
                    <motion.div
                        className="absolute"
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: speed,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: radius * 2,
                            height: radius * 2,
                        }}
                    >
                        <motion.div
                            className="absolute pointer-events-auto"
                            style={{
                                top: 0,
                                left: '50%',
                                translateX: '-50%',
                                translateY: '-50%',
                            }}
                            animate={{
                                rotate: [0, -360]
                            }}
                            transition={{
                                duration: speed,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {child}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};
