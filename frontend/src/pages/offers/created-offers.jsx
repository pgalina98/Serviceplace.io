/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";

import OfferCard from "components/offer-card/offer-card";

const CreatedOffers = ({ authenticationState }) => {
  const [offers, setOffers] = useState();

  const renderOffers = (offers) => {
    return offers.map((offer) => <OfferCard key={offer.id} data={offer} />);
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Created Offers</h1>
        <div className="columns">
          <div className="column is-one-third"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  service: state.servicesState.selectedService,
});

export default connect(mapStateToProps)(
  authenticatedBoundaryRoute(CreatedOffers)
);
