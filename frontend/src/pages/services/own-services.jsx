import React, { useEffect, useState } from "react";

import Spinner from "../../components/spinner/spinner";
import ServiceCard from "../../components/service-card/service-card";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";

import { getLoggedUserServices } from "../../actions/service-actions";

const OwnServices = ({ authenticationState }) => {
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getLoggedUserServices(authenticationState.loggedUser.id).then(
      (response) => {
        setServices(response);
        setIsLoading(false);
      }
    );
  }, [authenticationState.loggedUser.id]);

  const renderServices = () => {
    return services.map((service) => (
      <ServiceCard key={service.id} data={service} />
    ));
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">My Services</h1>
        <div className="columns is-multiline">
          {isLoading ? <Spinner /> : renderServices()}
        </div>
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(OwnServices);
