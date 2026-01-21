import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { roles, dsaPracticePlatforms } from '@/lib/mockData';
import { ArrowRight, Check, Circle, ExternalLink, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DSAPage() {
  const { selectedRole, dsaProgress, completeDSATopic } = useApp();

  const role = roles.find((r) => r.id === selectedRole);
  const topics = role?.dsaTopics || [];

  const getTopicStatus = (topicId: string) => {
    if (dsaProgress.completed.includes(topicId)) return 'completed';
    if (dsaProgress.inProgress.includes(topicId)) return 'in-progress';
    return 'not-started';
  };

  const completedCount = dsaProgress.completed.length;
  const totalRequired = topics.filter((t) => t.required).length;
  const progressPercentage = totalRequired > 0 ? (completedCount / totalRequired) * 100 : 0;

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
              <BookOpen className="w-4 h-4" />
              DSA Readiness for {role?.name}
            </div>
            <h1 className="text-3xl font-bold mb-3">Data Structures & Algorithms</h1>
            <p className="text-muted-foreground">
              Track your progress on required DSA topics for your target role
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {totalRequired} required topics completed
                </p>
              </div>
              <div className="text-3xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full progress-success rounded-full"
              />
            </div>
          </motion.div>

          {/* Topics List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <h3 className="font-semibold text-lg mb-4">Topic Breakdown</h3>
            <div className="space-y-3">
              {topics.map((topic, index) => {
                const status = getTopicStatus(topic.id);
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                      status === 'completed'
                        ? 'border-success/30 bg-success/5'
                        : status === 'in-progress'
                        ? 'border-warning/30 bg-warning/5'
                        : 'border-border bg-muted/30'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => status !== 'completed' && completeDSATopic(topic.id)}
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center transition-all',
                          status === 'completed'
                            ? 'bg-success text-success-foreground'
                            : 'border-2 border-muted-foreground hover:border-primary'
                        )}
                      >
                        {status === 'completed' && <Check className="w-4 h-4" />}
                      </button>
                      <div>
                        <span className="font-medium">{topic.name}</span>
                        {topic.required && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          topic.difficulty === 'easy'
                            ? 'bg-success/20 text-success'
                            : topic.difficulty === 'medium'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-destructive/20 text-destructive'
                        )}
                      >
                        {topic.difficulty}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          status === 'completed'
                            ? 'text-success'
                            : status === 'in-progress'
                            ? 'text-warning'
                            : 'text-muted-foreground'
                        )}
                      >
                        {status === 'completed'
                          ? 'Completed'
                          : status === 'in-progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Practice Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-6 mb-8"
          >
            <h3 className="font-semibold text-lg mb-4">Practice Platforms</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {dsaPracticePlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all"
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-medium flex-1">{platform.name}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/plan">
                View Improvement Plan
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
