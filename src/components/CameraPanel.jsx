import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";

export default function CameraPanel() {
  const [rgbStatus, setRgbStatus] = useState("connecting");
  const [depthStatus, setDepthStatus] = useState("connecting");
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // Auto retry stream every 5 sec if disconnected
  useEffect(() => {
    const interval = setInterval(() => {
      if (rgbStatus !== "live" || depthStatus !== "live") {
        setRefreshKey(Date.now());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [rgbStatus, depthStatus]);

  const getOverallStatus = () => {
    if (rgbStatus === "live" && depthStatus === "live") {
      return { label: "CAM LIVE", color: "green" };
    }

    if (rgbStatus === "live" && depthStatus !== "live") {
      return { label: "RGB ONLY", color: "yellow" };
    }

    if (rgbStatus !== "live" && depthStatus === "live") {
      return { label: "DEPTH ONLY", color: "yellow" };
    }

    if (rgbStatus === "connecting" || depthStatus === "connecting") {
      return { label: "CONNECTING", color: "blue" };
    }

    return { label: "DISCONNECTED", color: "red" };
  };

  const overallStatus = getOverallStatus();

  const getFeedBadge = (status) => {
    if (status === "live") return { label: "LIVE", color: "green" };
    if (status === "connecting") return { label: "CONNECTING", color: "blue" };
    return { label: "OFFLINE", color: "red" };
  };

  const rgbBadge = getFeedBadge(rgbStatus);
  const depthBadge = getFeedBadge(depthStatus);

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-5 h-[560px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Camera Feeds</h2>
          <p className="text-sm text-muted">Live Intel RealSense D455 monitoring</p>
        </div>

        <StatusBadge label={overallStatus.label} color={overallStatus.color} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[485px]">
        {/* Front Camera Feed - RGB */}
        <div className="rounded-2xl border border-border bg-slate-950 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-slate-900 flex items-center justify-between">
            <span className="text-sm font-medium">Camera Feed (RGB)</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">RGB • 848×480 • 30 FPS</span>
              <StatusBadge label={rgbBadge.label} color={rgbBadge.color} />
            </div>
          </div>

          <div className="flex-1 bg-black relative">
            <img
              key={`rgb-${refreshKey}`}
              src={`http://localhost:5000/rgb?t=${refreshKey}`}
              alt="Front RGB Feed"
              className="w-full h-full object-contain bg-black" /* Changed from object-cover to object-contain to prevent cropping */
              onLoad={() => setRgbStatus("live")}
              onError={() => setRgbStatus("offline")}
            />

            {rgbStatus !== "live" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-slate-300 text-sm">
                RGB stream unavailable
              </div>
            )}
          </div>
        </div>

        {/* Rear Camera Feed - Depth */}
        <div className="rounded-2xl border border-border bg-slate-950 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-slate-900 flex items-center justify-between">
            <span className="text-sm font-medium">Camera Feed (Depth)</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">Depth • 848×480 • 30 FPS</span>
              <StatusBadge label={depthBadge.label} color={depthBadge.color} />
            </div>
          </div>

          <div className="flex-1 bg-black relative">
            <img
              key={`depth-${refreshKey}`}
              src={`http://localhost:5000/depth?t=${refreshKey}`}
              alt="Rear Depth Feed"
              className="w-full h-full object-contain bg-black"  /* Changed from object-cover to object-contain to prevent cropping */
              onLoad={() => setDepthStatus("live")}
              onError={() => setDepthStatus("offline")}
            />
            {/* Depth Legend */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-border">
              {/* Gradient Bar */}
              <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-cyan-400 to-blue-500" />

              {/* Labels */}
              <div className="flex items-center justify-between text-xs text-slate-300 w-[120px]">
                <span>Near</span>
                <span>Far</span>
              </div>
            </div>

            {depthStatus !== "live" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-slate-300 text-sm">
                Depth stream unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}