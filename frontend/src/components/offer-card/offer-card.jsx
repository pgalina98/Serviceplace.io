/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

const OfferCard = ({ data: offer }) => {
  return (
    <div className="column is-one-third offer-card">
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
        style={{ height: "350px" }}
      >
        <div className="card-title card-line-4">
          <h4>{offer.service.title}</h4>
        </div>
        <div className="card-icon">
          <img src={offer.service.image} alt="" />
        </div>
        <div className="card-text card-line-2">
          <p>{offer.ServiceCardservice.description}</p>
        </div>
        <div className="tag is-large">{offer.status}</div>
        <hr />
        <div className="service-offer">
          <div>
            <span className="label">From User:</span> {offer.toUser.fullName}
          </div>
          <div>
            <span className="label">Note:</span> {offer.note}
          </div>
          <div>
            <span className="label">Price:</span> ${offer.price}
          </div>
          <div>
            <span className="label">Time:</span> {offer.time} hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
