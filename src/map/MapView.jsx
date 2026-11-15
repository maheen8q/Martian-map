import { MapContainer, TileLayer } from "react-leaflet";
import PoiLayer from "./PoiLayer";
import HazardLayer from "./HazardLayer";
import RouteLayer from "./RouteLayer";

function MapView() {
  return (
    <MapContainer
      center={[18.44, 77.45]}
      zoom={11}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <PoiLayer />
      <HazardLayer />
      <RouteLayer />
    </MapContainer>
  );
}

export default MapView;