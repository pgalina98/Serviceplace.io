import React from "react";

import "./typing-indicator.scss";

const TypingIndicator = () => {
  return (
    <div className={`view-wrap-item-right mb-2`}>
      <div className={`view-wrap-item-right-wrapper`}>
        <img
          src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
          alt="avatar"
          className={`peer-avatar-right`}
        />
        <div className="typing-indicator-right">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
