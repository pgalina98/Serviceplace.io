import React, { useEffect, useState } from "react";

import Spinner from "../../components/spinner/spinner";
import ServiceCard from "../../components/service-card/service-card";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";
import * as api from "../../firebase/api/controllers/services-controller";

const OwnServices = ({ authenticationState }) => {
  const [services, setServices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    api
      .fetchLoggedUserServices(authenticationState.loggedUser.uid)
      .then((response) => {
        const userServices = response.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setServices(userServices);
        setIsLoading(false);
      });
  }, [authenticationState.loggedUser.uid]);

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
