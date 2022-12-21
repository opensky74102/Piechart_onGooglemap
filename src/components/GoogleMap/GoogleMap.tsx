import React, { useState, useEffect, useRef, createElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PopUp from "../Popup";
import Map from "./Map";
import Marker from "./Marker";
import './googlemap.scss';
import Panel from "./Panel";
import { IPieDetail } from "../../type";

const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMapComponent = ({ changecCenter, move, pieDetail, createFlag, setCreateFlag }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [pies, setPies] = useState<IPieDetail[]>([]);
  const [zoom, setZoom] = useState(12); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.730610,
    lng: -73.935242,
  });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [currentGeo, setCurrentGeo] = useState({ lat: 0, lng: 0 });
  const results = [
    { mood: "Angry", total: 1499, shade: "#0a9627" },
    { mood: "Happy", total: 478, shade: "#960A2C" },
    { mood: "Melancholic", total: 332, shade: "#332E2E" },
    { mood: "Gloomy", total: 195, shade: "#F73809" }
  ];
  const onClick = (e: any) => {
    if (e.pixel === undefined) {
      return;
    }
    setCurrentPos({ x: e.pixel.x, y: e.pixel.y });
    move({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }
  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };
  const onMouseMove = (e: any) => {
  }
  const onClear = () => {
    setClicks([]);
  }
  const zoomInOut = (zoomInOut: number) => {
    let temp = Math.max(zoom + zoomInOut, 1);
    setZoom(temp);
  }
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
      setCurrentGeo(pos);
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
        <Wrapper apiKey={"AIzaSyDZ8jmGzNoCQp5NooOYaSZH3yT31Jt4czg"} render={render}>
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            onMouseMove={onMouseMove}
            zoom={zoom}
            scrollwheel={false}
            style={{ flexGrow: "1", height: "100%" }}
            disableDefaultUI={true}
          >
            {
              pies.map((pieDetail, i) => {
                let canvas = document.createElement("canvas");
                const wi = pieDetail.radius * 1.5 + 100;
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
                    ctx.globalAlpha = 0.5;
                    ctx.fillText(pieDetail.towerName, wi / 2 - 20, wi / 2 + 20)
                    ctx.fill();
                  }

                }
                return <Marker key={i} position={{
                  lat:pieDetail.latitude,
                  lng:pieDetail.longitude
                }} icon={canvas.toDataURL()} />
              }
              )}
          </Map>
        </Wrapper>
      </div>
      <Panel clear={onClear} zoomInOut={zoomInOut} />

    </div>
  )
}


export default GoogleMapComponent;