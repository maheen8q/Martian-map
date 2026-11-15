import { IconHazard, IconLayers, IconPoi, IconRadar, IconTerrain } from "./icons.jsx";

const ICONS = {
  terrain: <IconTerrain />,
  hazards: <IconHazard />,
  poi: <IconPoi />,
  ice: <IconRadar />,
  hirise: <IconLayers />,
};

const DEFAULT_LAYERS = [
  { key: "terrain", label: "Terrain", dataType: "Topographic base" },
  { key: "hazards", label: "Slope hazards", dataType: "Derived from elevation" },
  { key: "poi", label: "Points of interest", dataType: "Mission sites" },
  { key: "ice", label: "SHARAD radar coverage", dataType: "Radar coverage, not an ice detection" },
  { key: "hirise", label: "HiRISE imagery (partial coverage)", dataType: "Optical imagery, partial coverage" },
];

export default function LayerToggles({ visibleLayers = {}, onToggle, layers = DEFAULT_LAYERS }) {
  return (
    <div className="layer-toggles" role="group" aria-label="Map layers">
      {layers.map((l) => {
        const on = Boolean(visibleLayers[l.key]);
        return (
          <button
            key={l.key}
            type="button"
            className={`layer-toggle ${on ? "on" : "off"}`}
            aria-pressed={on}
            title={l.dataType || l.label}
            onClick={() => onToggle && onToggle(l.key)}
          >
            <span className="layer-name">
              {ICONS[l.key]}
              {l.label}
            </span>
            <span className="layer-state">{on ? "On" : "Off"}</span>
          </button>
        );
      })}
    </div>
  );
}
