import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPlus, faMinus, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as LocationTarget} from "../../assets/images/location4.svg";
import "./googlemap.scss";


export default function Panel({ clear, zoomInOut, openPopup, setOpenPopup, gotoMyLocation }: any) {
  return (
    <div className="map_control_panel">
      <div className="google_map_panel_btn" onClick={() => gotoMyLocation()}>
        {/* <FontAwesomeIcon icon={faEraser} className="fa_icon" color="white" size="xl" /> */}
        <LocationTarget className="fa_icon" fill="white" fontSize={"sm"}/>
      </div>
      <div className="google_map_panel_btn" onClick={() => clear()}>
        <FontAwesomeIcon icon={faEraser} className="fa_icon" color="white" size="xl" />
      </div>
      <div className="google_map_panel_btn" onClick={() => zoomInOut(1)}>
        <FontAwesomeIcon icon={faPlus} className="fa_icon" color="white" size="xl" />
      </div>
      <div className="google_map_panel_btn" onClick={() => zoomInOut(-1)}>
        <FontAwesomeIcon icon={faMinus} className="fa_icon" color="white" size="xl" />
      </div>
      <div className="google_map_panel_btn" onClick={() => {
        openPopup === "hide" ? setOpenPopup("display") : setOpenPopup("hide")
      }}>
        <FontAwesomeIcon icon={openPopup === "hide" ? faToggleOn : faToggleOff} className="fa_icon" color="white" size="xl" />
      </div>
    </div>
  )
}