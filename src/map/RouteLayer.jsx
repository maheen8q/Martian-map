
import { Polyline } from "react-leaflet";
import { useStore } from "../state/store";

function RouteLayer() {
  const route = useStore((s) => s.route);

  if (!route?.path || route.path.length < 2) {
    return null;
  }

  const positions = route.path.map((point) => {
    if (Array.isArray(point)) {
      return [point[0], point[1]];
    }

    return [
      point.lat ?? point.latitude,
      point.lon ?? point.longitude,
    ];
  });

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color: "#00e5ff",
        weight: 5,
        opacity: 0.9,
      }}
    />
  );
}

export default RouteLayer;
