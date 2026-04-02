export default function RobotStatus({
  area,
  perimeter,
  pathDistance,
  waypointCount,
  robotWidth,
}) {
  const statCard =
    "rounded-xl border border-border bg-slate-800 p-4 flex flex-col gap-1";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Mission Metrics</h2>
        <span className="text-sm text-success">READY</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={statCard}>
          <span className="text-sm text-muted">Area</span>
          <span className="text-xl font-semibold">{area.toFixed(1)} m²</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Perimeter</span>
          <span className="text-xl font-semibold">{perimeter.toFixed(1)} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Path Distance</span>
          <span className="text-xl font-semibold">{pathDistance.toFixed(1)} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Waypoints</span>
          <span className="text-xl font-semibold">{waypointCount}</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Robot Width</span>
          <span className="text-xl font-semibold">{robotWidth} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Coverage Status</span>
          <span className="text-xl font-semibold">Planned</span>
        </div>
      </div>
    </section>
  );
}