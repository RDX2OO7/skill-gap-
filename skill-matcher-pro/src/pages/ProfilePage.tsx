import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { roles, skillLevels, UserSkill } from '@/lib/mockData';
import { ArrowRight, Upload, Github, Linkedin, Plus, Check, X, Shield, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SkillDomain } from '@/lib/skillDomains';

const allSkills = [
  { id: 'python', name: 'Python', category: 'technical' },
  { id: 'javascript', name: 'JavaScript', category: 'technical' },
  { id: 'typescript', name: 'TypeScript', category: 'technical' },
  { id: 'react', name: 'React', category: 'technical' },
  { id: 'sql', name: 'SQL/Databases', category: 'technical' },
  { id: 'apis', name: 'REST APIs', category: 'technical' },
  { id: 'git', name: 'Git', category: 'tools' },
  { id: 'linux', name: 'Linux/CLI', category: 'tools' },
  { id: 'dsa', name: 'DSA', category: 'dsa' },
  { id: 'ml', name: 'Machine Learning', category: 'technical' },
  { id: 'css', name: 'CSS/Tailwind', category: 'technical' },
  { id: 'pandas', name: 'Pandas/NumPy', category: 'technical' },
  { id: 'math', name: 'Math/Statistics', category: 'technical' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { selectedRole, userSkills, addSkill, setUserSkills } = useApp();
  const [showSkillPicker, setShowSkillPicker] = useState(false);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [resumeParsed, setResumeParsed] = useState(false);

  // Sync skills from "My Skills" vault
  const syncFromVault = () => {
    const saved = localStorage.getItem('mySkillDomains');
    if (saved) {
      const domains: SkillDomain[] = JSON.parse(saved);
      const vaultSkills: UserSkill[] = domains.flatMap(domain =>
        domain.skills
          .filter(s => s.level > 0)
          .map(s => ({
            skillId: s.id,
            name: s.name,
            level: s.level,
            category: 'technical' as const
          }))
      );

      // Merge with existing userSkills, prioritizing vault skills
      const mergedSkills = [...userSkills];
      vaultSkills.forEach(vs => {
        const index = mergedSkills.findIndex(ms => ms.skillId === vs.skillId);
        if (index > -1) {
          mergedSkills[index] = vs;
        } else {
          mergedSkills.push(vs);
        }
      });
      setUserSkills(mergedSkills);
    }
  };

  useState(() => {
    syncFromVault();
  });

  const role = roles.find((r) => r.id === selectedRole);

  const handleResumeUpload = () => {
    // Mock resume parsing
    setTimeout(() => {
      const mockParsedSkills: UserSkill[] = [
        { skillId: 'python', name: 'Python', level: 2, category: 'technical' },
        { skillId: 'git', name: 'Git', level: 2, category: 'tools' },
        { skillId: 'javascript', name: 'JavaScript', level: 1, category: 'technical' },
      ];
      setUserSkills(mockParsedSkills);
      setResumeParsed(true);
    }, 1000);
  };

  const handleMockIntegration = (source: string) => {
    // Mock integration
    const mockSkills: UserSkill[] = [
      { skillId: 'git', name: 'Git', level: 3, category: 'tools' },
      { skillId: 'python', name: 'Python', level: 2, category: 'technical' },
      { skillId: 'react', name: 'React', level: 1, category: 'technical' },
    ];
    setUserSkills([...userSkills, ...mockSkills.filter(s => !userSkills.find(us => us.skillId === s.skillId))]);
  };

  const handleAddSkill = (skillId: string) => {
    const skill = allSkills.find((s) => s.id === skillId);
    if (skill && !userSkills.find((s) => s.skillId === skillId)) {
      addSkill({
        skillId: skill.id,
        name: skill.name,
        level: 1,
        category: skill.category as UserSkill['category'],
      });
    }
    setShowSkillPicker(false);
  };

  const handleLevelChange = (skillId: string, level: number) => {
    const skill = userSkills.find((s) => s.skillId === skillId);
    if (skill) {
      addSkill({ ...skill, level });
    }
    setEditingSkill(null);
  };

  const handleRemoveSkill = (skillId: string) => {
    setUserSkills(userSkills.filter((s) => s.skillId !== skillId));
  };

  const canContinue = userSkills.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">Build Your Skill Profile</h1>
            <p className="text-muted-foreground">
              Add your current skills so we can analyze your alignment with{' '}
              <span className="font-medium text-foreground">{role?.name || 'your target role'}</span>
            </p>
          </motion.div>

          {/* Import Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            <button
              onClick={handleResumeUpload}
              className={cn(
                'p-5 rounded-xl border-2 border-dashed text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5',
                resumeParsed ? 'border-success bg-success/5' : 'border-border'
              )}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium text-sm">
                {resumeParsed ? 'Resume Parsed!' : 'Upload Resume'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">(Mock parsing)</p>
            </button>

            <button
              onClick={() => handleMockIntegration('github')}
              className="p-5 rounded-xl border-2 border-dashed border-border text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
            >
              <Github className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium text-sm">Connect GitHub</p>
              <p className="text-xs text-muted-foreground mt-1">(Mock integration)</p>
            </button>

            <button
              onClick={() => handleMockIntegration('linkedin')}
              className="p-5 rounded-xl border-2 border-dashed border-border text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
            >
              <Linkedin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium text-sm">Connect LinkedIn</p>
              <p className="text-xs text-muted-foreground mt-1">(Mock integration)</p>
            </button>
          </motion.div>

          {/* Manual Skill Entry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Your Skills</h2>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/20">
                  <Shield className="w-2.5 h-2.5 mr-1" />
                  Synced with Vault
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={syncFromVault}
                  className="text-xs h-8"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Sync
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSkillPicker(true)}
                  className="h-8"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </Button>
              </div>
            </div>

            {userSkills.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No skills added yet. Add skills manually or import from above.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {userSkills.map((skill) => (
                  <motion.div
                    key={skill.skillId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-lg bg-muted/50 border border-border group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Shield className="w-3 h-3 text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <button
                        onClick={() => handleRemoveSkill(skill.skillId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-1">
                      {skillLevels.map((level) => (
                        <div
                          key={level.level}
                          className={cn(
                            'flex-1 py-1.5 px-1 rounded text-[10px] text-center font-bold tracking-tight transition-all',
                            skill.level >= level.level
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background/50 border border-border text-muted-foreground/40'
                          )}
                        >
                          L{level.level}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {skillLevels.find((l) => l.level === skill.level)?.name}
                      </p>
                      <div className="flex items-center gap-1 text-[9px] text-primary/60 font-semibold italic">
                        <Check className="w-2.5 h-2.5" />
                        Verified Proficiency
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Skill Picker Modal */}
          {showSkillPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setShowSkillPicker(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card rounded-xl border border-border p-6 max-w-md w-full mx-4 max-h-[70vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Add a Skill</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allSkills
                    .filter((s) => !userSkills.find((us) => us.skillId === s.id))
                    .map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => handleAddSkill(skill.id)}
                        className="p-3 rounded-lg text-left bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
                      >
                        <span className="text-sm font-medium">{skill.name}</span>
                      </button>
                    ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={() => setShowSkillPicker(false)}
                >
                  Cancel
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/dashboard')}
              disabled={!canContinue}
            >
              View My Alignment
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
