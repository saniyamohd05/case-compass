import { Link } from "react-router-dom";
import { Shield, Brain, FileSearch, BarChart3, CheckCircle, Lock, ArrowRight, Scale, Gavel } from "lucide-react";
import Navbar from "@/components/Navbar";
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
  { name: "Clerk", role: "Fact Extractor", desc: "Reads your situation, extracts key facts, identifies the legal domain, and organizes everything into a clear summary.", icon: FileSearch },
  { name: "Devil's Advocate", role: "Risk Analyzer", desc: "Evaluates risks, finds contradictions, identifies loopholes, and stress-tests your case from every angle.", icon: Scale },
  { name: "Strategist", role: "Decision Scorer", desc: "Computes legal strength, evidence, and risk scores. Final viability score is calculated deterministically.", icon: Gavel },
];

const audiences = ["Tenants", "Students", "Freelancers", "Small Businesses", "Consumers", "Employees"];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-primary uppercase tracking-widest mb-4">AI-Powered Legal Decision Support</p>
          <h1 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight mb-4">
            Think Before You Sue.
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8">
            Know your odds before spending a dime. ArguMind's AI agents analyze your legal situation and tell you whether to proceed, revise, or walk away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/analyze" className="btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2 justify-center">
              Analyze My Situation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a href="#features" className="btn-secondary text-sm py-2.5 px-6 inline-flex items-center gap-2 justify-center">
              How It Works
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Not legal advice. Decision support only.</p>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Who It Helps</p>
          <div className="flex flex-wrap justify-center gap-2">
            {audiences.map((a) => (
              <span key={a} className="px-4 py-1.5 rounded-md border border-border text-xs text-muted-foreground">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {[
              { src: hammerImg, alt: "Legal justice gavel" },
              { src: termsImg, alt: "Legal terms document" },
              { src: legalImg, alt: "Legal vs illegal concept" },
            ].map((img, i) => (
              <div key={i} className="enterprise-card p-0 overflow-hidden">
                <img src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="enterprise-card p-0 overflow-hidden">
            <video src={legalVideo} autoPlay muted loop playsInline className="w-full aspect-video object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Intelligence, Not Guesswork</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="enterprise-card">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-primary uppercase tracking-widest mb-2">Multi-Agent System</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Three Agents, One Decision</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className="enterprise-card text-center">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <agent.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                <p className="text-xs text-primary uppercase tracking-wider mt-0.5 mb-2">{agent.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Private. Secure. Confidential.</h2>
          <p className="text-sm text-muted-foreground mb-6">Your case details are encrypted and protected.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            {["End-to-end encryption", "No data retention", "Input validation", "CORS configured"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-primary" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Ready to Know Your Odds?</h2>
          <p className="text-sm text-muted-foreground mb-6">Get your AI-powered case analysis in under 2 minutes.</p>
          <Link to="/analyze" className="btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2">
            Analyze My Situation <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
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
