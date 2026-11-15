
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useStore } from "../state/store";

import PoiLayer from "./PoiLayer";
import HazardLayer from "./HazardLayer";
import RouteLayer from "./RouteLayer";

const BASE_URL =
  "https://trek.nasa.gov/tiles/Mars/EQ/msss_atlas_simp_clon/1.0.0/default/default028mm/{z}/{y}/{x}.png";

const HIRISE_URL =
  "https://trek.nasa.gov/tiles/Mars/EQ/JEZ_hirise_soc_006_orthoMosaic_25cm_Eqc_latTs0_lon0_first_dd/1.0.0/default/default028mm/{z}/{y}/{x}.png";

function MapView() {
  const visibleLayers = useStore((s) => s.visibleLayers);

  return (
    <MapContainer
      crs={L.CRS.EPSG4326}
      center={[18.44, 77.45]}
      zoom={6}
      minZoom={0}
      maxZoom={17}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url={BASE_URL}
        minZoom={0}
        maxNativeZoom={6}
        maxZoom={17}
        attribution="NASA Mars Trek"
      />

      {visibleLayers.hirise && (
        <TileLayer
          url={HIRISE_URL}
          minZoom={0}
          maxNativeZoom={17}
          maxZoom={17}
          opacity={1}
          attribution="NASA HiRISE"
        />
      )}

      <PoiLayer />
      <HazardLayer />
      <RouteLayer />
    </MapContainer>
  );
}

export default MapView;
