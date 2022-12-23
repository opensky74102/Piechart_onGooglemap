import { useEffect } from "react";
import "./modal.scss";

export default function PieActionModal({ modalPos, handleClickRemove, handleClickEdit, handleClickCancel }: any) {
  useEffect(() => {

  }, [])
  return (
    <div className="modal" onClick={handleClickCancel}>
      <div className="modal-content" style={{ left: modalPos.w + 100 + "px", top: modalPos.h - 100 + "px" }}>
        {/* <div className="pie-action-modal" style={{display: open?"display":"none"}}> */}
        <button onClick={handleClickEdit}>Edit</button>
        <button onClick={handleClickRemove}>Remove</button>
      </div>
    </div>
  )
}