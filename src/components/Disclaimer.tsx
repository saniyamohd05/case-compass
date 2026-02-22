import { AlertTriangle } from "lucide-react";

const Disclaimer = () => (
  <div className="flex items-start gap-2 p-3 rounded-md bg-warning/10 border border-warning/20 text-xs text-warning">
    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
    <span>This system provides decision support only and is not a substitute for professional legal consultation.</span>
  </div>
);

export default Disclaimer;
