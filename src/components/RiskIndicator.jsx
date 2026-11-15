function riskLevel(score) {
  if (!Number.isFinite(score)) return null;
  if (score <= 33) return { key: "green", label: "Low" };
  if (score <= 66) return { key: "amber", label: "Medium" };
  return { key: "red", label: "High" };
}

export default function RiskIndicator({ score }) {
  const level = riskLevel(score);
  const pct = level ? Math.max(0, Math.min(100, score)) : 0;

  return (
    <div className={level ? `risk risk-${level.key}` : "risk"}>
      <div className="metric-head">
        <span className="stat-label">Risk level</span>
        <span className="stat-value">
          {level ? (
            <>
              <i className="status-dot" aria-hidden="true" />
              {level.label}
            </>
          ) : (
            "—"
          )}
        </span>
      </div>
      <div
        className="bar"
        role="meter"
        aria-label="Risk score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level ? Math.round(score) : undefined}
      >
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="note">
        {level
          ? `${Math.round(score)} / 100 · heuristic, not a safety rating`
          : "No route yet"}
      </span>
    </div>
  );
}
