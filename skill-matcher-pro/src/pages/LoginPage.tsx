import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, BookOpen, Target } from "lucide-react";
import { NovonexLogo } from "@/components/NovonexLogo";

import { AbstractCollage } from "@/components/AbstractCollage";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, authLoading } = useApp();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Auto-redirect if already logged in
    useEffect(() => {
        if (!authLoading && user) {
            navigate("/landing");
        }
    }, [user, authLoading, navigate]);

    // Show nothing while checking auth state or if already redirecting
    if (authLoading || user) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, googleProvider);
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            navigate("/landing");
        } catch (error: any) {
            console.error("Login Error:", error);
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            navigate("/landing");
        } catch (error: any) {
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 bg-[#020617]">
            {/* Immersive Background Layer (Blurred Landing Page Preview) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* 1. Recognizable Landing Page Shapes */}
                <div className="absolute inset-0 opacity-30 blur-[12px] scale-105 pointer-events-none select-none">
                    {/* The Giant Purple Arc (Signature of Home Page) */}
                    <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[180%] h-[900px] bg-gradient-to-b from-indigo-600 via-purple-600 to-transparent rounded-b-[50%] opacity-60 shadow-[0_50px_200px_rgba(79,70,229,0.9)]" />

                    {/* Floating "Sections" (Boxes to mimic landing page features) */}
                    <div className="absolute top-[40%] left-[10%] w-[35%] h-72 bg-indigo-500/25 rounded-[3rem] rotate-[-12deg]" />
                    <div className="absolute top-[35%] right-[5%] w-[30%] h-96 bg-purple-500/25 rounded-[4rem] rotate-[8deg]" />
                    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-48 bg-white/10 rounded-full" />
                </div>

                {/* 2. Secondary Glows */}
                <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-[130px] animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-purple-500/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />

                {/* 3. Skill Nebula Particles (Brighter and more numerous) */}
                {[...Array(35)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{
                            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0.05, 0.35, 0.05]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* 4. Fine Connection Grid / Network Layer */}
                <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }}
                />

                {/* 5. Gradient Overlay to Ground the UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/40" />
            </div>

            {/* Centered Login Window (Enhanced Glassmorphism) */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative z-10 w-full max-w-5xl min-h-[650px] lg:h-[80vh] max-h-[750px] flex rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white/95 backdrop-blur-xl border border-white/20"
            >
                {/* Left Side - Visual Sidebar (Topic-Focused) */}
                <div className="hidden w-5/12 flex-col justify-between bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 p-10 lg:flex relative border-r border-indigo-100/50 text-left">
                    <div className="z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="p-1.5 bg-indigo-600 rounded-lg shadow-md shadow-indigo-200">
                                <NovonexLogo className="w-6 h-6 brightness-0 invert" />
                            </div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tighter">NOVONEX</h1>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-gray-900 leading-[1.2] tracking-tight">
                                Master the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Career Gap</span>
                            </h2>
                            <p className="text-xs text-gray-400 font-medium max-w-[220px]">The AI-powered bridge between learning and leading.</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex-1 flex items-center justify-center scale-85">
                        <AbstractCollage />
                    </div>

                    <div className="z-10 space-y-3">
                        <div className="flex items-center gap-2.5 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Target className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Readiness Score</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-28 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            transition={{ duration: 2, delay: 0.5 }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600">85%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form (Creative) */}
                <div className="flex w-full flex-col justify-start items-center bg-white p-8 lg:p-10 lg:w-7/12 overflow-hidden">
                    <div className="w-full max-w-[360px] space-y-6 pt-6 pb-4">
                        <div className="space-y-2 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest mb-1 border border-indigo-100">
                                <Sparkles className="w-2.5 h-2.5" />
                                AI Intelligence Engine
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-900">Welcome back</h2>
                            <p className="text-[11px] text-gray-400 font-medium">Continue your journey toward career excellence.</p>
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10 border-gray-100 bg-gray-50/30 focus:border-indigo-500 transition-colors placeholder:text-gray-300 text-black text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" col-span-2 className="text-xs">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-10 border-gray-100 bg-gray-50/30 focus:border-indigo-500 transition-colors placeholder:text-gray-300 text-black text-sm"
                                    required
                                />
                                <div className="flex items-center justify-end">
                                    <a href="#" className="text-[11px] font-medium text-gray-400 hover:text-indigo-600">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="h-10 w-full bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 shadow-lg shadow-indigo-200/50 transition-all rounded-xl"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="default"
                            type="button"
                            className="h-10 w-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md transition-all border-none rounded-xl"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                    </svg>
                                    <span className="text-sm">Sign in with Google</span>
                                </div>
                            )}
                        </Button>

                        <p className="text-center text-[11px] text-gray-400">
                            Don't have an account?{" "}
                            <a href="#" className="font-bold text-indigo-600 hover:underline">
                                Register
                            </a>
                        </p>

                        <div className="pt-6 grid grid-cols-3 gap-2 border-t border-gray-50">
                            <div className="text-center space-y-1 text-gray-300">
                                <Sparkles className="w-3.5 h-3.5 mx-auto" strokeWidth={1.5} />
                                <p className="text-[9px] font-bold uppercase tracking-widest">AI Analysis</p>
                            </div>
                            <div className="text-center space-y-1 text-gray-300">
                                <Target className="w-3.5 h-3.5 mx-auto" strokeWidth={1.5} />
                                <p className="text-[9px] font-bold uppercase tracking-widest">Career Path</p>
                            </div>
                            <div className="text-center space-y-1 text-gray-300">
                                <BookOpen className="w-3.5 h-3.5 mx-auto" strokeWidth={1.5} />
                                <p className="text-[9px] font-bold uppercase tracking-widest">Skill Prep</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}
