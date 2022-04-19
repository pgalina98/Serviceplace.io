import React from "react";

import { ACTIONS } from "components/offer-card/offer-card";

import { Spinner } from "react-bootstrap";

import "./fab.scss";

export const FAB = ({
  savingState,
  onAcceptButtonClick,
  onRejectButtonClick,
}) => {
  const { action, isSaving } = savingState;

  return (
    <div className="floating-container">
      <div className="floating-button">+</div>
      <div className="element-container">
        <span
          className="float-element"
          onClick={(event) => {
            event.preventDefault();
            onAcceptButtonClick();
          }}
        >
          {action === ACTIONS.OFFER_ACCEPTING && isSaving ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            <i className="bi bi-check2" />
          )}
        </span>
        <span
          className="float-element"
          onClick={(event) => {
            event.preventDefault();
            onRejectButtonClick();
          }}
        >
          {action === ACTIONS.OFFER_REJECTING && isSaving ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            <i className="bi bi-x" />
          )}
        </span>
      </div>
    </div>
  );
};

export default FAB;
