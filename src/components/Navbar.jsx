import { Cpu, Wifi, BatteryCharging, ShieldCheck } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border bg-panel/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-panel">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary/15 border border-primary/20">
          <Cpu className="text-primary" size={24} />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
            Autonomous Beach Robot Dashboard
          </h1>
          <p className="text-sm text-muted">
            Offline Mapping • Mission Planning • Simulation Control
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <Wifi className="text-success" size={18} />
          <span>Offline Map Ready</span>
        </div>

        <div className="flex items-center gap-2 text-muted">
          <BatteryCharging className="text-warning" size={18} />
          <span>Battery Est.</span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="text-success" size={18} />
          <StatusBadge label="SYSTEM STABLE" color="green" />
        </div>
      </div>
    </header>
  );
}