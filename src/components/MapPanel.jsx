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

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import socket from "../services/socket";

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

export default function MapPanel({ selectedPoints, spiralPath, onAddPoint }) {
  const center = [12.943530,80.136811];

  const [robotPosition, setRobotPosition] = useState(center);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to robot server");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from robot server");
    });

    socket.on("position", (data) => {
      if (!data?.lat || !data?.lon) return;

      const newPos = [data.lat, data.lon];
      setRobotPosition(newPos);

      setTrail((prev) => [...prev.slice(-500), newPos]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("position");
    };
  }, []);

  const trailPath = useMemo(() => trail, [trail]);

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Offline Map</h2>
        <span className="text-sm text-muted">
          Select 4 points to define work area
        </span>
      </div>

      <div className="w-full h-[430px] rounded-xl overflow-hidden border border-border">
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
          <Marker position={robotPosition}>
            <Popup>Robot Current Position</Popup>
          </Marker>

          {/* Robot Trail */}
          {trailPath.length > 1 && (
            <Polyline
              positions={trailPath}
              pathOptions={{ color: "#f59e0b", weight: 4 }}
            />
          )}

          {/* Selected Corner Points */}
          {selectedPoints.map((point, index) => (
            <Marker key={index} position={point}>
              <Popup>Point {index + 1}</Popup>
            </Marker>
          ))}

          {/* Work Area Polygon */}
          {selectedPoints.length === 4 && (
            <Polygon
              positions={selectedPoints}
              pathOptions={{
                color: "#ef4444",
                weight: 3,
                fillOpacity: 0.15,
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
              }}
            />
          )}

          <FollowRobot position={robotPosition} />
        </MapContainer>
      </div>
    </section>
  );
}
