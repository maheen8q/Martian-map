import { useStore } from './state/store';
import { findRoute, getLastRouteError } from './routing/findRoute';
import { loadData } from './api/dataLoader';

export function initApp() {
  loadData();

  return useStore.subscribe((s, prev) => {
    if (
      s.start === prev.start &&
      s.end === prev.end &&
      s.waypoints === prev.waypoints
    ) return;

    if (!s.start || !s.end) {
      s.clearRoute();
      return;
    }

    const result = findRoute(s.start, s.end, { waypoints: s.waypoints });
    if (result) s.setRoute(result);
    else s.setRouteError(getLastRouteError() || 'No safe route found.');
  });
}