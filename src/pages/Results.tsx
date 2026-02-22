import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DollarSign, Clock, Heart, FileCheck, ArrowRight, CheckCircle, ChevronRight, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Disclaimer from "@/components/Disclaimer";
import { simulateWhatIf, type ScoringResult, type EvidenceInput } from "@/lib/scoring";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const riskIcons: Record<string, any> = { financial: DollarSign, time: Clock, emotional: Heart, evidence: FileCheck };

const recommendationStyle: Record<string, { bg: string; text: string }> = {
  PROCEED: { bg: "bg-success/15", text: "text-success" },
  REVISE: { bg: "bg-warning/15", text: "text-warning" },
  STOP: { bg: "bg-destructive/15", text: "text-destructive" },
};

const Results = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [simResult, setSimResult] = useState<ScoringResult | null>(null);
  const [simContract, setSimContract] = useState(false);
  const [simPayment, setSimPayment] = useState(false);
  const [simComm, setSimComm] = useState(false);
  const [simLoss, setSimLoss] = useState([1.0]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("argumind_result");
    if (!raw) { navigate("/analyze"); return; }
    const data = JSON.parse(raw);
    setResult(data);
    setSimContract(data.caseData?.evidenceContract ?? false);
    setSimPayment(data.caseData?.evidencePayment ?? false);
    setSimComm(data.caseData?.evidenceCommunication ?? false);
  }, [navigate]);

  // What-if simulation
  useEffect(() => {
    if (!result) return;
    const newEvidence: EvidenceInput = { contract: simContract, payment: simPayment, communication: simComm };
    const sim = simulateWhatIf(
      {
        legalStrength: result.strategist.legalStrengthScore,
        riskLevel: result.strategist.riskLevelScore,
        evidenceStrength: result.strategist.evidenceStrengthScore,
        contradictions: result.devil.contradictions.length,
        missingDocs: result.clerk.missingInformation.length,
      },
      newEvidence,
      simLoss[0]
    );
    setSimResult(sim);
  }, [simContract, simPayment, simComm, simLoss, result]);

  // Save to DB
  const saveAnalysis = async () => {
    if (!user || !result || saved) return;
    await supabase.from("analyses").insert({
      user_id: user.id,
      user_query: result.caseData.situation,
      location: result.caseData.location,
      opponent_type: result.caseData.opponent,
      financial_loss: result.caseData.loss,
      evidence_contract: result.caseData.evidenceContract,
      evidence_payment: result.caseData.evidencePayment,
      evidence_communication: result.caseData.evidenceCommunication,
      clerk_summary: result.clerk.summary,
      devil_analysis: JSON.stringify(result.devil),
      strategist_output: JSON.stringify(result.strategist),
      legal_strength_score: result.scoring.legalStrength,
      risk_level_score: result.scoring.riskLevel,
      evidence_strength_score: result.scoring.evidenceStrength,
      viability_score: result.scoring.viabilityScore,
      confidence_level: result.scoring.confidenceLevel,
      recommendation: result.scoring.recommendation,
    } as any);
    setSaved(true);
  };

  useEffect(() => {
    if (user && result && !saved) saveAnalysis();
  }, [user, result]);

  if (!result) return null;

  const scoring: ScoringResult = result.scoring;
  const display = simResult || scoring;
  const style = recommendationStyle[display.recommendation] || recommendationStyle.REVISE;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground mb-1">Analysis Results</h1>
            <p className="text-sm text-muted-foreground">Complete breakdown of your case analysis.</p>
          </div>

          <Disclaimer />

          {/* Score + Recommendation */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="enterprise-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Viability Score</p>
              <p className="text-4xl font-bold text-foreground">{display.viabilityScore}</p>
              <p className="text-xs text-muted-foreground mt-1">/100</p>
            </div>
            <div className="enterprise-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recommendation</p>
              <span className={`inline-block px-3 py-1 rounded-md text-sm font-semibold ${style.bg} ${style.text}`}>
                {display.recommendation}
              </span>
            </div>
            <div className="enterprise-card text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Confidence</p>
              <p className="text-lg font-semibold text-foreground capitalize">{display.confidenceLevel}</p>
              <p className="text-xs text-muted-foreground mt-1">Evidence: {display.evidenceLabel}</p>
            </div>
          </div>

          {/* Legal Summary */}
          <div className="enterprise-card mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">Legal Summary</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.clerk.summary}</p>
          </div>

          {/* Risk Breakdown */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">Risk Breakdown</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(result.devil.riskCategories).map(([key, level]) => {
                const Icon = riskIcons[key] || AlertTriangle;
                const levelStr = level as string;
                const color = levelStr === "high" ? "text-destructive" : levelStr === "medium" ? "text-warning" : "text-success";
                return (
                  <div key={key} className="enterprise-card flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 ${color}`} />
                    <div>
                      <h3 className="text-xs font-semibold text-foreground capitalize">{key} Risk</h3>
                      <span className={`text-xs font-medium uppercase ${color}`}>{levelStr}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scoring Visualization */}
          <div className="enterprise-card mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Score Breakdown</h2>
            {[
              { label: "Legal Strength", value: display.legalStrength },
              { label: "Evidence Strength", value: display.evidenceStrength },
              { label: "Risk Level", value: display.riskLevel, invert: true },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-medium">{item.value}/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.invert
                        ? item.value > 60 ? "bg-destructive" : item.value > 30 ? "bg-warning" : "bg-success"
                        : item.value > 60 ? "bg-success" : item.value > 30 ? "bg-warning" : "bg-destructive"
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Reasoning */}
          <div className="enterprise-card mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">Reasoning</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.strategist.reasoning}</p>
          </div>

          {/* Documents & Alternatives */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="enterprise-card">
              <h2 className="text-sm font-semibold text-foreground mb-3">Required Documents</h2>
              <ul className="space-y-2">
                {(result.clerk.keyFacts || []).map((doc: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="enterprise-card">
              <h2 className="text-sm font-semibold text-foreground mb-3">Risk Factors</h2>
              <ul className="space-y-2">
                {result.devil.riskFactors.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ChevronRight className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What-If Simulation */}
          <div className="enterprise-card mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-1">What-If Simulation</h2>
            <p className="text-xs text-muted-foreground mb-4">Adjust parameters to see how scores change — no AI call needed.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Financial Loss Multiplier: {simLoss[0].toFixed(1)}x</label>
                <Slider value={simLoss} onValueChange={setSimLoss} min={0.5} max={2} step={0.1} className="w-full" />
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Written Contract", checked: simContract, set: setSimContract },
                  { label: "Payment Proof", checked: simPayment, set: setSimPayment },
                  { label: "Communication Records", checked: simComm, set: setSimComm },
                ].map((item) => (
                  <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-foreground">
                    <input type="checkbox" checked={item.checked} onChange={() => item.set(!item.checked)} className="accent-primary" />
                    {item.label}
                  </label>
                ))}
              </div>
              {simResult && simResult.viabilityScore !== scoring.viabilityScore && (
                <div className="flex items-center gap-2 text-xs">
                  {simResult.viabilityScore > scoring.viabilityScore
                    ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                    : <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                  }
                  <span className="text-muted-foreground">
                    Score changed from {scoring.viabilityScore} to {simResult.viabilityScore} ({simResult.recommendation})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/analyze" className="btn-primary text-xs py-2 px-5 inline-flex items-center gap-2">
              Analyze Another Case
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
