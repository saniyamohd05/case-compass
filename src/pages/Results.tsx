import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Clock, Heart, FileCheck, CheckCircle, ArrowRight, AlertTriangle, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScoreGauge from "@/components/ScoreGauge";
import ScrollReveal from "@/components/ScrollReveal";
import { mockResult } from "@/lib/mockData";

const riskIcons: Record<string, any> = {
  financial: DollarSign,
  time: Clock,
  emotional: Heart,
  evidence: FileCheck,
};

const riskColors: Record<string, string> = {
  high: "text-success",
  medium: "text-warning",
  low: "text-primary",
};

const Results = () => {
  const navigate = useNavigate();
  const result = mockResult;

  useEffect(() => {
    const caseData = sessionStorage.getItem("argumind_case");
    if (!caseData) {
      navigate("/analyze");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Case Analysis Complete
            </h1>
            <p className="text-muted-foreground">Here's what our AI agents found.</p>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 md:p-12 mb-8 flex flex-col items-center"
          >
            <ScoreGauge score={result.viabilityScore} />
            <p className="text-sm text-muted-foreground mt-6 max-w-lg text-center leading-relaxed">
              {result.summary}
            </p>
          </motion.div>

          {/* Risk Cards */}
          <ScrollReveal>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Risk Assessment</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {Object.entries(result.risks).map(([key, risk], i) => {
              const Icon = riskIcons[key] || AlertTriangle;
              return (
                <ScrollReveal key={key} delay={i * 0.1}>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 ${riskColors[risk.level] || "text-muted-foreground"}`} />
                      <h3 className="text-sm font-semibold text-foreground capitalize">{key} Risk</h3>
                      <span className={`ml-auto text-xs font-semibold uppercase ${riskColors[risk.level]}`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{risk.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Reasoning */}
          <ScrollReveal>
            <div className="glass-card p-6 mb-8">
              <h2 className="text-lg font-display font-semibold text-foreground mb-3">Reasoning</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
            </div>
          </ScrollReveal>

          {/* Documents & Alternatives */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <ScrollReveal>
              <div className="glass-card p-6 h-full">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">Required Documents</h2>
                <ul className="space-y-2.5">
                  {result.documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6 h-full">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">Alternative Actions</h2>
                <ul className="space-y-2.5">
                  {result.alternatives.map((alt) => (
                    <li key={alt} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div className="text-center">
              <Link to="/analyze" className="btn-gradient text-sm py-2.5 px-6 inline-flex items-center gap-2">
                Analyze Another Case
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted-foreground mt-4">This is not legal advice. Consult a qualified attorney.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Results;
