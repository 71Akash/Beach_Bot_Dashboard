import { TerminalSquare } from "lucide-react";

export default function SystemLogs({ logs = [] }) {
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
        {logs.length === 0 ? (
          <p className="text-muted">No logs yet...</p>
        ) : (
          logs.map((log, index) => (
            <p key={index} className="leading-relaxed">
              {log}
            </p>
          ))
        )}
      </div>
    </section>
  );
}