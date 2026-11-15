// Oxygen used vs the assumed supply. Warns above 100%. Used by RoutePanel.
export default function OxygenIndicator({ usedPct }) {
  if (!Number.isFinite(usedPct)) {
    return (
      <div className="oxygen">
        <span className="stat-label">Oxygen used</span>
        <span className="stat-value">—</span>
      </div>
    );
  }

  const exceeded = usedPct > 100;
  const pct = Math.max(0, Math.min(100, usedPct));
  return (
    <div className={`oxygen ${exceeded ? 'oxygen-over' : 'oxygen-ok'}`}>
      <span className="stat-label">Oxygen used</span>
      <span className="stat-value">
        {Math.round(usedPct)}
        <small> %</small>
      </span>
      <div className="bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      {exceeded && (
        <span className="warning" role="alert">
          Warning: this route needs more oxygen than the assumed supply.
        </span>
      )}
      <span className="note">Demo assumption, not mission data.</span>
    </div>
  );
}