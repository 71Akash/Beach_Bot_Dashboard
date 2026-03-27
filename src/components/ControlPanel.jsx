import { Play, Square, Save, Trash2, Route } from "lucide-react";

export default function ControlPanel() {
  const buttonStyle =
    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition border border-border bg-slate-800 hover:bg-slate-700";

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Control Panel</h2>
        <span className="text-sm text-muted">Mission Controls</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className={buttonStyle}>
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
        <button className={buttonStyle}>
          <Trash2 size={18} />
          Clear Points
        </button>
        <button className={buttonStyle}>
          <Save size={18} />
          Save Recording
        </button>
      </div>
    </section>
  );
}