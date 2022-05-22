import React, { useEffect, useState } from "react";

import { Alert } from "reactstrap";

import Spinner from "components/utils/spinner/spinner";
import ServiceCard from "components/cards/service-card/service-card";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import { getLoggedUserServices } from "actions/service-actions";

const OwnServices = ({ authenticationState }) => {
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLoggedUserServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationState.loggedUser.id]);

  const fetchLoggedUserServices = () => {
    setIsLoading(true);

    getLoggedUserServices(authenticationState.loggedUser.id).then(
      (response) => {
        setServices(response);
        setIsLoading(false);
      }
    );
  };

  const renderServices = () => {
    return services.map((service) => (
      <ServiceCard
        key={service.id}
        data={service}
        fetchLoggedUserServices={fetchLoggedUserServices}
        isDeleteIconShown={true}
      />
    ));
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">My Services</h1>
        {!isLoading && services.length === 0 && (
          <Alert color="primary">
            You don't have any created services yet!
          </Alert>
        )}
        <div className="card-grid mt-40">
          {isLoading ? <Spinner /> : renderServices()}
        </div>
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(OwnServices);
