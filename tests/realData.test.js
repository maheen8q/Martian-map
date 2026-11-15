// Checks the REAL elevation file and a demo route on it.
// Skipped automatically if data/elevation_grid.json is not in the repo yet.
// If the team changes the demo start, stop or end, update DEMO below.
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildGrid, latLonToCell } from '../src/routing/costGrid.js';
import { setGrid, findRoute, getLastRouteError } from '../src/routing/findRoute.js';

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/elevation_grid.json');
const present = fs.existsSync(FILE);

// About 5 km in total inside Jezero Crater, one science stop. Fits the oxygen budget.
const DEMO = {
  start: { lat: 18.4, lon: 77.5 },
  stop: { lat: 18.42, lon: 77.54, name: 'Stop 1' },
  end: { lat: 18.4, lon: 77.58 },
};

describe.skipIf(!present)('real elevation file', () => {
  const data = present ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : null;

  it('has the agreed format', () => {
    expect(Object.keys(data).sort()).toEqual(['bounds', 'cellSizeM', 'cols', 'elevation', 'rows']);
    const { west, east, south, north } = data.bounds;
    expect(west).toBeLessThan(east);
    expect(south).toBeLessThan(north);
    expect(data.elevation).toHaveLength(data.rows);
    for (const row of data.elevation) expect(row).toHaveLength(data.cols);
  });

  it('has real-looking numbers: no gaps, no no-data placeholders', () => {
    let min = Infinity, max = -Infinity;
    for (const row of data.elevation) {
      for (const v of row) {
        expect(Number.isFinite(v)).toBe(true);
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
    expect(min).toBeGreaterThan(-9000); // -32768 and similar are "no data"
    expect(max).toBeLessThan(9000);
  });

  it('is oriented north-up: the crater floor is lower than the ground to the south', () => {
    const grid = buildGrid(data);
    const mean = (lat, lon) => {
      const c = latLonToCell(grid, lat, lon);
      let s = 0, n = 0;
      for (let r = Math.max(0, c.r - 10); r <= Math.min(grid.rows - 1, c.r + 10); r++)
        for (let q = Math.max(0, c.c - 10); q <= Math.min(grid.cols - 1, c.c + 10); q++) {
          s += grid.z[r * grid.cols + q];
          n++;
        }
      return s / n;
    };
    // Rough check only: about 940 m lower in this file. A flipped file would show about 500 m.
    expect(mean(18.4, 77.5)).toBeLessThan(mean(18.0, 77.5) - 700);
  });

  it('routes the demo path within the oxygen budget', () => {
    setGrid(buildGrid(data));
    const route = findRoute(DEMO.start, DEMO.end, { waypoints: [DEMO.stop] });
    expect(route, getLastRouteError()).not.toBeNull();
    expect(route.legs).toHaveLength(2);
    expect(route.o2UsedPct).toBeLessThanOrEqual(100);
    expect(route.distanceKm).toBeGreaterThan(3);
    expect(route.distanceKm).toBeLessThan(9);
    expect(route.maxSlopeDeg).toBeLessThan(16); // below the effective slope limit
    expect(route.riskScore).toBeGreaterThanOrEqual(0);
    expect(route.riskScore).toBeLessThanOrEqual(100);
  });

  it('gives every path point a real elevation inside the map', () => {
    setGrid(buildGrid(data));
    const route = findRoute(DEMO.start, DEMO.end, { waypoints: [DEMO.stop] });
    const { west, east, south, north } = data.bounds;
    for (const p of route.path) {
      expect(Number.isFinite(p.elevM)).toBe(true);
      expect(p.elevM).toBeGreaterThan(-9000);
      expect(p.lat).toBeGreaterThanOrEqual(south);
      expect(p.lat).toBeLessThanOrEqual(north);
      expect(p.lon).toBeGreaterThanOrEqual(west);
      expect(p.lon).toBeLessThanOrEqual(east);
    }
  });
});