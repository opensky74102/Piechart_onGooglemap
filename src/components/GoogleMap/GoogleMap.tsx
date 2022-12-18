import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import './googlemap.scss';

const GoogleMapComponent = React.memo(function Map() {
  const [value, setValue] = useState(0);
  const [openPopupModal, setOpenPopup] = useState(false);
  const { ref, map, google } = useGoogleMaps("AIzaSyDZ8jmGzNoCQp5NooOYaSZH3yT31Jt4czg",
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );

  useEffect(() => {
    if (!map) {
      return;
    }
    setValue(map.getZoom());

    const listener = map.addListener("zoom_changed", () => {
      setValue(map.getZoom());
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, google]);
  const openPopup = () => {
    setOpenPopup(!openPopupModal);
  }
  return (
    <>
      <div ref={ref} className="google-box" />
      <div className="popup-btn" onClick={() => openPopup()}>
        <FontAwesomeIcon icon={faThumbsUp} className="fa_icon" color="white" size="xl" />
      </div>
      {
        openPopupModal==true?null:null
      }
    </>
  );
});

export default GoogleMapComponent;