import MapView from "./map/MapView";
import RoutePanel from "./components/RoutePanel";
import ElevationChart from "./components/ElevationChart";
import Legend from "./components/Legend";
import LayerToggles from "./components/LayerToggles";
import PovPanel from "./components/PovPanel";

import { useStore } from "./state/store";
import povImages from "../data/pov_images.json";

function App() {
  const visibleLayers = useStore((s) => s.visibleLayers);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const route = useStore((s) => s.route);
  const routeError = useStore((s) => s.routeError);
  const selectedPoi = useStore((s) => s.selectedPoi);

  return (
    <main className="app">
      <header>
        <h1>MARS NAVIGATOR</h1>
        <p>PLANETARY EXPLORATION SYSTEM</p>
        <span>JEZERO CRATER · MARS</span>
      </header>

      <LayerToggles
        visibleLayers={visibleLayers}
        onToggle={toggleLayer}
      />

      <section className="workspace">
        <MapView />

        <aside>
          <RoutePanel route={route} routeError={routeError} />
          <ElevationChart path={route?.path} />
          <Legend />
          <PovPanel poi={selectedPoi} povImages={povImages} />
        </aside>
      </section>
    </main>
  );
}

export default App;