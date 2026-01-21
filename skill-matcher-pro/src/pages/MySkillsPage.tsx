import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  Code, Database, Brain, Shield, Cloud, Smartphone, Sparkles, Cpu,
  ChevronRight, Plus, X, Trash2, Save, ArrowLeft, Star, Zap, CheckCircle2, AlertCircle
} from 'lucide-react';
import { defaultDomains, skillLevels, SkillDomain, SkillItem } from '@/lib/skillDomains';
import { getQuestionsForSkill, Question } from '@/lib/skillQuestions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';

const iconMap: Record<string, React.ComponentType<any>> = {
  Code, Database, Brain, Shield, Cloud, Smartphone, Sparkles, Cpu
};

export default function MySkillsPage() {
  const [domains, setDomains] = useState<SkillDomain[]>(() => {
    const saved = localStorage.getItem('mySkillDomains');
    return saved ? JSON.parse(saved) : defaultDomains;
  });
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [addingToDomain, setAddingToDomain] = useState<string | null>(null);

  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState<{
    domainId: string;
    skill: SkillItem;
    questions: Question[];
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    localStorage.setItem('mySkillDomains', JSON.stringify(domains));
  }, [domains]);

  const updateSkillLevel = (domainId: string, skillId: string, level: number) => {
    setDomains(prev => prev.map(domain => {
      if (domain.id !== domainId) return domain;
      return {
        ...domain,
        skills: domain.skills.map(skill =>
          skill.id === skillId ? { ...skill, level } : skill
        )
      };
    }));
  };

  const addCustomSkill = (domainId: string) => {
    if (!newSkillName.trim()) return;

    setDomains(prev => prev.map(domain => {
      if (domain.id !== domainId) return domain;
      return {
        ...domain,
        skills: [...domain.skills, {
          id: `custom-${Date.now()}`,
          name: newSkillName.trim(),
          level: 0
        }]
      };
    }));
    setNewSkillName('');
    setAddingToDomain(null);
  };

  const startQuiz = (domainId: string, skill: SkillItem) => {
    const questions = getQuestionsForSkill(skill.id);
    setActiveQuiz({ domainId, skill, questions });
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < activeQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: number[]) => {
    const score = finalAnswers.reduce((acc, ans, idx) => {
      return acc + (ans === activeQuiz!.questions[idx].correctAnswer ? 1 : 0);
    }, 0);

    // Calculate level based on score (0-5)
    // 0: None, 1: Beginner, 2: Intermediate, 3-4: Advanced, 5: Expert
    let newLevel = 0;
    if (score === 1 || score === 2) newLevel = 1;
    else if (score === 3) newLevel = 2;
    else if (score === 4) newLevel = 3;
    else if (score === 5) newLevel = 4;

    updateSkillLevel(activeQuiz!.domainId, activeQuiz!.skill.id, newLevel);
    setQuizFinished(true);

    toast.success(`Quiz completed! Your score: ${score}/${activeQuiz!.questions.length}. Level set to ${skillLevels[newLevel].label}.`);
  };

  const removeSkill = (domainId: string, skillId: string) => {
    setDomains(prev => prev.map(domain => {
      if (domain.id !== domainId) return domain;
      return {
        ...domain,
        skills: domain.skills.filter(skill => skill.id !== skillId)
      };
    }));
  };

  const getDomainStats = (domain: SkillDomain) => {
    const totalSkills = domain.skills.length;
    const learnedSkills = domain.skills.filter(s => s.level > 0).length;
    const avgLevel = totalSkills > 0
      ? domain.skills.reduce((acc, s) => acc + s.level, 0) / totalSkills
      : 0;
    return { totalSkills, learnedSkills, avgLevel };
  };

  const getTotalStats = () => {
    const allSkills = domains.flatMap(d => d.skills);
    const totalLearned = allSkills.filter(s => s.level > 0).length;
    const avgLevel = allSkills.length > 0
      ? allSkills.reduce((acc, s) => acc + s.level, 0) / allSkills.length
      : 0;
    return { total: allSkills.length, learned: totalLearned, avgLevel };
  };

  const totalStats = getTotalStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                My <span className="text-gradient">Skill Vault</span>
              </h1>
              <p className="text-muted-foreground">
                Track and manage your skills across different domains
              </p>
            </div>

            {/* Overall Stats */}
            <div className="flex gap-4">
              <div className="glass-card rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-bold text-primary">{totalStats.learned}</div>
                <div className="text-xs text-muted-foreground">Skills Learned</div>
              </div>
              <div className="glass-card rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-bold text-primary">{totalStats.total}</div>
                <div className="text-xs text-muted-foreground">Total Skills</div>
              </div>
              <div className="glass-card rounded-xl px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-warning" fill="currentColor" />
                  <span className="text-2xl font-bold">{totalStats.avgLevel.toFixed(1)}</span>
                </div>
                <div className="text-xs text-muted-foreground">Avg Level</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {domains.map((domain, index) => {
              const Icon = iconMap[domain.icon] || Code;
              const stats = getDomainStats(domain);
              const isExpanded = expandedDomain === domain.id;

              return (
                <motion.div
                  key={domain.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={isExpanded ? 'md:col-span-2 lg:col-span-3 xl:col-span-4' : ''}
                >
                  <Card
                    className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${isExpanded ? 'ring-2 ring-primary' : ''
                      }`}
                    onClick={() => !isExpanded && setExpandedDomain(domain.id)}
                  >
                    {/* Domain Header */}
                    <div className={`bg-gradient-to-r ${domain.color} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{domain.name}</h3>
                            <p className="text-xs text-white/80">{domain.description}</p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); setExpandedDomain(null); }}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>

                      {/* Mini Stats */}
                      <div className="flex gap-4 mt-3">
                        <div className="text-sm">
                          <span className="font-bold">{stats.learnedSkills}</span>
                          <span className="text-white/70">/{stats.totalSkills} skills</span>
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          <span className="font-bold">{(stats.avgLevel).toFixed(1)}</span>
                          <span className="text-white/70">avg</span>
                        </div>
                      </div>
                    </div>

                    {/* Collapsed Preview */}
                    {!isExpanded && (
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {domain.skills.slice(0, 5).map(skill => (
                            <Badge
                              key={skill.id}
                              variant={skill.level > 0 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                          {domain.skills.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{domain.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Expanded Skills Editor */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {domain.subTracks && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {domain.subTracks.map(track => (
                              <Badge key={track} variant="outline" className="text-xs">
                                {track}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {domain.skills.map(skill => (
                            <div
                              key={skill.id}
                              className="glass-card rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm tracking-tight">{skill.name}</span>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-[10px] text-primary hover:bg-primary/10"
                                    onClick={() => startQuiz(domain.id, skill)}
                                  >
                                    <Zap className="w-3 h-3 mr-1" />
                                    Test Level
                                  </Button>
                                  {skill.id.startsWith('custom-') && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-destructive hover:text-destructive"
                                      onClick={() => removeSkill(domain.id, skill.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {/* Read-only Level Indicator */}
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                  <span>Proficiency</span>
                                  <span>{Math.round((skill.level / 4) * 100)}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex gap-0.5 p-0.5">
                                  {[1, 2, 3, 4].map((step) => (
                                    <div
                                      key={step}
                                      className={`h-full flex-1 rounded-sm transition-colors duration-500 ${skill.level >= step
                                          ? (skill.level === 4 ? 'bg-purple-500' :
                                            skill.level === 3 ? 'bg-success' :
                                              skill.level === 2 ? 'bg-warning' : 'bg-blue-500')
                                          : 'bg-black/5'
                                        }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <Badge
                                  variant={skill.level > 0 ? 'default' : 'secondary'}
                                  className={`text-xs ${skill.level === 4 ? 'bg-purple-500' :
                                      skill.level === 3 ? 'bg-success' :
                                        skill.level === 2 ? 'bg-warning' :
                                          skill.level === 1 ? 'bg-blue-500' : ''
                                    }`}
                                >
                                  {skillLevels[skill.level].label}
                                </Badge>
                                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Shield className="w-3 h-3 text-primary/50" />
                                  Verified via Test
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Add New Skill */}
                          {addingToDomain === domain.id ? (
                            <div className="glass-card rounded-lg p-4 space-y-3">
                              <Input
                                placeholder="Skill name..."
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addCustomSkill(domain.id)}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => addCustomSkill(domain.id)}
                                  disabled={!newSkillName.trim()}
                                >
                                  <Save className="w-3 h-3 mr-1" />
                                  Add
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => { setAddingToDomain(null); setNewSkillName(''); }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddingToDomain(domain.id)}
                              className="glass-card rounded-lg p-4 border-2 border-dashed border-muted hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm">Add Custom Skill</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quiz Dialog */}
        <Dialog open={!!activeQuiz} onOpenChange={(open) => !open && setActiveQuiz(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{activeQuiz?.skill.name} Assessment</span>
                <Badge variant="outline">Question {currentQuestionIndex + 1}/5</Badge>
              </DialogTitle>
              <DialogDescription>
                Answer these 5 questions to determine your skill level.
              </DialogDescription>
            </DialogHeader>

            {!quizFinished ? (
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{Math.round((currentQuestionIndex / 5) * 100)}%</span>
                  </div>
                  <Progress value={(currentQuestionIndex / 5) * 100} className="h-2" />
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold leading-tight">
                    {activeQuiz?.questions[currentQuestionIndex]?.text}
                  </h4>
                  <div className="grid gap-2">
                    {activeQuiz?.questions[currentQuestionIndex]?.options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4 text-left whitespace-normal hover:border-primary hover:bg-primary/5"
                        onClick={() => handleAnswer(idx)}
                      >
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-3 text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Assessment Complete!</h3>
                  <p className="text-muted-foreground">
                    Based on your performance, your level for {activeQuiz?.skill.name} has been updated.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Your New Level</div>
                  <div className="text-2xl font-bold text-primary">
                    {skillLevels[activeQuiz?.skill.level || 0].label}
                  </div>
                </div>

                <Button className="w-full" onClick={() => setActiveQuiz(null)}>
                  Close and Continue
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Track your progress and see how aligned you are with company expectations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/select">Check Readiness</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/analyzer">Analyze Company</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
