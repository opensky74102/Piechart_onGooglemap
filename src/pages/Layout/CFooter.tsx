import react, { useEffect, useState } from 'react';
import './footer.scss';
import { ANTENALIST, ANGLELIST } from '../../consts/Page_Const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";



export default function CFooter({ click, center, }: any) {
  const [latVal, setLatValue] = useState(40.7);
  const [lngVal, setLngValue] = useState(-74);
  const [tempPieSize, setTempPieSize] = useState(6);
  const [pieSize, setPieSize] = useState(7);

  const [infoes, setInfoes] = useState([]);
  const [itemInfo, setItemInfo] = useState({
    mood: "",
    total: 0,
    color: '#000000'
  })
  const [openPopup, setOpenPopup] = useState('hide');
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
  }else{
    setOpenPopup('hide')
  }
  }
  return (
    <footer className={"footer "+ openPopup }>
      <div className="footer_control">
        <h5>Map Tools</h5>
        <FontAwesomeIcon icon={openPopup==="display"?faToggleOff:faToggleOn} className="fa_icon" color="black" size="xl" onClick={() => onChangeOpenStatus()} />
      </div>
      <div className='footer__content'>
        <div className='infoes_form'>
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
              <label htmlFor='name'>Name:</label>
            </div>
            <input
              type="text"
              className='info_input'
              name="name"
              id='name'
              placeholder='Name'
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
        <div className='items_form'>

          <div className='item_infoes'>
            <div className='info'>
              <div className='label'>
                <label>Sector:</label>
              </div>
              <input type="text" className='info_input' placeholder='Sector' name='sector' onInput={handleChangeInfo} />
            </div>
            <div className='info'>
              <div className='label'>
                <label>Angle:</label>
              </div>
              {/* <input type="number" min={0} className='info_input' name='angle' onInput={handleChangeInfo} /> */}
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
              <input type="button" className='info_input' name="buttom" value="add item" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}