// Oxygen used vs the assumed supply, as a ring gauge. Warns above 100%.
// Used by RoutePanel. Demo assumption, not mission data.
const R = 34;
const CIRC = 2 * Math.PI * R;

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
      <div className="oxygen-body">
        <svg
          className="ring"
          viewBox="0 0 84 84"
          width="84"
          height="84"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-label="Oxygen used"
        >
          <circle className="ring-track" cx="42" cy="42" r={R} fill="none" />
          <circle
            className="ring-fill"
            cx="42" cy="42" r={R}
            fill="none"
            strokeDasharray={`${(pct / 100) * CIRC} ${CIRC}`}
            transform="rotate(-90 42 42)"
          />
          <text className="ring-text" x="42" y="47" textAnchor="middle">O₂</text>
        </svg>
        <div className="oxygen-readout">
          <span className="stat-value">
            {Math.round(usedPct)}
            <small> %</small>
          </span>
          <span className="oxygen-status">{exceeded ? 'Exceeds supply' : 'Within supply'}</span>
        </div>
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