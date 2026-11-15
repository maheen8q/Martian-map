// Risk score bar. 0-33 green, 34-66 amber, 67-100 red. Used by RoutePanel.
function riskLevel(score) {
  if (!Number.isFinite(score)) return null;
  if (score <= 33) return { key: 'green', label: 'Low' };
  if (score <= 66) return { key: 'amber', label: 'Moderate' };
  return { key: 'red', label: 'High' };
}

export default function RiskIndicator({ score }) {
  const level = riskLevel(score);
  if (!level) {
    return (
      <div className="risk">
        <span className="stat-label">Risk score</span>
        <span className="stat-value">—</span>
      </div>
    );
  }

  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className={`risk risk-${level.key}`}>
      <span className="stat-label">Risk score</span>
      <span className="stat-value">
        {Math.round(score)}
        <small> / 100 · {level.label}</small>
      </span>
      <div className="bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="note">Heuristic estimate, not a safety rating.</span>
    </div>
  );
}