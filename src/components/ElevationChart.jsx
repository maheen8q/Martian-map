import { useState } from 'react';

// Elevation (m) against distance along the route (km). Plain SVG, no library.
// Line is coloured by slope between points; area fill below. Slope bands are
// display classes only (not a safety rating).
const MARS_RADIUS_KM = 3389.5;
const toRad = (d) => (d * Math.PI) / 180;

function haversineKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * MARS_RADIUS_KM * Math.asin(Math.sqrt(h));
}

// route.path has no distance field, so build it from the coordinates.
function buildProfile(path) {
  if (!Array.isArray(path)) return [];
  const pts = path.filter(
    (p) => p && Number.isFinite(p.lat) && Number.isFinite(p.lon) && Number.isFinite(p.elevM)
  );
  if (pts.length < 2) return [];
  let total = 0;
  return pts.map((p, i) => {
    if (i > 0) total += haversineKm(pts[i - 1], p);
    return { distKm: total, elevM: p.elevM, lat: p.lat, lon: p.lon };
  });
}

// Slope between two profile points, in degrees.
function slopeDeg(a, b) {
  const runM = (b.distKm - a.distKm) * 1000;
  if (!(runM > 0)) return 0;
  return (Math.atan(Math.abs(b.elevM - a.elevM) / runM) * 180) / Math.PI;
}

const BANDS = [
  { key: 'low', max: 5, label: '< 5°' },
  { key: 'mid', max: 10, label: '5–10°' },
  { key: 'high', max: 15, label: '10–15°' },
  { key: 'severe', max: Infinity, label: '> 15°' },
];
const bandOf = (deg) => BANDS.find((b) => deg < b.max).key;

const W = 600, H = 220;
const PAD = { top: 14, right: 16, bottom: 34, left: 56 };

// Props: path (route.path), onHoverPoint(point | null), simulated (bool).
export default function ElevationChart({ path, onHoverPoint, simulated }) {
  const [hover, setHover] = useState(null);
  const data = buildProfile(path);

  if (data.length < 2) {
    return (
      <div className="elevation-chart">
        <h3>Elevation profile</h3>
        <p className="empty">Select a route to see its elevation profile.</p>
      </div>
    );
  }

  const maxD = data[data.length - 1].distKm || 1;
  const elevs = data.map((d) => d.elevM);
  let minE = Math.min(...elevs);
  let maxE = Math.max(...elevs);
  if (minE === maxE) { minE -= 1; maxE += 1; }

  const x = (d) => PAD.left + (d / maxD) * (W - PAD.left - PAD.right);
  const y = (e) => PAD.top + (1 - (e - minE) / (maxE - minE)) * (H - PAD.top - PAD.bottom);
  const baseY = H - PAD.bottom;

  const area =
    `${x(0).toFixed(1)},${baseY} ` +
    data.map((d) => `${x(d.distKm).toFixed(1)},${y(d.elevM).toFixed(1)}`).join(' ') +
    ` ${x(maxD).toFixed(1)},${baseY}`;

  const segments = data.slice(1).map((d, i) => {
    const a = data[i];
    return { a, b: d, band: bandOf(slopeDeg(a, d)) };
  });

  const move = (ev) => {
    const box = ev.currentTarget.getBoundingClientRect();
    const px = ((ev.clientX - box.left) / box.width) * W;
    const target = ((px - PAD.left) / (W - PAD.left - PAD.right)) * maxD;
    let best = 0;
    data.forEach((d, i) => {
      if (Math.abs(d.distKm - target) < Math.abs(data[best].distKm - target)) best = i;
    });
    setHover(best);
    if (onHoverPoint) onHoverPoint(data[best]);
  };
  const leave = () => {
    setHover(null);
    if (onHoverPoint) onHoverPoint(null);
  };

  const h = hover === null ? null : data[hover];
  const yTicks = [minE, (minE + maxE) / 2, maxE];
  const first = data[0];
  const last = data[data.length - 1];

  return (
    <div className="elevation-chart">
      <h3>Elevation profile</h3>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Elevation in metres along the route in kilometres, coloured by slope"
        onMouseMove={move}
        onMouseLeave={leave}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line className="grid" x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
            <text className="tick" x={PAD.left - 6} y={y(t) + 4} textAnchor="end">
              {Math.round(t)}
            </text>
          </g>
        ))}
        <polygon className="profile-area" points={area} />
        {segments.map((s, i) => (
          <line
            key={i}
            className={`seg seg-${s.band}`}
            x1={x(s.a.distKm)} y1={y(s.a.elevM)}
            x2={x(s.b.distKm)} y2={y(s.b.elevM)}
          />
        ))}
        <circle className="end-dot end-a" cx={x(first.distKm)} cy={y(first.elevM)} r="5" />
        <circle className="end-dot end-b" cx={x(last.distKm)} cy={y(last.elevM)} r="5" />
        <text className="end-label" x={x(first.distKm)} y={y(first.elevM) - 10} textAnchor="middle">A</text>
        <text className="end-label" x={x(last.distKm)} y={y(last.elevM) - 10} textAnchor="middle">B</text>
        <text className="axis-label" x={W / 2} y={H - 6} textAnchor="middle">
          Distance along route (km)
        </text>
        <text className="axis-label" x={12} y={H / 2} textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`}>
          Elevation (m)
        </text>
        <text className="tick" x={PAD.left} y={H - 18} textAnchor="middle">0</text>
        <text className="tick" x={W - PAD.right} y={H - 18} textAnchor="end">{maxD.toFixed(1)}</text>
        {h && (
          <g>
            <line className="hover-line" x1={x(h.distKm)} x2={x(h.distKm)} y1={PAD.top} y2={baseY} />
            <circle className="hover-dot" cx={x(h.distKm)} cy={y(h.elevM)} r="4" />
          </g>
        )}
      </svg>

      <ul className="slope-legend" aria-label="Slope colour key">
        {BANDS.map((b) => (
          <li key={b.key}>
            <span className={`slope-swatch seg-${b.key}`} aria-hidden="true" />
            {b.label}
          </li>
        ))}
      </ul>

      <p className="note">
        {h
          ? `${h.distKm.toFixed(2)} km · ${Math.round(h.elevM)} m`
          : 'Hover the chart to inspect a point. Colours show slope between points (display bands, not a safety rating).'}
      </p>
      {simulated && <p className="note">Simulated terrain</p>}
    </div>
  );
}