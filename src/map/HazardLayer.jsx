
import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { useStore } from "../state/store";

function HazardLayer() {
  const hazards = useStore((s) => s.data.hazards);
  const visible = useStore((s) => s.visibleLayers.hazards);

  if (!visible || !hazards) {
    return null;
  }

  return (
    <GeoJSON
      key={JSON.stringify(hazards)}
      data={hazards}
      style={(feature) => ({
        color: "#ff3b30",
        weight: 2,
        fillColor: "#ff3b30",
        fillOpacity: 0.35,
      })}
      pointToLayer={(feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          color: "#ff3b30",
          fillColor: "#ff3b30",
          fillOpacity: 0.8,
        })
      }
      onEachFeature={(feature, layer) => {
        const name =
          feature.properties?.name ||
          feature.properties?.type ||
          "Slope Hazard";

        layer.bindPopup(name);
      }}
    />
  );
}

export default HazardLayer;
