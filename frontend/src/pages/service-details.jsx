import React from "react";

import { useParams } from "react-router";

const ServiceDetails = () => {
  const { id } = useParams();

  return (
    <section className="hero is-fullheight is-default is-bold service-detail-page">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src="#" alt="Description" />
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <div className="service-header-container">
                <div className="media service-user">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img className="is-rounded" src="#" alt="#" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">#</p>
                    <p className="subtitle is-6">Owner</p>
                  </div>
                </div>
                <div className="service-price">
                  <div className="media service-user">
                    <div className="media-content">
                      <p className="title is-4">$#</p>
                      <p className="subtitle is-6">Per Hour</p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="title service-title is-2">#</h1>
              <div className="tag is-large service-category">#</div>
              <h2 className="subtitle is-4">#</h2>
              <br />
              <div className="has-text-centered"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
