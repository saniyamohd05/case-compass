import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Mic, MicOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Disclaimer from "@/components/Disclaimer";
import VoiceAgent from "@/components/VoiceAgent";

const Analyze = () => {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("");
  const [location, setLocation] = useState("");
  const [opponent, setOpponent] = useState("");
  const [loss, setLoss] = useState("");
  const [evidenceContract, setEvidenceContract] = useState(false);
  const [evidencePayment, setEvidencePayment] = useState(false);
  const [evidenceCommunication, setEvidenceCommunication] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) return;
    sessionStorage.setItem(
      "argumind_case",
      JSON.stringify({
        situation, location, opponent, loss,
        evidenceContract, evidencePayment, evidenceCommunication,
      })
    );
    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-1">New Analysis</h1>
            <p className="text-sm text-muted-foreground">Describe your situation for AI-powered analysis.</p>
          </div>

          <Disclaimer />

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="enterprise-card space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Situation Description <span className="text-destructive">*</span>
                  </label>
                  <VoiceAgent onTranscript={(text) => setSituation((prev) => prev + " " + text)} />
                </div>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Describe your legal situation in detail..."
                  className="input-field h-32 resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Opponent Type</label>
                  <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Individual, Company..." className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Estimated Financial Loss</label>
                <input value={loss} onChange={(e) => setLoss(e.target.value)} placeholder="₹0" className="input-field" />
              </div>
            </div>

            {/* Evidence Checklist */}
            <div className="enterprise-card">
              <h3 className="text-sm font-medium text-foreground mb-4">Evidence Checklist</h3>
              <div className="space-y-3">
                {[
                  { label: "Written Contract / Agreement", checked: evidenceContract, set: setEvidenceContract },
                  { label: "Payment Proof / Receipts", checked: evidencePayment, set: setEvidencePayment },
                  { label: "Communication Records", checked: evidenceCommunication, set: setEvidenceCommunication },
                ].map((item) => (
                  <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.checked ? "bg-primary border-primary" : "border-border group-hover:border-muted-foreground"
                      }`}
                      onClick={() => item.set(!item.checked)}
                    >
                      {item.checked && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Each evidence item adds +30 points to your evidence strength score.</p>
            </div>

            <button type="submit" disabled={!situation.trim()} className="btn-primary w-full flex items-center justify-center gap-2">
              Analyze My Case
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              Your data is encrypted and never stored permanently.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
