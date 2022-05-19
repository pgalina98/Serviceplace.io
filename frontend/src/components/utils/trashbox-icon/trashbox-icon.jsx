import React from "react";

import "./trashbox-icon.scss";

const TrashboxIcon = ({ onDeleteButtonClick }) => {
  return (
    <div className="trash-box" onClick={onDeleteButtonClick}>
      <div className="trash"></div>
      <div className="trash-top"></div>
      <div className="trash-btm">
        <div className="trash-lines">
          <div className="trash-line"></div>
          <div className="trash-line"></div>
        </div>
      </div>
    </div>
  );
};

export default TrashboxIcon;
