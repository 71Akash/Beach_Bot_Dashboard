export default function CameraPanel() {
  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Camera Feeds</h2>
        <span className="text-sm text-muted">Dual View</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[430px]">
        <div className="rounded-xl border border-border bg-slate-900 flex items-center justify-center text-muted">
          Front Camera
        </div>
        <div className="rounded-xl border border-border bg-slate-900 flex items-center justify-center text-muted">
          Rear Camera
        </div>
      </div>
    </section>
  );
}