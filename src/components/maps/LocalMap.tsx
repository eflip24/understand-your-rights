import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const lawyerIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapMarker {
  position: [number, number];
  title: string;
  address: string;
  type?: "courthouse" | "lawyer";
}

interface LocalMapProps {
  center: [number, number];
  markers: MapMarker[];
  /** @deprecated Use markers array instead */
  markerPosition?: [number, number];
  /** @deprecated Use markers array instead */
  markerTitle?: string;
  /** @deprecated Use markers array instead */
  markerAddress?: string;
}

export default function LocalMap({ center, markers, markerPosition, markerTitle, markerAddress }: LocalMapProps) {
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  // Support legacy single-marker props
  const allMarkers: MapMarker[] = markers.length > 0
    ? markers
    : markerPosition
      ? [{ position: markerPosition, title: markerTitle || "", address: markerAddress || "", type: "courthouse" as const }]
      : [];

  return (
    <div className="rounded-lg overflow-hidden border border-border h-[300px] md:h-[400px]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allMarkers.map((marker, idx) => (
          <Marker
            key={idx}
            position={marker.position}
            icon={marker.type === "lawyer" ? lawyerIcon : defaultIcon}
          >
            <Popup>
              <strong>{marker.title}</strong>
              <br />
              <span className="text-sm">{marker.address}</span>
              {marker.type && (
                <>
                  <br />
                  <span className="text-xs text-muted-foreground capitalize">{marker.type}</span>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
