import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPieDetail, getProjectList } from '../../redux/pie/pieSlice';
import { getPieDetailById, getProjectList as getProjectListRequest } from '../../apis/pie.apies';
import 'reactjs-popup/dist/index.css';
import './popup.scss';

export default function SidePopUp() {
  const [isOpen, setIsOpen] = useState(false);
  const projectList = useSelector(getProjectList);
  useEffect(() => {
    getProjectListRequest()
  }, [])
  return (
    <div className={isOpen ? `side_popup display` : `side_popup hide`}>
      <div className='side_popup_title' onClick={() => setIsOpen(!isOpen)}>
        <h4>Projects list</h4>
      </div>
      <div className='side_popup_content'>
        <div className='list'>
          {
            projectList?.map((item: any, i: number) => {
              return (
                <a key={i} className={item.active ? "item active" : "item"} onClick={() => {
                  getPieDetailById(item.id);
                }}>{item.project_name}</a>
              )
            })
          }
        </div>
      </div>
      <div className='side_popup_footer'></div>
    </div>
  );
}
