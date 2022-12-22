import React, { useState, useEffect, useRef, createElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PopUp from "../Popup";
import Map from "./Map";
import Marker from "./Marker";
import './googlemap.scss';
import Panel from "./Panel";
import { IPieDetail } from "../../type";
import { KILOESPERPIXEL } from "../../consts/Page_Const";

const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMapComponent = ({ changecCenter, move, pieDetail, createFlag, setCreateFlag, openPopup, setOpenPopup }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [pies, setPies] = useState<IPieDetail[]>([]);
  const [zoom, setZoom] = useState(12); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.730610,
    lng: -73.935242,
  });
  const [kiloesPerPx, setKiloesPerPx] = useState(144447.644200);
  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };
  const onMouseMove = (e: any) => {
  }
  const onClear = () => {
    setPies([]);
  }
  const zoomInOut = (zoomInOut: number) => {
    let temp = Math.max(zoom + zoomInOut, 1);
    setZoom(temp);
  }
  useEffect(() => {
    let temp = zoom <= 19 ? KILOESPERPIXEL[zoom] : (156.54303392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom))
    setKiloesPerPx(temp);
  }, [zoom])
  useEffect(() => {
    setCenter({
      lat: Number(changecCenter.lat),
      lng: Number(changecCenter.lng),
    })
  }, [changecCenter])
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
    navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng }
      setCenter(pos);
      move(pos);
    })

  }, [ref, map]);
  useEffect(() => {
    if (createFlag === true) {
      let temp = structuredClone(pies);
      temp.push(pieDetail);
      setPies(temp)
      setCreateFlag(false);
    }
  }, [createFlag])
  return (
    <div className="google-box">
      <div className="google-box-map">
        <Wrapper apiKey={api_key ? api_key : ""} render={render}>
          <Map
            center={center}
            onIdle={onIdle}
            onMouseMove={onMouseMove}
            zoom={zoom}
            scrollwheel={false}
            style={{ flexGrow: "1", height: "100%" }}
            mapTypeControl={true}
            disableDefaultUI={true}
          >
            {
              pies.map((pieDetail, i) => {
                let canvas = document.createElement("canvas");
                const wi = (pieDetail.radius) / kiloesPerPx;
                canvas.width = wi;
                canvas.height = wi;
                let ctx = canvas.getContext("2d");
                const items = pieDetail.items;
                let sum = 0;
                let totalAngle = 360;
                let currentAngle = 0;

                if (ctx) {
                  for (let item of items) {
                    let portionAngle = (Number(item.angle) / totalAngle) * 2 * Math.PI;
                    ctx.beginPath();
                    ctx.arc(wi / 2, wi / 2, wi / 2, currentAngle + pieDetail.rotate / 10, currentAngle + portionAngle + pieDetail.rotate / 10);
                    currentAngle += portionAngle;
                    ctx.lineTo(wi / 2, wi / 2);
                    ctx.fillStyle = item.color;
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    // ctx.fillText(pieDetail.towerName, wi / 2 - 20, wi / 2 + wi / 10,)
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var mid = currentAngle + pieDetail.rotate / 10 - portionAngle / 2;
                    ctx.fillText(item.compass, wi / 2 + Math.cos(mid) * (wi / 4), wi / 2 + Math.sin(mid) * (wi / 4) - wi / 20);
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText(item.frequency.toString(), wi / 2 + Math.cos(mid) * (wi / 4), wi / 2 + Math.sin(mid) * (wi / 4) + wi / 20);
                  }
                  ctx.font =  wi/10 + "px Arial";
                  ctx.fillStyle = "white";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillText(pieDetail.towerName.toString(), wi / 2, wi / 2);

                }
                return <Marker clickable={true} key={i} position={{
                  lat: pieDetail.latitude,
                  lng: pieDetail.longitude
                }} icon={canvas.toDataURL()} />

              }
              )}
          </Map>
        </Wrapper>
      </div>
      <Panel clear={onClear} zoomInOut={zoomInOut} openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  )
}


export default GoogleMapComponent;