import { Play, Square, Save, Trash2, Route, Upload } from "lucide-react";

export default function ControlPanel({
  robotWidth,
  setRobotWidth,
  missionName,
  setMissionName,
  onGenerateSpiral,
  onClearPoints,
  onClearSpiral,
  onSaveMission,
  onSendMission,
  savedMissions,
  onLoadMission,
  onStartSimulation,
  onStopSimulation,
  isSimulating,
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <button className={buttonStyle} onClick={onGenerateSpiral}>
          <Route size={18} />
          Generate Spiral
        </button>

        <button
          className={buttonStyle}
          onClick={onStartSimulation}
          disabled={isSimulating}
        >
          <Play size={18} className="text-success" />
          Start Simulation
        </button>

        <button
          className={buttonStyle}
          onClick={onStopSimulation}
          disabled={!isSimulating}
        >
          <Square size={18} className="text-danger" />
          Stop Simulation
        </button>

        <button className={buttonStyle} onClick={onSaveMission}>
          <Save size={18} />
          Save Mission
        </button>

        <button className={buttonStyle} onClick={onClearPoints}>
          <Trash2 size={18} />
          Clear Points
        </button>

        <button className={buttonStyle} onClick={onClearSpiral}>
          <Trash2 size={18} />
          Clear Spiral
        </button>

        <button className={buttonStyle} onClick={onSendMission}>
          <Upload size={18} />
          Send to Robot
        </button>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-md font-semibold mb-3">Saved Missions</h3>

        {savedMissions.length === 0 ? (
          <p className="text-sm text-muted">No saved missions yet.</p>
        ) : (
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {savedMissions.map((mission, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-slate-800 p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{mission.missionName}</p>
                  <p className="text-xs text-muted">
                    Width: {mission.robotWidth} m • Waypoints: {mission.spiralPath?.length || 0}
                  </p>
                </div>

                <button
                  onClick={() => onLoadMission(mission)}
                  className="px-3 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm"
                >
                  Load
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}