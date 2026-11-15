import { useState } from "react";
import { IconChart } from "./icons.jsx";

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

const W = 640;
const H = 220;
const PAD = { top: 28, right: 16, bottom: 32, left: 52 };

function formatMetres(m) {
  const rounded = Math.round(m);
  return `${rounded} m`;
}

export default function ElevationChart({ path, onHoverPoint }) {
  const [hover, setHover] = useState(null);
  const data = buildProfile(path);

  if (data.length < 2) {
    return (
      <section className="elevation-chart">
        <h3 className="panel-head">
          <IconChart />
          Elevation profile
        </h3>
        <p className="empty">Select a route to see its elevation profile.</p>
      </section>
    );
  }

  const maxD = data[data.length - 1].distKm || 1;
  const elevs = data.map((d) => d.elevM);
  let minE = Math.min(...elevs);
  let maxE = Math.max(...elevs);
  if (minE === maxE) {
    minE -= 1;
    maxE += 1;
  }
  const padE = (maxE - minE) * 0.12;
  minE -= padE;
  maxE += padE;

  const x = (d) => PAD.left + (d / maxD) * (W - PAD.left - PAD.right);
  const y = (e) => PAD.top + (1 - (e - minE) / (maxE - minE)) * (H - PAD.top - PAD.bottom);
  const baseY = H - PAD.bottom;

  const line = data.map((d) => `${x(d.distKm).toFixed(1)},${y(d.elevM).toFixed(1)}`).join(" ");
  const area = [
    `${x(data[0].distKm).toFixed(1)},${baseY}`,
    line,
    `${x(maxD).toFixed(1)},${baseY}`,
  ].join(" ");

  const yTicks = [0, 1, 2, 3].map((i) => minE + ((maxE - minE) * i) / 3);
  let peak = 0;
  data.forEach((d, i) => {
    if (d.elevM > data[peak].elevM) peak = i;
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
  const tipX = h ? Math.min(Math.max(x(h.distKm) - 46, PAD.left), W - PAD.right - 92) : 0;
  const tipY = h ? Math.max(y(h.elevM) - 40, 4) : 0;

  return (
    <section className="elevation-chart">
      <h3 className="panel-head">
        <IconChart />
        Elevation profile
      </h3>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Elevation in metres along the route"
        onPointerMove={move}
        onPointerLeave={leave}
      >
        <rect width={W} height={H} fill="transparent" />
        {yTicks.map((t) => (
          <g key={t}>
            <line className="grid" x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
            <text className="tick" x={PAD.left - 8} y={y(t) + 3} textAnchor="end">
              {Math.round(t)}
            </text>
          </g>
        ))}
        <text className="axis-label" x={PAD.left - 8} y={14} textAnchor="end">m</text>
        <polygon className="profile-area" points={area} />
        <polyline className="profile-line" points={line} />
        <circle className="peak-dot" cx={x(data[peak].distKm)} cy={y(data[peak].elevM)} r="4" />
        <text className="tick" x={PAD.left} y={H - 10} textAnchor="start">0</text>
        <text className="tick" x={(PAD.left + (W - PAD.right)) / 2} y={H - 10} textAnchor="middle">
          {(maxD / 2).toFixed(1)} km
        </text>
        <text className="tick" x={W - PAD.right} y={H - 10} textAnchor="end">
          {maxD.toFixed(1)} km
        </text>
        {h && (
          <g>
            <line className="hover-line" x1={x(h.distKm)} x2={x(h.distKm)} y1={PAD.top} y2={baseY} />
            <circle className="hover-dot" cx={x(h.distKm)} cy={y(h.elevM)} r="4" />
            <g className="chart-tip" transform={`translate(${tipX}, ${tipY})`}>
              <rect width="92" height="32" rx="6" />
              <text x="46" y="13" textAnchor="middle">{h.distKm.toFixed(2)} km</text>
              <text x="46" y="25" textAnchor="middle">{formatMetres(h.elevM)}</text>
            </g>
          </g>
        )}
      </svg>
      <p className="note" aria-live="polite">
        {h
          ? `${h.distKm.toFixed(2)} km · ${Math.round(h.elevM)} m`
          : "Hover the profile. Heights are metres from the route path."}
      </p>
    </section>
  );
}
