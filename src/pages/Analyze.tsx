import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import VoiceAgent from "@/components/VoiceAgent";

const Analyze = () => {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("");
  const [location, setLocation] = useState("");
  const [opponent, setOpponent] = useState("");
  const [loss, setLoss] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) return;
    // Store in sessionStorage for the loading/results pages
    sessionStorage.setItem("argumind_case", JSON.stringify({ situation, location, opponent, loss }));
    navigate("/loading");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Describe Your Situation
            </h1>
            <p className="text-muted-foreground">
              Tell us what happened. Our AI agents will analyze your case.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">
                    What happened? <span className="text-destructive">*</span>
                  </label>
                  <VoiceAgent onTranscript={(text) => setSituation((prev) => prev + " " + text)} />
                </div>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Describe your legal situation in detail. Include key facts, dates, and people involved..."
                  className="w-full h-40 rounded-lg bg-muted/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State or Country"
                    className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Opponent Type</label>
                  <input
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="Individual, Company, Landlord..."
                    className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estimated Financial Loss</label>
                <input
                  value={loss}
                  onChange={(e) => setLoss(e.target.value)}
                  placeholder="₹0.00"
                  className="w-full rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!situation.trim()}
              className="btn-gradient w-full text-base py-3.5 inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze My Case
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              Your data is encrypted and never stored.
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
