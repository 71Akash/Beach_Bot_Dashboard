import { Play, Square, Save, Trash2, Route, Upload, FolderOpen, CornerUpLeft } from "lucide-react";
import StatusBadge from "./StatusBadge";

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
  onUndoPoint,
  onDeleteMission
}) {
  const buttonStyle =
    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition border border-border bg-slate-800 hover:bg-slate-700 hover:scale-[1.01] active:scale-[0.99]";

  const inputStyle =
    "w-full rounded-xl border border-border bg-slate-800 px-4 py-3 text-text outline-none focus:ring-2 focus:ring-primary";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold">Mission Planning Console</h2>
          <p className="text-sm text-muted">
            Configure, simulate, store, and deploy cleaning paths
          </p>
        </div>

        <StatusBadge
          label={isSimulating ? "MISSION RUNNING" : "READY TO PLAN"}
          color={isSimulating ? "yellow" : "green"}
        />
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

      <div className="mb-6 rounded-xl border border-border bg-slate-800/60 px-4 py-3 text-sm text-muted">
        Define the cleaning boundary using <span className="text-text font-medium">4 to 10 map points</span>.  
        Spiral generation requires a minimum of 4 valid points.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <button className={buttonStyle} onClick={onGenerateSpiral}>
          <Route size={18} />
          Generate Path
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
          Clear Path
        </button>

        <button className={buttonStyle} onClick={onSendMission}>
          <Upload size={18} />
          Send to Robot
        </button>

        <button className={buttonStyle} onClick={onUndoPoint}>
          <CornerUpLeft size={18} />
          Undo Point
        </button>

      </div>

      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2 mb-3">
          <FolderOpen size={18} className="text-primary" />
          <h3 className="text-md font-semibold">Saved Missions</h3>
        </div>

        {savedMissions.length === 0 ? (
          <p className="text-sm text-muted">No saved missions yet.</p>
        ) : (
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
            {savedMissions.map((mission, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-slate-800/90 p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">{mission.missionName}</p>
                  <p className="text-xs text-muted mt-1">
                    Width: {mission.robotWidth} m • Waypoints: {mission.spiralPath?.length || 0}
                  </p>
                </div>
                <div className="flex items-center gap-2 shink-0">
                  <button
                    onClick={() => onLoadMission(mission)}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-medium"
                  >
                    Load
                  </button>
                  
                  <button
                    onClick={() => onDeleteMission(index, mission.missionName)}
                    className="p-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Mission"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}