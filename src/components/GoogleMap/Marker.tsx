import * as React from "react";

const OMarker = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({
        animation: google.maps.Animation.BOUNCE
      }));
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
}

export default OMarker;