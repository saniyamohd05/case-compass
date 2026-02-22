// Mock multi-agent responses (Clerk, Devil's Advocate, Strategist)

export interface ClerkOutput {
  summary: string;
  keyFacts: string[];
  missingInformation: string[];
}

export interface DevilOutput {
  riskFactors: string[];
  contradictions: string[];
  loopholes: string[];
  riskCategories: { financial: string; time: string; emotional: string; evidence: string };
}

export interface StrategistOutput {
  legalStrengthScore: number;
  riskLevelScore: number;
  evidenceStrengthScore: number;
  confidenceLevel: string;
  reasoning: string;
}

// Simulate Clerk agent
export function runClerk(query: string, location: string, opponent: string): ClerkOutput {
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

// Simulate Devil's Advocate agent
export function runDevil(query: string, clerk: ClerkOutput): DevilOutput {
  const contradictions: string[] = [];
  const loopholes: string[] = [];
  
  if (clerk.missingInformation.length > 3) {
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
      financial: clerk.missingInformation.length > 2 ? "high" : "medium",
      time: "medium",
      emotional: "medium",
      evidence: contradictions.length > 0 ? "high" : "low",
    },
  };
}

// Simulate Strategist agent — outputs scores ONLY, no viability
export function runStrategist(
  clerk: ClerkOutput,
  devil: DevilOutput,
  hasContract: boolean,
  hasPayment: boolean,
  hasCommunication: boolean
): StrategistOutput {
  const evidenceCount = [hasContract, hasPayment, hasCommunication].filter(Boolean).length;
  const missingCount = clerk.missingInformation.length;
  const contradictionCount = devil.contradictions.length;

  // Score based on actual inputs — NOT hardcoded
  let legalStrength = 40 + (evidenceCount * 12) - (missingCount * 5) + (clerk.keyFacts.length * 3);
  let riskLevel = 30 + (contradictionCount * 15) + (devil.riskFactors.length * 8) - (evidenceCount * 10);
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
    reasoning: `Based on the analysis: Legal position has ${legalStrength > 60 ? "strong" : legalStrength > 40 ? "moderate" : "weak"} foundations. ${evidenceCount} of 3 key evidence types are available. ${devil.riskFactors.length} risk factors identified. ${contradictionCount > 0 ? `${contradictionCount} contradiction(s) weaken the case.` : "No major contradictions found."} ${clerk.missingInformation.length > 2 ? "Several information gaps should be addressed." : "Key information is mostly present."}`,
  };
}
