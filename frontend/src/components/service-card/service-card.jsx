/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";

import TrashboxIcon from "../../components/trashbox-icon/trashbox-icon";

const ServiceCard = ({ data: service }) => {
  return (
    <div className="column is-one-third position-relative">
      <TrashboxIcon />
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
        style={{ height: "350px" }}
      >
        <div className="card-title card-line-4">
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
