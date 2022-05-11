import React from "react";

import $ from "jquery";

import "./finish-button.scss";

export const FinishButton = ({ handleFinishButtonClick }) => {
  $(function () {
    $("#finish-button").on("click", function () {
      $("#finish-button").addClass("clicked");
      setTimeout(() => {
        validate();
      }, 250);
    });

    function validate() {
      setTimeout(function () {
        $("#finish-button").removeClass("finish-button-content");
        $("#finish-button").removeClass("clicked");
        $("#finish-button").addClass("validate");
        setTimeout(() => {
          callback();
        }, 250);
      }, 2250);
    }

    function callback() {
      setTimeout(function () {
        $("#finish-button").removeClass("validate");
        $("#finish-button").addClass("finish-button-content");
      }, 1250);
    }
  });

  return (
    <button
      id="finish-button"
      className="finish-button-content"
      onClick={handleFinishButtonClick}
    />
  );
};

export default FinishButton;
