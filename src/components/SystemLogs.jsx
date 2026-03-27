export default function SystemLogs() {
  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[220px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">System Logs</h2>
        <span className="text-sm text-muted">Live Events</span>
      </div>

      <div className="rounded-xl border border-border bg-slate-900 h-[150px] overflow-y-auto p-4 text-sm text-muted space-y-2">
        <p>[12:01:22] GPS signal initialized</p>
        <p>[12:02:10] Robot connected to server</p>
        <p>[12:03:45] Offline map loaded successfully</p>
        <p>[12:04:12] Waiting for mission input...</p>
      </div>
    </section>
  );
}