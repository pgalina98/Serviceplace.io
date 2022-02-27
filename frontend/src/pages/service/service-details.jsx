/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../../components/spinner/spinner";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";

import { getServiceById } from "../../actions/service-actions";

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [service, setService] = useState();

  useEffect(() => {
    setIsLoading(true);

    dispatch(getServiceById(id)).then((service) => {
      setService(service.payload);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-5">
            <figure className="image is-4by3">
              <img src={service?.image} alt="Description" />
            </figure>
          </div>
          <div className="column is-6 is-offset-1">
            <h1 className="title is-2">{service?.title}</h1>
            <h2 className="subtitle is-4">{service?.description}</h2>
            <br />
            <p className="has-text-centered">
              <button className="button is-medium is-info is-outlined">
                Get started
              </button>
            </p>
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
  authenticatedBoundaryRoute(ServiceDetails)
);
