import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import GoogleMapComponent from '../../components/GoogleMap/GoogleMap';
import CFooter from "../Layout";
import "./Home.scss";
import { IPieDetail } from '../../type';

export default function Home() {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.730610,
    lng: -73.935242,
  });
  const handleCreatePie = (data: IPieDetail) => {

  }
  const handleChangeCenter = (lat: number, lng: number) => {
    setCenter({
      lat: lat,
      lng: lng
    })
    console.log(lat, lng)
  }
  return (
    <>
      <Navbar />
      <GoogleMapComponent changecCenter={center} move={setCenter} />
      <CFooter center={center} pieCreate={handleCreatePie} setCenter={handleChangeCenter} />
    </>
  )
}