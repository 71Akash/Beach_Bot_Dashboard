import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  saveMissionToLocal,
  getSavedMissions,
} from "../utils/missionStorage";
import socket from "../services/socket";

export default function Dashboard() {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [spiralPath, setSpiralPath] = useState([]);
  const [robotWidth, setRobotWidth] = useState(1.0);
  const [missionName, setMissionName] = useState("Marina Cleanup Mission");
  const [savedMissions, setSavedMissions] = useState(getSavedMissions());

  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedPathIndex, setSimulatedPathIndex] = useState(0);
  const [simulatedTrail, setSimulatedTrail] = useState([]);
  const intervalRef = useRef(null);

  const handleAddPoint = (point) => {
    if (selectedPoints.length >= 4) return;
    setSelectedPoints((prev) => [...prev, point]);
  };

  const handleClearPoints = () => {
    setSelectedPoints([]);
    setSpiralPath([]);
    stopSimulation();
  };

  const handleClearSpiral = () => {
    setSpiralPath([]);
    stopSimulation();
  };

  const handleGenerateSpiral = () => {
    if (selectedPoints.length < 4) {
      alert("Please select 4 boundary points first.");
      return;
    }

    const spiral = generatePolygonSpiral(selectedPoints, Number(robotWidth));
    setSpiralPath(spiral);
    setSimulatedPathIndex(0);
    setSimulatedTrail([]);
    setIsSimulating(false);
  };

  const handleSaveMission = () => {
    if (selectedPoints.length < 4 || spiralPath.length < 2) {
      alert("Please define an area and generate a spiral first.");
      return;
    }

    const mission = {
      missionName,
      robotWidth: Number(robotWidth),
      selectedPoints,
      spiralPath,
      createdAt: new Date().toISOString(),
    };

    saveMissionToLocal(mission);
    setSavedMissions(getSavedMissions());
    alert("Mission saved successfully.");
  };

  const handleLoadMission = (mission) => {
    stopSimulation();
    setMissionName(mission.missionName || "Loaded Mission");
    setRobotWidth(mission.robotWidth || 1.0);
    setSelectedPoints(mission.selectedPoints || []);
    setSpiralPath(mission.spiralPath || []);
    setSimulatedPathIndex(0);
    setSimulatedTrail([]);
  };

  const handleSendMission = () => {
    if (!spiralPath.length) {
      alert("No spiral path available to send.");
      return;
    }

    const payload = {
      missionName,
      robotWidth: Number(robotWidth),
      selectedPoints,
      spiralPath,
      waypointCount: spiralPath.length,
      createdAt: new Date().toISOString(),
    };

    socket.emit("mission_path", payload);
    alert("Mission path sent to robot backend.");
  };

  // -----------------------------
  // Simulation logic
  // -----------------------------
  const startSimulation = () => {
    if (!spiralPath.length) {
      alert("Generate a spiral path first.");
      return;
    }

    stopSimulation();
    setIsSimulating(true);

    intervalRef.current = setInterval(() => {
      setSimulatedPathIndex((prev) => {
        if (prev >= spiralPath.length - 1) {
          stopSimulation();
          return prev;
        }

        const nextIndex = prev + 1;
        setSimulatedTrail((trail) => [...trail, spiralPath[nextIndex]]);
        return nextIndex;
      });
    }, 200); // speed of simulation
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopSimulation();
  }, []);

  const simulatedRobotPosition =
    spiralPath.length > 0
      ? spiralPath[Math.min(simulatedPathIndex, spiralPath.length - 1)]
      : null;

  const area = useMemo(() => calculatePolygonArea(selectedPoints), [selectedPoints]);
  const perimeter = useMemo(() => calculatePolygonPerimeter(selectedPoints), [selectedPoints]);
  const pathDistance = useMemo(() => calculateDistance(spiralPath), [spiralPath]);
  const waypointCount = spiralPath.length;
  const coveredDistance = useMemo(
    () => calculateDistance(simulatedTrail),
    [simulatedTrail]
  );

  const progress = useMemo(() => {
    if (!spiralPath.length) return 0;
    return (simulatedPathIndex / (spiralPath.length - 1)) * 100;
  }, [simulatedPathIndex, spiralPath]);

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />

      <main className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <MapPanel
            selectedPoints={selectedPoints}
            spiralPath={spiralPath}
            onAddPoint={handleAddPoint}
            simulatedRobotPosition={simulatedRobotPosition}
            simulatedTrail={simulatedTrail}
            isSimulating={isSimulating}
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
            onSaveMission={handleSaveMission}
            onSendMission={handleSendMission}
            savedMissions={savedMissions}
            onLoadMission={handleLoadMission}
            onStartSimulation={startSimulation}
            onStopSimulation={stopSimulation}
            isSimulating={isSimulating}
          />
        </div>

        <div className="xl:col-span-5">
          <RobotStatus
            area={area}
            perimeter={perimeter}
            pathDistance={pathDistance}
            waypointCount={waypointCount}
            robotWidth={robotWidth}
            progress={progress}
            coveredDistance={coveredDistance}
            isSimulating={isSimulating}
          />
        </div>

        <div className="xl:col-span-12">
          <SystemLogs />
        </div>
      </main>
    </div>
  );
}