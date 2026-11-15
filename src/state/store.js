import { create } from 'zustand';

export const useStore = create((set) => ({
  // state (architecture.md ki shape)
  data: { elevation: null, poi: null, hazards: null, ice: null }, // dataLoader
  start: null,        // { lat, lon }            MapView
  waypoints: [],      // [{ lat, lon, name }]    MapView / PoiLayer
  end: null,          // { lat, lon }            MapView
  route: null,        // RouteResult | null      integration.js
  routeError: null,   // string | null           integration.js
  visibleLayers: { terrain: true, hazards: true, poi: true, ice: false }, // LayerToggles
  selectedPoi: null,  // Feature | null          PoiLayer

  // setters
  setData: (data) => set({ data }),
  setStart: (start) => set({ start }),
  setEnd: (end) => set({ end }),
  addWaypoint: (wp) => set((s) => ({ waypoints: [...s.waypoints, wp] })),
  removeWaypoint: (i) =>
    set((s) => ({ waypoints: s.waypoints.filter((_, idx) => idx !== i) })),
  setRoute: (route) => set({ route, routeError: null }),
  setRouteError: (routeError) => set({ routeError, route: null }),
  clearRoute: () => set({ route: null, routeError: null }),
  toggleLayer: (key) =>
    set((s) => ({
      visibleLayers: { ...s.visibleLayers, [key]: !s.visibleLayers[key] },
    })),
  selectPoi: (selectedPoi) => set({ selectedPoi }),
}));