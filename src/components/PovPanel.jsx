import { useState } from 'react';

// Shows why the selected stop matters, plus its point-of-view photo if we have one.
// Props:
//   poi         selectedPoi from the store (GeoJSON feature) or null
//   povImages   contents of data/pov_images.json: { "Stop name": { imageUrl, credit, note } }
export default function PovPanel({ poi, povImages }) {
  const [failed, setFailed] = useState(null);
  const props = poi && poi.properties ? poi.properties : null;

  if (!props) {
    return (
      <aside className="pov-panel">
        <h3>Stop details</h3>
        <p className="empty">Click a point of interest to see why it matters.</p>
      </aside>
    );
  }

  const pov = povImages && povImages[props.name] ? povImages[props.name] : null;
  const showImage = pov && pov.imageUrl && failed !== pov.imageUrl;

  return (
    <aside className="pov-panel">
      <h3>{props.name}</h3>
      {props.type && <span className="stat-label">{props.type}</span>}
      {props.why && <p>{props.why}</p>}

      {showImage ? (
        <figure>
          <img
            src={pov.imageUrl}
            alt={pov.note || `View at ${props.name}`}
            onError={() => setFailed(pov.imageUrl)}
          />
          <figcaption className="note">
            {pov.note && <span>{pov.note} · </span>}
            {pov.credit || 'Credit not provided'}
          </figcaption>
        </figure>
      ) : (
        <p className="note">No point-of-view photo available for this stop.</p>
      )}
    </aside>
  );
}