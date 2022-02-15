import React from "react";

import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
