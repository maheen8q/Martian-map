import RouteStats from "./RouteStats.jsx";
import RiskIndicator from "./RiskIndicator.jsx";
import OxygenIndicator from "./OxygenIndicator.jsx";
import { IconRoute } from "./icons.jsx";

const num = (v, d = 1) => (Number.isFinite(v) ? v.toFixed(d) : "—");

export default function RoutePanel({ route, routeError }) {
  const data = route || null;
  const legs = data && Array.isArray(data.legs) ? data.legs : [];
  const hazards = data && Array.isArray(data.hazardsCrossed) ? data.hazardsCrossed : [];

  return (
    <section className="route-panel">
      <h2 className="panel-head">
        <IconRoute />
        Route overview
      </h2>

      {routeError && (
        <p className="error" role="alert">{routeError}</p>
      )}
      {!data && !routeError && (
        <p className="empty">Set a start and an end on the map.</p>
      )}

      <div className="overview-grid">
        <RouteStats
          distanceKm={data ? data.distanceKm : NaN}
          walkMinutes={data ? data.walkMinutes : NaN}
          maxSlopeDeg={data ? data.maxSlopeDeg : NaN}
        />
        <RiskIndicator score={data ? data.riskScore : NaN} />
      </div>

      <OxygenIndicator usedPct={data ? data.o2UsedPct : NaN} />

      {data && (
        <div className="hazards">
          <span className="stat-label">Hazards crossed</span>
          {hazards.length ? (
            <ul>
              {hazards.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : (
            <span className="note">None</span>
          )}
        </div>
      )}

      {legs.length > 1 && (
        <div className="legs">
          <span className="stat-label">Legs</span>
          <table>
            <thead>
              <tr>
                <th>Leg</th>
                <th>km</th>
                <th>min</th>
                <th>Slope</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {legs.map((l, i) => (
                <tr key={`${l.from}-${l.to}-${i}`}>
                  <td>{l.from} → {l.to}</td>
                  <td>{num(l.distanceKm)}</td>
                  <td>{Number.isFinite(l.walkMinutes) ? Math.round(l.walkMinutes) : "—"}</td>
                  <td>{num(l.maxSlopeDeg)}°</td>
                  <td>{Number.isFinite(l.riskScore) ? Math.round(l.riskScore) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="disclaimer">
        Concept only. Not flight-certified. Walk time and oxygen use the demo assumptions, not a mission budget.
      </p>
    </section>
  );
}
