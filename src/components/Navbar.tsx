import { Link, useLocation } from "react-router-dom";
import { Shield, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isLanding = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">ArguMind</span>
        </Link>

        <div className="flex items-center gap-3">
          {isLanding && (
            <div className="hidden md:flex items-center gap-5 text-xs text-muted-foreground mr-4">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#agents" className="hover:text-foreground transition-colors">Agents</a>
            </div>
          )}
          {user ? (
            <>
              <Link to="/dashboard" className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                <LayoutDashboard className="w-3 h-3" />
                Dashboard
              </Link>
              <Link to="/analyze" className="btn-primary text-xs py-1.5 px-3">
                New Analysis
              </Link>
              <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn-secondary text-xs py-1.5 px-3">Sign In</Link>
              <Link to="/analyze" className="btn-primary text-xs py-1.5 px-3">Analyze</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
