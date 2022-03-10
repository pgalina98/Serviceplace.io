/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import { useSelector } from "react-redux";

import {
  OFFER_STATUS,
  mapIdToStatus,
} from "components/offer-modal/offer-status-constants";

const OfferCard = ({ data: offer, showControlButtons = false }) => {
  const { loggedUser } = useSelector((state) => state.authenticationState);

  const isOfferCreatedByLoggedUser = () => {
    return offer.fromUser.uid === loggedUser.uid;
  };

  const onAcceptButtonClick = () => {};

  const onRejectButtonClick = () => {};

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
              ? "is-warning"
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
                  class="btn btn-success"
                >
                  Accept
                </button>
                <button
                  onClick={() => onRejectButtonClick()}
                  type="button"
                  class="btn btn-danger"
                >
                  Reject
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
