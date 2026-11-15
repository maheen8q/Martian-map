// Legend for hazard colours and point-of-interest icons.
// Colours/icons here must match the map layers (Ayesha). Names match routing: dune, rough, steep, rock.
const HAZARDS = [
  { key: 'dune', label: 'Dune', color: '#d9a441' },
  { key: 'rough', label: 'Rough ground', color: '#c97b3a' },
  { key: 'steep', label: 'Steep slope (blocked)', color: '#d64533' },
  { key: 'rock', label: 'Rock field (blocked)', color: '#8c3b2e' },
];

const POI_TYPES = [
  { key: 'landing-site', label: 'Landing site' },
  { key: 'region', label: 'Region' },
  { key: 'waypoint', label: 'Science stop / waypoint' },
];

export default function Legend() {
  return (
    <div className="legend">
      <h3>Legend</h3>

      <span className="stat-label">Hazards</span>
      <ul>
        {HAZARDS.map((h) => (
          <li key={h.key}>
            <span className="swatch" style={{ background: h.color }} aria-hidden="true" />
            {h.label}
          </li>
        ))}
      </ul>

      <span className="stat-label">Points of interest</span>
      <ul>
        {POI_TYPES.map((p) => (
          <li key={p.key}>
            <span className={`poi-icon poi-${p.key}`} aria-hidden="true" />
            {p.label}
          </li>
        ))}
      </ul>
        
      <span className="stat-label">Radar</span>
      <ul>
        <li>
          <span className="swatch swatch-radar" aria-hidden="true" />
          SHARAD radar coverage
        </li>
      </ul>
      <p className="note">Radar coverage, not an ice detection.</p>
    </div>
  );
}