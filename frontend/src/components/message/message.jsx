import React from "react";

import "../../pages/collaborations/collaborations.scss";

const Message = ({ side }) => {
  return (
    <div className={`view-wrap-item-${side} mb-2`}>
      <div className={`view-wrap-item-${side}-wrapper`}>
        <img
          src="https://i.imgur.com/cVDadwb.png"
          alt="avatar"
          className={`peer-avatar-${side}`}
        />
        <div className={`view-item-${side}`}>
          <span className="text-content-item">hey</span>
        </div>
      </div>
      <span className={`text-time-${side}`}>Oct 31, 2019</span>
    </div>
  );
};

export default Message;
