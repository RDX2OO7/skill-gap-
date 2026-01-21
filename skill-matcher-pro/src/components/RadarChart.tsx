import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadarChartProps {
  data: { label: string; value: number; maxValue: number }[];
  size?: number;
  className?: string;
}

export function RadarChart({ data, size = 280, className }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, value: number, max: number) => {
    const normalizedValue = Math.min(value / max, 1);
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * normalizedValue;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLines = [0.25, 0.5, 0.75, 1];

  const dataPoints = data.map((d, i) => getPoint(i, d.value, d.maxValue));
  const pathD = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className={cn('relative', className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLines.map((ratio) => (
          <circle
            key={ratio}
            cx={center}
            cy={center}
            r={radius * ratio}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {data.map((_, i) => {
          const point = getPoint(i, 1, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          d={pathD}
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 1, r: 5 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            cx={point.x}
            cy={point.y}
            fill="hsl(var(--primary))"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const labelPoint = getPoint(i, 1.25, 1);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-medium fill-muted-foreground"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
