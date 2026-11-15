import { useStore } from '../state/store';
import { initRouting } from '../routing/findRoute';
import elevation from '../../data/elevation_grid.json';

// geojson files optional hain: file na ho to build nahi tootegi
const raw = import.meta.glob('../../data/*.geojson', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function readGeo(name) {
  const text = raw[`../../data/${name}`];
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export function loadData() {
  const data = {
    elevation,
    poi: readGeo('poi.geojson'),
    hazards: readGeo('hazards.geojson'),
    ice: readGeo('ice.geojson'),
  };
  useStore.getState().setData(data);
  initRouting(elevation, data.hazards); // hazards file na ho to null, routing handle karti hai
}