import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { companyTypes, roles } from '@/lib/mockData';
import { ArrowRight, Building2, Briefcase, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SelectPage() {
  const navigate = useNavigate();
  const { selectedCompany, selectedRole, setSelectedCompany, setSelectedRole } = useApp();
  const [step, setStep] = useState<'company' | 'role'>(selectedCompany ? 'role' : 'company');

  const handleContinue = () => {
    if (step === 'company' && selectedCompany) {
      setStep('role');
    } else if (step === 'role' && selectedRole) {
      navigate('/profile');
    }
  };

  const canContinue = step === 'company' ? !!selectedCompany : !!selectedRole;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <div className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              step === 'company' ? 'gradient-hero text-primary-foreground' : 'bg-success/20 text-success'
            )}>
              {step === 'role' ? <Check className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              Company Type
            </div>
            <div className="w-8 h-[2px] bg-border" />
            <div className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              step === 'role' ? 'gradient-hero text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              <Briefcase className="w-4 h-4" />
              Target Role
            </div>
          </motion.div>

          {/* Company Selection */}
          {step === 'company' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-3">What type of company are you targeting?</h1>
                <p className="text-muted-foreground">Different companies have different expectations</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {companyTypes.map((company) => (
                  <motion.button
                    key={company.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCompany(company.id)}
                    className={cn(
                      'p-6 rounded-xl border-2 text-left transition-all duration-200',
                      selectedCompany === company.id
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{company.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.description}</p>
                      </div>
                    </div>
                    {selectedCompany === company.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-hero flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Role Selection */}
          {step === 'role' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-3">What role are you aiming for?</h1>
                <p className="text-muted-foreground">Select the internship role you want to target</p>
              </div>

              <div className="grid gap-4 mb-8">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      'p-6 rounded-xl border-2 text-left transition-all duration-200 relative',
                      selectedRole === role.id
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{role.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{role.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {role.requiredSkills.slice(0, 4).map((skill) => (
                            <span
                              key={skill.skillId}
                              className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                            >
                              {skill.name}
                            </span>
                          ))}
                          {role.requiredSkills.length > 4 && (
                            <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                              +{role.requiredSkills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-hero flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <Button
                variant="ghost"
                onClick={() => setStep('company')}
                className="mr-4"
              >
                Back
              </Button>
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="hero"
              size="xl"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
