import React from "react";

import "./fab.scss";

export const FAB = (props) => {
  return (
    <div class="floating-container">
      <div class="floating-button">+</div>
      <div class="element-container">
        <span class="float-element">
          <i class="bi bi-check2" />
        </span>
        <span class="float-element">
          <i class="bi bi-x" />
        </span>
      </div>
    </div>
  );
};

export default FAB;
