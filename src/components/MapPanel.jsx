import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";

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

export default function MapPanel() {
  // Marina Beach center
  const center = [13.0588, 80.2825];

  // Placeholder robot position
  const robotPosition = [13.0588, 80.2825];

  // Example trail just for visual test
  const trail = useMemo(
    () => [
      [13.0588, 80.2825],
      [13.0591, 80.2830],
      [13.0594, 80.2835],
    ],
    []
  );

  return (
    <section className="bg-panel border border-border rounded-2xl shadow-panel p-4 h-[500px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Offline Map</h2>
        <span className="text-sm text-muted">Marina Beach Region</span>
      </div>

      <div className="w-full h-[430px] rounded-xl overflow-hidden border border-border">
        <MapContainer
          center={center}
          zoom={18}
          scrollWheelZoom={true}
          preferCanvas={true}
          zoomControl={true}
          className="w-full h-full"
        >
          <TileLayer
            url="http://localhost:8080/data/marina_beach/{z}/{x}/{y}.png"
            attribution="Offline Marina Beach Map"
            maxZoom={20}
          />

          <Marker position={robotPosition}>
            <Popup>Robot Current Position</Popup>
          </Marker>

          <Polyline positions={trail} pathOptions={{ color: "#f59e0b", weight: 4 }} />
        </MapContainer>
      </div>
    </section>
  );
}