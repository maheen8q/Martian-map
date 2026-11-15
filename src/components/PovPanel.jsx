import { useState } from "react";
import { IconPoi } from "./icons.jsx";

export default function PovPanel({ poi, povImages }) {
  const [failed, setFailed] = useState(null);
  const props = poi && poi.properties ? poi.properties : null;

  if (!props) {
    return (
      <section className="pov-panel">
        <h3 className="panel-head">
          <IconPoi />
          Point of view
        </h3>
        <p className="empty">Select a point of interest on the map.</p>
      </section>
    );
  }

  const pov = povImages && props.name && povImages[props.name] ? povImages[props.name] : null;
  const showImage = Boolean(pov && pov.imageUrl && failed !== pov.imageUrl);

  return (
    <section className="pov-panel">
      <h3 className="panel-head">
        <IconPoi />
        Point of view
      </h3>
      {props.type && <span className="stat-label">{props.type}</span>}
      {(props.description || props.why) && <p>{props.description || props.why}</p>}
      {props.scienceReason && (
        <p><span className="stat-label">Science</span> {props.scienceReason}</p>
      )}
      {props.survivalNote && (
        <p><span className="stat-label">Terrain note</span> {props.survivalNote}</p>
      )}

      {showImage ? (
        <figure>
          <div className="pov-frame">
            <img
              src={pov.imageUrl}
              alt={pov.note || `View at ${props.name}`}
              onError={() => setFailed(pov.imageUrl)}
            />
            <figcaption className="pov-caption">{props.name}</figcaption>
          </div>
          {(pov.note || pov.credit) && (
            <p className="note">{[pov.note, pov.credit].filter(Boolean).join(" · ")}</p>
          )}
        </figure>
      ) : (
        <p className="note">{pov && pov.note ? pov.note : "No point-of-view photo for this stop."}</p>
      )}
    </section>
  );
}
