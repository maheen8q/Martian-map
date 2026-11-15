import RouteStats from './RouteStats.jsx';
import RiskIndicator from './RiskIndicator.jsx';
import OxygenIndicator from './OxygenIndicator.jsx';

// TEMPORARY fake route for building the UI. Not Mars data.
// Delete this constant and the `demo` prop once the store is wired.
const DEMO_ROUTE = {
  distanceKm: 12.4,
  walkMinutes: 310,
  maxSlopeDeg: 9.3,
  riskScore: 32,
  o2UsedPct: 129,
  hazardsCrossed: ['steep'],
  legs: [
    { from: 'Start', to: 'Stop 1', distanceKm: 5.1, walkMinutes: 102, maxSlopeDeg: 6.0, riskScore: 20 },
    { from: 'Stop 1', to: 'End', distanceKm: 7.3, walkMinutes: 208, maxSlopeDeg: 9.3, riskScore: 32 },
  ],
};

const num = (v, d = 1) => (Number.isFinite(v) ? v.toFixed(d) : '—');

// Props: route (RouteResult | null), routeError (string | null) from the store.
export default function RoutePanel({ route, routeError, demo = false }) {
  const data = demo ? DEMO_ROUTE : route;

  if (!data) {
    return (
      <aside className="route-panel">
        <h2>Route</h2>
        {routeError ? (
          <p className="error" role="alert">{routeError}</p>
        ) : (
          <p className="empty">Click a start point on the map to begin.</p>
        )}
        <p className="disclaimer">Concept only. Not flight-certified.</p>
      </aside>
    );
  }

  const legs = Array.isArray(data.legs) ? data.legs : [];
  const hazards = Array.isArray(data.hazardsCrossed) ? data.hazardsCrossed : [];

  return (
    <aside className="route-panel">
      <h2>Route</h2>

      <RouteStats
        distanceKm={data.distanceKm}
        walkMinutes={data.walkMinutes}
        maxSlopeDeg={data.maxSlopeDeg}
      />
      <RiskIndicator score={data.riskScore} />
      <OxygenIndicator usedPct={data.o2UsedPct} />

      <div className="hazards">
        <span className="stat-label">Hazards crossed</span>
        {hazards.length ? (
          <ul>{hazards.map((h) => <li key={h}>{h}</li>)}</ul>
        ) : (
          <span className="note">None</span>
        )}
      </div>

      {legs.length > 1 && (
        <div className="legs">
          <span className="stat-label">Legs</span>
          <table>
            <thead>
              <tr><th>Leg</th><th>km</th><th>min</th><th>Slope</th><th>Risk</th></tr>
            </thead>
            <tbody>
              {legs.map((l, i) => (
                <tr key={i}>
                  <td>{l.from} → {l.to}</td>
                  <td>{num(l.distanceKm)}</td>
                  <td>{Number.isFinite(l.walkMinutes) ? l.walkMinutes : '—'}</td>
                  <td>{num(l.maxSlopeDeg)}°</td>
                  <td>{Number.isFinite(l.riskScore) ? l.riskScore : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="disclaimer">
        Concept only. Not flight-certified. All values use demo assumptions.
      </p>
    </aside>
  );
}