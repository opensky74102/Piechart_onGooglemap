import react, { useEffect, useState } from 'react';
import './footer.scss';
import { ANTENALIST, ANGLELIST, COMPASS } from '../../consts/Page_Const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import Slider from 'rc-slider';
import { IItem, IPieDetail } from '../../type';
import 'rc-slider/assets/index.css';

export default function CFooter({ click, center, }: any) {
  const [latVal, setLatValue] = useState(40.7);
  const [lngVal, setLngValue] = useState(-74);
  const [towername, setTowername] = useState('');

  const [infoes, setInfoes] = useState([]);
  const [itemInfo, setItemInfo] = useState<IItem>({
    compass: "N",
    frequency: 100,
    antenatype: 'PTP',
    angle: 30,
    color: '#4DB7FE',
  })
  const [openPopup, setOpenPopup] = useState('hide');
  const [pieDetail, setPieDetail] = useState<IPieDetail>({
    towerName: '',
    latitude: 0,
    longitude: 0,
    rotate: 30,
    radius: 10,
    items: []
  })
  const detail = {
    towerName: 'tower1',
    latitude: 0,
    longitude: 0,
    rotate: 30,
    radius: 10,
    items: [
      {
        compass: "NE",
        frequency: 40,
        antenatype: 'PTP',
        angle: 30,
        color: '#4DB7FE',
      },
      {
        compass: "NE",
        frequency: 40,
        antenatype: 'PTP',
        angle: 30,
        color: '#4DB7FE',
      },
    ]
  }
  const handleChangeValue = (e: any) => {
    let { value, min, max, name } = e.target;

    if (name === "latitude" && Number(value) >= min && Number(value) <= max) {
      setLatValue(value);
      click(value, lngVal);
      return;
    } else if (name === "longitude" && Number(value) >= min && Number(value) <= max) {
      setLngValue(value);
      click(latVal, value);
      return;
    } else if (name === "towername") {
      setTowername(value)
      return;
    }
  }
  const handleRotateSliderChange = (value: any) => {
    setPieDetail({
      ...pieDetail,
      rotate: value,
    })
  }
  const handleRadiusSliderChange = (value: any) => {
    setPieDetail({
      ...pieDetail,
      radius: value,
    })
  }

  const handleClick = () => {
    console.log("hello")
    click(latVal, lngVal, true);
  }
  const handleAddClick = () => {

  }
  const handleChangeInfo = (e: any) => {
    const { name, value, min } = e.target;
    switch (name) {
      case "compass":
        setItemInfo({ ...itemInfo, compass: value, })
        break;
      case "frequency":
        setItemInfo({ ...itemInfo, frequency: value, })
        break;
      case "antena":
        setItemInfo({ ...itemInfo, antenatype: value, })
        break;
      case "angle":
        setItemInfo({ ...itemInfo, angle: value, })
        break;
      case "color":
        setItemInfo({ ...itemInfo, color: value, })
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
  const handleAddItem = () => {
    let temp = pieDetail.items;
    temp.push(itemInfo);
    setPieDetail({ ...pieDetail, items: temp })
    setItemInfo({
      compass: "N",
      frequency: 100,
      antenatype: 'PTP',
      angle: 30,
      color: '#4DB7FE',
    })

  }
  useEffect(() => {
    setLatValue(center.lat);
    setLngValue(center.lng);
    setPieDetail({
      ...pieDetail,
      latitude: center.lat,
      longitude: center.lnt,
    });
  }, [center])
  return (
    <footer className={"footer " + openPopup}>
      <div className='footer_top_toggle' onClick={() => onChangeOpenStatus()} >
        <FontAwesomeIcon icon={openPopup === "display" ? faArrowDown : faArrowUp} className="fa_icon" color="black" size="sm" />
      </div>
      <div className="footer_control">
        <h5>Map Tools</h5>
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
              <select className='info_input' name="compass" id="compass" value={itemInfo.compass} onInput={handleChangeInfo}>
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
              <input type="number" min={1} className='info_input' name='frequency' value={itemInfo.frequency} placeholder='0.0' onInput={handleChangeInfo} />
            </div>
            <div className='info'>
              <div className='label'>
                <label>Antena Type:</label>
              </div>
              <select className='info_input' name="antena" id="antena" value={itemInfo.antenatype} onInput={handleChangeInfo}>
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
              <select className='info_input' name="angle" id="angle" value={itemInfo.angle} onInput={handleChangeInfo}>
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
              <input type="color" className='info_input' name='color' value={itemInfo.color} onInput={handleChangeInfo} />
            </div>
            <div className='info'>
              <button type="button" className='info_input button' name="addItem" onClick={handleAddItem}>add item</button>
            </div>
          </div>

        </div>
        <div className='itemlist_form'>
          <div className='itemlist'>
            {
              pieDetail.items.map((item, ind) => {
                return (
                  <div key={ind} className='item' style={{ background: '' + item.color }}>
                    <div className='item_com'><span>{item.compass}</span></div>
                    <div className='item_freq'><span>{item.frequency}</span></div>
                    <div className='item_ante'><span>{item.antenatype}</span></div>
                    <div className='item_ang'><span>{item.angle}</span></div>
                  </div>
                )
              })
            }
          </div>
          <div className='piecreate'>
            {pieDetail.items.length === 0 ? (
              <button className='btn hidden'>Create Pie</button>
            ) : (
              <button className='btn'>Create Pie</button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}