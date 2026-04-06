import StatusBadge from "./StatusBadge";

export default function CameraPanel() {
  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-5 h-[560px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Camera Feeds</h2>
          <p className="text-sm text-muted">Live robot visual monitoring</p>
        </div>

        <StatusBadge label="CAM READY" color="blue" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[485px]">
        <div className="rounded-2xl border border-border bg-slate-950 flex items-center justify-center text-muted text-sm">
          Front Camera Feed
        </div>
        <div className="rounded-2xl border border-border bg-slate-950 flex items-center justify-center text-muted text-sm">
          Rear Camera Feed
        </div>
      </div>
    </section>
  );
}