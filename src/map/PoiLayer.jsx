
import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { useStore } from "../state/store";

function PoiLayer() {
  const poi = useStore((s) => s.data.poi);
  const visible = useStore((s) => s.visibleLayers.poi);
  const addWaypoint = useStore((s) => s.addWaypoint);

  if (!visible || !poi) return null;

  return (
    <GeoJSON
      data={poi}
      pointToLayer={(feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 7,
          color: "#ffffff",
          weight: 2,
          fillColor: "#00d4ff",
          fillOpacity: 1,
        })
      }
      onEachFeature={(feature, layer) => {
        const name =
          feature.properties?.name ||
          feature.properties?.title ||
          "Point of Interest";

        layer.bindPopup(`
          <strong>${name}</strong>
          <br />
          <button class="add-waypoint-btn">Add as stop</button>
        `);

        layer.on("popupopen", (event) => {
          const button = event.popup
            .getElement()
            ?.querySelector(".add-waypoint-btn");

          button?.addEventListener("click", () => {
            const position = layer.getLatLng();

            if (!position) return;

            addWaypoint({
              lat: position.lat,
              lon: position.lng,
              name,
            });

            layer.closePopup();
          });
        });
      }}
    />
  );
}

export default PoiLayer;
