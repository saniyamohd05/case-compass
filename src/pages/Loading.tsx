import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, Scale, Gavel, Brain } from "lucide-react";
import { runClerk, runDevil, runStrategist } from "@/lib/mockAgents";
import { computeFullScore } from "@/lib/scoring";

const steps = [
  { icon: FileSearch, agent: "Clerk", text: "Extracting facts and organizing case…", duration: 2500 },
  { icon: Scale, agent: "Devil's Advocate", text: "Analyzing risks and contradictions…", duration: 2500 },
  { icon: Gavel, agent: "Strategist", text: "Computing scores and recommendation…", duration: 2000 },
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("argumind_case");
    if (!raw) { navigate("/analyze"); return; }

    const caseData = JSON.parse(raw);

    // Run mock agents
    const clerk = runClerk(caseData.situation, caseData.location, caseData.opponent);
    const devil = runDevil(caseData.situation, clerk);
    const strategist = runStrategist(
      clerk, devil,
      caseData.evidenceContract ?? false,
      caseData.evidencePayment ?? false,
      caseData.evidenceCommunication ?? false
    );

    // Deterministic scoring
    const scoring = computeFullScore(
      { contract: caseData.evidenceContract, payment: caseData.evidencePayment, communication: caseData.evidenceCommunication },
      {
        legalStrength: strategist.legalStrengthScore,
        riskLevel: strategist.riskLevelScore,
        evidenceStrength: strategist.evidenceStrengthScore,
        contradictions: devil.contradictions.length,
        missingDocs: clerk.missingInformation.length,
      }
    );

    // Store results
    sessionStorage.setItem("argumind_result", JSON.stringify({
      clerk, devil, strategist, scoring,
      caseData,
    }));

    // Animation
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
        <div className="w-14 h-14 rounded-lg bg-primary/10 mx-auto flex items-center justify-center mb-6">
          <Brain className="w-7 h-7 text-primary" />
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary border border-border text-xs text-primary mb-3">
            <step.icon className="w-3 h-3" />
            {step.agent}
          </div>
          <p className="text-sm text-foreground">{step.text}</p>
        </div>

        <div className="w-full h-1 rounded-full bg-secondary overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground">Multi-Agent Reasoning in Progress</p>
      </div>
    </div>
  );
};

export default Loading;
