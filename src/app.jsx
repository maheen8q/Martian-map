import MapView from "./map/MapView";
import RoutePanel from "./components/RoutePanel";
import ElevationChart from "./components/ElevationChart";
import Legend from "./components/Legend";
import LayerToggles from "./components/LayerToggles";
import PovPanel from "./components/PovPanel";
import {
  IconClock,
  IconHazard,
  IconLayers,
  IconPoi,
  IconRadar,
  IconSlope,
  IconTarget,
  IconTerrain,
  IconBrand,
} from "./components/icons";
import { formatWalk } from "./components/RouteStats";
import { useStore } from "./state/store";
import povImages from "../data/pov_images.json";

function formatCoord(point) {
  if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lon)) return null;
  return `${point.lat.toFixed(3)}, ${point.lon.toFixed(3)}`;
}

function featureCount(collection) {
  if (!collection || !Array.isArray(collection.features)) return null;
  return collection.features.length;
}

function endElevation(path) {
  if (!Array.isArray(path)) return null;
  for (let i = path.length - 1; i >= 0; i -= 1) {
    if (Number.isFinite(path[i]?.elevM)) return path[i].elevM;
  }
  return null;
}

function InfoRow({ icon, label, children, title, tone }) {
  return (
    <div className={tone ? `info-row tone-${tone}` : "info-row"} title={title}>
      <span className="info-icon" aria-hidden="true">{icon}</span>
      <span className="info-label">{label}</span>
      <span className="info-value">{children}</span>
    </div>
  );
}

export default function App() {
  const route = useStore((s) => s.route);
  const routeError = useStore((s) => s.routeError);
  const visibleLayers = useStore((s) => s.visibleLayers);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const selectedPoi = useStore((s) => s.selectedPoi);
  const start = useStore((s) => s.start);
  const end = useStore((s) => s.end);
  const waypoints = useStore((s) => s.waypoints);
  const data = useStore((s) => s.data);

  const startLabel = formatCoord(start);
  const endLabel = formatCoord(end);
  const elev = endElevation(route?.path);
  const poiCount = featureCount(data?.poi);
  const radarCount = featureCount(data?.ice);
  const hazards = Array.isArray(route?.hazardsCrossed) ? route.hazardsCrossed.filter(Boolean) : null;
  const destination = selectedPoi?.properties?.name || endLabel;
  const photoUrl = selectedPoi?.properties?.name
    ? povImages[selectedPoi.properties.name]?.imageUrl
    : "";
  const walkLabel = route && Number.isFinite(route.walkMinutes) ? formatWalk(route.walkMinutes) : null;
  const stopCount = Array.isArray(waypoints) ? waypoints.length : null;

  let hazardText = "—";
  let hazardDot = null;
  let hazardTitle;
  if (route && hazards) {
    if (hazards.length === 0) {
      hazardText = "None";
      hazardDot = "ok";
    } else {
      hazardText = String(hazards.length);
      hazardDot = "warn";
      hazardTitle = hazards.join(", ");
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">
          <IconBrand />
          Mars Navigator
        </h1>
        <p className="sys-status" title="Static label. This demo does not check system health.">
          <i className="status-dot ok" aria-hidden="true" />
          System online
        </p>
        <p className="crumb">
          <span aria-hidden="true">/// </span>
          Mars exploration
          <span aria-hidden="true"> / </span>
          Mission
        </p>
        <p className="area-label">Jezero Crater</p>
        <span className="badge">Concept · not flight-certified</span>
      </header>

      <div className="workspace">
        <aside className="col-left">
          <section className="panel terrain-panel">
            <h2 className="panel-head">
              <IconTerrain />
              Terrain
            </h2>
            <InfoRow icon={<IconTerrain />} label="End elevation">
              {Number.isFinite(elev) ? `${Math.round(elev)} m` : "—"}
            </InfoRow>
            <InfoRow icon={<IconSlope />} label="Max slope">
              {Number.isFinite(route?.maxSlopeDeg) ? `${route.maxSlopeDeg.toFixed(1)}°` : "—"}
            </InfoRow>
            <InfoRow icon={<IconHazard />} label="Hazards crossed" title={hazardTitle} tone={hazardDot}>
              {hazardDot && <i className={`status-dot ${hazardDot}`} aria-hidden="true" />}
              {hazardText}
            </InfoRow>

            <h3 className="section-label">Features</h3>
            <InfoRow icon={<IconRadar />} label="Radar coverage" title="SHARAD coverage count. Not an ice depth.">
              {radarCount === null ? "—" : radarCount}
            </InfoRow>
            <InfoRow icon={<IconPoi />} label="POIs">
              {poiCount === null ? "—" : poiCount}
            </InfoRow>

            <h3 className="section-label">Layers</h3>
            <LayerToggles visibleLayers={visibleLayers} onToggle={toggleLayer} />
          </section>
          <Legend />
          <PovPanel poi={selectedPoi} povImages={povImages} />
        </aside>

        <section className="map-panel">
          <header className="map-head">
            <h2 className="panel-head">
              <IconLayers />
              Topographic map
            </h2>
          </header>
          <div className="map-stage">
            <MapView />
            <div className="map-compass" role="img" aria-label="North is up">
              <svg viewBox="0 0 48 58" aria-hidden="true">
                <text x="24" y="10" textAnchor="middle">N</text>
                <polygon points="24,16 30,36 24,31 18,36" fill="#ce733b" />
                <polygon points="24,52 18,36 24,41 30,36" fill="#6e675f" />
              </svg>
            </div>
            {(startLabel || endLabel) && (
              <div className="map-readouts">
                {startLabel && (
                  <p className="map-tag">
                    <em>Start</em>
                    {startLabel}
                  </p>
                )}
                {endLabel && (
                  <p className="map-tag target">
                    <em>Target</em>
                    {endLabel}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <aside className="col-right">
          <RoutePanel route={route} routeError={routeError} />
          <ElevationChart path={route?.path} />
        </aside>
      </div>

      <footer className="mission-bar">
        <h2 className="panel-head">
          <IconTarget />
          Mission details
        </h2>
        <div className="mission-stats">
          <div>
            <span className="stat-label">
              <IconTarget /> Destination
            </span>
            <strong>{destination || "—"}</strong>
          </div>
          <div>
            <span className="stat-label">
              <IconClock /> Est. walk
            </span>
            <strong>{walkLabel || "—"}</strong>
          </div>
          <div>
            <span className="stat-label">Stops</span>
            <strong>{stopCount === null ? "—" : stopCount}</strong>
          </div>
        </div>
        {photoUrl ? (
          <img className="mission-photo" src={photoUrl} alt="" />
        ) : null}
      </footer>
    </div>
  );
}