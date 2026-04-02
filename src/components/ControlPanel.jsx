import { Play, Square, Save, Trash2, Route } from "lucide-react";

export default function ControlPanel({
  robotWidth,
  setRobotWidth,
  missionName,
  setMissionName,
  onGenerateSpiral,
  onClearPoints,
  onClearSpiral,
}) {
  const buttonStyle =
    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition border border-border bg-slate-800 hover:bg-slate-700";

  const inputStyle =
    "w-full rounded-xl border border-border bg-slate-800 px-4 py-3 text-text outline-none focus:ring-2 focus:ring-primary";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Mission Planning</h2>
        <span className="text-sm text-muted">Coverage Controls</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-muted mb-2">Mission Name</label>
          <input
            type="text"
            className={inputStyle}
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
            placeholder="Enter mission name"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-2">
            Robot Cleaning Width (m)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            className={inputStyle}
            value={robotWidth}
            onChange={(e) => setRobotWidth(e.target.value)}
            placeholder="1.0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className={buttonStyle} onClick={onGenerateSpiral}>
          <Route size={18} />
          Generate Spiral
        </button>

        <button className={buttonStyle}>
          <Play size={18} className="text-success" />
          Start Simulation
        </button>

        <button className={buttonStyle}>
          <Square size={18} className="text-danger" />
          Stop Simulation
        </button>

        <button className={buttonStyle}>
          <Save size={18} />
          Save Path
        </button>

        <button className={buttonStyle} onClick={onClearPoints}>
          <Trash2 size={18} />
          Clear Points
        </button>

        <button className={buttonStyle} onClick={onClearSpiral}>
          <Trash2 size={18} />
          Clear Spiral
        </button>
      </div>
    </section>
  );
}