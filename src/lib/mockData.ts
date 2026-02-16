export interface CaseResult {
  viabilityScore: number;
  recommendation: "PROCEED" | "REVISE" | "AVOID";
  summary: string;
  risks: {
    financial: { level: string; description: string };
    time: { level: string; description: string };
    emotional: { level: string; description: string };
    evidence: { level: string; description: string };
  };
  reasoning: string;
  documents: string[];
  alternatives: string[];
}

export const mockResult: CaseResult = {
  viabilityScore: 72,
  recommendation: "PROCEED",
  summary:
    "Your case involves a breach of contract by your former employer who failed to pay severance as outlined in your employment agreement. Based on the evidence described, you have a moderately strong case with documented proof of the agreement.",
  risks: {
    financial: {
      level: "medium",
      description: "Estimated legal costs of $3,000–$8,000. Potential recovery of $15,000 in unpaid severance.",
    },
    time: {
      level: "low",
      description: "Expected timeline of 3–6 months through small claims or mediation.",
    },
    emotional: {
      level: "medium",
      description: "Moderate stress expected. Direct confrontation with former employer likely.",
    },
    evidence: {
      level: "high",
      description: "Strong documentary evidence: signed contract, pay stubs, termination letter.",
    },
  },
  reasoning:
    "The employment contract clearly stipulates severance terms. Your documentation is strong, and the amount falls within small claims court jurisdiction in most states. Mediation could resolve this without full litigation.",
  documents: [
    "Signed employment contract",
    "Termination letter or email",
    "Pay stubs showing last payment",
    "Any written communication about severance",
    "Bank statements showing non-payment",
  ],
  alternatives: [
    "Send a formal demand letter before filing suit",
    "Propose mediation through a neutral third party",
    "File a wage claim with your state labor board",
    "Negotiate a reduced settlement directly",
  ],
};
