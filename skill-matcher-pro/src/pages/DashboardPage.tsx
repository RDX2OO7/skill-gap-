import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { SkillCard } from '@/components/SkillCard';
import { AlignmentScore } from '@/components/AlignmentScore';
import { RadarChart } from '@/components/RadarChart';
import { roles, companyTypes, calculateAlignment, getSkillGap, UserSkill } from '@/lib/mockData';
import { ArrowRight, Target, TrendingUp, BookOpen, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { selectedCompany, selectedRole, userSkills, userDomains, user } = useApp();
  const userName = user?.displayName?.split(' ')[0] || "User";

  const getSkillLevel = (skillName: string, skillId?: string) => {
    const name = skillName.toLowerCase();
    const id = skillId?.toLowerCase();

    // 1. Check Profile
    const profileSkill = userSkills.find(s =>
      s.skillId.toLowerCase() === id ||
      s.name.toLowerCase() === name ||
      name.includes(s.name.toLowerCase())
    );
    if (profileSkill && profileSkill.level > 0) return profileSkill.level;

    // 2. Check Vault
    for (const domain of userDomains) {
      const vaultSkill = domain.skills.find(s =>
        s.id.toLowerCase() === id ||
        s.name.toLowerCase() === name ||
        name.includes(s.name.toLowerCase())
      );
      if (vaultSkill && vaultSkill.level > 0) return vaultSkill.level;
    }

    return 0;
  };

  const role = roles.find((r) => r.id === selectedRole);
  const company = companyTypes.find((c) => c.id === selectedCompany);

  // Derive allUserSkills for calculateAlignment
  const derivedSkills = role?.requiredSkills.map(req => ({
    skillId: req.skillId,
    name: req.name,
    level: getSkillLevel(req.name, req.skillId),
    category: 'technical' as const
  })) || [];

  const alignmentScore = role ? calculateAlignment(derivedSkills, role.requiredSkills) : 0;

  const radarData = role?.requiredSkills.map((req) => {
    const level = getSkillLevel(req.name, req.skillId);
    return {
      label: req.name.split('/')[0].slice(0, 10),
      value: level,
      maxValue: req.requiredLevel,
    };
  }) || [];

  const skillStats = role?.requiredSkills.reduce(
    (acc, req) => {
      const level = getSkillLevel(req.name, req.skillId);
      const userSkill: UserSkill = {
        skillId: req.skillId,
        name: req.name,
        level,
        category: req.category
      };
      const gap = getSkillGap(userSkill, req);
      acc[gap]++;
      return acc;
    },
    { met: 0, partial: 0, gap: 0 }
  ) || { met: 0, partial: 0, gap: 0 };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              {company?.name} • {role?.name}
            </div>
            <h1 className="text-3xl font-bold">Welcome, {userName}! Your Skill Alignment Dashboard</h1>
          </motion.div>

          {/* Main Stats */}
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Alignment Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 bg-card rounded-2xl border border-border p-8 text-center"
            >
              <AlignmentScore score={alignmentScore} size="lg" />
              <p className="text-muted-foreground mt-4 text-sm max-w-[200px] mx-auto">
                You are <span className="font-semibold text-foreground">{alignmentScore}% aligned</span> with {role?.name} expectations
              </p>
            </motion.div>

            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 flex items-center justify-center"
            >
              <RadarChart data={radarData} size={300} />
            </motion.div>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="text-3xl font-bold text-success">{skillStats.met}</div>
              <div className="text-sm text-muted-foreground">Skills Met</div>
            </div>
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <div className="text-3xl font-bold text-warning">{skillStats.partial}</div>
              <div className="text-sm text-muted-foreground">Partial Match</div>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="text-3xl font-bold text-destructive">{skillStats.gap}</div>
              <div className="text-sm text-muted-foreground">Skills Gap</div>
            </div>
          </motion.div>

          {/* Skill Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold mb-4">Skill-by-Skill Analysis</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {role?.requiredSkills.map((req, index) => {
                const level = getSkillLevel(req.name, req.skillId);
                return (
                  <motion.div
                    key={req.skillId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                  >
                    <SkillCard
                      name={req.name}
                      userLevel={level}
                      requiredLevel={req.requiredLevel}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <Button variant="outline" size="lg" className="h-auto py-4" asChild>
              <Link to="/dsa">
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>DSA Readiness</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4" asChild>
              <Link to="/plan">
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Improvement Plan</span>
                </div>
              </Link>
            </Button>
            <Button variant="hero" size="lg" className="h-auto py-4" asChild>
              <Link to="/simulator">
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>What-If Simulator</span>
                </div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
