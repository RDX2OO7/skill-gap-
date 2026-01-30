import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { analyzeCompanyWithOpenRouter } from '@/lib/openRouter';
import { analyzeCompanyWithGemini } from '@/lib/gemini';
import { analyzeCompanyWithGroq } from '@/lib/groq';
import { useApp } from '@/context/AppContext';
import {
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend
} from 'recharts';
import {
    Building2,
    Briefcase,
    Sparkles,
    Loader2,
    AlertCircle,
    History,
    Target,
    Code,
    Wrench,
    BookOpen,
    Key,
    TrendingUp,
    ChevronRight,
    ShieldCheck,
    LayoutDashboard,
    Cpu
} from 'lucide-react';

const SKILL_LEVEL_NAMES: Record<number, string> = {
    0: 'N/A',
    1: 'Beginner',
    2: 'Moderate',
    3: 'Proficient',
    4: 'Expert'
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AnalyzerPage() {
    const { userSkills, userDomains } = useApp();
    const [companyName, setCompanyName] = useState('');
    const [roleName, setRoleName] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [provider, setProvider] = useState<'openrouter' | 'gemini' | 'groq'>('openrouter');
    const [openRouterKey, setOpenRouterKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || '');
    const [geminiKey, setGeminiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
    const [groqKey, setGroqKey] = useState(import.meta.env.VITE_GROQ_API_KEY || '');
    const [showKeyInput, setShowKeyInput] = useState(!import.meta.env.VITE_OPENROUTER_API_KEY && !import.meta.env.VITE_GEMINI_API_KEY && !import.meta.env.VITE_GROQ_API_KEY);

    const apiKey = provider === 'openrouter' ? openRouterKey : provider === 'gemini' ? geminiKey : groqKey;
    const setApiKey = provider === 'openrouter' ? setOpenRouterKey : provider === 'gemini' ? setGeminiKey : setGroqKey;

    const handleAnalyze = async () => {
        if (!companyName.trim() || !roleName.trim()) return;

        if (provider === 'openrouter' && openRouterKey) {
            (window as any).OPENROUTER_API_KEY = openRouterKey;
        } else if (provider === 'gemini' && geminiKey) {
            (window as any).GEMINI_API_KEY = geminiKey;
        } else if (provider === 'groq' && groqKey) {
            (window as any).GROQ_API_KEY = groqKey;
        }

        setIsAnalyzing(true);
        setError(null);
        setAnalysis(null);
        setStatusMessage('Connecting to AI Neural Network...');

        try {
            let result;
            if (provider === 'openrouter') {
                result = await analyzeCompanyWithOpenRouter(
                    companyName.trim(),
                    roleName.trim(),
                    (status) => setStatusMessage(status)
                );
            } else if (provider === 'gemini') {
                result = await analyzeCompanyWithGemini(
                    companyName.trim(),
                    roleName.trim(),
                    (status) => setStatusMessage(status)
                );
            } else {
                result = await analyzeCompanyWithGroq(
                    companyName.trim(),
                    roleName.trim(),
                    (status) => setStatusMessage(status)
                );
            }
            setAnalysis(result.data);
        } catch (err: any) {
            console.error('Analysis Error:', err);
            setError(err.message || 'Failed to analyze. Please check your API key.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const chartData = useMemo(() => {
        if (!analysis?.required_skills) return [];

        const allReqs: any[] = [
            ...(analysis.required_skills.core_skills || []),
            ...(analysis.required_skills.supporting_skills || []),
            ...(analysis.required_skills.bonus_skills || [])
        ].filter(s => s && (s.name || s.skill)).slice(0, 8);

        return allReqs.map((req: any) => {
            const skillName = (req.name || req.skill || '').toLowerCase();

            // 1. Search in flat userSkills (Profile)
            const userSkillProfile = userSkills.find(
                (s) => s.name.toLowerCase() === skillName ||
                    s.skillId.toLowerCase() === skillName ||
                    skillName.includes(s.name.toLowerCase())
            );

            let userLevel = userSkillProfile?.level || 0;

            // 2. Search in userDomains (Skill Vault) if profile level is low or not found
            if (userLevel === 0) {
                for (const domain of userDomains) {
                    const vaultSkill = domain.skills.find(
                        (s) => s.name.toLowerCase() === skillName ||
                            s.id.toLowerCase() === skillName ||
                            skillName.includes(s.name.toLowerCase())
                    );
                    if (vaultSkill && vaultSkill.level > userLevel) {
                        userLevel = vaultSkill.level;
                    }
                }
            }

            return {
                subject: req.name || req.skill,
                required: Number(req.level) || 1,
                yours: userLevel,
                fullMark: 4,
            };
        });
    }, [analysis, userSkills, userDomains]);

    const renderValue = (val: any): React.ReactNode => {
        if (val === null || val === undefined) return null;

        if (Array.isArray(val)) {
            if (val.length === 0) return <p className="text-sm text-muted-foreground italic">No data available</p>;
            return (
                <ul className="space-y-3">
                    {val.map((item: any, i: number) => (
                        <motion.li
                            key={i}
                            variants={fadeInUp}
                            className="flex gap-3 items-start p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                            <ChevronRight className="mt-1 w-4 h-4 text-primary shrink-0" />
                            <div className="flex-1">
                                {typeof item === 'object' ? (
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        {Object.entries(item).map(([k, v]) => (
                                            <div key={k} className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{k.replace(/_/g, ' ')}</span>
                                                <span className={`font-semibold text-sm ${k === 'level' ? 'text-primary' : 'text-foreground'}`}>
                                                    {k === 'level' ? (SKILL_LEVEL_NAMES[Number(v)] || String(v)) : String(v)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-sm font-medium leading-relaxed">{String(item)}</span>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </ul>
            );
        }

        if (typeof val === 'object') {
            return (
                <div className="grid gap-4">
                    {Object.entries(val).map(([k, v]) => (
                        <motion.div
                            key={k}
                            variants={fadeInUp}
                            className="p-4 rounded-xl bg-card border border-border/50 shadow-sm"
                        >
                            <Label className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 block">
                                {k.replace(/_/g, ' ')}
                            </Label>
                            <div className="text-sm font-semibold">
                                {typeof v === 'object' ? renderValue(v) : String(v)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            );
        }

        return <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{String(val)}</p>;
    };

    const getIcon = (key: string) => {
        const k = key.toLowerCase();
        if (k.includes('company')) return <Building2 className="w-5 h-5" />;
        if (k.includes('role')) return <Briefcase className="w-5 h-5" />;
        if (k.includes('skill')) return <Target className="w-5 h-5" />;
        if (k.includes('language') || k.includes('code')) return <Code className="w-5 h-5" />;
        if (k.includes('tool')) return <Wrench className="w-5 h-5" />;
        if (k.includes('guidance') || k.includes('prep') || k.includes('study')) return <BookOpen className="w-5 h-5" />;
        return <History className="w-5 h-5" />;
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 transition-colors duration-500 relative overflow-hidden">
            {/* Ambient Background Image */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] pointer-events-none z-0 opacity-80 mix-blend-screen select-none">
                <img
                    src="/cube-bg.png"
                    alt="Abstract Cube Background"
                    className="w-full h-full object-contain"
                />
            </div>

            <Header />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-6xl">

                    {/* Clean Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-transparent bg-clip-text">
                                AI Intelligence Engine
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
                                Company Analyzer
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                            Deep research & gap analysis for <span className="text-primary font-bold">{companyName || 'any target role'}</span>.
                        </p>
                    </motion.div>

                    {/* Elegant API Key Input */}
                    <AnimatePresence>
                        {showKeyInput && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-card/40 backdrop-blur-2xl border border-border rounded-3xl p-8 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-6 border-primary/20 ring-1 ring-primary/10"
                            >
                                <div className="p-4 bg-primary/20 rounded-2xl text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-bold mb-1">Secure AI Activation</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Select provider & enter key to unlock analysis capabilities.</p>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => setProvider('openrouter')}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${provider === 'openrouter' ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'}`}
                                        >
                                            OPENROUTER
                                        </button>
                                        <button
                                            onClick={() => setProvider('gemini')}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${provider === 'gemini' ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'}`}
                                        >
                                            GOOGLE AI STUDIO
                                        </button>
                                        <button
                                            onClick={() => setProvider('groq')}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${provider === 'groq' ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'}`}
                                        >
                                            GROQ (ULTRA FAST)
                                        </button>
                                    </div>
                                </div>
                                <div className="flex w-full md:w-auto gap-3">
                                    <Input
                                        type="password"
                                        placeholder={provider === 'openrouter' ? "sk-or-..." : provider === 'gemini' ? "AIzaSy..." : "gsk_..."}
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="h-11 md:w-64 bg-background/50 border-border focus:border-primary/50 transition-all font-mono"
                                    />
                                    <Button size="lg" className="h-11 px-6 font-bold shadow-lg shadow-primary/20" onClick={() => setShowKeyInput(false)} disabled={!apiKey}>
                                        Activate
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Strategic Input Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card/30 backdrop-blur-md border border-border/80 shadow-2xl rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="grid md:grid-cols-2 gap-10 mb-10 relative z-10">
                            <div className="space-y-4">
                                <Label htmlFor="company" className="text-sm font-bold flex items-center gap-2 text-foreground/70 tracking-wide">
                                    <Building2 className="w-4 h-4 text-primary" />
                                    Target Company
                                </Label>
                                <Input
                                    id="company"
                                    placeholder="e.g. Google, Atlassian"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="h-14 text-base font-semibold bg-background/40 border-border/80 focus:ring-primary/30 rounded-2xl transition-all shadow-inner"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="role" className="text-sm font-bold flex items-center gap-2 text-foreground/70 tracking-wide">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    Target Role
                                </Label>
                                <Input
                                    id="role"
                                    placeholder="e.g. Backend Developer"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    className="h-14 text-base font-semibold bg-background/40 border-border/80 focus:ring-primary/30 rounded-2xl transition-all shadow-inner"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-16 text-lg font-bold shadow-[0_10px_40px_rgba(var(--primary),0.2)] transition-all hover:scale-[1.01] active:scale-[0.99] rounded-2xl relative z-10 group overflow-hidden"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !companyName.trim() || !roleName.trim() || !apiKey}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center justify-center">
                                {isAnalyzing ? (
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center mb-1">
                                            <Loader2 className="w-6 h-6 mr-3 animate-spin text-white" />
                                            <span className="animate-pulse">AI Agent Active...</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 font-bold">{statusMessage}</span>
                                    </div>
                                ) : (
                                    <>
                                        <Target className="w-6 h-6 mr-3" />
                                        Start Strategic Analysis
                                    </>
                                )}
                            </div>
                        </Button>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-8 p-5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center gap-3 text-sm font-bold shadow-lg shadow-destructive/5"
                            >
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Integrated Results & Chart */}
                    <AnimatePresence>
                        {analysis && !isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                {/* Visual Alignment Section */}
                                <div className="grid lg:grid-cols-5 gap-8">
                                    <motion.div
                                        variants={fadeInUp}
                                        className="lg:col-span-3 h-full"
                                    >
                                        <section className="bg-card/40 backdrop-blur-md border border-border shadow-2xl rounded-[2.5rem] p-8 h-full">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                                    <TrendingUp className="w-5 h-5" />
                                                </div>
                                                <h2 className="text-xl font-bold tracking-tight">Competency Heatmap</h2>
                                            </div>

                                            {chartData.length > 0 ? (
                                                <div className="h-[400px] w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                                            <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.15} />
                                                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                                                            <PolarRadiusAxis domain={[0, 4]} tick={false} stroke="none" />
                                                            <Radar
                                                                name="Requirement"
                                                                dataKey="required"
                                                                stroke="hsl(var(--primary))"
                                                                strokeWidth={2.5}
                                                                fill="hsl(var(--primary))"
                                                                fillOpacity={0.15}
                                                            />
                                                            <Radar
                                                                name="Your Skills"
                                                                dataKey="yours"
                                                                stroke="#10b981"
                                                                strokeWidth={2.5}
                                                                fill="#10b981"
                                                                fillOpacity={0.4}
                                                            />
                                                            <Tooltip
                                                                contentStyle={{
                                                                    backgroundColor: 'hsl(var(--card))',
                                                                    borderRadius: '16px',
                                                                    border: '1px solid hsl(var(--border))',
                                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                                                }}
                                                            />
                                                            <Legend />
                                                        </RadarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            ) : (
                                                <div className="h-[400px] flex items-center justify-center text-muted-foreground italic font-medium">
                                                    Synthesizing detailed skill comparison...
                                                </div>
                                            )}
                                        </section>
                                    </motion.div>

                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Status Summary */}
                                        <motion.section
                                            variants={fadeInUp}
                                            className="bg-card/40 backdrop-blur-md border border-border shadow-2xl rounded-[2.5rem] p-8"
                                        >
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
                                                    <ShieldCheck className="w-5 h-5" />
                                                </div>
                                                <h2 className="text-xl font-bold tracking-tight">Gap Assessment</h2>
                                            </div>
                                            <div className="space-y-6">
                                                {chartData.slice(0, 5).map((d: any) => (
                                                    <div key={d.subject} className="space-y-2">
                                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-foreground/80">
                                                            <span className="truncate max-w-[170px]">{d.subject}</span>
                                                            <span className={d.yours >= d.required ? "text-emerald-500" : "text-amber-500"}>
                                                                {d.yours >= d.required ? 'Qualified' : `${d.required - d.yours} Step Gap`}
                                                            </span>
                                                        </div>
                                                        <div className="h-2 w-full bg-muted/50 rounded-full relative overflow-hidden ring-1 ring-border/30">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(d.yours / 4) * 100}%` }}
                                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                                            />
                                                            <div
                                                                style={{ left: `${(d.required / 4) * 100}%` }}
                                                                className="absolute top-0 w-1 h-full bg-primary z-10 shadow-[0_0_8px_hsl(var(--primary))]"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.section>

                                        <motion.section
                                            variants={fadeInUp}
                                            className="bg-primary/10 border border-primary/20 rounded-[2.5rem] p-8 text-center relative overflow-hidden group shadow-xl"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                                            <div className="p-4 bg-primary/20 rounded-full mb-5 inline-block mx-auto relative z-10 shadow-lg">
                                                <Cpu className="w-8 h-8 text-primary animate-pulse" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 relative z-10">Targeted Improvements</h3>
                                            <p className="text-sm text-muted-foreground mb-8 relative z-10 font-medium leading-relaxed">We've identified key projects to help you close the current skill gaps.</p>
                                            <Button variant="default" className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/20 relative z-10" asChild>
                                                <Link to="/select" className="gap-2">
                                                    <LayoutDashboard className="w-4 h-4" /> View Full Dashboard
                                                </Link>
                                            </Button>
                                        </motion.section>
                                    </div>
                                </div>

                                {/* Analysis Breakdown */}
                                <motion.div
                                    variants={staggerChildren}
                                    initial="initial"
                                    animate="animate"
                                    className="grid md:grid-cols-2 gap-8"
                                >
                                    {Object.entries(analysis).map(([key, value]) => {
                                        if (['status', 'headers', 'timestamp', 'required_skills'].includes(key.toLowerCase())) return null;

                                        return (
                                            <motion.section
                                                key={key}
                                                variants={fadeInUp}
                                                className="bg-card/30 backdrop-blur-sm border border-border shadow-xl rounded-[2.5rem] overflow-hidden hover:bg-card/40 transition-all duration-300"
                                            >
                                                <div className="px-8 py-5 bg-muted/40 border-b border-border/60 flex items-center gap-4">
                                                    <div className="p-2.5 bg-primary/20 rounded-xl text-primary shadow-sm">
                                                        {getIcon(key)}
                                                    </div>
                                                    <h2 className="text-lg font-black uppercase tracking-widest text-foreground/90">{key.replace(/_/g, ' ')}</h2>
                                                </div>
                                                <div className="p-8">
                                                    {renderValue(value)}
                                                </div>
                                            </motion.section>
                                        );
                                    })}
                                </motion.div>

                                <div className="flex justify-center pt-12">
                                    <Button
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-foreground text-sm font-bold uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em]"
                                        onClick={() => { setAnalysis(null); setError(null); setShowKeyInput(true); }}
                                    >
                                        Reset & Perform New Scan
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    );
}
