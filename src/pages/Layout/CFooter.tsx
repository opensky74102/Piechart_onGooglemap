import { useEffect, useState, useRef } from 'react';
import './footer.scss';
import { ANTENALIST, ANGLELIST, COMPASS } from '../../consts/Page_Const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Slider from 'rc-slider';
import { IItem, IPieDetail } from '../../type';
import 'rc-slider/assets/index.css';
import back from '../../assets/images/preview.png';

export default function CFooter({ pieCreate, center, setCenter, openPopup, setOpenPopup }: any) {
  const [latVal, setLatValue] = useState(40.7);
  const [lngVal, setLngValue] = useState(-74);
  const [coordinate, setCoordinate] = useState('40.730610, -73.935242');
  const [towername, setTowername] = useState('');
  const [itemInfo, setItemInfo] = useState<IItem>({
    compass: "N",
    frequency: 100,
    antenatype: 'PTP',
    angle: 30,
    color: '#4DB7FE',
  });
  const [preview, setPreview] = useState<HTMLElement>();
  const [pieDetail, setPieDetail] = useState<IPieDetail>({
    towerName: '',
    latitude: 0,
    longitude: 0,
    rotate: 0,
    radius: 60,
    items: []
  })
  const canvasPreview = useRef<HTMLCanvasElement>(null);

  var canvas = null;
  const handleChangeValue = (e: any) => {
    let { value, min, max, name } = e.target;

    if (name === "coordinate") {
      let temp = (value.replace(" ", "")).split(",");
      let pat = /^-?\d*\.{0,1}\d+$/;
      setCoordinate(value);
      if (temp.length > 2) {
        return;
      } else if (temp.length === 2) {
        if (isNaN(parseFloat(temp[0])) || isNaN(parseFloat(temp[1]))) {
          return;
        }
        setCenter(parseFloat(temp[0]), parseFloat(temp[1]))
      } else {

        if (isNaN(temp[0])) {
          return;
        }

        setCenter(parseFloat(temp[0]), 74)
      }
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
  const handleClearPie = () => {
    setPieDetail({
      ...pieDetail,
      items: []
    })
  }
  useEffect(() => {
    const canvas = canvasPreview.current;
    if (canvas === null || canvas === undefined) {
      return;
    } else {

      const wi = pieDetail.radius * 1.5 + 100;
      canvas.width = wi;
      canvas.height = wi;
      let ctx = canvas.getContext("2d");

      const items = pieDetail.items;

      let sum = 0;
      // let totalAngle = items.reduce((sum, { angle }) => sum + Number(angle), 0);
      let totalAngle = 360;
      let currentAngle = 0;

      if (ctx) {
        for (let item of items) {
          let portionAngle = (Number(item.angle) / totalAngle) * 2 * Math.PI;
          ctx.beginPath();
          ctx.arc(wi / 2, wi / 2, wi / 2, currentAngle + pieDetail.rotate / 10, currentAngle + portionAngle + pieDetail.rotate / 10);
          currentAngle += portionAngle;
          ctx.lineTo(wi / 2, wi / 2);
          ctx.fillStyle = item.color;
          ctx.strokeStyle = 'white';
          ctx.globalAlpha = 0.8;
          // ctx.fillText(towername, wi / 2 - 20, wi / 2 + 20)
          ctx.fill();
          ctx.stroke();
          ctx.font = 12 + pieDetail.radius * 0.1 + "px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var mid = currentAngle + pieDetail.rotate / 10 - portionAngle/2 ;
          ctx.fillText(item.compass, wi/2 + Math.cos(mid) * (wi/4), wi/2 + Math.sin(mid) * (wi / 4)-10);
          ctx.font = 8 + pieDetail.radius * 0.1 + "px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText(item.frequency.toString(), wi/2 + Math.cos(mid) * (wi/4), wi/2 + Math.sin(mid) * (wi / 4) + 10 );
        }

      }
    }

  }, [pieDetail])
  useEffect(() => {
    setPieDetail({
      ...pieDetail,
      towerName: towername
    })
  }, [towername])
  const handleCreatePieOnMap = () => {
    pieCreate(pieDetail);
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
        setItemInfo({ ...itemInfo, angle: Number(value), })
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
    let tempPie = structuredClone(pieDetail);
    let sum = 0;
    let totalAngle = tempPie.items.reduce((sum: any, { angle }: any) => sum + Number(angle), 0);
    let tempItem = structuredClone(itemInfo);
    if (totalAngle >= 360) {
      return;
    } else if (itemInfo.angle + totalAngle > 360) {
      tempItem.angle = 360 - totalAngle;
    }
    tempPie.items.push(tempItem);
    setPieDetail(tempPie)
    setItemInfo({
      compass: "N",
      frequency: 100,
      antenatype: 'PTP',
      angle: 30,
      color: '#4DB7FE',
    })
  }
  const handleClickItem = (ind: number) => {
    let temp = pieDetail.items;
    temp.splice(ind, 1);
    setPieDetail({
      ...pieDetail,
      items: temp
    })
  }
  useEffect(() => {
    setLatValue(center.lat);
    setLngValue(center.lng);
    // setCoordinate('' + center.lat.toFixed(5) + ", " + center.lng.toFixed(5));
    setPieDetail({
      ...pieDetail,
      latitude: center.lat,
      longitude: center.lng,
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
              <label htmlFor="coordinate">Coordinate:</label>
            </div>
            <input
              type="string"
              className='info_input'
              name="coordinate"
              id='coordinate'
              placeholder='Coordinate'
              value={coordinate}
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
              min={0}
              max={100}
              defaultValue={pieDetail.radius}
              onChange={handleRadiusSliderChange}
              className="info_input"
            />
          </div>
        </div>
        <div className='border-div'></div>
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
        <div className='border-div'></div>
        <div className='itemlist_form'>
          <div className='itemlist'>
            {
              pieDetail.items.map((item, ind) => {
                return (
                  <div key={ind} className='item' style={{ background: '' + item.color }} onClick={() => handleClickItem(ind)}>
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
              <>
                <button className='btn hidden'>Create Pie</button></>
            ) : (
              <>
                <button className='btn' onClick={handleClearPie}>Clear Layout</button>
                <button className='btn' onClick={handleCreatePieOnMap}>Add Spectrum</button>
              </>
            )}
          </div>
        </div>
        <div className='border-div'></div>
        <div className='preview_form'>
          <h5 className='preview_title'>Layout Preview</h5>
          <img src={back} alt="" className='image_preview' />
          <canvas ref={canvasPreview} id='preview_canvas'></canvas>
        </div>
      </div>
    </footer>
  )
}