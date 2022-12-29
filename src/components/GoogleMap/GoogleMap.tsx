import React, { useState, useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, Overlay, SvgMarker } from "googlemaps-react-primitives";

import './googlemap.scss';
import Panel from "./Panel";
import { IPieDetail } from "../../type";
import { KILOESPERPIXEL } from "../../consts/Page_Const";
import PieActionModal from "../Modal";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMapComponent = ({
  changecCenter,
  move,
  pieDetail,
  setPieDetail,
  createFlag,
  setCreateFlag,
  openPopup,
  setOpenPopup,
  setEditFlag,
}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [pies, setPies] = useState<IPieDetail[]>([]);
  const [zoom, setZoom] = useState(9); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.730610,
    lng: -73.935242,
  });
  const [kiloesPerPx, setKiloesPerPx] = useState(144447.644200);
  const [openModal, setOpenModal] = useState(false);
  const [modalPos, setModalPos] = useState({ w: 0, h: 0 });
  const [pieID, setPieID] = useState(0);
  const [selectedPieTitle, setSelectedPieTitle] = useState('');
  const onClear = () => {
    setPies([]);
  }
  const zoomInOut = (zoomInOut: number) => {
    let temp = Math.max(zoom + zoomInOut, 1);
    setZoom(temp);
  }
  const handleClickPie = (id: number, e: any) => {
    setPieID(id);
    setModalPos({
      ...setModalPos,
      w: Number(e.clientX),
      h: Number(e.clientY)
    })
    setSelectedPieTitle(pies[id].towerName);
    setOpenModal(true);
  }
  const handleClickRemove = () => {
    setOpenModal(false);
    let tempPies = pies;
    tempPies.splice(pieID, 1);
    setPies(tempPies)
  }
  const handleClickEdit = () => {
    setOpenModal(false);
    setOpenPopup("display");
    let temp = pies[pieID];
    setPieDetail({
      ...pieDetail,
      towerName: temp.towerName,
      latitude: temp.latitude,
      longitude: temp.longitude,
      rotate: temp.rotate,
      radius: temp.radius,
      items: temp.items
    })
    setEditFlag(true);
    let tempPies = pies;
    tempPies.splice(pieID, 1);
    setPies(tempPies)
  }
  const handleClickCancel = () => {
    setOpenModal(false);
  }
  useEffect(() => {
    let temp = zoom <= 19 ? KILOESPERPIXEL[zoom] : (156.54303392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom))
    setKiloesPerPx(temp);
  }, [zoom])
  useEffect(() => {
    setCenter({
      ...center,
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
      setCenter(pos)
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
        <Wrapper
          apiKey={"AIzaSyDZ8jmGzNoCQp5NooOYaSZH3yT31Jt4czg"}
          render={render}
          libraries={["geometry"]}
        >
          <GoogleMap
            onClick={() => { }}
            center={center}
            zoom={zoom}
            mapTypeControl={true}
            disableDefaultUI={true}
            style={{ flexGrow: "1", height: "100%" }}
            scrollwheel={false}
          >
            {
              pies.map((pieDetail, i) => {
                let canvas = document.createElement("canvas");
                const wi = 2 * (pieDetail.radius) / kiloesPerPx;
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
                    ctx.arc(wi / 2, wi / 2, wi / 2, currentAngle + (pieDetail.rotate - 135) * 2 * Math.PI / 360, currentAngle + portionAngle + (pieDetail.rotate - 135) * 2 * Math.PI / 360);
                    currentAngle += portionAngle;
                    ctx.lineTo(wi / 2, wi / 2);
                    ctx.fillStyle = item.color;
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var mid = currentAngle + (pieDetail.rotate - 135) * 2 * Math.PI / 360 - portionAngle / 2;
                    ctx.fillText(item.compass, wi / 2 + Math.cos(mid) * (wi / 4), wi / 2 + Math.sin(mid) * (wi / 4) - wi / 20);
                    ctx.font = wi / 10 + "px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText(item.frequency.toString(), wi / 2 + Math.cos(mid) * (wi / 4), wi / 2 + Math.sin(mid) * (wi / 4) + wi / 20);
                  }
                  // ctx.font = wi / 10 + "px Arial";
                  // ctx.fillStyle = "white";
                  // ctx.textAlign = "center";
                  // ctx.textBaseline = "middle";
                  // ctx.fillText(pieDetail.towerName.toString(), wi / 2, wi / 2);
                }
                return (
                  <Overlay position={{
                    lat: pieDetail.latitude,
                    lng: pieDetail.longitude
                  }}
                    key={i}
                  >
                    <div className="pie_chart">
                      <span className="span" style={{ position: "absolute", top: "-" + (wi / 2 + wi / 9 + 20) + "px", translate: "-50%", color: "white", fontSize: "" + (wi / 9 + 10) + "px", whiteSpace: "nowrap" }}>{pieDetail.towerName}</span>

                      <img style={{ position: "absolute", top: "-" + wi / 2 + "px", left: "-" + wi / 2 + "px" }} className="canvas-on-map" src={canvas.toDataURL()} alt={pieDetail.towerName + " pie chart"} onClick={(e) => handleClickPie(i, e)} />
                    </div>

                  </Overlay>
                );
              }
              )}
            <Overlay position={center}>
              <SvgMarker
                position={center}
                width={40}
                height={40}
                svg={`<svg className="svg-marker" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4DB7FE" className="path_out"  d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
              <path fill="#4DB7FE" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>`}
              />
            </Overlay>
          </GoogleMap>
        </Wrapper>
      </div>
      <Panel clear={onClear} zoomInOut={zoomInOut} openPopup={openPopup} setOpenPopup={setOpenPopup} />
      {
        openModal === true ? (
          <PieActionModal
            modalPos={modalPos}
            handleClickRemove={handleClickRemove}
            handleClickEdit={handleClickEdit}
            handleClickCancel={handleClickCancel}
            title={selectedPieTitle}
          />
        ) : null
      }
    </div>
  )
}

export default GoogleMapComponent;