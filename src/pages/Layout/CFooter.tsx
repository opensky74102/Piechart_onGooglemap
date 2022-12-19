import react, { useEffect, useState } from 'react';
import './footer.scss';

export default function CFooter({ click, center }: any) {
  const [latVal, setLatValue] = useState(40.7);
  const [lngVal, setLngValue] = useState(-74);
  const [tempPieSize, setTempPieSize] = useState(6);
  const [pieSize, setPieSize] = useState(7);
  const handleChangeValue = (e: any) => {
    let { value, min, max, name } = e.target;

    if (name === "latitude" && Number(value) >= min && Number(value) <= max) {
      setLatValue(value);
      click(value, lngVal, pieSize);
      return;
    } else if (name === "longitude" && Number(value) >= min && Number(value) <= max) {

      setLngValue(value);
      click(latVal, value, pieSize);
      return;
    } else if (name === "pie_size" && Number(value) >= min && Number(value) <= max) {
      setTempPieSize(value)
      setPieSize(Number(value) + 1);
      click(latVal, lngVal, Number(value) + 1);
      return;
    }
  }
  useEffect(() => {
    setLatValue(center.lat);
    setLngValue(center.lng);
    console.log(center)
  }, [center])
  const handleClick = () => {
    console.log("hello")
    click(latVal, lngVal, pieSize, true);
  }
  return (
    <footer className='footer'>
      <h5>Map Tools</h5>
      <div className='infoes_form'>
        <div className='info_form'>
          <div className='info_title'>
            <label htmlFor="latitude">Latitude</label>
          </div>
          <input
            type="number"
            className='info_input'
            name="latitude"
            id='latitude'
            max={90} min={-90}
            placeholder='Latitude'
            value={latVal}
            onInput={handleChangeValue}
          />
        </div>
        <div className='info_form'>
          <div className='info_title'>
            <label htmlFor='longitude'>Longitude</label>
          </div>
          <input
            type="number"
            className='info_input'
            name="longitude"
            id='longitude'
            max={180} min={-180}
            placeholder='Longitude'
            value={lngVal}
            onInput={handleChangeValue}
          />
        </div>
        <div className='info_form'>
          <div className='info_title'>
            <label htmlFor="pie_size">Pie Radius</label>
          </div>
          <input
            type="number"
            className='info_input'
            name="pie_size"
            id='pie_size'
            max={20} min={0}
            placeholder='Pie Radius'
            value={tempPieSize}
            onInput={handleChangeValue}
          />
        </div>
        <div className='info_form'>
          <button className="btn" onClick={handleClick}>Create</button>
        </div>
      </div>
    </footer>
  )
}