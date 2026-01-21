import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { roles, skillLevels, projectSuggestions } from '@/lib/mockData';
import { ArrowRight, TrendingUp, Lightbulb, Target, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PlanPage() {
  const { selectedRole, userSkills } = useApp();

  const role = roles.find((r) => r.id === selectedRole);

  const skillGaps = role?.requiredSkills
    .filter((req) => {
      const userSkill = userSkills.find((s) => s.skillId === req.skillId);
      return !userSkill || userSkill.level < req.requiredLevel;
    })
    .map((req) => {
      const userSkill = userSkills.find((s) => s.skillId === req.skillId);
      return {
        ...req,
        currentLevel: userSkill?.level || 0,
        gapSize: req.requiredLevel - (userSkill?.level || 0),
      };
    })
    .sort((a, b) => b.gapSize - a.gapSize) || [];

  const relevantProjects = projectSuggestions.filter((project) =>
    project.skillsImproved.some((skillId) =>
      skillGaps.find((gap) => gap.skillId === skillId)
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Personalized for {role?.name}
            </div>
            <h1 className="text-3xl font-bold mb-3">Your Skill Enhancement Plan</h1>
            <p className="text-muted-foreground">
              Focus on these areas to maximize your alignment score
            </p>
          </motion.div>

          {/* Priority Improvements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Priority Skill Improvements</h3>
            </div>

            {skillGaps.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-success font-medium">🎉 All skills meet requirements!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <motion.div
                    key={gap.skillId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-semibold text-foreground">{gap.name}</span>
                        <span
                          className={cn(
                            'ml-2 text-xs px-2 py-0.5 rounded-full',
                            gap.gapSize >= 2
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-warning/20 text-warning'
                          )}
                        >
                          {gap.gapSize >= 2 ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Level {gap.currentLevel} → {gap.requiredLevel}
                      </span>
                    </div>

                    <div className="flex gap-2 mb-3">
                      {skillLevels.map((level) => (
                        <div
                          key={level.level}
                          className={cn(
                            'flex-1 h-2 rounded-full',
                            level.level <= gap.currentLevel
                              ? 'gradient-hero'
                              : level.level <= gap.requiredLevel
                              ? 'bg-primary/20'
                              : 'bg-muted'
                          )}
                        />
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-background/50">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Suggested actions: </span>
                        {gap.skillId === 'dsa' && 'Solve 50+ LeetCode problems focusing on core patterns'}
                        {gap.skillId === 'python' && 'Build a REST API project, practice OOP concepts'}
                        {gap.skillId === 'sql' && 'Complete SQL exercises, practice complex queries and joins'}
                        {gap.skillId === 'apis' && 'Build a full CRUD API with authentication'}
                        {gap.skillId === 'git' && 'Contribute to open source, practice branching strategies'}
                        {gap.skillId === 'react' && 'Build 2-3 complete React apps with state management'}
                        {gap.skillId === 'javascript' && 'Master ES6+, async/await, and DOM manipulation'}
                        {!['dsa', 'python', 'sql', 'apis', 'git', 'react', 'javascript'].includes(gap.skillId) &&
                          'Practice with real-world projects and online resources'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recommended Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Recommended Projects</h3>
            </div>

            <div className="grid gap-4">
              {relevantProjects.slice(0, 3).map((project, index) => {
                const overlappingSkills = project.skillsImproved.filter((s) =>
                  skillGaps.find((gap) => gap.skillId === s)
                );
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.1 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{project.name}</h4>
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          project.difficulty === 'Easy'
                            ? 'bg-success/20 text-success'
                            : project.difficulty === 'Medium'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-destructive/20 text-destructive'
                        )}
                      >
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skillsImproved.map((skill) => (
                        <span
                          key={skill}
                          className={cn(
                            'text-xs px-2 py-1 rounded-full',
                            overlappingSkills.includes(skill)
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      ⏱️ {project.timeEstimate}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/simulator">
                Try What-If Simulator
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
