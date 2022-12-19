import React, { useState, useEffect, useRef, createElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PopUp from "../Popup";
import Map from "./Map";
import Marker from "./Marker";
import './googlemap.scss';
import Panel from "./Panel";

const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMapComponent = ({ pieSize, changeCenter, create, setCreate, move, openModal }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
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
    console.log(e)
    if (e.pixel === undefined) {
      return;
    }
    setCurrentPos({ x: e.pixel.x, y: e.pixel.y });
    move({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setCreate(false);
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
    let con = structuredClone(center)
    con = {
      lat: Number(changeCenter.lat),
      lng: Number(changeCenter.lng),
    }
    // setClicks([...clicks, con]);
    setCenter(con)
    if (create === true) {
      console.log(true)
      setClicks([...clicks, con]);
    }
  }, [changeCenter, pieSize, create])
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
              clicks.map((latLng, i) => {
                let canvas = document.createElement("canvas");
                const size = 5;
                canvas.width = size * zoom * 2;
                canvas.height = size * zoom * 2;
                let ctx = canvas.getContext("2d");

                const results = [
                  { mood: "Angry", total: 1499, shade: "#0a9627" },
                  { mood: "Happy", total: 478, shade: "#960A2C" },
                  { mood: "Melancholic", total: 332, shade: "#332E2E" },
                  { mood: "Gloomy", total: 195, shade: "#F73809" }
                ];

                let sum = 0;
                let totalNumberOfPeople = results.reduce((sum, { total }) => sum + total, 0);
                let currentAngle = 0;

                if (ctx) {
                  for (let moodValue of results) {
                    let portionAngle = (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
                    ctx.beginPath();
                    ctx.arc(size * zoom, size * zoom, size * zoom, currentAngle, currentAngle + portionAngle);
                    currentAngle += portionAngle;
                    ctx.lineTo(size * zoom, size * zoom);
                    ctx.fillStyle = moodValue.shade;
                    ctx.globalAlpha = 0.4
                    ctx.fill();
                  }
                }
                return <Marker key={i} position={latLng} icon={canvas.toDataURL()} />
              }
              )}
          </Map>
        </Wrapper>
      </div>
      <Panel clear={onClear} zoomInOut={zoomInOut}  />

    </div>
  )
}


export default GoogleMapComponent;