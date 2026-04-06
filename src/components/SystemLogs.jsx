import { TerminalSquare } from "lucide-react";

export default function SystemLogs() {
  const logs = [
    "[12:01:22] GPS signal initialized",
    "[12:02:10] Robot connection mocked / ready",
    "[12:03:45] Offline map loaded successfully",
    "[12:04:12] Waiting for mission input...",
    "[12:05:30] Spiral planner initialized",
    "[12:06:18] Simulation module armed",
  ];

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-5 h-[260px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/15 border border-primary/20">
          <TerminalSquare className="text-primary" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">System Logs</h2>
          <p className="text-sm text-muted">Live diagnostics and mission events</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-slate-950 h-[170px] overflow-y-auto p-4 text-sm font-mono text-slate-300 space-y-2">
        {logs.map((log, index) => (
          <p key={index} className="leading-relaxed">
            {log}
          </p>
        ))}
      </div>
    </section>
  );
}