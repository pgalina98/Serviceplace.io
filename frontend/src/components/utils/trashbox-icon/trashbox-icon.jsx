import React from "react";

import "./trashbox-icon.scoped.scss";

const TrashboxIcon = ({ onDeleteButtonClick }) => {
  return (
    <div className="trash-box" onClick={onDeleteButtonClick}>
      <div className="trash" />
      <div className="trash-top" />
      <div className="trash-btm">
        <div className="trash-lines">
          <div className="trash-line" />
          <div className="trash-line" />
        </div>
      </div>
    </div>
  );
};

export default TrashboxIcon;
