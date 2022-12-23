import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PopUp from "../Popup";
import Map from "./Map";
interface IInfo {
  mood: string,
  total: number,
  shade: string,
}
interface IMarker {
  options: google.maps.MarkerOptions,
  data: {
    infoes: IInfo[],
    size: number,
  }
}
// {options, data}:IMarker
const CustomMarker = ({ options, data }: IMarker) => {

  return (
      <Marker position={options.position} />
  )
};
const Marker = (options: google.maps.MarkerOptions) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
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

export default Marker;