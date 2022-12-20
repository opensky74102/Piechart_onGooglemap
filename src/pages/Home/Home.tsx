import {useState, useEffect} from 'react';
import Navbar from "../../components/Navbar";
import GoogleMapComponent from '../../components/GoogleMap/GoogleMap';
import CFooter from "../Layout";
import "./Home.scss";

export default function Home() {
  const [pieSize, setPieSize] = useState(12); 
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.730610,
    lng: -73.935242,
  });
  const [createPieChart, setCreatePieChart] = useState(false);
  const handleClickCreate = (latVal:number, lngVal:number, create?:boolean|undefined)=>{
    let con = structuredClone(center)
    con = {
      lat: Number(latVal),
      lng: Number(lngVal),
    }
    setCenter(con)
    setCreatePieChart(create?true:false);
  }
  return (
    <>
      <Navbar />
      <GoogleMapComponent pieSize={pieSize} changeCenter={center} create={createPieChart} setCreate={setCreatePieChart} move={setCenter}/>
      <CFooter center={center} click={handleClickCreate} />
    </>
  )
}