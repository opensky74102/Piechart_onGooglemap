import React from 'react';
import 'reactjs-popup/dist/index.css';
import './popup.scss';

export default function PopUp({ setZoom, setCenter, zoom, center, pos }: any) {
  return (
    <div className="modal_form" style={{ "left": pos.x - 100, "top": pos.y - 30 }}>
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
    </div>
  );
}
