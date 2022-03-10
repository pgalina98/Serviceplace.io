/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import { useSelector } from "react-redux";

import { mapIdToStatus } from "components/offer-modal/offer-status-constants";

const OfferCard = ({ data: offer }) => {
  const { loggedUser } = useSelector((state) => state.authenticationState);

  console.log("AUTHENTICATION STATE: ", loggedUser);
  console.log("OFFER: ", offer);

  const isOfferCreatedByLoggedUser = () => {
    return offer.fromUser.uid === loggedUser.uid;
  };

  return (
    <div className="column is-one-third offer-card">
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
        style={{ height: "550px" }}
      >
        <div className="card-title card-line-4">
          <h4>{offer.service.title}</h4>
        </div>
        <div className="card-icon">
          <img src={offer.service.image} alt="" />
        </div>
        <div className="card-text card-line-2">
          <p>{offer.service.description}</p>
        </div>
        <div className="tag is-large">{mapIdToStatus(offer.status)}</div>
        <hr />
        <div className="service-offer">
          <div>
            <span className="label">
              {isOfferCreatedByLoggedUser() ? "To User:" : "From User:"}
            </span>
            {isOfferCreatedByLoggedUser()
              ? offer.toUser.fullname
              : offer.fromUser.fullname}
          </div>
          <div>
            <span className="label">Note:</span> {offer.note}
          </div>
          <div>
            <span className="label">Price:</span> ${offer.totalPrice}
          </div>
          <div>
            <span className="label">Time:</span> {offer.requestedDuration} hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
