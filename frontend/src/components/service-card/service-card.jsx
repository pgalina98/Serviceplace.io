/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ data: service }) => {
  return (
    <div className="column">
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
      >
        <div className="card-title">
          <h4>{service.title}</h4>
        </div>
        <div className="card-icon">
          <img src={service.image} alt="" />
        </div>
        <div className="card-text card-line-2">
          <p>{service.description}</p>
        </div>
        <div className="card-action">
          <Link
            to={`/services/${service.id}`}
            className="button btn-align-md primary-btn raised"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
