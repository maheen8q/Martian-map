const fmt = (v, digits = 1) => (Number.isFinite(v) ? v.toFixed(digits) : "—");

export function formatWalk(min) {
  if (!Number.isFinite(min)) return "—";
  const total = Math.round(min);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

export default function RouteStats({ distanceKm, walkMinutes, maxSlopeDeg }) {
  return (
    <div className="overview-distance">
      <span className="stat-label">Distance</span>
      <span className="stat-value stat-hero">
        {fmt(distanceKm, 1)}
        {Number.isFinite(distanceKm) && <small>km</small>}
      </span>
      <p className="est-time">
        <span className="stat-label">Est. time</span>
        <span>{Number.isFinite(walkMinutes) ? `~ ${formatWalk(walkMinutes)}` : "—"}</span>
      </p>
      <p className="slope-inline">
        <span className="stat-label">Max slope</span>
        <span>{Number.isFinite(maxSlopeDeg) ? `${fmt(maxSlopeDeg, 1)}°` : "—"}</span>
      </p>
    </div>
  );
}
