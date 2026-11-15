// Stat cards: distance, walking time, max slope. Used by RoutePanel.
const fmt = (v, digits = 1) => (Number.isFinite(v) ? v.toFixed(digits) : '—');

function formatDuration(min) {
  if (!Number.isFinite(min)) return '—';
  const total = Math.round(min);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}

export default function RouteStats({ distanceKm, walkMinutes, maxSlopeDeg }) {
  const items = [
    { label: 'Distance', value: fmt(distanceKm, 1), unit: 'km' },
    { label: 'Walking time', value: formatDuration(walkMinutes), unit: '' },
    { label: 'Max slope', value: fmt(maxSlopeDeg, 1), unit: '°' },
  ];

  return (
    <div className="stats-grid">
      {items.map((s) => (
        <div className="stat-card" key={s.label}>
          <span className="stat-label">{s.label}</span>
          <span className="stat-value">
            {s.value}
            {s.value !== '—' && s.unit && <small> {s.unit}</small>}
          </span>
        </div>
      ))}
    </div>
  );
}