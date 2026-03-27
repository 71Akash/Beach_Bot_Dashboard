import Navbar from "../components/Navbar";
import MapPanel from "../components/MapPanel";
import CameraPanel from "../components/CameraPanel";
import ControlPanel from "../components/ControlPanel";
import RobotStatus from "../components/RobotStatus";
import SystemLogs from "../components/SystemLogs";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />

      <main className="p-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <MapPanel />
        </div>

        <div className="xl:col-span-5">
          <CameraPanel />
        </div>

        <div className="xl:col-span-7">
          <ControlPanel />
        </div>

        <div className="xl:col-span-5">
          <RobotStatus />
        </div>

        <div className="xl:col-span-12">
          <SystemLogs />
        </div>
      </main>
    </div>
  );
}