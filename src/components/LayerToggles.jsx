
function LayerToggles({ visibleLayers, onToggle }) {
  const layers = [
    { key: "terrain", label: "Terrain" },
    { key: "hazards", label: "Slope hazards" },
    { key: "poi", label: "Points of interest" },
    { key: "ice", label: "SHARAD radar coverage" },
    { key: "hirise", label: "HiRISE imagery (partial coverage)" },
  ];

  return (
    <div className="layer-toggles">
      {layers.map((layer) => (
        <label key={layer.key}>
          <input
            type="checkbox"
            checked={visibleLayers[layer.key] ?? false}
            onChange={() => onToggle(layer.key)}
          />
          {layer.label}
        </label>
      ))}
    </div>
  );
}

export default LayerToggles;
