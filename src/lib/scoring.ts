// Deterministic Scoring Engine — NO LLM involvement in final scores

export interface EvidenceInput {
  contract: boolean;
  payment: boolean;
  communication: boolean;
}

export interface AgentOutputs {
  legalStrength: number;   // 0-100 from strategist
  riskLevel: number;       // 0-100 from strategist
  evidenceStrength: number; // 0-100 from strategist
  contradictions: number;  // count from devil's advocate
  missingDocs: number;     // count from devil's advocate
}

export interface ScoringResult {
  viabilityScore: number;
  recommendation: "PROCEED" | "REVISE" | "STOP";
  confidenceLevel: "high" | "medium" | "low";
  evidenceLabel: "Strong" | "Moderate" | "Weak";
  legalStrength: number;
  riskLevel: number;
  evidenceStrength: number;
}

// Each evidence item = +30 points (max 90)
export function calculateEvidenceBase(evidence: EvidenceInput): number {
  let score = 0;
  if (evidence.contract) score += 30;
  if (evidence.payment) score += 30;
  if (evidence.communication) score += 30;
  return score;
}

// Adjust evidence based on devil agent output
export function adjustEvidence(base: number, contradictions: number, missingDocs: number): number {
  let adjusted = base;
  // contradictions: -10 to -30 each
  adjusted -= Math.min(contradictions * 15, 30);
  // missing docs: -10 to -20 each
  adjusted -= Math.min(missingDocs * 10, 20);
  return Math.max(0, Math.min(100, adjusted));
}

export function getEvidenceLabel(score: number): "Strong" | "Moderate" | "Weak" {
  if (score >= 61) return "Strong";
  if (score >= 31) return "Moderate";
  return "Weak";
}

// Viability Score = (Legal Strength * 0.4) + (Evidence Strength * 0.3) + ((100 - Risk Level) * 0.3)
export function calculateViability(legalStrength: number, evidenceStrength: number, riskLevel: number): number {
  const score = (legalStrength * 0.4) + (evidenceStrength * 0.3) + ((100 - riskLevel) * 0.3);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getRecommendation(score: number): "PROCEED" | "REVISE" | "STOP" {
  if (score >= 71) return "PROCEED";
  if (score >= 41) return "REVISE";
  return "STOP";
}

export function getConfidenceLevel(evidence: EvidenceInput, riskLevel: number, contradictions: number): "high" | "medium" | "low" {
  const evidenceCount = [evidence.contract, evidence.payment, evidence.communication].filter(Boolean).length;
  if (evidenceCount >= 2 && riskLevel < 40 && contradictions === 0) return "high";
  if (evidenceCount >= 1 && riskLevel < 60) return "medium";
  return "low";
}

export function computeFullScore(
  evidence: EvidenceInput,
  agentOutputs: Partial<AgentOutputs>
): ScoringResult {
  const evidenceBase = calculateEvidenceBase(evidence);
  const contradictions = agentOutputs.contradictions ?? 0;
  const missingDocs = agentOutputs.missingDocs ?? 0;
  const evidenceStrength = adjustEvidence(
    agentOutputs.evidenceStrength ?? evidenceBase,
    contradictions,
    missingDocs
  );
  const legalStrength = agentOutputs.legalStrength ?? 50;
  const riskLevel = agentOutputs.riskLevel ?? 50;

  const viabilityScore = calculateViability(legalStrength, evidenceStrength, riskLevel);
  const recommendation = getRecommendation(viabilityScore);
  const confidenceLevel = getConfidenceLevel(evidence, riskLevel, contradictions);
  const evidenceLabel = getEvidenceLabel(evidenceStrength);

  return {
    viabilityScore,
    recommendation,
    confidenceLevel,
    evidenceLabel,
    legalStrength,
    riskLevel,
    evidenceStrength,
  };
}

// What-if simulation: recalculate without calling LLM
export function simulateWhatIf(
  baseAgentOutputs: Partial<AgentOutputs>,
  newEvidence: EvidenceInput,
  financialLossMultiplier: number = 1 // 0.5 to 2.0 slider
): ScoringResult {
  const riskAdjustment = financialLossMultiplier > 1.5 ? 10 : financialLossMultiplier < 0.7 ? -10 : 0;
  const adjustedRisk = Math.max(0, Math.min(100, (baseAgentOutputs.riskLevel ?? 50) + riskAdjustment));
  
  return computeFullScore(newEvidence, {
    ...baseAgentOutputs,
    riskLevel: adjustedRisk,
  });
}
