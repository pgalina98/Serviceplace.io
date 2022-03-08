/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Alert } from "reactstrap";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";

import { getCreatedOffers } from "../../actions/offer-actions";

import Spinner from "components/spinner/spinner";
import OfferCard from "components/offer-card/offer-card";

const CreatedOffers = ({ authenticationState }) => {
  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getCreatedOffers(authenticationState.loggedUser.id).then((response) => {
      setOffers(response);
      setIsLoading(false);
    });
  }, [authenticationState.loggedUser.id]);

  const renderOffers = () => {
    // return offers.map((offer) => <OfferCard key={offer.id} data={offer} />);
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Created Offers</h1>
        {!isLoading && offers.length === 0 && (
          <Alert color="primary">You don't have any created offers yet!</Alert>
        )}
        <div className="columns">
          <div className="column is-one-third">
            {isLoading ? <Spinner /> : renderOffers()}
          </div>
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
