/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

const ServiceCard = () => {
  return (
    <div className="column">
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
      >
        <div className="card-title">
          <h4>Addons & Plugins</h4>
        </div>
        <div className="card-icon">
          <img
            src="https://images.unsplash.com/photo-1574333751899-72c1e3d963fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            alt=""
          />
        </div>
        <div className="card-text">
          <p>This is some explanatory text that is on two rows</p>
        </div>
        <div className="card-action">
          <a href="#" className="button btn-align-md primary-btn raised">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
