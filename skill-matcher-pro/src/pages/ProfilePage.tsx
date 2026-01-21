import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { roles, skillLevels, UserSkill } from '@/lib/mockData';
import { ArrowRight, Upload, Github, Linkedin, Plus, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
              <h2 className="text-lg font-semibold">Your Skills</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSkillPicker(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </Button>
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
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{skill.name}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill.skillId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-1">
                      {skillLevels.map((level) => (
                        <button
                          key={level.level}
                          onClick={() => handleLevelChange(skill.skillId, level.level)}
                          className={cn(
                            'flex-1 py-2 px-1 rounded text-xs font-medium transition-all',
                            skill.level >= level.level
                              ? 'gradient-hero text-primary-foreground'
                              : 'bg-background border border-border text-muted-foreground hover:border-primary/50'
                          )}
                          title={level.description}
                        >
                          L{level.level}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {skillLevels.find((l) => l.level === skill.level)?.name}
                    </p>
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
