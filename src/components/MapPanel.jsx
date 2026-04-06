// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect, useMemo, useState } from "react";
// import socket from "../services/socket";

// // Fix default Leaflet marker icons in Vite
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function FollowRobot({ position }) {
//   const map = useMap();

//   useEffect(() => {
//     if (position) {
//       map.panTo(position, { animate: true });
//     }
//   }, [position, map]);

//   return null;
// }

// export default function MapPanel() {
//   const center = [13.0588, 80.2825];

//   const [robotPosition, setRobotPosition] = useState(center);
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to robot server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from robot server");
//     });

//     socket.on("position", (data) => {
//       if (!data?.lat || !data?.lon) return;

//       const newPos = [data.lat, data.lon];
//       setRobotPosition(newPos);

//       setTrail((prev) => [...prev, newPos]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("position");
//     };
//   }, []);

//   const trailPath = useMemo(() => trail, [trail]);

//   return (
//     <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold">Offline Map</h2>
//         <span className="text-sm text-muted">Marina Beach Region</span>
//       </div>

//       <div className="w-full h-[430px] rounded-xl overflow-hidden border border-border">
//         <MapContainer
//           center={center}
//           zoom={19}
//           minZoom={17}
//           maxZoom={19}
//           maxBounds={[
//             // [13.040, 80.270],
//             // [13.075, 80.305],
//             [12.943530,80.136811],
//             [12.952899,80.147520],
//           ]}

//             // min_lon = 80.136811
//             // min_lat = 12.943530
//             // max_lon = 80.147520
//             // max_lat = 12.952899
//           maxBoundsViscosity={1.0}
//           scrollWheelZoom={true}
//           preferCanvas={true}
//           zoomControl={true}
//           className="w-full h-full"
//         >
//           <TileLayer
//             url="http://localhost:8080/data/mit_map/{z}/{x}/{y}.png"
//             attribution="Offline Marina Beach Map"
//             minZoom={17}
//             maxZoom={19}
//             noWrap={true}
//           />

//           <Marker position={robotPosition}>
//             <Popup>Robot Current Position</Popup>
//           </Marker>

//           {trailPath.length > 1 && (
//             <Polyline
//               positions={trailPath}
//               pathOptions={{ color: "#f59e0b", weight: 4 }}
//             />
//           )}

//           <FollowRobot position={robotPosition} />
//         </MapContainer>
//       </div>
//     </section>
//   );
// }

//iteration 2 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   Polygon,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";
// import L from "leaflet";
// import { useEffect, useMemo, useState } from "react";
// import socket from "../services/socket";

// // Fix default Leaflet marker icons in Vite
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function FollowRobot({ position }) {
//   const map = useMap();

//   useEffect(() => {
//     if (position) {
//       map.panTo(position, { animate: true });
//     }
//   }, [position, map]);

//   return null;
// }

// function MapClickHandler({ onAddPoint, pointCount }) {
//   useMapEvents({
//     click(e) {
//       if (pointCount >= 4) return;
//       const { lat, lng } = e.latlng;
//       onAddPoint([lat, lng]);
//     },
//   });

//   return null;
// }

// export default function MapPanel({ selectedPoints, spiralPath, onAddPoint }) {
//   const center = [12.943530,80.136811];

//   const [robotPosition, setRobotPosition] = useState(center);
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("✅ Connected to robot server");
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected from robot server");
//     });

//     socket.on("position", (data) => {
//       if (!data?.lat || !data?.lon) return;

//       const newPos = [data.lat, data.lon];
//       setRobotPosition(newPos);

//       setTrail((prev) => [...prev.slice(-500), newPos]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("position");
//     };
//   }, []);

//   const trailPath = useMemo(() => trail, [trail]);

//   return (
//     <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold">Offline Map</h2>
//         <span className="text-sm text-muted">
//           Select 4 points to define work area
//         </span>
//       </div>

//       <div className="w-full h-[430px] rounded-xl overflow-hidden border border-border">
//         <MapContainer
//           center={center}
//           zoom={19}
//           minZoom={17}
//           maxZoom={19}
//           maxBounds={[
//             // [13.040, 80.270],
//             // [13.075, 80.305],
//             [12.943530,80.136811],
//             [12.952899,80.147520],
//           ]}

//             // min_lon = 80.136811
//             // min_lat = 12.943530
//             // max_lon = 80.147520
//             // max_lat = 12.952899
//           maxBoundsViscosity={1.0}
//           scrollWheelZoom={true}
//           preferCanvas={true}
//           zoomControl={true}
//           className="w-full h-full"
//         >
//           <TileLayer
//             url="http://localhost:8080/data/mit_map/{z}/{x}/{y}.png"
//             attribution="Offline Marina Beach Map"
//             minZoom={17}
//             maxZoom={19}
//             noWrap={true}
//           />

//           <MapClickHandler
//             onAddPoint={onAddPoint}
//             pointCount={selectedPoints.length}
//           />

//           {/* Robot Marker */}
//           <Marker position={robotPosition}>
//             <Popup>Robot Current Position</Popup>
//           </Marker>

//           {/* Robot Trail */}
//           {trailPath.length > 1 && (
//             <Polyline
//               positions={trailPath}
//               pathOptions={{ color: "#f59e0b", weight: 4 }}
//             />
//           )}

//           {/* Selected Corner Points */}
//           {selectedPoints.map((point, index) => (
//             <Marker key={index} position={point}>
//               <Popup>Point {index + 1}</Popup>
//             </Marker>
//           ))}

//           {/* Work Area Polygon */}
//           {selectedPoints.length === 4 && (
//             <Polygon
//               positions={selectedPoints}
//               pathOptions={{
//                 color: "#ef4444",
//                 weight: 3,
//                 fillOpacity: 0.15,
//               }}
//             />
//           )}

//           {/* Spiral Path */}
//           {spiralPath.length > 1 && (
//             <Polyline
//               positions={spiralPath}
//               pathOptions={{
//                 color: "#22c55e",
//                 weight: 3,
//               }}
//             />
//           )}

//           <FollowRobot position={robotPosition} />
//         </MapContainer>
//       </div>
//     </section>
//   );
// }

/// iterration 3 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   Polygon,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";
// import L from "leaflet";
// import { useEffect, useMemo, useState } from "react";
// import socket from "../services/socket";

// // Fix default Leaflet marker icons in Vite
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function FollowRobot({ position }) {
//   const map = useMap();

//   useEffect(() => {
//     if (position) {
//       map.panTo(position, { animate: true });
//     }
//   }, [position, map]);

//   return null;
// }

// function MapClickHandler({ onAddPoint, pointCount }) {
//   useMapEvents({
//     click(e) {
//       if (pointCount >= 4) return;
//       const { lat, lng } = e.latlng;
//       onAddPoint([lat, lng]);
//     },
//   });

//   return null;
// }

// export default function MapPanel({
//   selectedPoints,
//   spiralPath,
//   onAddPoint,
//   simulatedRobotPosition,
//   simulatedTrail,
//   isSimulating,
// }) {
//   const center = [13.0588, 80.2825];

//   const [liveRobotPosition, setLiveRobotPosition] = useState(center);
//   const [liveTrail, setLiveTrail] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(" Connected to robot server");
//     });

//     socket.on("disconnect", () => {
//       console.log(" Disconnected from robot server");
//     });

//     socket.on("position", (data) => {
//       if (!data?.lat || !data?.lon) return;

//       const newPos = [data.lat, data.lon];
//       setLiveRobotPosition(newPos);
//       setLiveTrail((prev) => [...prev.slice(-500), newPos]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("position");
//     };
//   }, []);

//   const displayedRobotPosition = isSimulating
//     ? simulatedRobotPosition
//     : liveRobotPosition;

//   const displayedTrail = isSimulating ? simulatedTrail : liveTrail;

//   const trailPath = useMemo(() => displayedTrail, [displayedTrail]);

//   return (
//     <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-semibold">Offline Map</h2>
//         <span className="text-sm text-muted">
//           Select 4 points to define work area
//         </span>
//       </div>

//       <div className="w-full h-[430px] rounded-xl overflow-hidden border border-border">
//         <MapContainer
//           center={center}
//           zoom={19}
//           minZoom={17}
//           maxZoom={19}
//           maxBounds={[
//             // [13.040, 80.270],
//             // [13.075, 80.305],
//             [12.943530,80.136811],
//             [12.952899,80.147520],
//           ]}

//             // min_lon = 80.136811
//             // min_lat = 12.943530
//             // max_lon = 80.147520
//             // max_lat = 12.952899
//           maxBoundsViscosity={1.0}
//           scrollWheelZoom={true}
//           preferCanvas={true}
//           zoomControl={true}
//           className="w-full h-full"
//         >
//           <TileLayer
//             url="http://localhost:8080/data/mit_map/{z}/{x}/{y}.png"
//             attribution="Offline Marina Beach Map"
//             minZoom={17}
//             maxZoom={19}
//             noWrap={true}
//           />

//           <MapClickHandler
//             onAddPoint={onAddPoint}
//             pointCount={selectedPoints.length}
//           />

//           {/* Robot Marker */}
//           {displayedRobotPosition && (
//             <Marker position={displayedRobotPosition}>
//               <Popup>
//                 {isSimulating ? "Simulated Robot Position" : "Live Robot Position"}
//               </Popup>
//             </Marker>
//           )}

//           {/* Robot Trail */}
//           {trailPath.length > 1 && (
//             <Polyline
//               positions={trailPath}
//               pathOptions={{ color: "#f59e0b", weight: 4 }}
//             />
//           )}

//           {/* Selected Corner Points */}
//           {selectedPoints.map((point, index) => (
//             <Marker key={index} position={point}>
//               <Popup>Point {index + 1}</Popup>
//             </Marker>
//           ))}

//           {/* Work Area Polygon */}
//           {selectedPoints.length === 4 && (
//             <Polygon
//               positions={selectedPoints}
//               pathOptions={{
//                 color: "#ef4444",
//                 weight: 3,
//                 fillOpacity: 0.15,
//               }}
//             />
//           )}

//           {/* Spiral Path */}
//           {spiralPath.length > 1 && (
//             <Polyline
//               positions={spiralPath}
//               pathOptions={{
//                 color: "#22c55e",
//                 weight: 3,
//               }}
//             />
//           )}

//           {displayedRobotPosition && <FollowRobot position={displayedRobotPosition} />}
//         </MapContainer>
//       </div>
//     </section>
//   );
// }

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import socket from "../services/socket";
import StatusBadge from "./StatusBadge";
import { Bot, MapPinned, Route } from "lucide-react";

// Fix default Leaflet marker icons in Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom robot icon
const robotIcon = L.divIcon({
  html: `
    <div style="
      width: 22px;
      height: 22px;
      border-radius: 999px;
      background: #22c55e;
      border: 3px solid #ffffff;
      box-shadow: 0 0 0 6px rgba(34,197,94,0.18);
    "></div>
  `,
  className: "",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

// Custom numbered point icon
const createNumberedIcon = (number) =>
  L.divIcon({
    html: `
      <div style="
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: #ef4444;
        color: white;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        font-size: 13px;
      ">
        ${number}
      </div>
    `,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

function FollowRobot({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true });
    }
  }, [position, map]);

  return null;
}

function MapClickHandler({ onAddPoint, pointCount }) {
  useMapEvents({
    click(e) {
      if (pointCount >= 4) return;
      const { lat, lng } = e.latlng;
      onAddPoint([lat, lng]);
    },
  });

  return null;
}

export default function MapPanel({
  selectedPoints,
  spiralPath,
  onAddPoint,
  simulatedRobotPosition,
  simulatedTrail,
  isSimulating,
  onUpdatePoint
}) {
  const center = [12.943530, 80.136811];

  const [liveRobotPosition, setLiveRobotPosition] = useState(center);
  const [liveTrail, setLiveTrail] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to robot server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from robot server");
    });

    socket.on("position", (data) => {
      if (!data?.lat || !data?.lon) return;

      const newPos = [data.lat, data.lon];
      setLiveRobotPosition(newPos);
      setLiveTrail((prev) => [...prev.slice(-500), newPos]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("position");
    };
  }, []);

  const displayedRobotPosition = isSimulating
    ? simulatedRobotPosition
    : liveRobotPosition;

  const displayedTrail = isSimulating ? simulatedTrail : liveTrail;
  const trailPath = useMemo(() => displayedTrail, [displayedTrail]);

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[560px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-semibold">Mission Map</h2>
          <p className="text-sm text-muted">
            Click to add points. Drag to adjust boundaries. Use undo if needed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge
            label={isSimulating ? "SIMULATION ACTIVE" : "PLANNING MODE"}
            color={isSimulating ? "yellow" : "blue"}
          />
          <StatusBadge label={`POINTS: ${selectedPoints.length}/4`} color="slate" />
          <StatusBadge label={`PATH: ${spiralPath.length} WPTS`} color="green" />
        </div>
      </div>

      <div className="w-full h-[485px] rounded-xl overflow-hidden border border-border relative">
        <MapContainer
          center={center}
          zoom={19}
          minZoom={17}
          maxZoom={19}
          maxBounds={[
            // [13.040, 80.270],
            // [13.075, 80.305],
            [12.943530,80.136811],
            [12.952899,80.147520],
          ]}

            // min_lon = 80.136811
            // min_lat = 12.943530
            // max_lon = 80.147520
            // max_lat = 12.952899
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
          preferCanvas={true}
          zoomControl={true}
          className="w-full h-full"
        >
          <TileLayer
            url="http://localhost:8080/data/mit_map/{z}/{x}/{y}.png"
            attribution="Offline Marina Beach Map"
            minZoom={17}
            maxZoom={19}
            noWrap={true}
          />

          <MapClickHandler
            onAddPoint={onAddPoint}
            pointCount={selectedPoints.length}
          />

          {/* Robot Marker */}
          {displayedRobotPosition && (
            <Marker position={displayedRobotPosition} icon={robotIcon}>
              <Popup>
                {isSimulating ? "Simulated Robot Position" : "Live Robot Position"}
              </Popup>
              <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent>
                <div className="text-xs font-semibold">ROBOT</div>
              </Tooltip>
            </Marker>
          )}

          {/* Robot Trail */}
          {trailPath.length > 1 && (
            <Polyline
              positions={trailPath}
              pathOptions={{ color: "#f59e0b", weight: 4, opacity: 0.9 }}
            />
          )}

          {/* Selected Corner Points */}
          {selectedPoints.map((point, index) => (
            <Marker
              key={index}
              position={point}
              draggable={true}
              icon={createNumberedIcon(index + 1)}
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();

                  const updatedPoints = [...selectedPoints];
                  updatedPoints[index] = [lat, lng];

                  onUpdatePoint(index, [lat, lng]);
                },
              }}
            >
              <Popup>Boundary Point {index + 1} (Drag to adjust)</Popup>
            </Marker>
          ))}

          {/* Work Area Polygon */}
          {selectedPoints.length === 4 && (
            <Polygon
              positions={selectedPoints}
              pathOptions={{
                color: "#ef4444",
                weight: 3,
                fillOpacity: 0.12,
              }}
            />
          )}

          {/* Spiral Path */}
          {spiralPath.length > 1 && (
            <Polyline
              positions={spiralPath}
              pathOptions={{
                color: "#22c55e",
                weight: 3,
                opacity: 0.95,
              }}
            />
          )}

          {displayedRobotPosition && <FollowRobot position={displayedRobotPosition} />}
        </MapContainer>

        {/* Map legend */}
        <div className="absolute bottom-3 left-3 z-[500] rounded-xl border border-border bg-panel/90 backdrop-blur-md px-4 py-3 shadow-panel text-xs text-muted space-y-2">
          <div className="flex items-center gap-2">
            <Bot size={14} className="text-success" />
            <span>Robot Position</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned size={14} className="text-danger" />
            <span>Boundary Points</span>
          </div>
          <div className="flex items-center gap-2">
            <Route size={14} className="text-success" />
            <span>Coverage Spiral</span>
          </div>
        </div>
      </div>
    </section>
  );
}