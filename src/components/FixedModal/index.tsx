import { useEffect, useState } from "react";
import "./FixedModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {setLoading, closeFixedModal, setProjectName, getProjectName, getPieDetail } from "../../redux/pie/pieSlice";
import { pieSaveRequest } from "../../apis/pie.apies";

export default function FixedModal() {
  const dispatch = useDispatch();
  const pieDetail = useSelector(getPieDetail);
  const [projectName, setProject] = useState('');
  const handleSureClick = () => {
    console.log(projectName)
    if (projectName === undefined || projectName === '') {
      return;
    }
    dispatch(closeFixedModal())
    dispatch(setLoading())
    pieSaveRequest(pieDetail)
  }
  useEffect(() => {
    dispatch(setProjectName(projectName));
  }, [projectName])
  return (
    <div className="fixed-modal">
      <div className="modal-content">
        <div className="content-title">
          <span>Would you like to save the pie chart dataes?</span>
        </div>
        <div className="content-input">
          <input type="text" placeholder="Here is project name" onInput={(e: any) => { setProject(e.target.value) }} value={projectName} />
        </div>
        <div className="content">
          <button onClick={() => { dispatch(closeFixedModal()) }}>No thanks</button>
          <button onClick={handleSureClick}>Sure</button>
        </div>
      </div>
    </div>
  )
}