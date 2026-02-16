import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Brain, FileSearch, BarChart3, CheckCircle, Lock, Users, Sparkles, ArrowRight, Scale, Eye, Gavel } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import hammerImg from "@/assets/hammer.jpg";
import termsImg from "@/assets/terms.jpg";
import legalImg from "@/assets/legal.jpg";
import legalVideo from "@/assets/legal-video.mp4";

const features = [
  { icon: Brain, title: "AI Case Analysis", desc: "Multi-agent reasoning breaks down your situation into structured legal insights." },
  { icon: BarChart3, title: "Risk Intelligence", desc: "Financial, time, and emotional risk assessment before you commit." },
  { icon: FileSearch, title: "Evidence Checklist", desc: "Know exactly what documents you need to strengthen your case." },
  { icon: CheckCircle, title: "Decision Dashboard", desc: "Clear PROCEED / REVISE / AVOID recommendation with full reasoning." },
];

const agents = [
  { name: "Clara", role: "Case Organizer", desc: "Reads your situation, extracts key facts, identifies the legal domain, and organizes everything into a clear summary.", icon: FileSearch, color: "from-primary to-blue-400" },
  { name: "Lexor", role: "Risk Analyst", desc: "Evaluates financial exposure, time commitment, emotional toll, and evidence strength across every angle.", icon: Scale, color: "from-indigo-500 to-accent" },
  { name: "Verdicta", role: "Decision Advisor", desc: "Synthesizes all analysis into a final viability score and actionable recommendation.", icon: Gavel, color: "from-accent to-purple-400" },
];

const audiences = ["Tenants", "Students", "Freelancers", "Small Businesses", "Consumers", "Employees"];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <HeroScene />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              AI-Powered Legal Decision Intelligence
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Think Before
            <br />
            <span className="gradient-text">You Sue.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Know your odds before spending a dime. ArguMind's AI agents analyze your legal situation and tell you whether to proceed, revise, or walk away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/analyze" className="btn-gradient text-base py-3 px-8 inline-flex items-center gap-2 justify-center">
              Analyze My Situation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="text-base py-3 px-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all inline-flex items-center gap-2 justify-center">
              See How It Works
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Not legal advice. ArguMind helps you make informed decisions.
          </motion.p>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </section>

      {/* Who it helps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Who It Helps</p>
            <div className="flex flex-wrap justify-center gap-3">
              {audiences.map((a, i) => (
                <motion.span
                  key={a}
                  className="px-5 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {a}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm text-primary uppercase tracking-widest mb-3">Justice in Focus</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Know Your Rights
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { src: hammerImg, alt: "Gavel and law books representing legal justice" },
              { src: termsImg, alt: "Terms of service document on typewriter" },
              { src: legalImg, alt: "Legal vs illegal concept" },
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="glass-card overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="glass-card overflow-hidden">
              <video
                src={legalVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm text-primary uppercase tracking-widest mb-3">Platform Features</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Intelligence, Not Guesswork
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="glass-card-hover p-8 h-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                    <f.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section id="agents" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm text-accent uppercase tracking-widest mb-3">AI Agents</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Meet Your Legal Team
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Three specialized AI agents work together to analyze your case from every angle.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <ScrollReveal key={agent.name} delay={i * 0.15}>
                <div className="glass-card-hover p-8 text-center h-full flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-5`}>
                    <agent.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground">{agent.name}</h3>
                  <p className="text-xs text-primary uppercase tracking-widest mt-1 mb-3">{agent.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm text-primary uppercase tracking-widest mb-3">Dashboard Preview</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Your Decision, Visualized
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold gradient-text mb-2">72</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Viability Score</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">PROCEED</span>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-foreground mb-2">3</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Risk Factors</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-semibold">MEDIUM</span>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-foreground mb-2">5</div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Documents Needed</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">CHECKLIST</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <Lock className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Private. Secure. Confidential.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Your case details are never stored or shared. All analysis happens in real-time and is discarded after your session.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {["End-to-end encryption", "No data retention", "SOC 2 compliant", "GDPR ready"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Ready to Know Your Odds?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get your AI-powered case analysis in under 2 minutes. No signup required.
            </p>
            <Link to="/analyze" className="btn-gradient text-base py-3 px-8 inline-flex items-center gap-2">
              Analyze My Situation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground">ArguMind</span>
          </div>
          <p>© 2026 ArguMind. This is not legal advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
