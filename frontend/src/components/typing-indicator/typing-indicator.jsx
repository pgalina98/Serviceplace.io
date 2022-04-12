import React from "react";

import "./typing-indicator.scss";

const TypingIndicator = ({ collaborator, hidden }) => {
  return (
    <div className={`view-wrap-item-left mb-2 ${hidden && "d-none"}`}>
      <div className="view-wrap-item-left-wrapper">
        <div className="typing-indicator-left">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img
          src={collaborator.avatar}
          alt="avatar"
          className="peer-avatar-left"
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
