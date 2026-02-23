import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, Scale, Gavel, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { runClara, runLexor, runVerdicta } from "@/lib/mockAgents";
import { computeFullScore } from "@/lib/scoring";

const steps = [
  { icon: FileSearch, agent: "Clara", role: "Case Organizer", text: "Clara is organizing your case…", duration: 2500, color: "hsl(42 75% 31%)" },
  { icon: Scale, agent: "Lexor", role: "Risk Analyzer", text: "Lexor is analyzing legal risks…", duration: 2500, color: "hsl(33 70% 40%)" },
  { icon: Gavel, agent: "Verdicta", role: "Decision Scorer", text: "Verdicta is preparing your recommendation…", duration: 2000, color: "hsl(25 60% 35%)" },
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("argumind_case");
    if (!raw) { navigate("/analyze"); return; }

    const caseData = JSON.parse(raw);

    const clara = runClara(caseData.situation, caseData.location, caseData.opponent);
    const lexor = runLexor(caseData.situation, clara);
    const verdicta = runVerdicta(
      clara, lexor,
      caseData.evidenceContract ?? false,
      caseData.evidencePayment ?? false,
      caseData.evidenceCommunication ?? false
    );

    const scoring = computeFullScore(
      { contract: caseData.evidenceContract, payment: caseData.evidencePayment, communication: caseData.evidenceCommunication },
      {
        legalStrength: verdicta.legalStrengthScore,
        riskLevel: verdicta.riskLevelScore,
        evidenceStrength: verdicta.evidenceStrengthScore,
        contradictions: lexor.contradictions.length,
        missingDocs: clara.missingInformation.length,
      }
    );

    sessionStorage.setItem("argumind_result", JSON.stringify({
      clerk: clara, devil: lexor, strategist: verdicta, scoring,
      caseData,
    }));

    let elapsed = 0;
    const totalDuration = steps.reduce((a, b) => a + b.duration, 0);
    const interval = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      let acc = 0;
      for (let i = 0; i < steps.length; i++) {
        acc += steps[i].duration;
        if (elapsed < acc) { setCurrentStep(i); break; }
      }
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => navigate("/results"), 400);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated orb */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: step.color, opacity: 0.15 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.08, 0.15] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{ backgroundColor: step.color, opacity: 0.25 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.12, 0.25] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
              <div className="relative w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${step.color} 20%, transparent)` }}>
                <step.icon className="w-6 h-6" style={{ color: step.color }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft/40 border border-primary-soft text-xs font-medium text-primary mb-3">
              <step.icon className="w-3 h-3" />
              {step.agent} — {step.role}
            </div>
            <p className="text-sm text-foreground">{step.text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="text-xs text-muted-foreground">Multi-Agent Reasoning in Progress</p>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i <= currentStep ? 'bg-primary' : 'bg-accent'}`}
              animate={i === currentStep ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
