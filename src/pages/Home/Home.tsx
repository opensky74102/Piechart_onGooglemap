import Navbar from "../../components/Navbar";
import GoogleMapComponent from '../../components/GoogleMap/GoogleMap';
// import GoogleMap2 from "../../components/GoogleMap/GoogleMap2";

import "./Home.scss";

export default function Home() {
  return (
    <>
      <Navbar />
      <GoogleMapComponent/>
    </>
  )
}