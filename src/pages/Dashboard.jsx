import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MapPanel from "../components/MapPanel";
import CameraPanel from "../components/CameraPanel";
import ControlPanel from "../components/ControlPanel";
import RobotStatus from "../components/RobotStatus";
import SystemLogs from "../components/SystemLogs";
import ToastContainer from "../components/ToastContainer";
import {
  generatePolygonSpiral,
  calculateDistance,
  calculatePolygonArea,
  calculatePolygonPerimeter,
} from "../utils/spiralGenerator";
import {
  saveMissionToLocal,
  getSavedMissions,
  deleteMission
} from "../utils/missionStorage";
import socket from "../services/socket";

export default function Dashboard() {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [spiralPath, setSpiralPath] = useState([]);
  const [robotWidth, setRobotWidth] = useState(1.0);
  const [missionName, setMissionName] = useState("Marina Cleanup Mission");
  const [savedMissions, setSavedMissions] = useState(getSavedMissions());

  // Logs + Toasts
  const [logs, setLogs] = useState([
    `[${new Date().toLocaleTimeString()}] Dashboard initialized`,
    `[${new Date().toLocaleTimeString()}] Offline map ready`,
    `[${new Date().toLocaleTimeString()}] Mission planner armed`,
  ]);
  const [toasts, setToasts] = useState([]);

  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedPathIndex, setSimulatedPathIndex] = useState(0);
  const [simulatedTrail, setSimulatedTrail] = useState([]);
  const intervalRef = useRef(null);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const addToast = (title, message = "", type = "info") => {
    const id = Date.now() + Math.random();
    const toast = { id, title, message, type };

    setToasts((prev) => [toast, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleAddPoint = (point) => {
    if (selectedPoints.length >= 10) {
      addToast("Maximum points reached", "Only up to 10 boundary points are allowed.", "warning");
      return;
    }

    const pointNumber = selectedPoints.length + 1;
    setSelectedPoints((prev) => [...prev, point]);

    addLog(`Boundary Point ${pointNumber} selected`);
    addToast(
      `Point ${pointNumber} added`,
      `Lat: ${point[0].toFixed(6)}, Lng: ${point[1].toFixed(6)}`,
      "info"
    );
  };

  const handleClearPoints = () => {
    setSelectedPoints([]);
    setSpiralPath([]);
    stopSimulation(true);

    addLog("Boundary points and mission path cleared");
    addToast("Points cleared", "Work area selection has been reset.", "warning");
  };

  const handleClearSpiral = () => {
    setSpiralPath([]);
    stopSimulation(true);

    addLog("Spiral path cleared");
    addToast("Spiral cleared", "Generated mission path removed.", "warning");
  };

  const handleGenerateSpiral = () => {
    if (selectedPoints.length < 4) {
      addLog("Spiral generation failed: insufficient boundary points");
      addToast("Cannot generate spiral", "Please select at least 4 boundary points first.", "error");
      return;
    }

    const orderedPoints = sortPointsClockwise(selectedPoints);
    const spiral = generatePolygonSpiral(orderedPoints, Number(robotWidth));
    setSelectedPoints(orderedPoints);
    setSpiralPath(spiral);
    setSimulatedPathIndex(0);
    setSimulatedTrail([]);
    setIsSimulating(false);

    addLog(`Spiral generated successfully (${spiral.length} waypoints)`);
    addToast(
      "Spiral generated",
      `${spiral.length} waypoints created using ${robotWidth}m spacing.`,
      "success"
    );
  };

  const handleSaveMission = () => {
    if (selectedPoints.length < 4 || spiralPath.length < 2) {
      addLog("Mission save failed: incomplete mission");
      addToast("Save failed", "Please define an area and generate a spiral first.", "error");
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

    addLog(`Mission saved locally: ${missionName}`);
    addToast("Mission saved", `${missionName} stored locally.`, "success");
  };

  const handleLoadMission = (mission) => {
    stopSimulation(true);
    setMissionName(mission.missionName || "Loaded Mission");
    setRobotWidth(mission.robotWidth || 1.0);
    setSelectedPoints(mission.selectedPoints || []);
    setSpiralPath(mission.spiralPath || []);
    setSimulatedPathIndex(0);
    setSimulatedTrail([]);

    addLog(`Mission loaded: ${mission.missionName}`);
    addToast("Mission loaded", `${mission.missionName} restored successfully.`, "success");
  };

  const handleSendMission = () => {
    if (!spiralPath.length) {
      addLog("Mission transmit failed: no spiral path");
      addToast("Send failed", "No spiral path available to send.", "error");
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

    addLog(`Mission transmitted: ${missionName} (${spiralPath.length} waypoints)`);
    addToast("Mission sent", "Mission payload sent to robot backend (mocked).", "success");
  };

  const handleDeleteMission = (index, missionName = "Mission") => {
    deleteMission(index);
    setSavedMissions(getSavedMissions());

    addLog(`Mission deleted: ${missionName}`);
    addToast("Mission deleted", `${missionName} removed from saved missions.`, "warning");
  };

  const startSimulation = () => {
    if (!spiralPath.length) {
      addLog("Simulation start failed: no spiral path");
      addToast("Simulation unavailable", "Generate a spiral path first.", "error");
      return;
    }

    stopSimulation(true);
    setIsSimulating(true);

    addLog("Simulation started");
    addToast("Simulation started", "Robot playback has begun.", "success");

    intervalRef.current = setInterval(() => {
      setSimulatedPathIndex((prev) => {
        if (prev >= spiralPath.length - 1) {
          stopSimulation(true);
          addLog("Simulation completed");
          addToast("Simulation complete", "Mission playback finished.", "success");
          return prev;
        }

        const nextIndex = prev + 1;
        setSimulatedTrail((trail) => [...trail, spiralPath[nextIndex]]);
        return nextIndex;
      });
    }, 200);
  };

  const stopSimulation = (silent = false) => {
    setIsSimulating(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      if(!silent){
        addLog("Simulation stopped");
        addToast("Simulation stopped", "Mission playback halted.", "warning");
      }
    }
  };

  const handleUndoLastPoint = () => {
    if (selectedPoints.length === 0) {
      addToast("Nothing to undo", "", "warning");
      return;
    }

    const removed = selectedPoints[selectedPoints.length - 1];

    setSelectedPoints((prev) => prev.slice(0, -1));
    setSpiralPath([]);

    addLog("Last boundary point removed");
    addToast(
      "Point removed",
      `Lat: ${removed[0].toFixed(6)}, Lng: ${removed[1].toFixed(6)}`,
      "info"
    );
  };

  const handleUpdatePoint = (index, newPoint) => {
    setSelectedPoints((prev) => {
      const updated = [...prev];
      updated[index] = newPoint;
      return updated;
    });

    setSpiralPath([]);

    addLog(`Boundary point ${index + 1} adjusted`);
  };

  const sortPointsClockwise = (points) => {
    const center = points.reduce(
      (acc, p) => [acc[0] + p[0], acc[1] + p[1]],
      [0, 0]
    ).map((v) => v / points.length);

    return [...points].sort((a, b) => {
      const angleA = Math.atan2(a[0] - center[0], a[1] - center[1]);
      const angleB = Math.atan2(b[0] - center[0], b[1] - center[1]);
      return angleA - angleB;
    });
  };
     
  useEffect(() => {
    return () => stopSimulation(true);
  }, []);

  const simulatedRobotPosition =
    spiralPath.length > 0
      ? spiralPath[Math.min(simulatedPathIndex, spiralPath.length - 1)]
      : null;

  const area = useMemo(() => calculatePolygonArea(selectedPoints), [selectedPoints]);
  const perimeter = useMemo(() => calculatePolygonPerimeter(selectedPoints), [selectedPoints]);
  const pathDistance = useMemo(() => calculateDistance(spiralPath), [spiralPath]);
  const waypointCount = spiralPath.length;
  const coveredDistance = useMemo(() => calculateDistance(simulatedTrail), [simulatedTrail]);

  const progress = useMemo(() => {
    if (!spiralPath.length) return 0;
    return (simulatedPathIndex / (spiralPath.length - 1)) * 100;
  }, [simulatedPathIndex, spiralPath]);

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <ToastContainer toasts={toasts} />

      <main className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <MapPanel
            selectedPoints={selectedPoints}
            spiralPath={spiralPath}
            onAddPoint={handleAddPoint}
            simulatedRobotPosition={simulatedRobotPosition}
            simulatedTrail={simulatedTrail}
            isSimulating={isSimulating}
            onUpdatePoint={handleUpdatePoint}
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
            onUndoPoint={handleUndoLastPoint}
            onDeleteMission={handleDeleteMission}
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
            selectedPointCount={selectedPoints.length}
          />
        </div>

        <div className="xl:col-span-12">
          <SystemLogs logs={logs} />
        </div>
      </main>
    </div>
  );
}