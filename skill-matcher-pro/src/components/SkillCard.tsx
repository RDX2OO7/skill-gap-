import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  name: string;
  userLevel: number;
  requiredLevel: number;
  icon?: string;
  className?: string;
}

export function SkillCard({
  name,
  userLevel,
  requiredLevel,
  icon,
  className,
}: SkillCardProps) {
  const percentage = Math.min((userLevel / requiredLevel) * 100, 100);
  const isMet = userLevel >= requiredLevel;
  const isPartial = userLevel > 0 && !isMet;

  const getStatusColor = () => {
    if (isMet) return 'border-success/50 bg-success/5';
    if (isPartial) return 'border-warning/50 bg-warning/5';
    return 'border-destructive/50 bg-destructive/5';
  };

  const getStatusBadge = () => {
    if (isMet) return { text: 'Met', class: 'bg-success/20 text-success' };
    if (isPartial) return { text: 'Partial', class: 'bg-warning/20 text-warning' };
    return { text: 'Gap', class: 'bg-destructive/20 text-destructive' };
  };

  const levelLabels = ['', 'Basics', 'Problem-solving', 'Framework', 'Real-world'];
  const badge = getStatusBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md',
        getStatusColor(),
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h4 className="font-semibold text-foreground">{name}</h4>
        </div>
        <span className={cn('text-xs font-medium px-2 py-1 rounded-full', badge.class)}>
          {badge.text}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Your level: {levelLabels[userLevel] || 'None'}</span>
          <span>Required: {levelLabels[requiredLevel]}</span>
        </div>

        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn(
              'absolute inset-y-0 left-0 rounded-full',
              isMet ? 'progress-success' : isPartial ? 'progress-warning' : 'progress-danger'
            )}
          />
        </div>

        <div className="flex justify-between text-xs">
          <span className="font-medium text-foreground">
            Level {userLevel}/{requiredLevel}
          </span>
          <span className="text-muted-foreground">{Math.round(percentage)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
