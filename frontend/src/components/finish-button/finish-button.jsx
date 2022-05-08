import React from "react";

import $ from "jquery";

import "./finish-button.scss";

export const FinishButton = () => {
  $(function () {
    $("#finish-button").on("click", function () {
      $("#finish-button").addClass("clicked");
      setTimeout(() => {
        validate();
      }, 250);
    });

    function validate() {
      setTimeout(function () {
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
      }, 1250);
    }
  });

  return <button id="finish-button">FINISH</button>;
};

export default FinishButton;
