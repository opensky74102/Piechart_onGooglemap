import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPlus, faMinus,faToggleOn } from "@fortawesome/free-solid-svg-icons";
import "./googlemap.scss";


export default function Panel({clear, zoomInOut}:any) {
  return (
   <div className="map_control_panel">
     <div className="google_map_panel_btn" onClick={()=>clear()}>
      <FontAwesomeIcon icon={faEraser}  className="fa_icon" color="white" size="xl" />
    </div>
    <div className="google_map_panel_btn" onClick={()=>zoomInOut(1)}>
      <FontAwesomeIcon icon={faPlus} className="fa_icon" color="white" size="xl" />
    </div>
    <div className="google_map_panel_btn" onClick={()=>zoomInOut(-1)}>
      <FontAwesomeIcon icon={faMinus} className="fa_icon" color="white" size="xl" />
    </div>
    <div className="google_map_panel_btn">
      <FontAwesomeIcon icon={faToggleOn} className="fa_icon" color="white" size="xl" />
    </div>
   </div>
  )
}