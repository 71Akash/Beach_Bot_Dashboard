import { Cpu, Wifi, BatteryCharging } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border bg-panel/70 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/20">
          <Cpu className="text-primary" size={22} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-wide">
            Beach Cleaning Robot Dashboard
          </h1>
          <p className="text-sm text-muted">
            Offline Mapping + Live Robot Monitoring
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Wifi className="text-success" size={18} />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-2">
          <BatteryCharging className="text-warning" size={18} />
          <span>78%</span>
        </div>
      </div>
    </header>
  );
}