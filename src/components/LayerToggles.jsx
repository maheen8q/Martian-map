// Layer on/off buttons. State lives in the store (visibleLayers); this only displays it.
const DEFAULT_LAYERS = [
  { key: 'terrain', label: 'Terrain', dataType: 'topographic' },
  { key: 'hazards', label: 'Slope hazards', dataType: 'derived from elevation' },
  { key: 'poi', label: 'Points of interest', dataType: 'mission sites' },
{ key: 'ice', label: 'SHARAD radar coverage', dataType: 'radar coverage, not an ice detection' },
];

// Props:
//   visibleLayers  { terrain, hazards, poi, ice } booleans, from the store
//   onToggle(key)  called when a button is clicked; the caller updates the store
//   layers         optional list to override labels/dataType (e.g. from layers.js)
export default function LayerToggles({ visibleLayers = {}, onToggle, layers = DEFAULT_LAYERS }) {
  return (
    <div className="layer-toggles" role="group" aria-label="Map layers">
      {layers.map((l) => {
        const on = Boolean(visibleLayers[l.key]);
        return (
          <button
            key={l.key}
            type="button"
            className={`layer-toggle ${on ? 'on' : 'off'}`}
            aria-pressed={on}
            onClick={() => onToggle && onToggle(l.key)}
          >
            <span className="layer-name">{l.label}</span>
            {l.dataType && <small className="layer-type">{l.dataType}</small>}
          </button>
        );
      })}
    </div>
  );
}