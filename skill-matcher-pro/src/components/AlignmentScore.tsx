import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AlignmentScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AlignmentScore({ score, size = 'lg', className }: AlignmentScoreProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (clampedScore / 100) * circumference;

  const getColor = () => {
    if (clampedScore >= 70) return 'text-success stroke-success';
    if (clampedScore >= 40) return 'text-warning stroke-warning';
    return 'text-destructive stroke-destructive';
  };

  const dimensions = {
    sm: { size: 100, textSize: 'text-xl', labelSize: 'text-[8px]' },
    md: { size: 140, textSize: 'text-3xl', labelSize: 'text-xs' },
    lg: { size: 180, textSize: 'text-4xl', labelSize: 'text-sm' },
  }[size];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={dimensions.size}
        height={dimensions.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={45}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={8}
          className="text-muted-foreground"
        />
        {/* Progress circle */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={45}
          fill="none"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className={getColor()}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={cn('font-bold', dimensions.textSize, getColor())}
        >
          {Math.round(clampedScore)}%
        </motion.span>
        <span className={cn('text-muted-foreground mt-1', dimensions.labelSize)}>
          Aligned
        </span>
      </div>
    </div>
  );
}
