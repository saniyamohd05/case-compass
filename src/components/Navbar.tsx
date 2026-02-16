import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b"
      style={{ borderRadius: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Argu<span className="gradient-text">Mind</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {isLanding && (
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#agents" className="hover:text-foreground transition-colors">AI Agents</a>
              <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            </div>
          )}
          <Link to="/analyze" className="btn-gradient text-sm py-2 px-5 inline-block">
            Analyze My Case
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
