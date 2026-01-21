import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { AlignmentScore } from '@/components/AlignmentScore';
import { roles, skillLevels, calculateAlignment, UserSkill } from '@/lib/mockData';
import { Sparkles, RefreshCw, ArrowUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulationAction {
  id: string;
  title: string;
  description: string;
  skillId: string;
  levelIncrease: number;
  impact: 'low' | 'medium' | 'high';
}

export default function SimulatorPage() {
  const { selectedRole, userSkills, dsaProgress } = useApp();
  const [activeActions, setActiveActions] = useState<string[]>([]);

  const role = roles.find((r) => r.id === selectedRole);
  const currentScore = role ? calculateAlignment(userSkills, role.requiredSkills) : 0;

  // Generate simulation actions based on skill gaps
  const simulationActions: SimulationAction[] = [
    {
      id: 'dsa-problems',
      title: 'Complete 50 DSA Problems',
      description: 'Solve problems on arrays, hashmaps, and trees',
      skillId: 'dsa',
      levelIncrease: 2,
      impact: 'high',
    },
    {
      id: 'api-project',
      title: 'Build a REST API Project',
      description: 'Create a full CRUD API with authentication',
      skillId: 'apis',
      levelIncrease: 2,
      impact: 'high',
    },
    {
      id: 'sql-practice',
      title: 'Complete SQL Course',
      description: 'Master complex queries and database design',
      skillId: 'sql',
      levelIncrease: 2,
      impact: 'medium',
    },
    {
      id: 'github-activity',
      title: 'Contribute to Open Source',
      description: 'Make 10+ contributions to open source projects',
      skillId: 'git',
      levelIncrease: 1,
      impact: 'low',
    },
    {
      id: 'python-advanced',
      title: 'Advanced Python Course',
      description: 'Learn OOP, decorators, and async programming',
      skillId: 'python',
      levelIncrease: 1,
      impact: 'medium',
    },
    {
      id: 'react-project',
      title: 'Build a React Dashboard',
      description: 'Create a full-featured React application',
      skillId: 'react',
      levelIncrease: 2,
      impact: 'high',
    },
  ];

  // Filter to only show relevant actions
  const relevantActions = simulationActions.filter((action) =>
    role?.requiredSkills.find((s) => s.skillId === action.skillId)
  );

  const toggleAction = (actionId: string) => {
    setActiveActions((prev) =>
      prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
    );
  };

  // Calculate simulated score
  const simulatedSkills: UserSkill[] = userSkills.map((skill) => {
    const relevantAction = relevantActions.find(
      (a) => a.skillId === skill.skillId && activeActions.includes(a.id)
    );
    if (relevantAction) {
      return { ...skill, level: Math.min(skill.level + relevantAction.levelIncrease, 4) };
    }
    return skill;
  });

  // Add skills that user doesn't have but are in active actions
  activeActions.forEach((actionId) => {
    const action = relevantActions.find((a) => a.id === actionId);
    if (action && !simulatedSkills.find((s) => s.skillId === action.skillId)) {
      simulatedSkills.push({
        skillId: action.skillId,
        name: action.skillId,
        level: action.levelIncrease,
        category: 'technical',
      });
    }
  });

  const simulatedScore = role ? calculateAlignment(simulatedSkills, role.requiredSkills) : 0;
  const scoreIncrease = simulatedScore - currentScore;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              What-If Analysis
            </div>
            <h1 className="text-3xl font-bold mb-3">Readiness Simulator</h1>
            <p className="text-muted-foreground">
              See how completing specific actions would improve your alignment
            </p>
          </motion.div>

          {/* Score Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Current Score</p>
              <AlignmentScore score={currentScore} size="md" />
            </div>

            <div className="flex items-center justify-center">
              <motion.div
                animate={{ x: scoreIncrease > 0 ? [0, 10, 0] : 0 }}
                transition={{ duration: 0.5, repeat: scoreIncrease > 0 ? Infinity : 0, repeatDelay: 1 }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full',
                  scoreIncrease > 0 ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                )}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="font-bold">+{scoreIncrease}%</span>
              </motion.div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center relative overflow-hidden">
              {scoreIncrease > 0 && (
                <div className="absolute inset-0 bg-success/5" />
              )}
              <p className="text-sm text-muted-foreground mb-3 relative">Projected Score</p>
              <div className="relative">
                <AlignmentScore score={simulatedScore} size="md" />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Toggle Actions to Simulate</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveActions([])}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {relevantActions.map((action, index) => {
                const isActive = activeActions.includes(action.id);
                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                    onClick={() => toggleAction(action.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all duration-200',
                      isActive
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'border-border bg-muted/30 hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{action.title}</h4>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          action.impact === 'high'
                            ? 'bg-success/20 text-success'
                            : action.impact === 'medium'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {action.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                          isActive
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        )}
                      >
                        {isActive && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-primary-foreground"
                            viewBox="0 0 12 12"
                          >
                            <path
                              fill="currentColor"
                              d="M10.28 2.28a.75.75 0 00-1.06-1.06L4.5 5.94 2.78 4.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25z"
                            />
                          </motion.svg>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {isActive ? 'Included in simulation' : 'Click to include'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Summary */}
          {activeActions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-success/10 rounded-2xl border border-success/20 p-6 mb-8 text-center"
            >
              <p className="text-lg">
                By completing <span className="font-bold">{activeActions.length} action{activeActions.length > 1 ? 's' : ''}</span>,
                you could increase your alignment from{' '}
                <span className="font-bold">{currentScore}%</span> to{' '}
                <span className="font-bold text-success">{simulatedScore}%</span>
              </p>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/plan">
                View Full Plan
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
