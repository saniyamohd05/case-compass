import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, ArrowRight, FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Disclaimer from "@/components/Disclaimer";

interface Analysis {
  id: string;
  user_query: string;
  viability_score: number;
  recommendation: string;
  confidence_level: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchAnalyses = async () => {
      const { data } = await supabase
        .from("analyses")
        .select("id, user_query, viability_score, recommendation, confidence_level, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }) as any;
      setAnalyses(data || []);
      setLoading(false);
    };
    fetchAnalyses();
  }, [user]);

  const stats = {
    total: analyses.length,
    avgScore: analyses.length ? Math.round(analyses.reduce((a, b) => a + (b.viability_score || 0), 0) / analyses.length) : 0,
    proceed: analyses.filter((a) => a.recommendation === "PROCEED").length,
    revise: analyses.filter((a) => a.recommendation === "REVISE").length,
    stop: analyses.filter((a) => a.recommendation === "STOP").length,
  };

  const recIcon: Record<string, any> = { PROCEED: CheckCircle, REVISE: AlertTriangle, STOP: XCircle };
  const recColor: Record<string, string> = { PROCEED: "text-success", REVISE: "text-warning", STOP: "text-destructive" };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Overview of your case analyses.</p>
            </div>
            <Link to="/analyze" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> New Analysis
            </Link>
          </div>

          <Disclaimer />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {[
              { label: "Total Cases", value: stats.total, icon: BarChart3 },
              { label: "Avg Score", value: stats.avgScore, icon: TrendingUp },
              { label: "Proceed", value: stats.proceed, color: "text-success" },
              { label: "Revise", value: stats.revise, color: "text-warning" },
              { label: "Stop", value: stats.stop, color: "text-destructive" },
            ].map((s) => (
              <div key={s.label} className="enterprise-card text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color || "text-foreground"}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Outcome Distribution */}
          {stats.total > 0 && (
            <div className="enterprise-card mt-6">
              <h2 className="text-sm font-semibold text-foreground mb-4">Outcome Distribution</h2>
              <div className="flex gap-1 h-6 rounded overflow-hidden">
                {stats.proceed > 0 && (
                  <div className="bg-success/80 flex items-center justify-center text-xs text-success-foreground font-medium" style={{ width: `${(stats.proceed / stats.total) * 100}%` }}>
                    {stats.proceed}
                  </div>
                )}
                {stats.revise > 0 && (
                  <div className="bg-warning/80 flex items-center justify-center text-xs text-warning-foreground font-medium" style={{ width: `${(stats.revise / stats.total) * 100}%` }}>
                    {stats.revise}
                  </div>
                )}
                {stats.stop > 0 && (
                  <div className="bg-destructive/80 flex items-center justify-center text-xs text-destructive-foreground font-medium" style={{ width: `${(stats.stop / stats.total) * 100}%` }}>
                    {stats.stop}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Proceed</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Revise</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Stop</span>
              </div>
            </div>
          )}

          {/* Recent Analyses */}
          <div className="enterprise-card mt-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Recent Analyses</h2>
            {loading ? (
              <p className="text-xs text-muted-foreground">Loading...</p>
            ) : analyses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-3">No analyses yet.</p>
                <Link to="/analyze" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5">
                  Create Your First Analysis <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 font-medium">Case</th>
                      <th className="text-center py-2 font-medium">Score</th>
                      <th className="text-center py-2 font-medium">Result</th>
                      <th className="text-center py-2 font-medium">Confidence</th>
                      <th className="text-right py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyses.slice(0, 10).map((a) => {
                      const Icon = recIcon[a.recommendation] || AlertTriangle;
                      return (
                        <tr key={a.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                          <td className="py-2.5 text-foreground max-w-[200px] truncate">{a.user_query}</td>
                          <td className="py-2.5 text-center font-medium text-foreground">{a.viability_score}</td>
                          <td className="py-2.5 text-center">
                            <span className={`inline-flex items-center gap-1 ${recColor[a.recommendation]}`}>
                              <Icon className="w-3 h-3" /> {a.recommendation}
                            </span>
                          </td>
                          <td className="py-2.5 text-center text-muted-foreground capitalize">{a.confidence_level}</td>
                          <td className="py-2.5 text-right text-muted-foreground">
                            {new Date(a.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
