import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import MapPanel from "../components/MapPanel";
import CameraPanel from "../components/CameraPanel";
import ControlPanel from "../components/ControlPanel";
import RobotStatus from "../components/RobotStatus";
import SystemLogs from "../components/SystemLogs";
import {
  generatePolygonSpiral,
  calculateDistance,
  calculatePolygonArea,
  calculatePolygonPerimeter,
} from "../utils/spiralGenerator";

export default function Dashboard() {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [spiralPath, setSpiralPath] = useState([]);
  const [robotWidth, setRobotWidth] = useState(1.0);
  const [missionName, setMissionName] = useState("Marina Cleanup Mission");

  const handleAddPoint = (point) => {
    if (selectedPoints.length >= 4) return;
    setSelectedPoints((prev) => [...prev, point]);
  };

  const handleClearPoints = () => {
    setSelectedPoints([]);
    setSpiralPath([]);
  };

  const handleClearSpiral = () => {
    setSpiralPath([]);
  };

  const handleGenerateSpiral = () => {
    if (selectedPoints.length < 4) {
      alert("Please select 4 boundary points first.");
      return;
    }

    const spiral = generatePolygonSpiral(selectedPoints, Number(robotWidth));
    setSpiralPath(spiral);
  };

  const area = useMemo(() => calculatePolygonArea(selectedPoints), [selectedPoints]);
  const perimeter = useMemo(() => calculatePolygonPerimeter(selectedPoints), [selectedPoints]);
  const pathDistance = useMemo(() => calculateDistance(spiralPath), [spiralPath]);
  const waypointCount = spiralPath.length;

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />

      <main className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <MapPanel
            selectedPoints={selectedPoints}
            spiralPath={spiralPath}
            onAddPoint={handleAddPoint}
          />
        </div>

        <div className="xl:col-span-5">
          <CameraPanel />
        </div>

        <div className="xl:col-span-7">
          <ControlPanel
            robotWidth={robotWidth}
            setRobotWidth={setRobotWidth}
            missionName={missionName}
            setMissionName={setMissionName}
            onGenerateSpiral={handleGenerateSpiral}
            onClearPoints={handleClearPoints}
            onClearSpiral={handleClearSpiral}
          />
        </div>

        <div className="xl:col-span-5">
          <RobotStatus
            area={area}
            perimeter={perimeter}
            pathDistance={pathDistance}
            waypointCount={waypointCount}
            robotWidth={robotWidth}
          />
        </div>

        <div className="xl:col-span-12">
          <SystemLogs />
        </div>
      </main>
    </div>
  );
}