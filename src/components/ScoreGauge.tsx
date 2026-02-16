import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  score: number;
  size?: number;
}

const ScoreGauge = ({ score, size = 200 }: Props) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius * 0.75; // 270 degrees
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return "hsl(var(--success))";
    if (score >= 40) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getLabel = () => {
    if (score >= 70) return "PROCEED";
    if (score >= 40) return "REVISE";
    return "AVOID";
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[135deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-display font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Viability</span>
        </div>
      </div>
      <motion.span
        className="text-sm font-semibold px-4 py-1.5 rounded-full"
        style={{
          background: getColor(),
          color: score >= 40 && score < 70 ? "hsl(var(--warning-foreground))" : "white",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        {getLabel()}
      </motion.span>
    </div>
  );
};

export default ScoreGauge;
