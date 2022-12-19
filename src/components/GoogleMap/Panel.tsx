import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import "./googlemap.scss";


export default function Panel({clear}:any) {
  return (
    <div className="google_map_panel" onClick={()=>clear()}>
      <FontAwesomeIcon icon={faEraser} className="fa_icon" color="white" size="xl" />
    </div>
  )
}