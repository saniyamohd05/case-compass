import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSearch, Scale, Gavel, Brain } from "lucide-react";

const steps = [
  { icon: FileSearch, agent: "Clara", text: "Organizing your case…", duration: 2500 },
  { icon: Scale, agent: "Lexor", text: "Analyzing risks…", duration: 2500 },
  { icon: Gavel, agent: "Verdicta", text: "Preparing recommendation…", duration: 2000 },
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const caseData = sessionStorage.getItem("argumind_case");
    if (!caseData) {
      navigate("/analyze");
      return;
    }

    let elapsed = 0;
    const totalDuration = steps.reduce((a, b) => a + b.duration, 0);

    const interval = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));

      let accumulated = 0;
      for (let i = 0; i < steps.length; i++) {
        accumulated += steps[i].duration;
        if (elapsed < accumulated) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => navigate("/results"), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6" style={{ background: "var(--gradient-primary)" }}>
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm text-primary mb-4">
            <step.icon className="w-4 h-4" />
            {step.agent}
          </div>
          <p className="text-lg text-foreground font-display">{step.text}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--gradient-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="text-xs text-muted-foreground">Multi-Agent Reasoning in Progress</p>
      </div>
    </div>
  );
};

export default Loading;
