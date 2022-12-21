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
  const [pieDetail, setPieDetail] = useState<IPieDetail>({
    towerName: '',
    latitude: 0,
    longitude: 0,
    rotate: 0,
    radius: 60,
    items: []
  });
  const [createFlag, setCreateFlag] = useState(false);
  const handleCreatePie = (data: IPieDetail) => {
    setPieDetail(data);
    setCreateFlag(true);
  }
  const handleChangeCenter = (lat: number, lng: number) => {
    setCenter({
      lat: lat,
      lng: lng
    })
  }
  return (
    <>
      <Navbar />
      <GoogleMapComponent changecCenter={center} move={setCenter} pieDetail={pieDetail} createFlag={createFlag} setCreateFlag={setCreateFlag} />
      <CFooter center={center} pieCreate={handleCreatePie} setCenter={handleChangeCenter} />
    </>
  )
}