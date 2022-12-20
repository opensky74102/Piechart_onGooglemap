import react, { useEffect, useState } from 'react';
import './footer.scss';
import { ANTENALIST, ANGLELIST, COMPASS } from '../../consts/Page_Const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function CFooter({ click, center, }: any) {
  const [latVal, setLatValue] = useState(40.7);
  const [lngVal, setLngValue] = useState(-74);
  const [tempPieSize, setTempPieSize] = useState(6);
  const [pieSize, setPieSize] = useState(7);

  const [infoes, setInfoes] = useState([]);
  const [itemInfo, setItemInfo] = useState({
    sector: "",
    angle: 0,
    color: '#000000',
    antena: 'antena',
  })
  const [openPopup, setOpenPopup] = useState('hide');
  const detail = {
    name: 'pie chart',
    lat: 0,
    lng: 0,
    rotate: 30,
    items: [
      {
        sector: 'sector1',
        angle: 35,
        color: '#aaaaaa',
        antena: 'antena1'
      },
      {
        sector: 'sector1',
        angle: 35,
        color: '#aaaaaa',
        antena: 'antena1'
      }
    ]
  }
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
  const handleAddClick = () => {

  }
  const handleChangeInfo = (e: any) => {
    const { name, value, min } = e.target;
    let temp = structuredClone(itemInfo);
    console.log(name, value)
    switch (name) {
      case "":

        break;

      default:
        break;
    }
  }
  const onChangeOpenStatus = () => {
    if (openPopup === 'hide') {
      setOpenPopup('display');
    } else {
      setOpenPopup('hide')
    }
  }
  const handleRadiusSliderChange = () => {

  }
  const handleRotateSliderChange = () => {

  }
  return (
    <footer className={"footer " + openPopup}>
      <div className='footer_top_toggle'  onClick={() => onChangeOpenStatus()} >
        <FontAwesomeIcon icon={openPopup === "display" ? faArrowDown : faArrowUp} className="fa_icon" color="black" size="sm"/>
      </div>
      <div className="footer_control">
        <h5>Map Tools</h5>
        {/* <FontAwesomeIcon icon={openPopup === "display" ? faToggleOff : faToggleOn} className="fa_icon" color="black" size="xl" onClick={() => onChangeOpenStatus()} /> */}
      </div>
      <div className='footer__content'>
        <div className='infoes_form'>
        <div className='info_form'>
            <div className='info_title'>
              <label htmlFor='towername'>Tower Name:</label>
            </div>
            <input
              type="text"
              className='info_input'
              name="towername"
              id='towername'
              placeholder='Tower Name'
              onInput={handleChangeValue}
            />
          </div>
          <div className='info_form'>
            <div className='info_title'>
              <label htmlFor="latitude">Latitude:</label>
            </div>
            <input
              type="number"
              className='info_input'
              name="latitude"
              id='latitude'
              max={90} min={-90}
              placeholder='Latitude'
              value={latVal == 0 ? '' : latVal}
              onInput={handleChangeValue}
            />
          </div>
          <div className='info_form'>
            <div className='info_title'>
              <label htmlFor='longitude'>Longitude:</label>
            </div>
            <input
              type="number"
              className='info_input'
              name="longitude"
              id='longitude'
              max={180} min={-180}
              placeholder='Longitude'
              value={lngVal == 0 ? '' : lngVal}
              onInput={handleChangeValue}
            />
          </div>
      
          <div className='info_form'>
            <div className='info_title'>
              <label htmlFor="rotate">Rotate:</label>
            </div>
            <Slider
              min={0}
              max={360}
              defaultValue={30}
              onChange={handleRotateSliderChange}
              startPoint={0}
              className="info_input"
            />
          </div>
          <div className='info_form'>
            <div className='info_title'>
              <label htmlFor="radius">Radius:</label>
            </div>
            <Slider
                min={1}
                max={100}
                defaultValue={10}
                onChange={handleRadiusSliderChange}
                startPoint={0}
                className="info_input"
              />
          </div>
        </div>
        <div className='items_form'>

          <div className='item_infoes'>
          <div className='info'>
              <div className='label'>
                <label>Compass:</label>
              </div>
              <select className='info_input' name="antena" id="antena" onInput={handleChangeInfo}>
                {COMPASS.map((val, ind) => {
                  return (
                    <option key={ind} value={val}>{val}</option>
                  )
                })}
              </select>
            </div>
          <div className='info'>
              <div className='label'>
                <label>Frequency:</label>
              </div>
              <input type="number" className='info_input' name='frequency' placeholder='0.0' />
            </div>
          <div className='info'>
              <div className='label'>
                <label>Antena Type:</label>
              </div>
              {/* <input type="select" className='info_input' name='antena' onInput={handleChangeInfo} /> */}
              <select className='info_input' name="antena" id="antena" onInput={handleChangeInfo}>
                {ANTENALIST.map((val, ind) => {
                  return (
                    <option key={ind} value={val}>{val}</option>
                  )
                })}
              </select>
            </div>
            <div className='info'>
              <div className='label'>
                <label>Antena Angle:</label>
              </div>
              <select className='info_input' name="angle" id="angle" onInput={handleChangeInfo}>
                {
                  ANGLELIST.map((val, ind) => {
                    return (
                      <option key={ind} value={val}>{val}</option>
                    )
                  })
                }
              </select>

            </div>
            <div className='info'>
              <div className='label'>
                <label>Color:</label>
              </div>
              <input type="color" className='info_input' name='color' onInput={handleChangeInfo} />
            </div>
            <div className='info'>
              <input type="button" className='info_input' name="buttom" value="add item" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}