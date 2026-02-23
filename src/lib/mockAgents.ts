// Mock multi-agent responses (Clara, Lexor, Verdicta)

export interface ClaraOutput {
  summary: string;
  keyFacts: string[];
  missingInformation: string[];
}

export interface LexorOutput {
  riskFactors: string[];
  contradictions: string[];
  loopholes: string[];
  riskCategories: { financial: string; time: string; emotional: string; evidence: string };
}

export interface VerdictaOutput {
  legalStrengthScore: number;
  riskLevelScore: number;
  evidenceStrengthScore: number;
  confidenceLevel: string;
  reasoning: string;
}

// Keep old names as aliases for backward compat
export type ClerkOutput = ClaraOutput;
export type DevilOutput = LexorOutput;
export type StrategistOutput = VerdictaOutput;

// Clara — Case Organizer
export function runClara(query: string, location: string, opponent: string): ClaraOutput {
  const words = query.split(/\s+/).length;
  const hasContract = /contract|agreement|signed/i.test(query);
  const hasPayment = /pay|money|salary|amount|₹/i.test(query);
  
  return {
    summary: `The user describes a legal dispute${location ? ` in ${location}` : ""}${opponent ? ` against a ${opponent}` : ""}. The situation involves ${words > 30 ? "detailed circumstances" : "a brief description"} that requires analysis of applicable legal frameworks and potential remedies.`,
    keyFacts: [
      `Dispute involves ${opponent || "an unspecified party"}`,
      location ? `Jurisdiction: ${location}` : "No jurisdiction specified",
      hasContract ? "Written agreement referenced" : "No written agreement mentioned",
      hasPayment ? "Financial elements described" : "No financial details provided",
      `Case description: ${words} words provided`,
    ].filter(Boolean),
    missingInformation: [
      ...(!location ? ["Specific jurisdiction/location"] : []),
      ...(!hasContract ? ["Documentary evidence of agreement"] : []),
      ...(!hasPayment ? ["Financial impact details"] : []),
      "Timeline of events",
      "Prior attempts at resolution",
    ],
  };
}

// Lexor — Risk Analyzer
export function runLexor(query: string, clara: ClaraOutput): LexorOutput {
  const contradictions: string[] = [];
  const loopholes: string[] = [];
  
  if (clara.missingInformation.length > 3) {
    contradictions.push("Significant gaps in the narrative may weaken the case");
  }
  if (!/date|when|timeline/i.test(query)) {
    loopholes.push("No timeline established — statute of limitations may apply");
  }
  if (!/witness|evidence|proof/i.test(query)) {
    loopholes.push("No corroborating evidence mentioned");
  }

  return {
    riskFactors: [
      "Opposing party may have resources for extended litigation",
      "Burden of proof rests with the claimant",
      ...loopholes,
    ],
    contradictions,
    loopholes,
    riskCategories: {
      financial: clara.missingInformation.length > 2 ? "high" : "medium",
      time: "medium",
      emotional: "medium",
      evidence: contradictions.length > 0 ? "high" : "low",
    },
  };
}

// Verdicta — Decision Scorer (outputs scores ONLY, no viability)
export function runVerdicta(
  clara: ClaraOutput,
  lexor: LexorOutput,
  hasContract: boolean,
  hasPayment: boolean,
  hasCommunication: boolean
): VerdictaOutput {
  const evidenceCount = [hasContract, hasPayment, hasCommunication].filter(Boolean).length;
  const missingCount = clara.missingInformation.length;
  const contradictionCount = lexor.contradictions.length;

  let legalStrength = 40 + (evidenceCount * 12) - (missingCount * 5) + (clara.keyFacts.length * 3);
  let riskLevel = 30 + (contradictionCount * 15) + (lexor.riskFactors.length * 8) - (evidenceCount * 10);
  let evidenceStrength = evidenceCount * 30 - (contradictionCount * 10) - (Math.max(0, missingCount - 2) * 10);

  legalStrength = Math.max(0, Math.min(100, legalStrength));
  riskLevel = Math.max(0, Math.min(100, riskLevel));
  evidenceStrength = Math.max(0, Math.min(100, evidenceStrength));

  let confidence: string;
  if (evidenceCount >= 2 && riskLevel < 40) confidence = "high";
  else if (evidenceCount >= 1 && riskLevel < 60) confidence = "medium";
  else confidence = "low";

  return {
    legalStrengthScore: legalStrength,
    riskLevelScore: riskLevel,
    evidenceStrengthScore: evidenceStrength,
    confidenceLevel: confidence,
    reasoning: `Based on the analysis: Legal position has ${legalStrength > 60 ? "strong" : legalStrength > 40 ? "moderate" : "weak"} foundations. ${evidenceCount} of 3 key evidence types are available. ${lexor.riskFactors.length} risk factors identified. ${contradictionCount > 0 ? `${contradictionCount} contradiction(s) weaken the case.` : "No major contradictions found."} ${clara.missingInformation.length > 2 ? "Several information gaps should be addressed." : "Key information is mostly present."}`,
  };
}

// Legacy aliases
export const runClerk = runClara;
export const runDevil = runLexor;
export const runStrategist = runVerdicta;
