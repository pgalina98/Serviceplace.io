/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";

import {
  OFFER_STATUS,
  mapIdToStatus,
} from "components/offer-modal/offer-status-constants";

import { TOAST_TYPES } from "utils/toast-util";
import { messages } from "config/constants";

import { acceptOffer, rejectOffer } from "../../actions/offer-actions";

const ACTIONS = {
  ACCEPTING: 1,
  REJECTING: 0,
};

const OfferCard = ({ data, showControlButtons = false }) => {
  const { addToast } = useToasts();

  const { loggedUser } = useSelector((state) => state.authenticationState);

  const [offer, setOffer] = useState(data);
  const [savingState, setSavingState] = useState({
    isSaving: false,
  });

  const isOfferCreatedByLoggedUser = () => {
    return offer.fromUser.uid === loggedUser.uid;
  };

  const onAcceptButtonClick = () => {
    setSavingState({ action: ACTIONS.ACCEPTING, isSaving: true });
    const updatedOffer = { ...offer, status: OFFER_STATUS.ACCEPTED };

    acceptOffer(updatedOffer)
      .then(() => {
        setSavingState({ action: ACTIONS.ACCEPTING, isSaving: false });
        addToast(messages.OFFER_ACCEPTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({ action: ACTIONS.ACCEPTING, isSaving: false });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const onRejectButtonClick = () => {
    setSavingState({ action: ACTIONS.REJECTING, isSaving: true });
    const updatedOffer = { ...offer, status: OFFER_STATUS.REJECTED };

    rejectOffer(updatedOffer)
      .then(() => {
        setSavingState({ action: ACTIONS.REJECTING, isSaving: false });
        addToast(messages.OFFER_REJECTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({ action: ACTIONS.REJECTING, isSaving: false });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <div className="column is-one-third offer-card">
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
        style={{ height: "600px" }}
      >
        <div className="card-title card-line-3">
          <h4>{offer.service.title}</h4>
        </div>
        <div className="card-icon">
          <img src={offer.service.image} alt="service-img" />
        </div>
        <div className="card-text card-line-2">
          <p>{offer.service.description}</p>
        </div>
        <div
          className={`tag is-large ${
            OFFER_STATUS.ACCEPTED === offer.status
              ? "is-success"
              : OFFER_STATUS.REJECTED === offer.status
              ? "is-danger"
              : "is-dark"
          }`}
        >
          {mapIdToStatus(offer.status)}
        </div>
        <hr />
        <div className="service-offer">
          <div className="card-line-2 mb-2">
            <span className="label">
              {isOfferCreatedByLoggedUser() ? "To User:" : "From User:"}
            </span>
            {isOfferCreatedByLoggedUser()
              ? offer.toUser.fullname
              : offer.fromUser.fullname}
          </div>
          <div className="card-line-2 mb-2">
            <span className="label">Note:</span> {offer.note}
          </div>
          <div className="card-line-2 mb-2">
            <span className="label">Price:</span> ${offer.totalPrice}
          </div>
          <div className="card-line-2 mb-2">
            <span className="label">Time:</span> {offer.requestedDuration} hours
          </div>
          {showControlButtons && offer.status === OFFER_STATUS.PENDING && (
            <>
              <hr />
              <div className="d-flex justify-content-evenly">
                <button
                  onClick={() => onAcceptButtonClick()}
                  type="button"
                  className="btn btn-success"
                  disabled={savingState.isSaving}
                >
                  {ACTIONS.ACCEPTING === savingState.action &&
                  savingState.isSaving ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Accept"
                  )}
                </button>
                <button
                  onClick={() => onRejectButtonClick()}
                  type="button"
                  className="btn btn-danger"
                  disabled={savingState.isSaving}
                >
                  {ACTIONS.REJECTING === savingState.action &&
                  savingState.isSaving ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
