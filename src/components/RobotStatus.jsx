import StatusBadge from "./StatusBadge";

export default function RobotStatus({
  area,
  perimeter,
  pathDistance,
  waypointCount,
  robotWidth,
  progress,
  coveredDistance,
  isSimulating,
}) {
  const statCard =
    "rounded-2xl border border-border bg-slate-800/90 p-4 flex flex-col gap-1 shadow-sm";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">Mission Analytics</h2>
          <p className="text-sm text-muted">
            Live planning and simulation metrics
          </p>
        </div>

        <StatusBadge
          label={isSimulating ? "SIMULATION ACTIVE" : "MISSION READY"}
          color={isSimulating ? "yellow" : "green"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={statCard}>
          <span className="text-sm text-muted">Area</span>
          <span className="text-2xl font-semibold">{area.toFixed(1)} m²</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Perimeter</span>
          <span className="text-2xl font-semibold">{perimeter.toFixed(1)} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Path Distance</span>
          <span className="text-2xl font-semibold">{pathDistance.toFixed(1)} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Waypoints</span>
          <span className="text-2xl font-semibold">{waypointCount}</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Robot Width</span>
          <span className="text-2xl font-semibold">{robotWidth} m</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Coverage Status</span>
          <span className="text-2xl font-semibold">
            {isSimulating ? "Running" : "Planned"}
          </span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Progress</span>
          <span className="text-2xl font-semibold">{progress.toFixed(1)}%</span>
        </div>

        <div className={statCard}>
          <span className="text-sm text-muted">Distance Covered</span>
          <span className="text-2xl font-semibold">{coveredDistance.toFixed(1)} m</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">Mission Progress</span>
          <span className="font-medium">{progress.toFixed(1)}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 border border-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}