export default function RobotStatus() {
  const statCard =
    "rounded-xl border border-border bg-slate-800 p-4 flex flex-col gap-1";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Robot Status</h2>
        <span className="text-sm text-success">ONLINE</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={statCard}>
          <span className="text-sm text-muted">GPS Accuracy</span>
          <span className="text-xl font-semibold">0.8 m</span>
        </div>
        <div className={statCard}>
          <span className="text-sm text-muted">Speed</span>
          <span className="text-xl font-semibold">0.45 m/s</span>
        </div>
        <div className={statCard}>
          <span className="text-sm text-muted">Distance Covered</span>
          <span className="text-xl font-semibold">124 m</span>
        </div>
        <div className={statCard}>
          <span className="text-sm text-muted">Progress</span>
          <span className="text-xl font-semibold">43%</span>
        </div>
      </div>
    </section>
  );
}