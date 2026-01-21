import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getStatus = () => {
    if (percentage >= 70) return 'success';
    if (percentage >= 40) return 'warning';
    return 'danger';
  };

  const status = getStatus();
  const heightClass = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative w-full bg-muted rounded-full overflow-hidden ${heightClass}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 rounded-full progress-${status}`}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-end">
          <span className="text-xs text-muted-foreground font-medium">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}
