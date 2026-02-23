import { Link } from "react-router-dom";
import { Shield, Brain, FileSearch, BarChart3, CheckCircle, Lock, ArrowRight, Scale, Gavel } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import ScrollReveal from "@/components/ScrollReveal";
import hammerImg from "@/assets/hammer.jpg";
import termsImg from "@/assets/terms.jpg";
import legalImg from "@/assets/legal.jpg";
import legalVideo from "@/assets/legal-video.mp4";

const features = [
  { icon: Brain, title: "AI Case Analysis", desc: "Multi-agent reasoning breaks down your situation into structured legal insights." },
  { icon: BarChart3, title: "Risk Intelligence", desc: "Financial, time, and emotional risk assessment before you commit." },
  { icon: FileSearch, title: "Evidence Checklist", desc: "Know exactly what documents you need to strengthen your case." },
  { icon: CheckCircle, title: "Decision Dashboard", desc: "Clear PROCEED / REVISE / STOP recommendation with full reasoning." },
];

const agents = [
  { name: "Clara", role: "Case Organizer", desc: "Reads your situation, extracts key facts, identifies the legal domain, and organizes everything into a clear summary.", icon: FileSearch },
  { name: "Lexor", role: "Risk Analyzer", desc: "Evaluates risks, finds contradictions, identifies loopholes, and stress-tests your case from every angle.", icon: Scale },
  { name: "Verdicta", role: "Decision Scorer", desc: "Computes legal strength, evidence, and risk scores. Final viability score is calculated deterministically.", icon: Gavel },
];

const audiences = [
  { label: "Tenants & Landlords", desc: "Resolve rental disputes, deposits, and evictions with clarity." },
  { label: "Employees & Students", desc: "Understand workplace rights and academic grievances." },
  { label: "Freelancers & Creators", desc: "Handle payment disputes and contract breaches." },
  { label: "Small Businesses", desc: "Navigate vendor conflicts and compliance issues." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6" style={{ background: "linear-gradient(180deg, hsl(40 20% 97%) 0%, hsl(37 18% 95%) 100%)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-primary" />
              <p className="text-xs text-primary uppercase tracking-[0.2em] font-medium">AI-Powered Legal Decision Support</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
              Think Before<br />You Sue.
            </h1>
            <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
              ArguMind analyzes your case using 3 AI agents and tells you whether to fight, settle, or negotiate — before you spend time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/analyze" className="btn-primary text-sm py-3 px-7 inline-flex items-center gap-2 justify-center">
                Analyze My Case <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className="btn-secondary text-sm py-3 px-7 inline-flex items-center gap-2 justify-center">
                See How It Works
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <img
                src={hammerImg}
                alt="Legal justice gavel representing decision-making"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Who It Helps */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs text-primary uppercase tracking-[0.2em] font-medium mb-2">Who It Helps</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Built for People, Not Lawyers</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiences.map((a, i) => (
              <ScrollReveal key={a.label} delay={i * 0.1}>
                <div className="enterprise-card hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{a.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-12 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              { src: termsImg, alt: "Legal terms and conditions document" },
              { src: legalImg, alt: "Legal vs illegal concept illustration" },
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="enterprise-card p-0 overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <div className="enterprise-card p-0 overflow-hidden">
              <video src={legalVideo} autoPlay muted loop playsInline className="w-full aspect-video object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs text-primary uppercase tracking-[0.2em] font-medium mb-2">Features</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Intelligence, Not Guesswork</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="enterprise-card hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft/50 flex items-center justify-center mb-3">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-16 px-6 bg-accent/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-xs text-primary uppercase tracking-[0.2em] font-medium mb-2">Multi-Agent System</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Three Agents, One Decision</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {agents.map((agent, i) => (
              <ScrollReveal key={agent.name} delay={i * 0.15}>
                <div className="enterprise-card text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative w-12 h-12 mx-auto mb-3">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-soft/40"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
                    />
                    <div className="relative w-12 h-12 rounded-full bg-primary-soft/60 flex items-center justify-center">
                      <agent.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-xs text-primary uppercase tracking-wider mt-0.5 mb-2">{agent.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{agent.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your Case Data Stays Private.</h2>
            <p className="text-sm text-muted-foreground mb-6">End-to-end encryption ensures your details are never exposed.</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              {["End-to-end encryption", "No data retention", "Input validation", "CORS configured"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary" /> {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-accent/30">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Ready to Know Your Odds?</h2>
            <p className="text-sm text-muted-foreground mb-6">Get your AI-powered case analysis in under 2 minutes.</p>
            <Link to="/analyze" className="btn-primary text-sm py-3 px-7 inline-flex items-center gap-2">
              Start Your Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-6" style={{ backgroundColor: "hsl(37 18% 95%)", borderColor: "hsl(37 16% 89%)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-primary" />
            <span className="font-semibold text-foreground">ArguMind</span>
          </div>
          <p>© 2026 ArguMind. This is not legal advice. Decision support only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
