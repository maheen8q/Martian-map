import { useState } from "react";
import MapView from "./map/MapView";
import RoutePanel from "./components/RoutePanel";
import ElevationChart from "./components/ElevationChart";
import Legend from "./components/Legend";
import LayerToggles from "./components/LayerToggles";
import PovPanel from "./components/PovPanel";

// TEMPORARY fake path for the preview. Replace with route?.path from the store.
const DEMO_PATH = [
  { lat: 18.44, lon: 77.45, elevM: -2600 },
  { lat: 18.43, lon: 77.49, elevM: -2580 },
  { lat: 18.42, lon: 77.53, elevM: -2610 },
  { lat: 18.40, lon: 77.60, elevM: -2590 },
];

function App() {
  const [layers, setLayers] = useState({ terrain: true, hazards: true, poi: true, ice: false });
  const toggle = (key) => setLayers((l) => ({ ...l, [key]: !l[key] }));

  return (
    <main className="app">
      <header>
        <h1>MARS NAVIGATOR</h1>
        <p>Planetary exploration system</p>
        <span>JEZERO CRATER · MARS</span>
        <em className="badge">Concept · not flight-certified</em>
      </header>

      <section className="workspace">
        <aside className="col-left">
          <div className="panel">
            <h3>Layers</h3>
            <LayerToggles visibleLayers={layers} onToggle={toggle} />
          </div>
          <Legend />
          <PovPanel poi={null} povImages={null} />
        </aside>

        <section className="map-panel">
          <h2 className="panel-title">Topographic map</h2>
          <MapView />
        </section>

        <aside className="col-right">
          <RoutePanel demo />
          <ElevationChart path={DEMO_PATH} simulated />
        </aside>
      </section>
    </main>
  );
}

export default App;