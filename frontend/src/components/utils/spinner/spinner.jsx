import React from "react";

import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
