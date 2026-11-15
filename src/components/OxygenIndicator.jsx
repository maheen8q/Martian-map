export default function OxygenIndicator({ usedPct }) {
  const known = Number.isFinite(usedPct);
  const exceeded = known && usedPct > 100;
  const pct = known ? Math.max(0, Math.min(100, usedPct)) : 0;

  return (
    <div className={`oxygen ${exceeded ? "oxygen-over" : known ? "oxygen-ok" : ""}`}>
      <div className="metric-head">
        <span className="stat-label">Oxygen used</span>
        <span className="stat-value">
          {known ? Math.round(usedPct) : "—"}
          {known && <small>%</small>}
        </span>
      </div>
      <div
        className="bar"
        role="meter"
        aria-label="Oxygen used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={known ? Math.round(pct) : undefined}
        aria-valuetext={known ? `${Math.round(usedPct)} percent used` : "No route yet"}
      >
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className={exceeded ? "warning" : "oxygen-status"}>
        {exceeded ? "Exceeds supply" : known ? "Within demo budget" : "No route yet"}
      </span>
      <span className="note">Share of the demo oxygen budget, not remaining suit oxygen.</span>
    </div>
  );
}
