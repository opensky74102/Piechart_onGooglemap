import { useEffect } from "react";
import "./modal.scss";

export default function PieActionModal({
  modalPos,
  handleClickRemove,
  handleClickEdit,
  handleClickCancel,
  title,
}: any) {
  useEffect(() => {

  }, [])
  return (
    <div className="modal" onClick={handleClickCancel}>
      <div className="modal-content" style={{ left: modalPos.w + 100 + "px", top: modalPos.h - 100 + "px" }}>
        <div className="content-title">
          <span>{title}</span>
        </div>
        <div className="content">
          <button onClick={handleClickEdit}>Edit</button>
          <button onClick={handleClickRemove}>Remove</button>
        </div>
      </div>
    </div>
  )
}